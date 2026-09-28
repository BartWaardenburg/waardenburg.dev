// Particle formations. Every formation is the same set of particles in a different
// arrangement, so the engine can morph between any two by interpolating per particle.
// Points are sampled independently at random, which keeps any prefix of the buffer a
// uniform subset (the engine draws fewer points on slow devices).

export type Vec3 = [number, number, number];

export interface Shape {
	pos: Float32Array; // xyz per particle
	col: Float32Array; // rgb + intensity per particle
	center: Vec3; // pivot for the idle spin
	spin: number; // radians per second around Y
	sway?: number; // gentle back-and-forth around Y, in radians
	pairs?: Uint32Array; // neighbouring particles, drawn as lines near the pointer
}

export interface Viewport {
	width: number; // visible world width at z = 0
	height: number; // visible world height at z = 0
	portrait: boolean;
}

export interface BuildOptions {
	count: number;
	dust: number;
	view: Viewport;
	fontFamily: string;
}

export const SCENES = [
	'name',
	'galaxy',
	'graph',
	'globe',
	'constellation',
	'rings',
	'terrain',
	'portal',
] as const;

export type SceneName = (typeof SCENES)[number];

const WHITE: Vec3 = [0.94, 0.92, 0.88];
const ACCENT: Vec3 = [0.66, 0.78, 0.58]; // sage
const EMBER: Vec3 = [0.86, 0.36, 0.44]; // wine
const OCHRE: Vec3 = [0.9, 0.66, 0.36];
const GREY: Vec3 = [0.52, 0.5, 0.48];
const STEEL: Vec3 = [0.55, 0.62, 0.74]; // slate

const mulberry32 = (seed: number) => () => {
	seed |= 0;
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Rand = () => number;

const gauss = (r: Rand) => {
	const u = 1 - r();
	const v = r();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const onSphere = (r: Rand): Vec3 => {
	const z = r() * 2 - 1;
	const t = r() * Math.PI * 2;
	const s = Math.sqrt(1 - z * z);
	return [s * Math.cos(t), z, s * Math.sin(t)];
};

const mix3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
	a[0] + (b[0] - a[0]) * t,
	a[1] + (b[1] - a[1]) * t,
	a[2] + (b[2] - a[2]) * t,
];

class Writer {
	pos: Float32Array;
	col: Float32Array;
	constructor(total: number) {
		this.pos = new Float32Array(total * 3);
		this.col = new Float32Array(total * 4);
	}
	set(i: number, p: Vec3, c: Vec3, a: number) {
		this.pos[i * 3] = p[0];
		this.pos[i * 3 + 1] = p[1];
		this.pos[i * 3 + 2] = p[2];
		this.col[i * 4] = c[0];
		this.col[i * 4 + 1] = c[1];
		this.col[i * 4 + 2] = c[2];
		this.col[i * 4 + 3] = a;
	}
}

// ---------------------------------------------------------------------------
// Text sampling for the hero name

const sampleText = (
	lines: string[],
	fontFamily: string,
): { points: Float32Array; w: number; h: number } => {
	const cw = 1600;
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	if (!ctx) return { points: new Float32Array(0), w: 1, h: 1 };
	const font = (size: number) => `800 ${size}px ${fontFamily}`;
	ctx.font = font(200);
	const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
	const size = Math.floor((200 * cw * 0.98) / widest);
	const lh = size * 0.84;
	const ch = Math.ceil(lh * lines.length + size * 0.2);
	canvas.width = cw;
	canvas.height = ch;
	ctx.font = font(size);
	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'alphabetic';
	lines.forEach((line, i) =>
		ctx.fillText(line, cw * 0.01, size * 0.78 + i * lh),
	);
	const data = ctx.getImageData(0, 0, cw, ch).data;
	const pts: number[] = [];
	for (let y = 0; y < ch; y += 2) {
		for (let x = 0; x < cw; x += 2) {
			if ((data[(y * cw + x) * 4 + 3] ?? 0) > 128) pts.push(x, y);
		}
	}
	return { points: new Float32Array(pts), w: cw, h: ch };
};

// ---------------------------------------------------------------------------
// Formations

const buildName = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const { view } = o;
	const lines = view.portrait
		? ['BART', 'WAARDEN', 'BURG']
		: ['BART', 'WAARDENBURG'];
	const { points, w: cw, h: ch } = sampleText(lines, o.fontFamily);
	const count = points.length / 2;
	const targetW = view.width * (view.portrait ? 0.86 : 0.84);
	let scale = targetW / cw;
	const maxH = view.height * (view.portrait ? 0.34 : 0.5);
	if (ch * scale > maxH) scale = maxH / ch;
	const x0 = -view.width / 2 + view.width * (view.portrait ? 0.07 : 0.08);
	const yTop = view.portrait ? view.height * 0.34 : view.height * 0.32;
	for (let i = 0; i < n; i++) {
		if (count === 0) {
			w.set(i, [gauss(r), gauss(r), 0], WHITE, 0.3);
			continue;
		}
		const k = Math.floor(r() * count);
		const px = (points[k * 2] ?? 0) + r() * 2;
		const py = (points[k * 2 + 1] ?? 0) + r() * 2;
		const accent = r() < 0.08;
		const tint = r();
		w.set(
			i,
			[x0 + px * scale, yTop - py * scale, (r() - 0.5) * 0.12],
			accent ? (tint < 0.5 ? ACCENT : tint < 0.78 ? OCHRE : EMBER) : WHITE,
			accent ? 0.9 : 0.62,
		);
	}
	return { pos: w.pos, col: w.col, center: [0, 0, 0], spin: 0 };
};

const buildGalaxy = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const R = Math.max(o.view.width, o.view.height) * 0.42;
	const tilt = 1.12;
	const ct = Math.cos(tilt);
	const st = Math.sin(tilt);
	const center: Vec3 = [0, -0.2, -2];
	for (let i = 0; i < n; i++) {
		const t = Math.pow(r(), 0.7);
		const rad = R * t;
		const arm = Math.floor(r() * 3);
		const a =
			rad * 1.6 + (arm * Math.PI * 2) / 3 + gauss(r) * 0.32 * (1 - t * 0.4);
		const x = Math.cos(a) * rad;
		const z = Math.sin(a) * rad;
		const y = gauss(r) * 0.1 * (1 - t);
		const c =
			t < 0.18
				? mix3(ACCENT, WHITE, t / 0.18)
				: mix3(WHITE, GREY, (t - 0.18) / 0.82);
		w.set(
			i,
			[center[0] + x, center[1] + y * ct - z * st, center[2] + y * st + z * ct],
			c,
			0.42 - t * 0.2,
		);
	}
	return { pos: w.pos, col: w.col, center, spin: 0.045 };
};

const buildGraph = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const { view } = o;
	const cx = view.portrait ? 0 : view.width * 0.22;
	const cy = view.portrait ? view.height * 0.12 : 0;
	const R = Math.min(
		view.height * 0.34,
		view.width * (view.portrait ? 0.4 : 0.2),
	);
	const center: Vec3 = [cx, cy, 0];
	type Node = { p: Vec3; deg: number; hub: boolean };
	const nodes: Node[] = [];
	const edges: [number, number][] = [];
	const clusters = 7;
	const hubs: number[] = [];
	for (let c = 0; c < clusters; c++) {
		const d = onSphere(r);
		const cc: Vec3 = [
			cx + d[0] * R * 0.62,
			cy + d[1] * R * 0.62,
			d[2] * R * 0.62,
		];
		const start = nodes.length;
		hubs.push(start);
		for (let k = 0; k < 9; k++) {
			const p: Vec3 =
				k === 0
					? cc
					: [
							cc[0] + gauss(r) * R * 0.2,
							cc[1] + gauss(r) * R * 0.2,
							cc[2] + gauss(r) * R * 0.2,
						];
			nodes.push({ p, deg: 0, hub: k === 0 });
			if (k > 0) {
				// connect to the nearest earlier node in the cluster
				let best = start;
				let bd = Infinity;
				for (let j = start; j < nodes.length - 1; j++) {
					const q = nodes[j]!.p;
					const dd =
						(q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 + (q[2] - p[2]) ** 2;
					if (dd < bd) {
						bd = dd;
						best = j;
					}
				}
				edges.push([best, nodes.length - 1]);
			}
		}
	}
	for (let c = 0; c < clusters; c++)
		edges.push([hubs[c]!, hubs[(c + 1) % clusters]!]);
	for (let k = 0; k < 6; k++) {
		const a = Math.floor(r() * nodes.length);
		const b = Math.floor(r() * nodes.length);
		if (a !== b) edges.push([a, b]);
	}
	for (const [a, b] of edges) {
		nodes[a]!.deg++;
		nodes[b]!.deg++;
	}
	const dead: { p: Vec3; toward: Vec3 }[] = [];
	for (let k = 0; k < 12; k++) {
		const d = onSphere(r);
		const dist = R * (1.08 + r() * 0.3);
		dead.push({
			p: [cx + d[0] * dist, cy + d[1] * dist, d[2] * dist],
			toward: [-d[0], -d[1], -d[2]],
		});
	}
	const weights = nodes.map((nd) => nd.deg + 1);
	const totalW = weights.reduce((s, v) => s + v, 0);
	const pickNode = () => {
		let t = r() * totalW;
		for (let j = 0; j < nodes.length; j++) {
			t -= weights[j]!;
			if (t <= 0) return j;
		}
		return nodes.length - 1;
	};
	for (let i = 0; i < n; i++) {
		const roll = r();
		if (roll < 0.34) {
			const nd = nodes[pickNode()]!;
			const s = R * (nd.hub ? 0.055 : 0.03) * (1 + nd.deg * 0.12);
			w.set(
				i,
				[
					nd.p[0] + gauss(r) * s,
					nd.p[1] + gauss(r) * s,
					nd.p[2] + gauss(r) * s,
				],
				nd.hub ? ACCENT : WHITE,
				nd.hub ? 0.85 : 0.6,
			);
		} else if (roll < 0.87) {
			const [a, b] = edges[Math.floor(r() * edges.length)]!;
			const t = r();
			const p = mix3(nodes[a]!.p, nodes[b]!.p, t);
			const j = 0.012;
			const pulse = Math.sin(t * Math.PI * 6) > 0.92;
			w.set(
				i,
				[p[0] + gauss(r) * j, p[1] + gauss(r) * j, p[2] + gauss(r) * j],
				pulse ? ACCENT : WHITE,
				pulse ? 0.6 : 0.34,
			);
		} else {
			const d = dead[Math.floor(r() * dead.length)]!;
			if (r() < 0.6) {
				const s = R * 0.03;
				w.set(
					i,
					[d.p[0] + gauss(r) * s, d.p[1] + gauss(r) * s, d.p[2] + gauss(r) * s],
					EMBER,
					0.6,
				);
			} else {
				// a dashed, dangling import: nothing reaches this module any more
				let t = r();
				t = (Math.floor(t * 7) * 2 + (t * 7 - Math.floor(t * 7))) / 14;
				const len = R * 0.32 * t;
				w.set(
					i,
					[
						d.p[0] + d.toward[0] * len,
						d.p[1] + d.toward[1] * len,
						d.p[2] + d.toward[2] * len,
					],
					GREY,
					0.35,
				);
			}
		}
	}
	return { pos: w.pos, col: w.col, center, spin: 0.08 };
};

const buildGlobe = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const { view } = o;
	const cx = view.portrait ? 0 : view.width * 0.22;
	const cy = view.portrait ? view.height * 0.14 : 0;
	const R = Math.min(
		view.height * 0.28,
		view.width * (view.portrait ? 0.34 : 0.17),
	);
	const center: Vec3 = [cx, cy, 0];
	const orbits = [0.35, -0.6, 1.2].map((tilt, k) => ({
		tilt,
		yaw: k * 1.1,
		rad: R * (1.28 + k * 0.14),
	}));
	const orbitPoint = (k: number, a: number): Vec3 => {
		const ob = orbits[k]!;
		const x = Math.cos(a) * ob.rad;
		const z = Math.sin(a) * ob.rad;
		const y1 = -z * Math.sin(ob.tilt);
		const z1 = z * Math.cos(ob.tilt);
		const cyw = Math.cos(ob.yaw);
		const syw = Math.sin(ob.yaw);
		return [cx + x * cyw + z1 * syw, cy + y1, -x * syw + z1 * cyw];
	};
	for (let i = 0; i < n; i++) {
		const roll = r();
		if (roll < 0.58) {
			const d = onSphere(r);
			const land =
				Math.sin(d[0] * 3.1 + 0.4) * Math.cos(d[1] * 2.3) +
				Math.sin(d[2] * 4.2 + d[1] * 1.7) * 0.6;
			const isLand = land > 0.25;
			w.set(
				i,
				[cx + d[0] * R, cy + d[1] * R, d[2] * R],
				WHITE,
				isLand ? 0.55 : 0.12,
			);
		} else if (roll < 0.72) {
			// meridians and parallels
			const a = r() * Math.PI * 2;
			if (r() < 0.5) {
				const m = (Math.floor(r() * 12) / 12) * Math.PI;
				const x = Math.cos(a) * Math.cos(m);
				const z = Math.cos(a) * Math.sin(m);
				w.set(i, [cx + x * R, cy + Math.sin(a) * R, z * R], STEEL, 0.3);
			} else {
				const lat = ((Math.floor(r() * 7) + 1) / 8) * Math.PI - Math.PI / 2;
				const rr = Math.cos(lat) * R;
				w.set(
					i,
					[cx + Math.cos(a) * rr, cy + Math.sin(lat) * R, Math.sin(a) * rr],
					STEEL,
					0.3,
				);
			}
		} else if (roll < 0.93) {
			const k = Math.floor(r() * 3);
			const p = orbitPoint(k, r() * Math.PI * 2);
			w.set(
				i,
				[p[0] + gauss(r) * 0.008, p[1] + gauss(r) * 0.008, p[2]],
				ACCENT,
				0.42,
			);
		} else {
			// agents riding the orbits
			const k = Math.floor(r() * 3);
			const slot = Math.floor(r() * 3);
			const p = orbitPoint(k, slot * 2.1 + k);
			const s = 0.045;
			w.set(
				i,
				[p[0] + gauss(r) * s, p[1] + gauss(r) * s, p[2] + gauss(r) * s],
				OCHRE,
				0.95,
			);
		}
	}
	return { pos: w.pos, col: w.col, center, spin: 0.14 };
};

const buildConstellation = (
	w: Writer,
	n: number,
	r: Rand,
	o: BuildOptions,
): Shape => {
	const { view } = o;
	const cols = view.portrait ? 3 : 5;
	const rows = view.portrait ? 5 : 3;
	const stars: { p: Vec3; s: number; hot: boolean; tint: Vec3 }[] = [];
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			stars.push({
				p: [
					((x + 0.5) / cols - 0.5) * view.width * 0.95 + gauss(r) * 0.3,
					((y + 0.5) / rows - 0.5) * view.height * 0.9 + gauss(r) * 0.25,
					-1 - r() * 3,
				],
				s: 0.12 + r() * 0.22,
				hot: r() < 0.3,
				tint: [ACCENT, OCHRE, EMBER][Math.floor(r() * 3)]!,
			});
		}
	}
	const links: [number, number][] = [];
	stars.forEach((_, i) => {
		if (i % cols < cols - 1) links.push([i, i + 1]);
		if (i + cols < stars.length && r() < 0.6) links.push([i, i + cols]);
	});
	for (let i = 0; i < n; i++) {
		if (r() < 0.72) {
			const st = stars[Math.floor(r() * stars.length)]!;
			const d = onSphere(r);
			const rad = st.s * Math.pow(r(), 1.8);
			w.set(
				i,
				[st.p[0] + d[0] * rad, st.p[1] + d[1] * rad, st.p[2] + d[2] * rad],
				st.hot ? st.tint : WHITE,
				st.hot ? 0.5 : 0.36,
			);
		} else {
			const [a, b] = links[Math.floor(r() * links.length)]!;
			const t = r();
			w.set(i, mix3(stars[a]!.p, stars[b]!.p, t), GREY, 0.14);
		}
	}
	return { pos: w.pos, col: w.col, center: [0, 0, -2], spin: 0.015 };
};

const buildRings = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const { view } = o;
	const R = Math.max(view.width, view.height) * 0.36;
	const center: Vec3 = [0, -view.height * 0.18, -2];
	const tilt = 0.98;
	const ct = Math.cos(tilt);
	const st = Math.sin(tilt);
	const ringCount = 9;
	for (let i = 0; i < n; i++) {
		const k = Math.floor(Math.pow(r(), 0.8) * ringCount);
		const a = r() * Math.PI * 2;
		const base = R * (0.18 + (k / ringCount) * 1.05);
		const rad =
			base * (1 + 0.07 * Math.sin(a * (4 + k) + k * 1.3)) + gauss(r) * 0.012;
		const x = Math.cos(a) * rad;
		const z = Math.sin(a) * rad;
		const y = Math.sin(a * 3 + k) * 0.04 * k;
		const c =
			k < 2
				? mix3(EMBER, OCHRE, k)
				: mix3(OCHRE, WHITE, Math.min(1, (k - 2) / 3));
		w.set(
			i,
			[center[0] + x, center[1] + y * ct - z * st, center[2] + y * st + z * ct],
			c,
			0.45 - k * 0.025,
		);
	}
	return { pos: w.pos, col: w.col, center, spin: 0.06 };
};

const fbm = (x: number, z: number) => {
	let v = 0;
	let amp = 0.55;
	let f = 0.55;
	for (let o = 0; o < 4; o++) {
		v +=
			amp *
			Math.sin(x * f + Math.sin(z * f * 1.3 + o) * 1.7) *
			Math.cos(z * f * 0.9 - o * 0.7);
		f *= 2.02;
		amp *= 0.48;
	}
	return v;
};

const buildTerrain = (
	w: Writer,
	n: number,
	r: Rand,
	o: BuildOptions,
): Shape => {
	const { view } = o;
	const W = view.width * 1.25;
	const zNear = 3.5;
	const zFar = -7;
	const y0 = -view.height * 0.33;
	const trailX = (z: number) =>
		Math.sin(z * 0.55) * W * 0.18 + Math.cos(z * 1.3) * 0.25;
	for (let i = 0; i < n; i++) {
		if (r() < 0.12) {
			// the trail: a single line through the landscape
			const z = zFar + r() * (zNear - zFar);
			const x = trailX(z) + gauss(r) * 0.018;
			w.set(i, [x, y0 + fbm(x, z) * 0.95 + 0.02, z], OCHRE, 0.9);
			continue;
		}
		const x = (r() - 0.5) * W;
		const z = zFar + Math.pow(r(), 0.8) * (zNear - zFar);
		const h = fbm(x, z);
		const contour = Math.abs(((h * 7 + 10) % 1) - 0.5) > 0.44;
		const depth = (z - zFar) / (zNear - zFar);
		w.set(
			i,
			[x, y0 + h * 0.95, z],
			contour ? WHITE : STEEL,
			(contour ? 0.5 : 0.14) * (0.35 + depth * 0.65),
		);
	}
	return { pos: w.pos, col: w.col, center: [0, 0, 0], spin: 0 };
};

const buildPortal = (w: Writer, n: number, r: Rand, o: BuildOptions): Shape => {
	const { view } = o;
	const R = Math.min(view.height * 0.36, view.width * 0.4);
	const center: Vec3 = [0, 0, -1];
	for (let i = 0; i < n; i++) {
		const a = r() * Math.PI * 2;
		if (r() < 0.8) {
			// a twisted torus
			const b = r() * Math.PI * 2;
			const tube = R * 0.13 * Math.pow(r(), 0.5);
			const twist = b + a * 3;
			const rr = R + Math.cos(twist) * tube;
			const inner = Math.cos(twist) < 0;
			w.set(
				i,
				[
					center[0] + Math.cos(a) * rr,
					center[1] + Math.sin(a) * rr,
					center[2] + Math.sin(twist) * tube,
				],
				inner ? EMBER : WHITE,
				inner ? 0.55 : 0.32,
			);
		} else {
			// particles spiralling into the centre
			const t = Math.pow(r(), 1.6);
			const rr = R * t;
			const aa = a + (1 - t) * 4;
			w.set(
				i,
				[
					center[0] + Math.cos(aa) * rr,
					center[1] + Math.sin(aa) * rr,
					center[2] - (1 - t) * 1.5,
				],
				t < 0.5 ? OCHRE : ACCENT,
				0.3 * t + 0.1,
			);
		}
	}
	return { pos: w.pos, col: w.col, center, spin: 0.1 };
};

const BUILDERS: Record<
	SceneName,
	(w: Writer, n: number, r: Rand, o: BuildOptions) => Shape
> = {
	name: buildName,
	galaxy: buildGalaxy,
	graph: buildGraph,
	globe: buildGlobe,
	constellation: buildConstellation,
	rings: buildRings,
	terrain: buildTerrain,
	portal: buildPortal,
};

/** Particles thrown through the whole volume, the state before the intro. */
const buildScatter = (
	w: Writer,
	n: number,
	r: Rand,
	o: BuildOptions,
): Shape => {
	for (let i = 0; i < n; i++) {
		w.set(
			i,
			[
				(r() - 0.5) * o.view.width * 2.2,
				(r() - 0.5) * o.view.height * 2.2,
				-8 + r() * 14,
			],
			r() < 0.1 ? ACCENT : WHITE,
			0.25,
		);
	}
	return { pos: w.pos, col: w.col, center: [0, 0, 0], spin: 0 };
};

export interface Dust {
	pos: Float32Array;
	col: Float32Array;
}

/** Ambient dust, identical in every formation so it never morphs. */
export const buildDust = (o: BuildOptions): Dust => {
	const dr = mulberry32(7);
	const pos = new Float32Array(o.dust * 3);
	const col = new Float32Array(o.dust * 4);
	for (let i = 0; i < o.dust; i++) {
		pos[i * 3] = (dr() - 0.5) * o.view.width * 2.4;
		pos[i * 3 + 1] = (dr() - 0.5) * 12;
		pos[i * 3 + 2] = -9 + dr() * 14;
		const c = dr() < 0.08 ? ACCENT : WHITE;
		col[i * 4] = c[0];
		col[i * 4 + 1] = c[1];
		col[i * 4 + 2] = c[2];
		col[i * 4 + 3] = 0.08 + dr() * 0.2;
	}
	return { pos, col };
};

const withDust = (s: Shape, dust: Dust, count: number): Shape => {
	s.pos.set(dust.pos, count * 3);
	s.col.set(dust.col, count * 4);
	return s;
};

/** One formation by index into SCENES. */
/**
 * Pairs of nearby particles among the first `limit` (a uniform random subset), found
 * with a spatial hash. The engine draws them as lines where the pointer is.
 */
const neighbourPairs = (pos: Float32Array, limit: number): Uint32Array => {
	let minX = Infinity;
	let minY = Infinity;
	let minZ = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	let maxZ = -Infinity;
	for (let i = 0; i < limit; i++) {
		const x = pos[i * 3]!;
		const y = pos[i * 3 + 1]!;
		const z = pos[i * 3 + 2]!;
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
		minZ = Math.min(minZ, z);
		maxZ = Math.max(maxZ, z);
	}
	const vol =
		Math.max(maxX - minX, 0.2) *
		Math.max(maxY - minY, 0.2) *
		Math.max(maxZ - minZ, 0.2);
	const h = Math.max(0.03, Math.cbrt(vol / limit) * 1.3);
	const maxD2 = (h * 1.6) ** 2;
	const cell = (v: number, m: number) => Math.floor((v - m) / h);
	const grid = new Map<string, number[]>();
	for (let i = 0; i < limit; i++) {
		const key = `${cell(pos[i * 3]!, minX)},${cell(pos[i * 3 + 1]!, minY)},${cell(pos[i * 3 + 2]!, minZ)}`;
		const list = grid.get(key);
		if (list) list.push(i);
		else grid.set(key, [i]);
	}
	const out: number[] = [];
	const seen = new Set<number>();
	for (let i = 0; i < limit; i++) {
		const cx = cell(pos[i * 3]!, minX);
		const cy = cell(pos[i * 3 + 1]!, minY);
		const cz = cell(pos[i * 3 + 2]!, minZ);
		let b1 = -1;
		let b2 = -1;
		let d1 = maxD2;
		let d2 = maxD2;
		for (let dx = -1; dx <= 1; dx++)
			for (let dy = -1; dy <= 1; dy++)
				for (let dz = -1; dz <= 1; dz++) {
					const list = grid.get(`${cx + dx},${cy + dy},${cz + dz}`);
					if (!list) continue;
					for (const j of list) {
						if (j === i) continue;
						const d =
							(pos[i * 3]! - pos[j * 3]!) ** 2 +
							(pos[i * 3 + 1]! - pos[j * 3 + 1]!) ** 2 +
							(pos[i * 3 + 2]! - pos[j * 3 + 2]!) ** 2;
						if (d < d1) {
							d2 = d1;
							b2 = b1;
							d1 = d;
							b1 = j;
						} else if (d < d2) {
							d2 = d;
							b2 = j;
						}
					}
				}
		for (const j of [b1, b2]) {
			if (j < 0) continue;
			const key = i < j ? i * limit + j : j * limit + i;
			if (seen.has(key)) continue;
			seen.add(key);
			out.push(i, j);
		}
	}
	return new Uint32Array(out);
};

export const buildScene = (k: number, o: BuildOptions, dust: Dust): Shape => {
	const shape = BUILDERS[SCENES[k]!](
		new Writer(o.count + o.dust),
		o.count,
		mulberry32(101 + k * 17),
		o,
	);
	shape.pairs = neighbourPairs(shape.pos, Math.min(o.count, 900));
	return withDust(shape, dust, o.count);
};

export const buildScatterShape = (o: BuildOptions, dust: Dust): Shape =>
	withDust(
		buildScatter(new Writer(o.count + o.dust), o.count, mulberry32(3), o),
		dust,
		o.count,
	);

// ---------------------------------------------------------------------------
// Logos: any image becomes a formation, in its own brand colours

export interface LogoBox {
	width: number; // world units available
	height: number;
	center: Vec3;
}

/** Lift dark brand colours so they still read as light on a near-black canvas. */
const liftColour = (r: number, g: number, b: number): Vec3 => {
	const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	if (lum >= 0.42) return [r, g, b];
	const t = (0.42 - lum) / 0.42;
	return [
		r + (0.9 - r) * t * 0.75,
		g + (0.88 - g) * t * 0.75,
		b + (0.84 - b) * t * 0.75,
	];
};

export const buildLogo = (
	img: HTMLImageElement,
	o: BuildOptions,
	dust: Dust,
	box: LogoBox,
	seed: number,
): Shape | null => {
	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;
	if (!iw || !ih) return null;
	const cw = 900;
	const ch = Math.max(1, Math.round((cw * ih) / iw));
	const canvas = document.createElement('canvas');
	canvas.width = cw;
	canvas.height = ch;
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	if (!ctx) return null;
	ctx.drawImage(img, 0, 0, cw, ch);
	const data = ctx.getImageData(0, 0, cw, ch).data;
	const filled: number[] = [];
	const edges: number[] = [];
	const alphaAt = (x: number, y: number) =>
		x < 0 || y < 0 || x >= cw || y >= ch
			? 0
			: (data[(y * cw + x) * 4 + 3] ?? 0);
	for (let y = 0; y < ch; y += 2) {
		for (let x = 0; x < cw; x += 2) {
			if (alphaAt(x, y) < 128) continue;
			filled.push(x, y);
			if (
				alphaAt(x - 3, y) < 128 ||
				alphaAt(x + 3, y) < 128 ||
				alphaAt(x, y - 3) < 128 ||
				alphaAt(x, y + 3) < 128
			)
				edges.push(x, y);
		}
	}
	const nFilled = filled.length / 2;
	if (nFilled === 0) return null;
	const nEdges = edges.length / 2;
	const scale = Math.min(box.width / cw, box.height / ch);
	const r = mulberry32(seed);
	const w = new Writer(o.count + o.dust);
	for (let i = 0; i < o.count; i++) {
		const halo = nEdges > 0 && r() < 0.14;
		const list = halo ? edges : filled;
		const k = Math.floor(r() * (list.length / 2));
		const px = list[k * 2]! + r() * 2;
		const py = list[k * 2 + 1]! + r() * 2;
		const pi =
			(Math.min(ch - 1, Math.floor(py)) * cw +
				Math.min(cw - 1, Math.floor(px))) *
			4;
		const c = liftColour(
			(data[pi] ?? 255) / 255,
			(data[pi + 1] ?? 255) / 255,
			(data[pi + 2] ?? 255) / 255,
		);
		const spread = halo ? 0.06 + r() * 0.1 : 0;
		const a = r() * Math.PI * 2;
		w.set(
			i,
			[
				box.center[0] + (px - cw / 2) * scale + Math.cos(a) * spread,
				box.center[1] - (py - ch / 2) * scale + Math.sin(a) * spread,
				box.center[2] + (r() - 0.5) * 0.18 + (halo ? (r() - 0.5) * 0.3 : 0),
			],
			c,
			halo ? 0.28 : 0.7,
		);
	}
	const shape: Shape = {
		pos: w.pos,
		col: w.col,
		center: box.center,
		spin: 0,
		sway: 0.22,
	};
	shape.pairs = neighbourPairs(shape.pos, Math.min(o.count, 900));
	return withDust(shape, dust, o.count);
};
