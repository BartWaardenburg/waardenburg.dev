'use client';

import {
	motion,
	useScroll,
	useTransform,
	type MotionStyle,
	type MotionValue,
} from 'motion/react';
import { useRef, type ReactNode } from 'react';

import { Marquee } from '@/components/Marquee';
import { Counter, Magnetic, Reveal, SplitWords } from '@/components/Motion';
import { Terminal } from '@/components/Terminal';
import { fallow } from '@/content';
import type { Stats } from '@/lib/stats';
import { useDesktop } from '@/lib/useDesktop';

const CHAPTERS = 3;
const TINTS = ['bg-sage', 'bg-wine', 'bg-ochre', 'bg-slate'];

/** Opacity and lift for chapter i, one chapter visible at a time. */
const useChapter = (p: MotionValue<number>, i: number) => {
	const a = i / CHAPTERS;
	const b = (i + 1) / CHAPTERS;
	const f = 0.045;
	const first = i === 0;
	const last = i === CHAPTERS - 1;
	const input = first
		? [0, b - f, b]
		: last
			? [a, a + f, 1]
			: [a, a + f, b - f, b];
	const opacity = useTransform(
		p,
		input,
		first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
	);
	const y = useTransform(
		p,
		input,
		first
			? ['0px', '0px', '-30px']
			: last
				? ['30px', '0px', '0px']
				: ['30px', '0px', '0px', '-30px'],
	);
	return { '--o': opacity, '--y': y } as unknown as MotionStyle;
};

function Chapter({
	p,
	i,
	title,
	body,
	visual,
}: {
	p: MotionValue<number>;
	i: number;
	title: string;
	body: string;
	visual: ReactNode;
}) {
	const style = useChapter(p, i);
	return (
		<motion.div
			style={style}
			className="grid gap-10 py-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16 lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:py-0 lg:motion-safe:opacity-(--o) lg:motion-safe:[transform:translateY(var(--y))]"
		>
			<div className="max-w-xl">
				<h3 className="font-sans text-3xl font-bold tracking-tight md:text-5xl">
					{title}
				</h3>
				<p className="mt-5 text-lg leading-relaxed text-muted">{body}</p>
			</div>
			<div className="lg:justify-self-end lg:self-end">{visual}</div>
		</motion.div>
	);
}

function Legend() {
	const rows = [
		{ dot: 'bg-sage', label: 'Entry points and hubs' },
		{ dot: 'bg-fg', label: 'Reachable modules' },
		{ dot: 'bg-wine', label: 'Unreachable, safe to delete' },
		{
			dot: 'border border-dashed border-dim bg-transparent',
			label: 'Dangling import',
		},
	];
	return (
		<div className="glass w-full max-w-sm p-6">
			<p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
				What you are looking at
			</p>
			<ul className="mt-5 space-y-3">
				{rows.map((r) => (
					<li key={r.label} className="flex items-center gap-3 text-sm">
						<span className={`size-2.5 ${r.dot}`} />
						{r.label}
					</li>
				))}
			</ul>
			<p className="mt-6 border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-muted">
				The graph behind this panel is live WebGL, drawn in the same colours.
			</p>
		</div>
	);
}

function Find({
	p,
	i,
	desktop,
	name,
	body,
}: {
	p: MotionValue<number>;
	i: number;
	desktop: boolean;
	name: string;
	body: string;
}) {
	const start = 0.37 + i * 0.03;
	const draw = useTransform(p, [start, start + 0.08], [0, 1]);
	const opacity = useTransform(p, [start, start + 0.05], [0.25, 1]);
	return (
		<motion.li style={desktop ? { opacity } : {}} className="relative py-3.5">
			<div className="flex items-baseline gap-4">
				<span
					className={`size-2 shrink-0 translate-y-[-1px] ${TINTS[i % 4]}`}
				/>
				<span className="w-32 shrink-0 font-sans font-semibold">{name}</span>
				<span className="text-sm text-muted">{body}</span>
			</div>
			<motion.span
				aria-hidden
				style={desktop ? { scaleX: draw } : {}}
				className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
			/>
		</motion.li>
	);
}

function Finds({ p, desktop }: { p: MotionValue<number>; desktop: boolean }) {
	return (
		<div className="glass w-full max-w-xl p-6 md:p-8">
			<p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
				What one run reports
			</p>
			<ul className="mt-3">
				{fallow.finds.map((f, i) => (
					<Find key={f.name} p={p} i={i} desktop={desktop} {...f} />
				))}
			</ul>
		</div>
	);
}

function Integrations() {
	return (
		<ul className="flex max-w-xl flex-wrap gap-2 lg:justify-end">
			{fallow.integrations.map((item) => (
				<li
					key={item}
					className="border border-line bg-bg/60 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-sm"
				>
					{item}
				</li>
			))}
		</ul>
	);
}

export function Fallow({ stats }: { stats: Stats }) {
	const ref = useRef<HTMLDivElement>(null);
	const desktop = useDesktop();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end'],
	});
	const typing = useTransform(scrollYProgress, [0.7, 0.96], [0, 1]);
	const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	return (
		<section
			id="fallow"
			data-scene="graph"
			aria-labelledby="fallow-title"
			className="relative"
		>
			<div ref={ref} className="relative lg:motion-safe:h-[420vh]">
				<div className="px-5 py-24 md:px-10 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:flex-col lg:motion-safe:pt-28 lg:motion-safe:pb-16">
					<div className="mx-auto w-full max-w-[1600px]">
						<h2
							id="fallow-title"
							className="font-sans text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.85] font-extrabold tracking-[-0.05em]"
						>
							<SplitWords text={fallow.name} />
						</h2>
						<p className="mt-4 max-w-2xl font-serif text-2xl text-fg/90 italic md:text-3xl">
							{fallow.tagline}
						</p>
					</div>

					<div className="relative mx-auto w-full max-w-[1600px] lg:motion-safe:mt-8 lg:motion-safe:flex-1">
						<Chapter
							p={scrollYProgress}
							i={0}
							title={fallow.steps[0]!.title}
							body={fallow.steps[0]!.body}
							visual={<Legend />}
						/>
						<Chapter
							p={scrollYProgress}
							i={1}
							title={fallow.steps[1]!.title}
							body={fallow.steps[1]!.body}
							visual={<Finds p={scrollYProgress} desktop={desktop} />}
						/>
						<Chapter
							p={scrollYProgress}
							i={2}
							title={fallow.steps[2]!.title}
							body={fallow.steps[2]!.body}
							visual={
								<div className="flex w-full max-w-xl flex-col gap-4 lg:items-end">
									<Terminal
										lines={fallow.terminal}
										progress={desktop ? typing : undefined}
										className="w-full"
									/>
									<Integrations />
								</div>
							}
						/>
					</div>

					<div
						aria-hidden
						className="mx-auto mt-10 hidden h-px w-full max-w-[1600px] bg-line lg:motion-safe:block"
					>
						<motion.div className="h-px bg-sage" style={{ width: progress }} />
					</div>
				</div>
			</div>

			<div className="relative px-5 pb-28 md:px-10">
				<div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
					{[
						{
							v: <Counter value={stats.fallowDownloads} format="compact" />,
							l: 'npm downloads last month',
						},
						{
							v: <Counter value={stats.fallowStars} format="compact" />,
							l: 'GitHub stars',
						},
						{ v: <Counter value={100} suffix="+" />, l: 'framework plugins' },
						{ v: <Counter value={74} suffix=" ms" />, l: 'to analyze preact' },
					].map((s) => (
						<div
							key={s.l}
							className="bg-bg/80 px-5 py-5 backdrop-blur-md md:px-7 md:py-6"
						>
							<p className="font-sans text-3xl font-bold tracking-tight md:text-5xl">
								{s.v}
							</p>
							<p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase md:text-[11px]">
								{s.l}
							</p>
						</div>
					))}
				</div>

				<div className="mx-auto mt-6 grid max-w-[1600px] gap-6 lg:grid-cols-3">
					{fallow.ecosystem.map((e, i) => (
						<Reveal key={e.name} delay={0.1 * i}>
							<a
								href={e.url}
								target="_blank"
								rel="noopener noreferrer"
								className="glass group block h-full p-8"
							>
								<p
									className={`font-mono text-[11px] tracking-[0.18em] uppercase ${i === 0 ? 'text-ochre' : 'text-dim'}`}
								>
									{e.label}
								</p>
								<p className="mt-4 font-sans text-2xl font-bold tracking-tight transition-colors group-hover:text-sage">
									{e.name}{' '}
									<span className="inline-block transition-transform group-hover:translate-x-1">
										↗
									</span>
								</p>
								<p className="mt-2 text-muted">{e.body}</p>
							</a>
						</Reveal>
					))}
				</div>
				<div className="mx-auto mt-10 flex max-w-[1600px] flex-wrap gap-4">
					<Magnetic>
						<a
							href={fallow.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-3 bg-sage px-7 py-4 font-mono text-xs font-bold tracking-[0.14em] text-bg uppercase transition-colors hover:bg-fg"
						>
							fallow.tools ↗
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href={fallow.repo}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-3 border border-line px-7 py-4 font-mono text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:border-fg"
						>
							Star on GitHub ↗
						</a>
					</Magnetic>
				</div>
			</div>

			<Marquee
				items={[
					'Rust',
					'Oxc',
					'TypeScript',
					'Zero config',
					'Deterministic',
					'MCP',
					'LSP',
					'npx fallow',
				]}
			/>
		</section>
	);
}
