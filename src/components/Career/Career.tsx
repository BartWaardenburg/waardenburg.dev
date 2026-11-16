'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

import { Counter, Reveal, SplitWords } from '@/components/Motion';
import { PaintedLogo } from '@/components/PaintedLogo';
import { career } from '@/content';
import { PaintLight } from '@/components/PaintLight';
import signpost from '@/assets/signpost.webp';
import { PaintedProp } from '@/components/PaintedProp';

const FIRST_YEAR = 2013;

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
			aria-labelledby="career-title"
			className="paint brushed wash-forest px-5 pt-28 pb-20 md:px-10 md:pt-40 md:pb-28"
		>
			<PaintLight />
			<div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
				<div className="lg:sticky lg:top-28 lg:self-start">
					<h2
						id="career-title"
						className="display text-[clamp(3.25rem,8vw,7rem)] leading-[0.86]"
					>
						<SplitWords
							text="The long *trail* here."
							accentClassName="ink-dusk"
						/>
					</h2>
					<div className="mt-10 flex items-end gap-4">
						<span className="display text-[clamp(5.5rem,12vw,10.5rem)] leading-[0.8] text-accent">
							<Counter value={new Date().getFullYear() - FIRST_YEAR} />
						</span>
						<span className="mb-1 font-semibold">
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
					<PaintedProp
						image={signpost}
						sizes="(min-width: 1024px) 220px, 150px"
						className="mt-10 h-52 w-auto lg:h-72"
					/>
				</div>

				<ol ref={list} className="relative">
					<span
						aria-hidden
						className="absolute top-0 bottom-0 left-[7px] w-0.5 rounded-full bg-line"
					/>
					<motion.span
						aria-hidden
						style={{ scaleY }}
						className="absolute top-0 bottom-0 left-[7px] w-0.5 origin-top rounded-full bg-accent"
					/>
					{career.map((r) => (
						<Reveal
							as="li"
							key={`${r.org}-${r.years}`}
							className="relative pb-14 pl-12 last:pb-0"
						>
							<span
								aria-hidden
								className="absolute top-[0.45rem] left-0 h-0.5 w-4 rounded-full bg-accent"
							/>
							<p className="font-mono text-xs text-accent">{r.years}</p>
							<PaintedLogo logo={r.logo} className="mt-5 max-w-full" />
							<h3 className="display mt-5 text-4xl md:text-5xl">{r.org}</h3>
							<p className="mt-2 text-xl leading-tight font-semibold tracking-tight">
								{r.role}
							</p>
							<p className="mt-4 max-w-2xl text-muted">{r.body}</p>
							<ul className="mt-4 flex flex-wrap gap-2">
								{r.tags.map((t) => (
									<li key={t} className="tag">
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
