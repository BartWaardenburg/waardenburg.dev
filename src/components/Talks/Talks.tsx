'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Reveal, SplitWords } from '@/components/Motion';
import { talks, teaching, type Talk } from '@/content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** The same cover for every talk: the YouTube still when there is a recording, type otherwise. */
function Cover({ talk, sizes }: { talk: Talk; sizes: string }) {
	return (
		<a
			href={talk.link.url}
			{...external}
			tabIndex={-1}
			aria-hidden
			className="group/cover relative block aspect-video overflow-hidden bg-bg-2"
		>
			{talk.youtubeId ? (
				<>
					<Image
						src={`https://i.ytimg.com/vi/${talk.youtubeId}/hqdefault.jpg`}
						alt=""
						fill
						sizes={sizes}
						className="object-cover opacity-75 transition duration-700 group-hover/cover:scale-105 group-hover/cover:opacity-95"
					/>
					<span className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
					<span className="absolute bottom-4 left-4 grid size-12 place-items-center border border-fg/40 bg-bg/50 text-fg backdrop-blur-sm transition duration-500 group-hover/cover:border-sage group-hover/cover:bg-sage group-hover/cover:text-bg">
						<svg
							viewBox="0 0 24 24"
							className="ml-0.5 size-5"
							fill="currentColor"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</span>
				</>
			) : (
				<span className="absolute inset-0 flex flex-col justify-between p-5">
					<span
						className={`block h-1 w-12 ${talk.upcoming ? 'bg-ochre' : 'bg-wine'}`}
					/>
					<span>
						<span className="block font-serif text-4xl leading-none text-fg/85 italic md:text-5xl">
							{talk.event}
						</span>
					</span>
				</span>
			)}
		</a>
	);
}

function TalkCard({ talk }: { talk: Talk }) {
	const featured = Boolean(talk.featured);
	return (
		<article className="glass flex w-[85vw] shrink-0 snap-start flex-col p-5 sm:w-[60vw] md:p-6 lg:w-[34vw] lg:max-w-[520px]">
			<Cover talk={talk} sizes="(min-width: 1024px) 34vw, 85vw" />
			<p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
				{featured && (
					<span className="border border-sage/60 px-2 py-0.5 text-sage">
						Latest
					</span>
				)}
				{talk.upcoming && (
					<span className="border border-ochre/60 px-2 py-0.5 text-ochre">
						Upcoming
					</span>
				)}
				<span>
					{talk.event} · {talk.place} · {talk.date}
				</span>
			</p>
			<h3 className="mt-3 font-sans text-2xl font-bold tracking-tight">
				{talk.title}
			</h3>
			<p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
				{talk.body}
			</p>
			<a
				href={talk.link.url}
				{...external}
				className="mt-auto self-start pt-6 font-mono text-[11px] tracking-[0.14em] text-fg uppercase transition-colors hover:text-sage"
			>
				{talk.link.label} ↗
				<span className="sr-only"> (opens in a new tab): {talk.title}</span>
			</a>
		</article>
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
						<h2
							id="talks-title"
							className="font-sans text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
						>
							<SplitWords
								text="I explain things *on stage.*"
								italicClassName="text-wine"
							/>
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
						className="flex items-stretch snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10 lg:motion-safe:snap-none lg:motion-safe:overflow-visible lg:motion-safe:pb-0"
					>
						{talks.map((t) => (
							<TalkCard key={t.title} talk={t} />
						))}
						<div aria-hidden className="hidden w-[10vw] shrink-0 lg:block" />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
