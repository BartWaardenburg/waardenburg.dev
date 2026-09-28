'use client';

import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
	useTransform,
	type MotionValue,
} from 'motion/react';
import { useEffect, useRef } from 'react';

import { Magnetic, Reveal, SplitWords } from '@/components/Motion';
import { isAgentReady as iar } from '@/content';
import { useDesktop } from '@/lib/useDesktop';

const overall = Math.round(
	iar.categories.reduce((s, c) => s + (c.score * c.weight) / 100, 0),
);
const grade =
	overall >= 95
		? 'A+'
		: overall >= 80
			? 'A'
			: overall >= 70
				? 'B'
				: overall >= 40
					? 'C'
					: 'D';

function CategoryBar({
	drive,
	i,
	name,
	weight,
	score,
}: {
	drive: MotionValue<number>;
	i: number;
	name: string;
	weight: number;
	score: number;
}) {
	const start = 0.26 + i * 0.085;
	const range = [start, start + 0.14];
	const scaleX = useTransform(drive, range, [0, score / 100]);
	const value = useTransform(drive, range, [0, score], { clamp: true });
	const shown = useTransform(value, (v) => Math.round(v).toString());
	const opacity = useTransform(drive, [start - 0.04, start], [0.35, 1]);
	return (
		<motion.li style={{ opacity }}>
			<div className="flex items-baseline justify-between gap-4 text-sm">
				<span>
					{name}{' '}
					<span className="font-mono text-[11px] text-dim">{weight}%</span>
				</span>
				<motion.span className="font-mono text-xs tabular-nums">
					{shown}
				</motion.span>
			</div>
			<div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
				<motion.div
					className="h-full origin-left rounded-full bg-accent"
					style={{ scaleX }}
				/>
			</div>
		</motion.li>
	);
}

function ScanCard({ drive }: { drive: MotionValue<number> }) {
	const url = useTransform(drive, (v) =>
		iar.scanUrl.slice(
			0,
			Math.round(
				Math.min(1, Math.max(0, (v - 0.04) / 0.18)) * iar.scanUrl.length,
			),
		),
	);
	const status = useTransform(drive, (v): string =>
		v < 0.24
			? 'Ready to scan'
			: v < 0.9
				? 'Scanning 41 checkpoints…'
				: 'Report ready',
	);
	const ring = useTransform(drive, [0.7, 0.92], [0, overall / 100]);
	const score = useTransform(drive, [0.7, 0.92], [0, overall]);
	const scoreText = useTransform(score, (v) => Math.round(v).toString());
	const gradeOpacity = useTransform(drive, [0.9, 0.95], [0, 1]);
	const gradeScale = useTransform(drive, [0.9, 0.96], [1.8, 1]);
	const spinner = useTransform(drive, [0.24, 0.9], [0, 1080]);

	return (
		<div className="glass w-full max-w-md rounded-3xl p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] md:p-7">
			<div className="flex items-center gap-3 rounded-full border border-line bg-bg/60 px-4 py-2.5 font-mono text-xs">
				<motion.span
					style={{ rotate: spinner }}
					className="inline-block text-accent"
				>
					◌
				</motion.span>
				<motion.span className="caret truncate">{url}</motion.span>
			</div>
			<div className="mt-6 flex items-center gap-6">
				<div className="relative size-28 shrink-0">
					<svg viewBox="0 0 120 120" className="size-full -rotate-90">
						<circle
							cx="60"
							cy="60"
							r="52"
							fill="none"
							stroke="rgb(255 255 255 / 0.08)"
							strokeWidth="8"
						/>
						<motion.circle
							cx="60"
							cy="60"
							r="52"
							fill="none"
							stroke="var(--color-accent)"
							strokeWidth="8"
							strokeLinecap="round"
							style={{ pathLength: ring }}
						/>
					</svg>
					<div className="absolute inset-0 grid place-items-center">
						<motion.span className="font-sans text-3xl font-bold tabular-nums">
							{scoreText}
						</motion.span>
					</div>
				</div>
				<div>
					<motion.p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
						{status}
					</motion.p>
					<div className="mt-1 flex items-baseline gap-3">
						<span className="font-mono text-[11px] text-dim">Grade</span>
						<motion.span
							style={{ opacity: gradeOpacity, scale: gradeScale }}
							className="inline-block font-sans text-5xl font-extrabold text-accent"
						>
							{grade}
						</motion.span>
					</div>
				</div>
			</div>
			<ul className="mt-6 space-y-4">
				{iar.categories.map((c, i) => (
					<CategoryBar key={c.name} drive={drive} i={i} {...c} />
				))}
			</ul>
			<p className="mt-5 font-mono text-[10px] text-dim">
				Example scan. The real one runs at isagentready.com
			</p>
		</div>
	);
}

export function AgentReady() {
	const ref = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const desktop = useDesktop();
	const reduce = useReducedMotion();
	const inView = useInView(cardRef, { once: true, margin: '0px 0px -20% 0px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end'],
	});
	const drive = useMotionValue(0);

	useMotionValueEvent(scrollYProgress, 'change', (v) => {
		if (desktop) drive.set(Math.min(1, v * 1.15));
	});

	useEffect(() => {
		if (reduce) {
			drive.set(1);
			return;
		}
		if (desktop) {
			drive.set(Math.min(1, scrollYProgress.get() * 1.15));
			return;
		}
		if (!inView) return;
		const c = animate(drive, 1, { duration: 5, ease: 'linear' });
		return () => c.stop();
	}, [desktop, drive, inView, reduce, scrollYProgress]);

	return (
		<section
			id="isagentready"
			data-scene="globe"
			aria-labelledby="iar-title"
			className="relative"
		>
			<div ref={ref} className="relative lg:motion-safe:h-[300vh]">
				<div className="px-5 py-24 md:px-10 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-stretch lg:motion-safe:py-24">
					<div className="mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-[1fr_auto]">
						<div className="flex flex-col">
							<div className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted uppercase">
								<span className="text-accent">{iar.index}</span>
								<span className="h-px w-12 bg-line" />
								Flagship
								<span className="rounded-full border border-line px-3 py-1 text-[10px]">
									Builder
								</span>
							</div>
							<h2
								id="iar-title"
								className="mt-6 font-sans text-[clamp(3rem,8.4vw,8rem)] leading-[0.85] font-extrabold tracking-[-0.05em]"
							>
								<SplitWords text={iar.name} />
							</h2>
							<p className="mt-4 max-w-2xl font-serif text-2xl text-fg/90 italic md:text-3xl">
								{iar.tagline}
							</p>
							<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
								{iar.intro}
							</p>
							<dl className="mt-auto flex gap-10 pt-10">
								{iar.facts.map((f) => (
									<div key={f.label}>
										<dt className="font-mono text-[11px] tracking-[0.14em] text-dim uppercase">
											{f.label}
										</dt>
										<dd className="mt-1 font-sans text-3xl font-bold tracking-tight">
											{f.value}
										</dd>
									</div>
								))}
							</dl>
						</div>
						<div ref={cardRef} className="lg:self-end">
							<ScanCard drive={drive} />
						</div>
					</div>
				</div>
			</div>

			<div className="relative px-5 pb-32 md:px-10">
				<div className="mx-auto max-w-[1600px]">
					<ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
						{iar.surfaces.map((s, i) => (
							<Reveal
								as="li"
								key={s.name}
								delay={i * 0.08}
								className="bg-bg/80 p-7 backdrop-blur-md"
							>
								<p className="font-mono text-[11px] text-accent">0{i + 1}</p>
								<p className="mt-6 font-sans text-xl font-bold">{s.name}</p>
								<p className="mt-2 text-sm text-muted">{s.body}</p>
							</Reveal>
						))}
					</ul>
					<div className="mt-8 flex flex-wrap items-center justify-between gap-6">
						<ul className="flex flex-wrap gap-2">
							{iar.stack.map((t) => (
								<li
									key={t}
									className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted"
								>
									{t}
								</li>
							))}
						</ul>
						<Magnetic>
							<a
								href={iar.url}
								className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 font-mono text-xs font-bold tracking-[0.14em] text-bg uppercase"
							>
								Scan your site ↗
							</a>
						</Magnetic>
					</div>
				</div>
			</div>
		</section>
	);
}
