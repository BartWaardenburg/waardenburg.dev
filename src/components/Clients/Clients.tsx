import { SplitWords } from '@/components/Motion';
import { PaintedLogo } from '@/components/PaintedLogo';
import { clients } from '@/content';
import { PaintLight } from '@/components/PaintLight';

// the light paints of the sky, one after the other
const PAINTS = ['#f4ecdc', '#f6c453', '#f2b8a8', '#cdd89a', '#d3bfec'];

/** The client work: each logo painted on the forest green, with the work next to it. */
export function Clients() {
	return (
		<section
			id="clients"
			aria-labelledby="clients-title"
			className="paint wash-forest px-5 pt-16 pb-28 [--wash:linear-gradient(#173d30,#173d30)] md:px-10 md:pt-24 md:pb-40"
		>
			<PaintLight />
			<div className="mx-auto max-w-[1440px]">
				<h2
					id="clients-title"
					className="display text-[clamp(3.25rem,8vw,7rem)] leading-[0.86]"
				>
					<SplitWords text="Built *for.*" accentClassName="ink-dusk" />
				</h2>
				<ul className="mt-12 grid gap-x-16 md:mt-16 lg:grid-cols-2">
					{clients.map((c, i) => (
						<li
							key={c.name}
							className="grid gap-x-8 gap-y-5 border-t border-line py-8 sm:grid-cols-[13.5rem_1fr]"
						>
							<PaintedLogo
								logo={c.logo}
								paint={PAINTS[i % PAINTS.length]}
								size={3.75}
								className="max-w-full sm:mt-1"
							/>
							<div>
								<h3 className="display text-3xl">{c.name}</h3>
								<p className="mt-1 text-sm font-medium text-muted">
									via {c.via} ·{' '}
									<span className="font-mono text-xs">{c.years}</span>
								</p>
								<p className="mt-3 text-muted">{c.what}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
