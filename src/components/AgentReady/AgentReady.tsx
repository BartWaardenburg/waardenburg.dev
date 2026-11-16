'use client';

import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
	type MotionValue,
} from 'motion/react';
import { useEffect, useRef } from 'react';

import { Arrow } from '@/components/Arrow';
import { Reveal, SplitWords } from '@/components/Motion';
import { isAgentReady as iar } from '@/content';

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

const BAR_TINTS = ['bg-forest', 'bg-clay', 'bg-sun', 'bg-forest', 'bg-clay'];

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
	return (
		<li>
			<div className="flex items-baseline justify-between gap-4 text-sm font-medium">
				<span>
					{name}{' '}
					<span className="font-mono text-[11px] text-muted">{weight}%</span>
				</span>
				<motion.span className="font-mono text-xs tabular-nums">
					{shown}
				</motion.span>
			</div>
			<div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
				<motion.div
					className={`h-full origin-left rounded-full bg-[url('/art/impasto-strong.webp')] bg-[length:120px] bg-blend-soft-light ${BAR_TINTS[i % BAR_TINTS.length]}`}
					style={{ scaleX }}
				/>
			</div>
		</li>
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

	return (
		<div className="sheet w-full p-6 md:p-8">
			<div className="flex items-center gap-3 rounded-lg bg-ink px-4 py-3 font-mono text-xs text-cream">
				<span className="text-cream/60">URL</span>
				<motion.span className="caret truncate">{url}</motion.span>
			</div>
			<div className="mt-7 flex items-center gap-6">
				<div className="relative size-28 shrink-0">
					<svg viewBox="0 0 120 120" className="size-full -rotate-90">
						<circle
							cx="60"
							cy="60"
							r="50"
							fill="none"
							stroke="var(--color-line)"
							strokeWidth="11"
						/>
						<motion.circle
							cx="60"
							cy="60"
							r="50"
							fill="none"
							stroke="var(--color-forest)"
							strokeWidth="11"
							strokeLinecap="round"
							style={{ pathLength: ring }}
						/>
					</svg>
					<div className="absolute inset-0 grid place-items-center">
						<motion.span className="display text-4xl tabular-nums">
							{scoreText}
						</motion.span>
					</div>
				</div>
				<div className="min-w-0">
					<motion.p className="text-sm font-semibold whitespace-nowrap text-muted">
						{status}
					</motion.p>
					<div className="mt-1 flex items-baseline gap-3">
						<span className="text-sm text-muted">Grade</span>
						<motion.span
							style={{ opacity: gradeOpacity, scale: gradeScale }}
							className="display inline-block text-6xl text-clay"
						>
							{grade}
						</motion.span>
					</div>
				</div>
			</div>
			<ul className="mt-7 space-y-4">
				{iar.categories.map((c, i) => (
					<CategoryBar key={c.name} drive={drive} i={i} {...c} />
				))}
			</ul>
			<p className="mt-6 text-xs text-muted">
				Example scan. The real one runs at isagentready.com
			</p>
		</div>
	);
}

export function AgentReady() {
	const cardRef = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const inView = useInView(cardRef, { once: true, margin: '0px 0px -20% 0px' });
	const drive = useMotionValue(0);

	// the example scan runs once, when the card is seen
	useEffect(() => {
		if (reduce) {
			drive.set(1);
			return;
		}
		if (!inView) return;
		const c = animate(drive, 1, { duration: 5, ease: 'linear' });
		return () => c.stop();
	}, [drive, inView, reduce]);

	return (
		<section
			id="isagentready"
			aria-labelledby="iar-title"
			className="paint brushed wash-sage px-5 py-28 md:px-10 md:py-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<div className="grid gap-12 lg:grid-cols-[1fr_29rem] lg:gap-16">
					<div className="flex flex-col">
						<h2
							id="iar-title"
							className="display text-[clamp(3.25rem,10.5vw,8.5rem)] leading-[0.84]"
						>
							<SplitWords text={iar.name} />
						</h2>
						<p className="mt-5 max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-balance md:text-3xl">
							{iar.tagline}
						</p>
						<p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
							{iar.intro}
						</p>
						<dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
							{iar.facts.map((f) => (
								<div key={f.label}>
									<dt className="text-sm font-medium text-muted">{f.label}</dt>
									<dd className="display mt-1 text-5xl">{f.value}</dd>
								</div>
							))}
						</dl>
						<div className="mt-10 lg:mt-auto lg:pt-10">
							<a
								href={iar.url}
								target="_blank"
								rel="noopener noreferrer"
								className="btn"
							>
								Scan your site <Arrow />
							</a>
						</div>
					</div>
					<div ref={cardRef} className="lg:self-end">
						<ScanCard drive={drive} />
					</div>
				</div>

				<ul className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
					{iar.surfaces.map((s, i) => (
						<Reveal
							as="li"
							key={s.name}
							delay={i * 0.08}
							className="border-t-2 border-fg pt-5"
						>
							<h3 className="display text-3xl">{s.name}</h3>
							<p className="mt-2 text-muted">{s.body}</p>
						</Reveal>
					))}
				</ul>
				<ul aria-label="Built with" className="mt-12 flex flex-wrap gap-2">
					{iar.stack.map((t) => (
						<li key={t} className="tag">
							{t}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
