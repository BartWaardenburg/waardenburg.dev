import type { Person, WebSite, WithContext } from 'schema-dts';

const personSchema: WithContext<Person> = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Bart Waardenburg',
	url: 'https://waardenburg.dev',
	image: 'https://waardenburg.dev/og-image.png',
	jobTitle: 'Full-stack Developer & Front-end Expert',
	worksFor: {
		'@type': 'Organization',
		name: 'Freelance / Consultant',
	},
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'The Hague',
		addressCountry: 'Netherlands',
	},
	sameAs: [
		'https://github.com/BartWaardenburg',
		'https://linkedin.com/in/bartwaardenburg',
		'https://twitter.com/bartwaardenburg',
	],
	knowsAbout: [
		'React',
		'Next.js',
		'TypeScript',
		'JavaScript',
		'Design Systems',
		'Front-end Development',
		'Full-stack Development',
		'Web Performance',
		'Accessibility',
	],
};

const websiteSchema: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'Bart Waardenburg',
	alternateName: 'waardenburg.dev',
	url: 'https://waardenburg.dev',
	description:
		'Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant.',
	author: {
		'@type': 'Person',
		name: 'Bart Waardenburg',
	},
	inLanguage: 'en-US',
};

export function JsonLd() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(personSchema),
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema),
				}}
			/>
		</>
	);
}
