'use client';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

import { Magnetic } from '@/components/Motion';
import { nav } from '@/content';

export function Header() {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [solid, setSolid] = useState(false);

	useMotionValueEvent(scrollY, 'change', (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setHidden(y > prev && y > 400);
		setSolid(y > 40);
	});

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
			>
				Skip to content
			</a>
			<motion.header
				className="fixed inset-x-0 top-0 z-50"
				animate={{ y: hidden ? '-110%' : '0%' }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
			>
				<div
					className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 ${solid ? 'bg-bg/60 backdrop-blur-md' : ''}`}
				>
					<a href="#top" className="group flex items-center gap-3">
						<span className="sr-only">Bart Waardenburg, back to top: </span>
						<span className="grid size-9 place-items-center rounded-full border border-line font-mono text-xs font-bold tracking-tight transition-colors group-hover:border-accent group-hover:text-accent">
							BW
						</span>
						<span className="hidden font-mono text-xs tracking-[0.2em] text-muted uppercase sm:inline">
							waardenburg.dev
						</span>
					</a>
					<nav aria-label="Primary" className="hidden lg:block">
						<ul className="flex items-center gap-1">
							{nav.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="rounded-full px-4 py-2 font-mono text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<Magnetic>
						<a
							href="#contact"
							className="relative flex items-center gap-2 overflow-hidden rounded-full bg-fg px-5 py-2.5 font-mono text-xs font-bold tracking-[0.14em] text-bg uppercase transition-colors hover:bg-accent"
						>
							Let&apos;s talk
						</a>
					</Magnetic>
				</div>
			</motion.header>
		</>
	);
}
