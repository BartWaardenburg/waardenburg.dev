import { SplitWords } from '@/components/Motion';
import { clients } from '@/content';

/** The client work, as one sheet of paper pinned on the forest green. */
export function Clients() {
	return (
		<section
			id="clients"
			aria-labelledby="clients-title"
			className="paint wash-forest px-5 pt-16 pb-28 [--wash:linear-gradient(#173d30,#173d30)] md:px-10 md:pt-24 md:pb-40"
		>
			<div className="mx-auto max-w-[1440px]">
				<h2
					id="clients-title"
					className="display text-[clamp(3.25rem,8vw,7rem)] leading-[0.86]"
				>
					<SplitWords text="Built *for.*" />
				</h2>
				<div className="sheet mt-12 px-6 py-3 md:mt-16 md:px-10 md:py-5">
					<ul className="grid md:grid-cols-2 md:gap-x-14">
						{clients.map((c) => (
							<li
								key={c.name}
								className="border-b border-line py-6 last:border-b-0 md:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
							>
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
									<h3 className="display text-3xl">{c.name}</h3>
									<p className="text-sm font-medium text-muted">
										via {c.via} ·{' '}
										<span className="font-mono text-xs">{c.years}</span>
									</p>
								</div>
								<p className="mt-2 text-muted">{c.what}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
