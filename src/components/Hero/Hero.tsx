export interface HeroProps {
	greeting: string;
	taglines: string[];
	statement: string;
}

export function Hero({ greeting, taglines, statement }: HeroProps) {
	return (
		<section className="flex min-h-screen items-center px-6 pt-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<h1
						className="mb-8 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl"
						style={{ viewTransitionName: 'hero-title' }}
					>
						{greeting}
					</h1>
					<div className="space-y-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-2xl">
						{taglines.map((tagline, index) => (
							<p key={index}>{tagline}</p>
						))}
						<p className="pt-4 text-neutral-900 dark:text-neutral-50">
							{statement}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
