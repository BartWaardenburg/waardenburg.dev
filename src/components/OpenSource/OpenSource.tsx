'use client';

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from 'motion/react';
import type { PointerEvent } from 'react';

import { Reveal, SplitWords } from '@/components/Motion';
import { contributions, openSource, type OssProject } from '@/content';

function Card({ project, i }: { project: OssProject; i: number }) {
	const rx = useMotionValue(0);
	const ry = useMotionValue(0);
	const mx = useMotionValue(50);
	const my = useMotionValue(50);
	const srx = useSpring(rx, { stiffness: 150, damping: 18 });
	const sry = useSpring(ry, { stiffness: 150, damping: 18 });
	const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgb(169 187 157 / 0.16), transparent 60%)`;

	const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
		if (e.pointerType !== 'mouse') return;
		const r = e.currentTarget.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		mx.set(px * 100);
		my.set(py * 100);
		ry.set((px - 0.5) * 10);
		rx.set(-(py - 0.5) * 10);
	};
	const onLeave = () => {
		rx.set(0);
		ry.set(0);
	};

	return (
		<Reveal
			delay={(i % 3) * 0.1}
			y={60}
			className={`[perspective:1200px] ${project.wide ? 'md:col-span-2' : ''}`}
		>
			<motion.a
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				onPointerMove={onMove}
				onPointerLeave={onLeave}
				style={{ rotateX: srx, rotateY: sry }}
				className="glass group relative flex h-full min-h-[320px] flex-col overflow-hidden p-7 transition-colors duration-500 [transform-style:preserve-3d] md:p-8"
			>
				<motion.span
					aria-hidden
					style={{ background: glow }}
					className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				/>
				<div className="flex items-center justify-between font-mono text-[11px] tracking-[0.14em] uppercase">
					<span className="text-accent">{project.kind}</span>
					<span className="text-dim transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg">
						↗
					</span>
				</div>
				<h3 className="mt-auto pt-16 font-sans text-3xl font-bold tracking-tight [transform:translateZ(40px)]">
					{project.name}
				</h3>
				<p className="mt-3 text-muted [transform:translateZ(20px)]">
					{project.body}
				</p>
				<ul className="mt-6 flex flex-wrap gap-2">
					{project.tags.map((t) => (
						<li
							key={t}
							className="border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
						>
							{t}
						</li>
					))}
				</ul>
			</motion.a>
		</Reveal>
	);
}

export function OpenSource() {
	return (
		<section
			id="open-source"
			data-scene="constellation"
			aria-labelledby="oss-title"
			className="relative px-5 py-32 md:px-10 md:py-44"
		>
			<div className="mx-auto max-w-[1600px]">
				<div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
					<div>
						<h2
							id="oss-title"
							className="font-sans text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
						>
							<SplitWords
								text="Open source, *shipped.*"
								italicClassName="text-ochre"
							/>
						</h2>
					</div>
					<Reveal delay={0.2}>
						<p className="max-w-lg text-lg text-muted lg:justify-self-end">
							Tools for developers, and more and more for their agents: Rust
							SDKs on the Oxc stack, MCP servers that turn real APIs into safe
							tools, and skills that teach agents to use them. All public, all
							MIT licensed.
						</p>
					</Reveal>
				</div>
				<div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{openSource.map((p, i) => (
						<Card key={p.name} project={p} i={i} />
					))}
				</div>

				<div className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
					<Reveal>
						<h3 className="font-sans text-3xl font-bold tracking-tight md:text-4xl">
							Contributed{' '}
							<span className="font-serif font-normal text-sage italic">
								upstream
							</span>
						</h3>
						<p className="mt-4 max-w-sm text-muted">
							Merged pull requests to projects I use every day, from Preact
							support in Storybook to a coverage hook in Vitest.
						</p>
					</Reveal>
					<ul className="border-t border-line">
						{contributions.map((c, i) => (
							<Reveal as="li" key={c.url} delay={i * 0.05} y={16}>
								<a
									href={c.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-5 transition-colors hover:bg-fg/[0.03] md:grid-cols-[14rem_1fr_auto]"
								>
									<span className="font-sans font-semibold transition-colors group-hover:text-sage">
										{c.project}
									</span>
									<span className="col-span-2 row-start-2 text-sm text-muted md:col-span-1 md:row-start-auto md:text-base">
										{c.what}
									</span>
									<span className="col-start-2 row-start-1 flex items-center gap-3 font-mono text-[11px] text-dim md:col-start-auto md:row-start-auto">
										{c.year}
										<span className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg">
											↗
										</span>
									</span>
								</a>
							</Reveal>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
