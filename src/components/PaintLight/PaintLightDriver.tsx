'use client';

import { useEffect } from 'react';

/** The share of the distance to its leader that each blob closes per frame. */
const FOLLOW = [0.34, 0.15, 0.08];
/** Below this distance, in pixels, a blob is at rest. */
const REST = 0.4;

const lightOf = (el: Element | null): HTMLElement | null =>
	el?.closest('.paint')?.querySelector<HTMLElement>(':scope > .paint-light') ??
	null;

/**
 * Moves the `PaintLight` of the section under the mouse. One listener for the page.
 * Off for touch and for people who prefer reduced motion.
 */
export function PaintLightDriver() {
	useEffect(() => {
		const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
		const still = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (!mouse.matches || still.matches) return;

		let light: HTMLElement | null = null;
		let blobs: HTMLElement[] = [];
		let halves: number[] = [];
		const at = FOLLOW.map(() => ({ x: 0, y: 0 }));
		let px = -1;
		let py = -1;
		let frame = 0;

		const draw = () => {
			frame = 0;
			if (!light) return;
			const rect = light.getBoundingClientRect();
			let lead = { x: px - rect.left, y: py - rect.top };
			let moving = false;
			blobs.forEach((blob, i) => {
				const p = at[i];
				const half = halves[i];
				if (!p || half === undefined) return;
				p.x += (lead.x - p.x) * (FOLLOW[i] ?? 1);
				p.y += (lead.y - p.y) * (FOLLOW[i] ?? 1);
				if (Math.abs(lead.x - p.x) + Math.abs(lead.y - p.y) > REST)
					moving = true;
				blob.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`;
				// the texture stays fixed to the section, only the window on it moves
				blob.style.backgroundPosition = `${half - p.x}px ${half - p.y}px`;
				lead = p;
			});
			if (moving) frame = requestAnimationFrame(draw);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(draw);
		};

		const enter = (next: HTMLElement | null) => {
			if (next === light) return;
			light?.classList.remove('is-on');
			light = next;
			if (!next) return;
			blobs = Array.from(next.children) as HTMLElement[];
			halves = blobs.map((b) => b.offsetWidth / 2);
			const rect = next.getBoundingClientRect();
			for (const p of at) {
				p.x = px - rect.left;
				p.y = py - rect.top;
			}
			next.classList.add('is-on');
		};

		const onMove = (e: PointerEvent) => {
			if (e.pointerType !== 'mouse') return;
			px = e.clientX;
			py = e.clientY;
			enter(lightOf(e.target instanceof Element ? e.target : null));
			schedule();
		};
		// the page can move under a pointer that stays where it is
		const onScroll = () => {
			if (px < 0) return;
			enter(lightOf(document.elementFromPoint(px, py)));
			schedule();
		};
		const onLeave = () => enter(null);

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('scroll', onScroll);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			if (frame) cancelAnimationFrame(frame);
			light?.classList.remove('is-on');
		};
	}, []);
	return null;
}
