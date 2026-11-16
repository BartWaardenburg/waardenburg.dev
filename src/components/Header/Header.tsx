'use client';

import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';

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
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
			>
				Skip to content
			</a>
			<motion.header
				className="fixed inset-x-0 top-0 z-50"
				animate={{ y: hidden ? '-110%' : '0%' }}
				transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
			>
				<div
					className={`transition-[background-color,box-shadow] duration-500 ${solid ? 'bg-bg shadow-[0_14px_24px_-20px_rgb(54_30_12/0.55)]' : ''}`}
				>
					<div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 md:px-10">
						<a href="#top" className="group flex items-center gap-3">
							<span className="sr-only">Back to top: </span>
							<span
								aria-hidden
								className="dab grid h-9 w-10 place-items-center text-sm font-extrabold text-cream transition-transform duration-500 ease-out-expo group-hover:scale-110"
							>
								<span className="rotate-[7deg]">BW</span>
							</span>
							<span className="text-base font-bold tracking-tight whitespace-nowrap sm:text-lg">
								Bart Waardenburg
							</span>
						</a>
						<nav aria-label="Primary" className="hidden lg:block">
							<ul className="flex items-center gap-7">
								{nav.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											className="stroke-link bg-[length:0%_0.16em] py-1 font-medium hover:bg-[length:100%_0.16em] hover:text-fg"
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</nav>
						<a href="#contact" className="btn btn-ink btn-sm">
							Let&apos;s talk
						</a>
					</div>
				</div>
			</motion.header>
		</>
	);
}
