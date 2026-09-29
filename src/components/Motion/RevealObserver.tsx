'use client';

import { useEffect } from 'react';

/** One IntersectionObserver for every [data-reveal] and [data-reveal-words] on the page. */
export function RevealObserver() {
	useEffect(() => {
		const els = document.querySelectorAll<HTMLElement>(
			'[data-reveal], [data-reveal-words]',
		);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					e.target.classList.add('is-in');
					io.unobserve(e.target);
				}
			},
			{ rootMargin: '0px 0px -10% 0px' },
		);
		els.forEach((el) => {
			if (el.dataset.revealWords === 'now') el.classList.add('is-in');
			else io.observe(el);
		});
		return () => io.disconnect();
	}, []);
	return null;
}
