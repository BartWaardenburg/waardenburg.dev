// The particle field behind the whole page: one WebGL2 draw call, no dependencies.
// Every formation lives in its own GPU buffer; morphing between two is a matter of
// pointing the "from" and "to" attributes at different buffers and moving uMix.
// Page sections declare which formation they want with data-scene="<name>".

import { lookAt, perspective } from './math';
import {
	buildDust,
	buildScatterShape,
	buildScene,
	SCENES,
	type BuildOptions,
	type Dust,
	type SceneName,
	type Shape,
	type Viewport,
} from './shapes';

const VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in vec3 aFrom;
layout(location = 1) in vec4 aFromCol;
layout(location = 2) in vec3 aTo;
layout(location = 3) in vec4 aToCol;
layout(location = 4) in vec4 aRand;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTime;
uniform float uMix;
uniform float uSize;
uniform float uDpr;
uniform float uSpinFrom;
uniform float uSpinTo;
uniform vec3 uCenterFrom;
uniform vec3 uCenterTo;
uniform float uScrollY;
uniform float uVel;
uniform vec2 uMouse;
uniform vec2 uMouseVel;
uniform float uMouseStr;
uniform float uScan;
uniform float uDim;
uniform int uDustStart;
out vec4 vCol;

vec3 spin(vec3 p, vec3 c, float a) {
	vec3 q = p - c;
	float s = sin(a);
	float k = cos(a);
	return c + vec3(k * q.x + s * q.z, q.y, -s * q.x + k * q.z);
}

void main() {
	bool dust = gl_VertexID >= uDustStart;
	float m = clamp((uMix - aRand.x * 0.4) / 0.6, 0.0, 1.0);
	m = m * m * (3.0 - 2.0 * m);
	vec3 a = dust ? aFrom : spin(aFrom, uCenterFrom, uTime * uSpinFrom);
	vec3 b = dust ? aTo : spin(aTo, uCenterTo, uTime * uSpinTo);
	vec3 p = mix(a, b, m);
	float burst = dust ? 0.0 : sin(m * 3.14159265);
	vec3 n = vec3(
		sin(p.y * 1.7 + uTime * 0.6 + aRand.y * 6.2831),
		cos(p.z * 1.3 + uTime * 0.5 + aRand.z * 6.2831),
		sin(p.x * 1.5 - uTime * 0.4 + aRand.w * 6.2831)
	);
	p += n * burst * (0.3 + aRand.y * 1.1);
	p += n * (0.012 + uVel * 0.08);
	if (dust) {
		float depth = clamp((p.z + 9.0) / 14.0, 0.0, 1.0);
		p.y = mod(p.y + uScrollY * (0.15 + depth * 0.9) + 6.0, 12.0) - 6.0;
	}
	// The pointer is a lens: particles nearby are drawn into a slowly swirling halo
	// that trails behind the pointer's motion, and warm up in colour as they pass.
	vec2 d = p.xy - uMouse;
	float r = length(d) + 1e-4;
	float f = exp(-r * r * 1.7) * uMouseStr;
	float swirl = f * (2.1 + sin(uTime * 1.1 + aRand.w * 6.2831) * 0.8);
	float cs = cos(swirl);
	float sn = sin(swirl);
	vec2 dir = mat2(cs, sn, -sn, cs) * (d / r);
	float halo = 0.55 + aRand.y * 0.25;
	float rr = mix(r, halo + (r - halo) * 0.3, f * 0.75);
	p.xy = uMouse + dir * rr - uMouseVel * f * 0.9;
	p.z += f * 0.7 * sin(swirl * 2.0 + aRand.x * 6.2831);
	vec4 mv = uView * vec4(p, 1.0);
	gl_Position = uProj * mv;
	float size = uSize * (0.5 + aRand.z * 1.1) * uDpr * (dust ? 0.8 : 1.0) * (1.0 + f * 0.6);
	gl_PointSize = max(1.0, size * (7.0 / max(0.5, -mv.z)));
	vec4 col = mix(aFromCol, aToCol, m);
	float band = exp(-pow((p.y - uCenterTo.y - sin(uTime * 0.8) * 2.0) * 4.0, 2.0));
	col.rgb = mix(col.rgb, vec3(0.86, 0.66, 0.4), band * uScan * 0.7);
	float hue = 0.5 + 0.5 * sin(atan(d.y, d.x) * 2.0 + uTime * 0.8);
	vec3 lens = mix(vec3(0.9, 0.68, 0.4), vec3(0.86, 0.38, 0.46), hue);
	col.rgb = mix(col.rgb, lens, f * 0.7);
	col.a *= (dust ? 1.0 : uDim * 1.45) * (1.0 + burst * 0.7 + band * uScan * 1.5 + f * 2.2);
	vCol = col;
}`;

const FRAG = /* glsl */ `#version 300 es
precision mediump float;
in vec4 vCol;
out vec4 outColor;
void main() {
	vec2 c = gl_PointCoord - 0.5;
	float a = smoothstep(0.5, 0.0, length(c));
	a *= a;
	outColor = vec4(vCol.rgb * vCol.a * a, 1.0);
}`;

const BG = [7 / 255, 7 / 255, 10 / 255];
const FOV = (35 * Math.PI) / 180;
const CAM_Z = 10;

// how bright each formation is drawn (text sits on top of some of them)
const DIM: Record<SceneName, number> = {
	name: 1,
	galaxy: 0.75,
	graph: 1,
	globe: 1,
	constellation: 0.7,
	rings: 0.8,
	terrain: 1,
	portal: 1,
};

// how strongly the pointer pushes particles around
const MOUSE: Record<SceneName, number> = {
	name: 1,
	galaxy: 0.4,
	graph: 0.55,
	globe: 0.45,
	constellation: 0.35,
	rings: 0.35,
	terrain: 0.3,
	portal: 0.7,
};

export interface EngineOptions {
	fontFamily: string;
	onReady?: () => void;
	onLost?: () => void;
}

export interface Engine {
	destroy: () => void;
}

const smoothstep = (a: number, b: number, x: number) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
	return t * t * (3 - 2 * t);
};

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
	const sh = gl.createShader(type);
	if (!sh) throw new Error('shader');
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		throw new Error(gl.getShaderInfoLog(sh) ?? 'shader compile failed');
	}
	return sh;
};

const requestIdle = (fn: () => void): number =>
	typeof window.requestIdleCallback === 'function'
		? window.requestIdleCallback(fn, { timeout: 1500 })
		: window.setTimeout(fn, 32);

const cancelIdle = (id: number) => {
	if (typeof window.cancelIdleCallback === 'function')
		window.cancelIdleCallback(id);
	else window.clearTimeout(id);
};

export const createEngine = (
	canvas: HTMLCanvasElement,
	opts: EngineOptions,
): Engine | null => {
	const gl = canvas.getContext('webgl2', {
		antialias: false,
		alpha: false,
		depth: false,
		powerPreference: 'high-performance',
	});
	if (!gl) return null;

	const program = gl.createProgram();
	gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
	gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	gl.useProgram(program);

	const u = (name: string) => gl.getUniformLocation(program, name);
	const U = {
		proj: u('uProj'),
		view: u('uView'),
		time: u('uTime'),
		mix: u('uMix'),
		size: u('uSize'),
		dpr: u('uDpr'),
		spinFrom: u('uSpinFrom'),
		spinTo: u('uSpinTo'),
		centerFrom: u('uCenterFrom'),
		centerTo: u('uCenterTo'),
		scrollY: u('uScrollY'),
		vel: u('uVel'),
		mouse: u('uMouse'),
		mouseVel: u('uMouseVel'),
		mouseStr: u('uMouseStr'),
		scan: u('uScan'),
		dim: u('uDim'),
		dustStart: u('uDustStart'),
	};

	const small = window.innerWidth < 768;
	const cores = navigator.hardwareConcurrency || 4;
	const count = Math.round((small ? 15000 : 36000) * (cores <= 4 ? 0.6 : 1));
	const dust = Math.round(count * 0.12);
	const total = count + dust;
	const coarse = window.matchMedia('(pointer: coarse)').matches;
	let dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
	let drawCount = count;

	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	// per-particle randoms, shared by every formation
	const rand = new Float32Array(total * 4);
	for (let i = 0; i < rand.length; i++) rand[i] = Math.random();
	const randBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, randBuf);
	gl.bufferData(gl.ARRAY_BUFFER, rand, gl.STATIC_DRAW);
	gl.enableVertexAttribArray(4);
	gl.vertexAttribPointer(4, 4, gl.FLOAT, false, 0, 0);

	type GpuShape = { shape: Shape; pos: WebGLBuffer; col: WebGLBuffer };
	let gpu: (GpuShape | null)[] = [];
	let scatter: GpuShape | null = null;
	let dustData: Dust | null = null;
	let buildOpts: BuildOptions | null = null;
	let idleJob = 0;

	const upload = (shape: Shape): GpuShape => {
		const pos = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, pos);
		gl.bufferData(gl.ARRAY_BUFFER, shape.pos, gl.STATIC_DRAW);
		const col = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, col);
		gl.bufferData(gl.ARRAY_BUFFER, shape.col, gl.STATIC_DRAW);
		return { shape, pos, col };
	};

	const release = () => {
		for (const g of [...gpu, scatter]) {
			if (!g) continue;
			gl.deleteBuffer(g.pos);
			gl.deleteBuffer(g.col);
		}
		gpu = [];
		scatter = null;
	};

	let view: Viewport = { width: 1, height: 1, portrait: false };
	const proj = new Float32Array(16);
	const viewMat = new Float32Array(16);

	/** A formation's buffers, built on first use. */
	const ensure = (k: number): GpuShape => {
		const have = gpu[k];
		if (have) return have;
		const made = upload(buildScene(k, buildOpts!, dustData!));
		gpu[k] = made;
		return made;
	};

	// Build what the first frame needs now, and the rest one formation per idle slot,
	// so no single task blocks the main thread for long.
	const build = () => {
		release();
		cancelIdle(idleJob);
		buildOpts = { count, dust, view, fontFamily: opts.fontFamily };
		dustData = buildDust(buildOpts);
		gpu = SCENES.map(() => null);
		const first =
			sections[Math.min(sections.length - 1, Math.round(targetSection()))]
				?.scene ?? 0;
		ensure(first);
		if (first === 0) scatter = upload(buildScatterShape(buildOpts, dustData));
		lastPair = '';
		const next = () => {
			const k = gpu.findIndex((g) => g === null);
			if (k < 0) return;
			ensure(k);
			idleJob = requestIdle(next);
		};
		idleJob = requestIdle(next);
	};

	let lastW = 0;
	let lastPortrait: boolean | null = null;
	const resize = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		gl.viewport(0, 0, canvas.width, canvas.height);
		const aspect = w / h;
		perspective(proj, FOV, aspect, 0.1, 60);
		const height = 2 * CAM_Z * Math.tan(FOV / 2);
		view = { width: height * aspect, height, portrait: aspect < 0.9 };
		// Rebuild only when the layout really changes, not when a mobile URL bar slides.
		if (lastPortrait !== view.portrait || Math.abs(w - lastW) > 40) {
			lastW = w;
			lastPortrait = view.portrait;
			build();
		}
	};

	let lastPair = '';
	const bindPair = (from: GpuShape, to: GpuShape) => {
		const key = `${gpu.indexOf(from)}:${gpu.indexOf(to)}:${from === scatter}`;
		if (key === lastPair) return;
		lastPair = key;
		gl.bindBuffer(gl.ARRAY_BUFFER, from.pos);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, from.col);
		gl.enableVertexAttribArray(1);
		gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, to.pos);
		gl.enableVertexAttribArray(2);
		gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, to.col);
		gl.enableVertexAttribArray(3);
		gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 0, 0);
	};

	// --- input -------------------------------------------------------------
	const pointer = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0,
		active: 0,
		tActive: 0,
		vx: 0,
		vy: 0,
	};
	const onMove = (e: PointerEvent) => {
		if (e.pointerType === 'touch') return;
		pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
		pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
		pointer.tActive = 1;
	};
	const onLeave = () => {
		pointer.tActive = 0;
	};
	window.addEventListener('pointermove', onMove, { passive: true });
	document.addEventListener('pointerleave', onLeave);

	let sections: { el: HTMLElement; scene: number }[] = [];
	const collect = () => {
		sections = Array.from(
			document.querySelectorAll<HTMLElement>('[data-scene]'),
		)
			.map((el) => ({
				el,
				scene: SCENES.indexOf(el.dataset.scene as SceneName),
			}))
			.filter((s) => s.scene >= 0);
	};
	collect();
	const recollect = window.setTimeout(collect, 1200);

	// continuous position through the section list: 2.4 = 40% of the way from section 2 to 3
	const targetSection = () => {
		const vh = window.innerHeight;
		const mid = vh * 0.5;
		let cur = 0;
		for (let i = 0; i < sections.length; i++) {
			if (sections[i]!.el.getBoundingClientRect().top <= mid) cur = i;
		}
		if (cur >= sections.length - 1) return cur;
		const rect = sections[cur]!.el.getBoundingClientRect();
		const p = mid - rect.top;
		const win = Math.min(rect.height * 0.4, vh * 0.85);
		return cur + smoothstep(rect.height - win, rect.height, p);
	};

	const onResize = () => {
		resize();
		collect();
	};
	window.addEventListener('resize', onResize);
	resize();

	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	let sectionF = targetSection();
	const introFrom = sectionF < 0.05;
	const t0 = performance.now();
	let lastT = t0;
	let lastScroll = window.scrollY;
	let vel = 0;
	let frames = 0;
	let slowFrames = 0;
	let raf = 0;
	let ready = false;
	let lost = false;

	const frame = (now: number) => {
		raf = requestAnimationFrame(frame);
		if (lost || !buildOpts) return;
		const dt = Math.min(0.1, (now - lastT) / 1000);
		lastT = now;
		const time = (now - t0) / 1000;

		// adaptive quality: shed pixels first, then particles
		frames++;
		if (frames > 30 && dt > 0.024) slowFrames++;
		if (frames % 90 === 0) {
			if (slowFrames > 45) {
				if (dpr > 1) {
					dpr = Math.max(1, dpr - 0.25);
					resize();
				} else {
					drawCount = Math.max(
						Math.round(count * 0.35),
						Math.round(drawCount * 0.75),
					);
				}
			}
			slowFrames = 0;
		}

		const target = targetSection();
		sectionF += (target - sectionF) * (1 - Math.exp(-dt * 5));
		if (Math.abs(target - sectionF) < 1e-4) sectionF = target;
		const cur = Math.min(sections.length - 1, Math.floor(sectionF));
		const next = Math.min(sections.length - 1, cur + 1);
		const fromIdx = sections[cur]?.scene ?? 0;
		let toIdx = sections[next]?.scene ?? fromIdx;
		let mix = sectionF - cur;

		let from = ensure(fromIdx);
		let to = ensure(toIdx);
		const intro = introFrom ? Math.min(1, time / 2.8) : 1;
		if (intro < 1 && scatter && cur === 0 && mix < 0.01) {
			from = scatter;
			to = ensure(fromIdx);
			toIdx = fromIdx;
			mix = 1 - Math.pow(1 - intro, 3);
		}
		bindPair(from, to);

		const sy = window.scrollY;
		const dv = Math.abs(sy - lastScroll) / window.innerHeight;
		lastScroll = sy;
		vel += (Math.min(1.2, dv * 12) - vel) * (1 - Math.exp(-dt * 6));

		const k = 1 - Math.exp(-dt * 4);
		const px = pointer.x;
		const py = pointer.y;
		pointer.x += (pointer.tx - pointer.x) * k;
		pointer.y += (pointer.ty - pointer.y) * k;
		// pointer velocity in world units per second, smoothed, for the lens wake
		const kv = 1 - Math.exp(-dt * 6);
		const clampV = (v: number) => Math.max(-4, Math.min(4, v));
		pointer.vx +=
			(clampV(((pointer.x - px) * view.width) / 2 / Math.max(dt, 1e-3)) * 0.12 -
				pointer.vx) *
			kv;
		pointer.vy +=
			(clampV(((pointer.y - py) * view.height) / 2 / Math.max(dt, 1e-3)) *
				0.12 -
				pointer.vy) *
			kv;
		pointer.active += (pointer.tActive - pointer.active) * k;

		const eye: [number, number, number] = [
			pointer.x * 0.45,
			pointer.y * 0.25,
			CAM_Z - vel * 0.6,
		];
		lookAt(viewMat, eye, [pointer.x * 0.1, pointer.y * 0.05, 0]);

		const fromName = SCENES[fromIdx]!;
		const toName = SCENES[toIdx]!;
		const w = from === scatter ? 1 : mix;
		const lerp = (a: number, b: number) => a + (b - a) * w;

		gl.uniformMatrix4fv(U.proj, false, proj);
		gl.uniformMatrix4fv(U.view, false, viewMat);
		gl.uniform1f(U.time, time);
		gl.uniform1f(U.mix, mix);
		gl.uniform1f(U.size, view.portrait ? 3.0 : 2.8);
		gl.uniform1f(U.dpr, dpr);
		gl.uniform1f(U.spinFrom, from.shape.spin);
		gl.uniform1f(U.spinTo, to.shape.spin);
		gl.uniform3fv(U.centerFrom, from.shape.center);
		gl.uniform3fv(U.centerTo, to.shape.center);
		gl.uniform1f(U.scrollY, (sy / window.innerHeight) * 1.6);
		gl.uniform1f(U.vel, vel);
		gl.uniform2f(U.mouseVel, pointer.vx, pointer.vy);
		gl.uniform2f(
			U.mouse,
			(pointer.x * view.width) / 2,
			(pointer.y * view.height) / 2,
		);
		gl.uniform1f(
			U.mouseStr,
			coarse ? 0 : pointer.active * lerp(MOUSE[fromName], MOUSE[toName]),
		);
		gl.uniform1f(
			U.scan,
			(fromName === 'globe' ? 1 - w : 0) + (toName === 'globe' ? w : 0),
		);
		gl.uniform1f(
			U.dim,
			lerp(DIM[fromName], DIM[toName]) *
				(view.portrait
					? lerp(fromName === 'name' ? 1 : 0.55, toName === 'name' ? 1 : 0.55)
					: 1) *
				(0.25 + 0.75 * intro),
		);
		gl.uniform1i(U.dustStart, count);

		gl.clearColor(BG[0]!, BG[1]!, BG[2]!, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.POINTS, 0, drawCount);
		gl.drawArrays(gl.POINTS, count, dust);

		if (!ready) {
			ready = true;
			opts.onReady?.();
		}
	};
	raf = requestAnimationFrame(frame);

	const onLostCtx = (e: Event) => {
		e.preventDefault();
		lost = true;
		opts.onLost?.();
	};
	canvas.addEventListener('webglcontextlost', onLostCtx);

	return {
		destroy: () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
			window.removeEventListener('resize', onResize);
			canvas.removeEventListener('webglcontextlost', onLostCtx);
			window.clearTimeout(recollect);
			cancelIdle(idleJob);
			release();
			gl.deleteBuffer(randBuf);
			gl.deleteVertexArray(vao);
			gl.deleteProgram(program);
		},
	};
};
