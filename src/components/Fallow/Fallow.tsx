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

/** Opacity and lift for chapter i of n, crossfading as progress passes through. */
const useChapter = (p: MotionValue<number>, i: number) => {
	// one chapter at a time: the current one fades out before the next fades in
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
				<p className="font-mono text-xs text-accent">
					0{i + 1} / 0{CHAPTERS}
				</p>
				<h3 className="mt-4 font-sans text-3xl font-bold tracking-tight md:text-5xl">
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
		{ dot: 'bg-accent', label: 'Entry points and hubs' },
		{ dot: 'bg-fg', label: 'Reachable modules' },
		{ dot: 'bg-ember', label: 'Unreachable, safe to delete' },
		{
			dot: 'border border-dashed border-dim bg-transparent',
			label: 'Dangling import',
		},
	];
	return (
		<div className="glass w-full max-w-sm rounded-2xl p-6">
			<p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
				What you are looking at
			</p>
			<ul className="mt-5 space-y-3">
				{rows.map((r) => (
					<li key={r.label} className="flex items-center gap-3 text-sm">
						<span className={`size-2.5 rounded-full ${r.dot}`} />
						{r.label}
					</li>
				))}
			</ul>
			<p className="mt-6 border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-muted">
				The graph behind this card is live WebGL, drawn in the same colours.
			</p>
		</div>
	);
}

function Bench({ p, desktop }: { p: MotionValue<number>; desktop: boolean }) {
	const grow = useTransform(p, [0.37, 0.58], [0, 1]);
	const max = Math.max(...fallow.bench.map((b) => b.other));
	return (
		<div className="glass w-full max-w-lg rounded-2xl p-6 md:p-8">
			<p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
				Dead-code benchmark
			</p>
			<p className="mt-2 font-sans text-5xl font-extrabold tracking-tight text-accent md:text-6xl">
				27×{' '}
				<span className="font-serif text-2xl font-normal text-fg/80 italic">
					faster on preact
				</span>
			</p>
			<div className="mt-6 space-y-6">
				{fallow.bench.map((b) => (
					<div key={b.repo}>
						<p className="mb-2 font-mono text-xs text-fg">{b.repo}</p>
						{[
							{ who: 'fallow', ms: b.fallow, cls: 'bg-accent' },
							{ who: fallow.benchOther, ms: b.other, cls: 'bg-dim' },
						].map((row) => (
							<div key={row.who} className="mb-1.5 flex items-center gap-3">
								<span className="w-14 shrink-0 font-mono text-[11px] text-muted">
									{row.who}
								</span>
								<div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
									<motion.div
										className={`h-full origin-left rounded-full ${row.cls}`}
										style={{
											width: `${Math.max(2, (row.ms / max) * 100)}%`,
											...(desktop ? { scaleX: grow } : {}),
										}}
										{...(desktop
											? {}
											: {
													initial: { scaleX: 0 },
													whileInView: { scaleX: 1 },
													viewport: { once: true },
													transition: {
														duration: 1.4,
														ease: [0.16, 1, 0.3, 1],
													},
												})}
									/>
								</div>
								<span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums">
									{row.ms >= 1000
										? `${(row.ms / 1000).toFixed(2)} s`
										: `${row.ms} ms`}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

function Integrations() {
	return (
		<ul className="flex max-w-lg flex-wrap gap-2 lg:justify-end">
			{fallow.integrations.map((item) => (
				<li
					key={item}
					className="rounded-full border border-line bg-bg/60 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-sm"
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
	const ticks = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	return (
		<section
			id="fallow"
			data-scene="graph"
			aria-labelledby="fallow-title"
			className="relative"
		>
			<div ref={ref} className="relative lg:motion-safe:h-[420vh]">
				<div className="px-5 py-24 md:px-10 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:flex-col lg:motion-safe:py-24">
					<div className="mx-auto w-full max-w-[1600px]">
						<div className="flex flex-wrap items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted uppercase">
							<span className="text-accent">{fallow.index}</span>
							<span className="h-px w-12 bg-line" />
							Flagship
							<span className="rounded-full border border-accent/40 px-3 py-1 text-[10px] text-accent">
								{fallow.role}
							</span>
						</div>
						<h2
							id="fallow-title"
							className="mt-6 font-sans text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.05em]"
						>
							<SplitWords text={fallow.name} />
						</h2>
						<p className="mt-4 max-w-2xl font-serif text-2xl text-fg/90 italic md:text-3xl">
							{fallow.tagline}
						</p>
					</div>

					<div className="relative mx-auto w-full max-w-[1600px] lg:motion-safe:flex-1">
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
							visual={<Bench p={scrollYProgress} desktop={desktop} />}
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

					<div className="mx-auto mt-10 grid w-full max-w-[1600px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4 lg:motion-safe:mt-8">
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
							{
								v: <Counter value={27.1} decimals={1} suffix="×" />,
								l: 'faster than knip on preact',
							},
						].map((s) => (
							<div
								key={s.l}
								className="bg-bg/75 px-5 py-4 backdrop-blur-md md:px-6 md:py-5"
							>
								<p className="font-sans text-3xl font-bold tracking-tight md:text-4xl">
									{s.v}
								</p>
								<p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase md:text-[11px]">
									{s.l}
								</p>
							</div>
						))}
					</div>
					<div
						aria-hidden
						className="mx-auto mt-4 hidden h-px w-full max-w-[1600px] bg-line lg:motion-safe:block"
					>
						<motion.div className="h-px bg-accent" style={{ width: ticks }} />
					</div>
				</div>
			</div>

			<div className="relative px-5 pb-28 md:px-10">
				<div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-3">
					<Reveal className="glass rounded-3xl p-8 lg:col-span-1">
						<p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
							Fallow Cloud
						</p>
						<p className="mt-4 text-muted">{fallow.cloud}</p>
					</Reveal>
					{fallow.ecosystem.map((e, i) => (
						<Reveal key={e.name} delay={0.1 * (i + 1)}>
							<a
								href={e.url}
								className="glass group block h-full rounded-3xl p-8 transition-colors hover:border-accent/50"
							>
								<p className="font-mono text-[11px] tracking-[0.18em] text-dim uppercase">
									Also in the toolchain
								</p>
								<p className="mt-4 font-sans text-2xl font-bold tracking-tight group-hover:text-accent">
									{e.name}{' '}
									<span className="inline-block transition-transform group-hover:translate-x-1">
										→
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
							className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-xs font-bold tracking-[0.14em] text-bg uppercase"
						>
							fallow.tools ↗
						</a>
					</Magnetic>
					<Magnetic>
						<a
							href={fallow.repo}
							className="inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 font-mono text-xs font-bold tracking-[0.14em] uppercase transition-colors hover:border-fg"
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
