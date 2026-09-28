'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

import { Counter, Reveal, SplitWords } from '@/components/Motion';
import { career } from '@/content';

export function Career() {
	const list = useRef<HTMLOListElement>(null);
	const { scrollYProgress } = useScroll({
		target: list,
		offset: ['start 0.6', 'end 0.6'],
	});
	const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

	return (
		<section
			id="career"
			data-scene="terrain"
			aria-labelledby="career-title"
			className="relative px-5 py-32 md:px-10 md:py-44"
		>
			<div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<h2
						id="career-title"
						className="font-sans text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
					>
						<SplitWords text="The long *trail* here." />
					</h2>
					<div className="mt-10 flex items-end gap-4">
						<span className="font-sans text-[clamp(5rem,12vw,11rem)] leading-none font-extrabold tracking-[-0.06em] text-accent">
							<Counter value={new Date().getFullYear() - 2013} />
						</span>
						<span className="mb-4 font-mono text-xs tracking-[0.16em] text-muted uppercase">
							years
							<br />
							shipping for the web
						</span>
					</div>
					<p className="mt-6 max-w-md text-muted">
						From front-end consultant to tech lead to chapter lead for 35
						developers, across ANWB, the Dutch government and agencies. Design
						systems, accessibility, and architecture for sites with hundreds of
						thousands of daily users.
					</p>
				</div>

				<ol ref={list} className="relative">
					<span
						aria-hidden
						className="absolute top-0 bottom-0 left-[7px] w-px bg-line"
					/>
					<motion.span
						aria-hidden
						style={{ scaleY }}
						className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-accent shadow-[0_0_12px_rgb(169_187_157/0.8)]"
					/>
					{career.map((r) => (
						<Reveal
							as="li"
							key={`${r.org}-${r.years}`}
							className="relative pb-14 pl-12 last:pb-0"
						>
							<span className="absolute top-2 left-0 size-[15px] rotate-45 border border-accent bg-bg" />
							<p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
								{r.years}
							</p>
							<h3 className="mt-2 font-sans text-3xl font-bold tracking-tight md:text-4xl">
								{r.org}
							</h3>
							<p className="mt-1 font-serif text-xl text-fg/80 italic">
								{r.role}
							</p>
							<p className="mt-4 max-w-2xl text-muted">{r.body}</p>
							<ul className="mt-4 flex flex-wrap gap-2">
								{r.tags.map((t) => (
									<li
										key={t}
										className="border border-line bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-muted"
									>
										{t}
									</li>
								))}
							</ul>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
