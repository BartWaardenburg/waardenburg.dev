'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Reveal, SplitWords } from '@/components/Motion';
import { talks, teaching, type Talk } from '@/content';

function Video({ talk }: { talk: Talk }) {
	const [playing, setPlaying] = useState(false);
	if (!talk.youtubeId) return null;
	return (
		<div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-2">
			{playing ? (
				<iframe
					className="absolute inset-0 size-full"
					src={`https://www.youtube-nocookie.com/embed/${talk.youtubeId}?autoplay=1&rel=0`}
					title={`${talk.title} at ${talk.event}`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			) : (
				<button
					type="button"
					onClick={() => setPlaying(true)}
					data-cursor="Play"
					className="group absolute inset-0 size-full cursor-pointer"
					aria-label={`Play ${talk.title} at ${talk.event}`}
				>
					<Image
						src={`https://i.ytimg.com/vi/${talk.youtubeId}/hqdefault.jpg`}
						alt=""
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
					/>
					<span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
					<span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-bg shadow-[0_0_60px_rgb(200_255_77/0.5)] transition-transform duration-500 group-hover:scale-110">
						<svg
							viewBox="0 0 24 24"
							className="ml-1 size-7"
							fill="currentColor"
							aria-hidden
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</span>
				</button>
			)}
		</div>
	);
}

function Featured({ talk }: { talk: Talk }) {
	return (
		<article className="glass flex w-full shrink-0 flex-col gap-6 rounded-3xl p-5 md:p-7 lg:w-[62vw] lg:max-w-[980px]">
			<Video talk={talk} />
			<div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
				<div>
					<p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
						<span className="pulse-dot size-2 rounded-full bg-accent" />
						Latest · {talk.event} · {talk.year}
					</p>
					<h3 className="mt-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">
						{talk.title}
					</h3>
					<p className="mt-3 max-w-2xl text-muted">{talk.body}</p>
				</div>
				{talk.url && (
					<a
						href={talk.url}
						className="justify-self-start rounded-full border border-line px-5 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:border-accent hover:text-accent"
					>
						YouTube ↗
					</a>
				)}
			</div>
		</article>
	);
}

function Card({ talk }: { talk: Talk }) {
	const content = (
		<>
			<div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-2">
				{talk.image ? (
					<Image
						src={talk.image}
						alt=""
						fill
						sizes="(min-width: 1024px) 30vw, 100vw"
						className="object-cover opacity-60 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
					/>
				) : (
					<div className="absolute inset-0 grid place-items-center font-sans text-7xl font-extrabold text-outline">
						{talk.year}
					</div>
				)}
			</div>
			<p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
				{talk.event} · {talk.year}
			</p>
			<h3 className="mt-2 font-sans text-2xl font-bold tracking-tight group-hover:text-accent">
				{talk.title}
			</h3>
			<p className="mt-2 text-sm text-muted">{talk.body}</p>
		</>
	);
	const cls =
		'glass group flex w-[85vw] shrink-0 snap-start flex-col rounded-3xl p-5 sm:w-[60vw] md:p-6 lg:w-[30vw] lg:max-w-[460px]';
	return talk.url ? (
		<a href={talk.url} className={cls}>
			{content}
		</a>
	) : (
		<article className={cls}>{content}</article>
	);
}

export function Talks() {
	const ref = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const [distance, setDistance] = useState(0);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end end'],
	});
	const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

	useEffect(() => {
		const measure = () => {
			const el = track.current;
			if (!el) return;
			const pinned = getComputedStyle(el).overflowX === 'visible';
			setDistance(pinned ? Math.max(0, el.scrollWidth - window.innerWidth) : 0);
		};
		measure();
		const ro = new ResizeObserver(measure);
		if (track.current) ro.observe(track.current);
		window.addEventListener('resize', measure);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', measure);
		};
	}, []);

	const [featured, ...rest] = talks;

	return (
		<section
			id="talks"
			data-scene="rings"
			aria-labelledby="talks-title"
			className="relative"
		>
			<div className="px-5 pt-32 md:px-10 md:pt-44">
				<div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
					<div>
						<Reveal className="flex items-center gap-4 font-mono text-xs tracking-[0.2em] text-muted uppercase">
							<span className="text-accent">04</span>
							<span className="h-px w-12 bg-line" />
							Talks & teaching
						</Reveal>
						<h2
							id="talks-title"
							className="mt-6 font-sans text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
						>
							<SplitWords text="I explain things *on stage.*" />
						</h2>
					</div>
					<dl className="grid grid-cols-3 gap-6">
						{teaching.map((t, i) => (
							<Reveal key={t.label} delay={i * 0.1}>
								<dt className="sr-only">{t.label}</dt>
								<dd className="font-sans text-4xl font-bold tracking-tight md:text-5xl">
									{t.value}
								</dd>
								<dd className="mt-2 text-sm text-muted">{t.label}</dd>
							</Reveal>
						))}
					</dl>
				</div>
			</div>

			<div
				ref={ref}
				className="relative"
				style={
					distance ? { height: `calc(100svh + ${distance}px)` } : undefined
				}
			>
				<div className="py-16 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:overflow-hidden lg:motion-safe:py-0">
					<motion.div
						ref={track}
						style={{ x }}
						data-lenis-prevent-touch
						className="flex items-start snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10 lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:motion-safe:pb-0"
					>
						{featured && <Featured talk={featured} />}
						{rest.map((t) => (
							<Card key={t.title} talk={t} />
						))}
						<div aria-hidden className="hidden w-[10vw] shrink-0 lg:block" />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
