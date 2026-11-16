import { Arrow } from '@/components/Arrow';
import { Reveal, SplitWords } from '@/components/Motion';
import { contributions, openSource, type OssProject } from '@/content';
import { PaintLight } from '@/components/PaintLight';
import seedlings from '@/assets/seedlings.webp';
import { PaintedProp } from '@/components/PaintedProp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

function Card({ project, i }: { project: OssProject; i: number }) {
	return (
		<Reveal
			as="li"
			delay={(i % 3) * 0.08}
			className={project.wide ? 'md:col-span-2' : ''}
		>
			<a
				href={project.url}
				{...external}
				className="sheet group flex h-full min-h-[280px] flex-col p-7 md:p-8"
			>
				<div className="flex items-center justify-between text-sm font-semibold">
					<span className="text-clay">{project.kind}</span>
					<Arrow className="text-lg transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
				</div>
				<h3 className="display mt-auto pt-12 text-4xl md:text-5xl">
					{project.name}
				</h3>
				<p className="mt-3 max-w-2xl text-muted">{project.body}</p>
				<ul className="mt-6 flex flex-wrap gap-2">
					{project.tags.map((t) => (
						<li key={t} className="tag">
							{t}
						</li>
					))}
				</ul>
			</a>
		</Reveal>
	);
}

export function OpenSource() {
	return (
		<section
			id="open-source"
			aria-labelledby="oss-title"
			className="paint wash-grass px-5 pt-16 pb-28 md:px-10 md:pt-24 md:pb-40"
		>
			<PaintLight />
			<div className="mx-auto max-w-[1440px]">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
					<h2
						id="oss-title"
						className="display text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.86]"
					>
						<SplitWords
							text="Open source, *shipped.*"
							accentClassName="ink-plum"
						/>
					</h2>
					<Reveal>
						<p className="max-w-lg text-lg text-muted lg:justify-self-end">
							Tools for developers, and more and more for their agents: Rust
							SDKs on the Oxc stack, MCP servers that turn real APIs into safe
							tools, and skills that teach agents to use them. All public, all
							MIT licensed.
						</p>
					</Reveal>
				</div>
				<ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{openSource.map((p, i) => (
						<Card key={p.name} project={p} i={i} />
					))}
				</ul>

				<div className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr]">
					<div>
						<h3 className="display text-4xl md:text-5xl">
							Contributed <span className="painted ink-plum">upstream</span>
						</h3>
						<p className="mt-4 max-w-sm text-muted">
							Fixes that landed in projects I use every day, from Preact support
							in Storybook to a coverage hook in Vitest.
						</p>
						<PaintedProp
							image={seedlings}
							sizes="(min-width: 1024px) 340px, 240px"
							className="mt-8 h-auto w-60 lg:mt-12 lg:w-[21rem]"
						/>
					</div>
					<ul className="border-t-2 border-fg">
						{contributions.map((c) => (
							<li key={c.url}>
								<a
									href={c.url}
									{...external}
									className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-4 transition-colors hover:bg-cream/45 md:grid-cols-[14rem_1fr_auto] md:px-3"
								>
									<span className="font-bold">{c.project}</span>
									<span className="col-span-2 row-start-2 text-sm text-muted md:col-span-1 md:row-start-auto md:text-base">
										{c.what}
									</span>
									<span className="col-start-2 row-start-1 flex items-center gap-3 font-mono text-xs md:col-start-auto md:row-start-auto">
										{c.year}
										<Arrow className="text-sm transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
