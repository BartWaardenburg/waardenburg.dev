'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

/** Inertial scrolling, off for people who prefer reduced motion. */
export function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const lenis = new Lenis({
			duration: 1.15,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			autoRaf: true,
			anchors: { offset: 0 },
		});
		return () => lenis.destroy();
	}, []);
	return null;
}
