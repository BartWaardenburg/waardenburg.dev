const services = [
	{
		title: 'Tech Lead',
		description: [
			'Leading teams, architecture decisions, code reviews, mentoring.',
			'Have scaled engineering teams up to 40 developers across multiple squads.',
		],
		quote: 'Good leadership is about making yourself unnecessary.',
	},
	{
		title: 'Full-Stack Development',
		description: [
			'React, Next.js, TypeScript on the front. Node, APIs and headless CMS on the back.',
			'Sanity, Contentful, Bloomreach, Statamic. Whatever fits the problem.',
		],
		quote: 'The stack should serve the product, not the other way around.',
	},
	{
		title: 'Design Systems',
		description: [
			'Component libraries that scale. Documentation that developers actually read.',
			'Keeping things consistent across teams without slowing anyone down.',
		],
		quote: 'A good design system is invisible until you need it.',
	},
	{
		title: 'Consulting',
		description: [
			'Technical audits. Stack decisions. Team assessments.',
			'Helping organizations understand where they are and where they could be.',
		],
		quote: 'Sometimes the best code is the code you decide not to write.',
	},
];

export function About() {
	return (
		<section id="about" className="px-6 py-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-3xl font-medium md:text-4xl">What I do</h2>
				<div className="space-y-16">
					{services.map((service) => (
						<div key={service.title} className="max-w-3xl">
							<h3 className="mb-6 text-2xl font-medium md:text-3xl">{service.title}</h3>
							<div className="mb-8 space-y-4 text-lg leading-relaxed text-neutral-600 md:text-xl">
								{service.description.map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}
							</div>
							<blockquote className="border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic md:text-xl">
								"{service.quote}"
							</blockquote>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
