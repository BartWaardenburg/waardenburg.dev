'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import { Reveal, ScrollWords } from '@/components/Motion';
import { manifesto, pillars } from '@/content';

export function Manifesto() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-18%']);

	return (
		<section
			id="about"
			data-scene="galaxy"
			className="relative px-5 py-32 md:px-10 md:py-48"
		>
			<div ref={ref} className="mx-auto max-w-[1600px]">
				<Reveal className="mb-10 flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted uppercase">
					<span className="h-px w-12 bg-accent" />
					<h2>About</h2>
				</Reveal>
				<ScrollWords
					text={manifesto}
					className="max-w-6xl font-sans text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.03em]"
				/>

				<motion.p
					aria-hidden
					style={{ x: x1 }}
					className="text-outline pointer-events-none mt-24 font-sans text-[18vw] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap uppercase select-none"
				>
					Build · Teach · Grow
				</motion.p>

				<ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
					{pillars.map((p, i) => (
						<Reveal
							as="li"
							key={p.title}
							delay={i * 0.12}
							className="group relative bg-bg/80 p-8 backdrop-blur-md md:p-10"
						>
							<span className="font-mono text-xs text-dim">0{i + 1}</span>
							<h3 className="mt-10 font-sans text-4xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-5xl">
								{p.title}
							</h3>
							<p className="mt-4 max-w-sm text-muted">{p.body}</p>
							<span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
