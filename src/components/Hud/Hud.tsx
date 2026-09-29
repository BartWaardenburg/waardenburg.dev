'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

const SECTIONS = [
	{ id: 'top', label: 'Intro' },
	{ id: 'about', label: 'About' },
	{ id: 'fallow', label: 'Fallow' },
	{ id: 'isagentready', label: 'IsAgentReady' },
	{ id: 'open-source', label: 'Open source' },
	{ id: 'talks', label: 'Talks' },
	{ id: 'career', label: 'Career' },
	{ id: 'clients', label: 'Built for' },
	{ id: 'contact', label: 'Contact' },
];

const clock = () =>
	new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Europe/Amsterdam',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	}).format(new Date());

/** Scroll progress along the top, and a quiet section index and local clock at the bottom. */
export function Hud() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
	const [active, setActive] = useState(0);
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		const els = SECTIONS.map((s) => document.getElementById(s.id));
		const onScroll = () => {
			const mid = window.innerHeight * 0.5;
			let idx = 0;
			els.forEach((el, i) => {
				if (el && el.getBoundingClientRect().top <= mid) idx = i;
			});
			setActive(idx);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		setTime(clock());
		const t = window.setInterval(() => setTime(clock()), 1000);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.clearInterval(t);
		};
	}, []);

	const current = SECTIONS[active]!;
	// the contact section has its own footer
	const hideBottom = current.id === 'contact' ? 'opacity-0' : 'opacity-100';

	return (
		<div aria-hidden className="pointer-events-none">
			<motion.div
				className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
				style={{ scaleX }}
			/>
			<div
				className={`fixed right-5 bottom-5 z-40 hidden transition-opacity duration-500 ${hideBottom} font-mono text-[11px] tracking-[0.18em] text-muted uppercase md:right-10 md:block`}
			>
				The Hague{' '}
				<span className="tabular-nums text-fg">{time ?? '--:--:--'}</span>
			</div>
		</div>
	);
}
