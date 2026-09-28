import type { Person, WebSite, WithContext } from 'schema-dts';

const personSchema: WithContext<Person> = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Bart Waardenburg',
	url: 'https://waardenburg.dev',
	image: 'https://waardenburg.dev/og-image.png',
	jobTitle: 'Creator of Fallow · Developer tools engineer',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'The Hague',
		addressCountry: 'NL',
	},
	sameAs: [
		'https://github.com/BartWaardenburg',
		'https://linkedin.com/in/bartwaardenburg',
		'https://twitter.com/bartwaardenburg',
		'https://github.com/fallow-rs/fallow',
		'https://isagentready.com',
	],
	knowsAbout: [
		'Developer tools',
		'Static analysis',
		'Rust',
		'Oxc',
		'Developer relations',
		'Answer engine optimization',
		'Model Context Protocol',
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
		'Bart Waardenburg builds developer tools (Fallow, IsAgentReady), speaks at conferences like dotJS, and has shipped for the web for twelve years.',
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
