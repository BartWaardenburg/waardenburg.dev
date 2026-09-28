'use client';

import { useEffect, useState } from 'react';

/**
 * True when the pinned, scroll-scrubbed layouts are in use (wide screen, motion allowed).
 * False during SSR and on first render, so the server markup is the simple stacked layout.
 */
export const useDesktop = () => {
	const [desktop, setDesktop] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia(
			'(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
		);
		const update = () => setDesktop(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);
	return desktop;
};
