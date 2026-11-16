import { Reveal, ScrollWords } from '@/components/Motion';
import { manifesto, pillars } from '@/content';

const DABS = [
	'[--dab:var(--color-forest)]',
	'[--dab:var(--color-clay)]',
	'[--dab:var(--color-sun)]',
];

export function Manifesto() {
	return (
		<section
			id="about"
			className="paint brushed wash-cloud px-5 pt-24 pb-28 md:px-10 md:pt-32 md:pb-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<h2 className="sr-only">About</h2>
				<ScrollWords
					text={manifesto}
					className="max-w-[26em] text-[clamp(1.6rem,1.1rem+2.3vw,3.25rem)] leading-[1.14] font-semibold tracking-[-0.025em] text-pretty"
				/>

				<ol className="mt-20 grid gap-x-12 gap-y-12 md:mt-28 md:grid-cols-3">
					{pillars.map((p, i) => (
						<Reveal as="li" key={p.title} delay={i * 0.1}>
							<span aria-hidden className={`dab ${DABS[i]}`} />
							<h3 className="display mt-5 text-5xl md:text-6xl">{p.title}</h3>
							<p className="mt-4 max-w-sm text-muted">{p.body}</p>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
