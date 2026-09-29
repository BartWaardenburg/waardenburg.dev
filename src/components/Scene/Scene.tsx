'use client';

import { useEffect, useRef } from 'react';

/** The fixed particle field behind every section. Loads the engine after first paint. */
export function Scene() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const root = document.documentElement;
		if (!root.classList.contains('gl') || !ref.current) return;
		const canvas = ref.current;
		let destroyed = false;
		let destroy: (() => void) | undefined;
		const fail = () => {
			root.classList.remove('gl', 'gl-ready');
		};

		const start = async () => {
			try {
				const family =
					getComputedStyle(root).getPropertyValue('--font-display').trim() ||
					'sans-serif';
				await document.fonts.load(`800 100px ${family}`).catch(() => undefined);
				const { createEngine } = await import('@/gl/engine');
				if (destroyed) return;
				const engine = createEngine(canvas, {
					fontFamily: family,
					onReady: () => root.classList.add('gl-ready'),
					onLost: fail,
				});
				if (!engine) fail();
				destroy = engine?.destroy;
			} catch (error) {
				console.error(error);
				fail();
			}
		};

		const hasIdle = typeof window.requestIdleCallback === 'function';
		const idle = hasIdle
			? window.requestIdleCallback(() => void start(), { timeout: 600 })
			: globalThis.setTimeout(() => void start(), 50);

		return () => {
			destroyed = true;
			if (hasIdle) window.cancelIdleCallback(idle as number);
			else globalThis.clearTimeout(idle);
			destroy?.();
		};
	}, []);

	return (
		<div aria-hidden className="pointer-events-none fixed inset-0 z-0">
			<canvas ref={ref} className="gl-canvas absolute inset-0 h-full w-full" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(7_7_10/0.85)_100%)]" />
			<div className="absolute -inset-[20%] opacity-[0.07] mix-blend-overlay grain" />
		</div>
	);
}
