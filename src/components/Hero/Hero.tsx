'use client';

import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'motion/react';
import { useRef } from 'react';

import { SplitWords } from '@/components/Motion';
import { hero, site } from '@/content';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
	const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
	const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

	return (
		<section
			id="top"
			ref={ref}
			data-scene="name"
			className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pt-28 pb-10 md:px-10 md:pb-14"
		>
			<motion.h1
				style={{ y: nameY }}
				className="hero-name pointer-events-none absolute top-[16vh] left-[7vw] w-[86vw] font-sans text-[16vw] leading-[0.84] font-extrabold tracking-[-0.045em] uppercase md:top-[18vh] md:left-[8vw] md:w-[84vw] md:text-[12.4vw]"
			>
				Bart
				<br />
				Waardenburg
			</motion.h1>

			<motion.div
				style={reduce ? {} : { y, opacity }}
				className="relative z-10 mx-auto w-full max-w-[1600px]"
			>
				<motion.ul
					className="mb-6 flex flex-wrap gap-2"
					initial={reduce ? false : 'hidden'}
					animate="show"
					variants={{
						show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
					}}
				>
					{hero.eyebrow.map((item) => (
						<motion.li
							key={item}
							variants={{
								hidden: { opacity: 0, y: 12 },
								show: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.8, ease: EASE }}
							className="rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-muted uppercase backdrop-blur-sm"
						>
							{item}
						</motion.li>
					))}
				</motion.ul>

				<div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
					<p className="max-w-4xl font-sans text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
						<SplitWords
							text="I build *developer tools,* and I teach people how to use them."
							delay={0.25}
							stagger={0.05}
							immediate
						/>
					</p>
					<motion.div
						initial={reduce ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, delay: 1.7, ease: EASE }}
						className="max-w-md lg:justify-self-end"
					>
						<p className="text-base leading-relaxed text-muted md:text-lg">
							{hero.lede}
						</p>
						<p className="mt-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-fg uppercase">
							<span className="pulse-dot size-2 rounded-full bg-accent" />
							{site.availability}
						</p>
					</motion.div>
				</div>

				<div className="mt-12 flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
					<span className="relative block h-10 w-px overflow-hidden bg-line">
						<span className="scroll-cue absolute inset-0 bg-accent" />
					</span>
					Scroll to explore
				</div>
			</motion.div>
		</section>
	);
}
