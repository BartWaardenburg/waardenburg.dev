import Image from 'next/image';

import { Arrow } from '@/components/Arrow';
import { Reveal, SplitWords } from '@/components/Motion';
import { talks, teaching, type Talk } from '@/content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

// talks without a recording get a painted cover in one of these colours
const COVER_TINTS = ['bg-forest', 'bg-soil', 'bg-[#6f5a99]', 'bg-clay'];
const painted = talks.filter((t) => !t.youtubeId);

/** The same cover for every talk: the YouTube still when there is a recording, paint otherwise. */
function Cover({ talk, tint }: { talk: Talk; tint: number }) {
	return (
		<a
			href={talk.link.url}
			{...external}
			tabIndex={-1}
			aria-hidden
			className="group/cover relative block aspect-video overflow-hidden rounded-lg"
		>
			{talk.youtubeId ? (
				<>
					<Image
						src={`https://i.ytimg.com/vi/${talk.youtubeId}/hqdefault.jpg`}
						alt=""
						fill
						sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw"
						className="object-cover transition duration-700 ease-out-expo group-hover/cover:scale-105"
					/>
					<span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-cream text-ink shadow-[0_8px_14px_-8px_rgb(0_0_0/0.7)] transition duration-500 group-hover/cover:bg-sun">
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
				<span
					className={`absolute inset-0 flex items-end bg-[url('/art/impasto-strong.webp')] bg-[length:280px] p-5 bg-blend-soft-light ${COVER_TINTS[Math.max(0, tint) % COVER_TINTS.length]}`}
				>
					<span className="display text-3xl text-cream">{talk.event}</span>
				</span>
			)}
		</a>
	);
}

function TalkCard({ talk, i, tint }: { talk: Talk; i: number; tint: number }) {
	return (
		<Reveal as="li" delay={(i % 4) * 0.06} className="h-full">
			<article className="sheet flex h-full flex-col p-4 md:p-5">
				<Cover talk={talk} tint={tint} />
				<p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-muted">
					{talk.featured && (
						<span className="tag border-forest text-forest">Latest</span>
					)}
					{talk.upcoming && (
						<span className="tag border-clay text-clay">Upcoming</span>
					)}
					<span>
						{talk.event} · {talk.place} ·{' '}
						<span className="font-mono text-xs">{talk.date}</span>
					</span>
				</p>
				<h3 className="mt-3 text-xl leading-snug font-bold tracking-tight text-pretty">
					{talk.title}
				</h3>
				<p className="mt-3 text-sm leading-relaxed text-muted">{talk.body}</p>
				<p className="mt-auto pt-6">
					<a href={talk.link.url} {...external} className="stroke-link text-sm">
						{talk.link.label} <Arrow />
						<span className="sr-only"> (opens in a new tab): {talk.title}</span>
					</a>
				</p>
			</article>
		</Reveal>
	);
}

export function Talks() {
	return (
		<section
			id="talks"
			aria-labelledby="talks-title"
			className="paint brushed wash-clay px-5 py-28 md:px-10 md:py-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
					<h2
						id="talks-title"
						className="display text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.86]"
					>
						<SplitWords
							text="I explain things *on stage.*"
							accentClassName="ink-meadow"
						/>
					</h2>
					<dl className="grid grid-cols-3 gap-6">
						{teaching.map((t) => (
							<div key={t.label} className="border-t-2 border-fg pt-4">
								<dt className="sr-only">{t.label}</dt>
								<dd className="display text-5xl md:text-6xl">{t.value}</dd>
								<dd className="mt-2 text-sm font-medium text-muted">
									{t.label}
								</dd>
							</div>
						))}
					</dl>
				</div>

				<ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
					{talks.map((t, i) => (
						<TalkCard key={t.title} talk={t} i={i} tint={painted.indexOf(t)} />
					))}
				</ul>
			</div>
		</section>
	);
}
