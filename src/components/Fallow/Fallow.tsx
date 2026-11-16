import { Arrow } from '@/components/Arrow';
import { Counter, Reveal, SplitWords } from '@/components/Motion';
import { Terminal } from '@/components/Terminal';
import { fallow } from '@/content';
import type { Stats } from '@/lib/stats';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/**
 * The raised bed: a timber frame around bare soil, like the fallow beds in the painting.
 * The terminal and the list of findings are planted in it.
 */
function Bed() {
	return (
		<div className="rounded-[18px] bg-timber bg-[url('/art/impasto-strong.webp')] bg-[length:260px] p-2.5 bg-blend-soft-light shadow-[0_34px_50px_-30px_rgb(54_30_12/0.8)] md:p-3.5">
			<div className="on-dark grid gap-8 rounded-[10px] bg-soil bg-[url('/art/impasto-strong.webp')] bg-[length:320px] p-4 bg-blend-soft-light sm:p-6 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10">
				<Terminal lines={fallow.terminal} />
				<div className="lg:py-2">
					<h3 className="display text-3xl md:text-4xl">What one run reports</h3>
					<ul className="mt-6">
						{fallow.finds.map((f) => (
							<li
								key={f.name}
								className="border-t border-line py-3.5 first:border-t-0"
							>
								<span className="font-bold text-sun">{f.name}.</span>{' '}
								<span className="text-muted">{f.body}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export function Fallow({ stats }: { stats: Stats }) {
	const numbers = [
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
	];

	return (
		<section
			id="fallow"
			aria-labelledby="fallow-title"
			className="paint brushed wash-dawn px-5 py-28 md:px-10 md:py-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
					<div>
						<h2
							id="fallow-title"
							className="display text-[clamp(4.5rem,13vw,10rem)] leading-[0.82]"
						>
							<SplitWords text={fallow.name} />
						</h2>
						<p className="mt-5 max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-balance md:text-3xl">
							{fallow.tagline}
						</p>
					</div>
					<Reveal>
						<p className="max-w-xl text-lg leading-relaxed text-muted">
							{fallow.intro}
						</p>
						<div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
							<a href={fallow.url} {...external} className="btn">
								fallow.tools <Arrow />
							</a>
							<a href={fallow.repo} {...external} className="stroke-link">
								Star on GitHub <Arrow />
							</a>
						</div>
					</Reveal>
				</div>

				<div className="mt-16 md:mt-20">
					<Bed />
				</div>

				<dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-20 md:grid-cols-4">
					{numbers.map((s) => (
						<div key={s.l} className="border-t-2 border-fg pt-4">
							<dt className="sr-only">{s.l}</dt>
							<dd className="display text-5xl md:text-6xl">{s.v}</dd>
							<dd className="mt-2 text-sm font-medium text-muted">{s.l}</dd>
						</div>
					))}
				</dl>

				<ol className="mt-20 grid gap-x-12 gap-y-10 md:mt-28 md:grid-cols-3">
					{fallow.steps.map((step, i) => (
						<Reveal as="li" key={step.title} delay={i * 0.08}>
							<h3 className="display text-3xl md:text-4xl">{step.title}</h3>
							<p className="mt-4 max-w-md text-muted">{step.body}</p>
						</Reveal>
					))}
				</ol>

				<ul
					aria-label="Where Fallow runs"
					className="mt-12 flex flex-wrap gap-2"
				>
					{fallow.integrations.map((item) => (
						<li key={item} className="tag">
							{item}
						</li>
					))}
				</ul>

				<ul className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
					{fallow.ecosystem.map((e) => (
						<li key={e.name}>
							<a
								href={e.url}
								{...external}
								className="sheet block h-full p-7 md:p-8"
							>
								<p className="text-sm font-semibold text-clay">{e.label}</p>
								<p className="display mt-3 flex items-center gap-2 text-3xl">
									{e.name} <Arrow className="text-xl" />
								</p>
								<p className="mt-3 text-muted">{e.body}</p>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
