import {
	HomePageContent,
	type HomePageContentProps,
} from '@/components/HomePageContent';

const homePageContent: HomePageContentProps = {
	header: {
		logo: 'BW',
		logoHref: '/',
		navLinks: [
			{ href: '#work', label: 'Work' },
			{ href: '#speaking', label: 'Talks' },
			{ href: '#contact', label: 'Contact' },
		],
		skipLinkText: 'Skip to main content',
	},
	hero: {
		greeting: "Hello. I'm Bart.",
		taglines: [
			'Full-stack developer. Front-end expert.',
			'Sometimes tech lead, sometimes deep in the code.',
		],
		statement: 'I build things that work well for the people using them.',
	},
	marquees: {
		work: 'BUILDING PRODUCTS THAT MATTER',
		about: 'FROM CODE TO LEADERSHIP',
		speaking: "SHARING WHAT I'VE LEARNED",
		contact: "LET'S BUILD SOMETHING TOGETHER",
	},
	work: {
		title: 'Selected Work',
		projects: [
			{
				year: '2026',
				title: 'Leveret: Precision Tools for Trail Runners',
				description: [
					'A running app for serious outdoor athletes. High-fidelity topography meets training science.',
					"I'm building everything: product vision, design, front-end, back-end, infrastructure.",
				],
				quote:
					'Leveret treats trail running like the technical discipline it is — not a road run with hills.',
				link: { url: 'leveret.run', label: 'leveret.run' },
			},
			{
				year: '2025',
				title: 'ICTU: Immigration & Identity Systems',
				description: [
					'Building critical digital infrastructure for the Dutch government.',
					'Working through ICTU on systems for IND (Immigration & Naturalisation Service) and RViG (National Office for Identity Data).',
				],
				quote:
					"Not public, but the kind of work where reliability and security aren't optional.",
			},
			{
				year: '2025',
				title: 'Zeeuws Museum: Digital Experience',
				description: [
					"Website for the museum in Middelburg's medieval abbey.",
					'30,000+ objects of Zeeland history. Built with Norday. Headless CMS architecture.',
				],
				quote:
					'Where centuries of Zeeland history meet modern web performance.',
				link: { url: 'zeeuwsmuseum.nl', label: 'zeeuwsmuseum.nl' },
			},
			{
				year: '2026',
				title: "Port of Rotterdam: Europe's Largest Port",
				description: [
					'Web platform for the port authority.',
					'41 square miles. 30,000 vessels per year. 385,000 jobs. 6.2% of Dutch GDP.',
				],
				quote:
					'Building with Norday for one of the most economically significant organizations in NL.',
			},
			{
				year: '2026',
				title: 'Rotterdam Inclusief: Inclusive Employment',
				description: [
					"Platform for the City of Rotterdam's employment initiative.",
					'Helping 2,500+ people with support needs find meaningful work.',
				],
				quote:
					'Technology that creates real opportunities for people who need them most.',
			},
			{
				year: '2021',
				title: 'SDU: Legal Publishing Platform',
				description: [
					'Senior Full Stack Developer building complex search and discovery interfaces.',
					'React, Next.js, Apollo GraphQL. Working on the design system used across all products.',
				],
				quote:
					'Complex information architecture for professionals who need precision.',
				link: { url: 'sdu.nl', label: 'sdu.nl' },
			},
			{
				year: '2020',
				title: 'Ministerie van VWS: Covid Response Platforms',
				description: [
					'Tech Lead for Team Quarantine & Vaccination.',
					'Built a platform for rapid website delivery — live within weeks of starting development.',
				],
				quote:
					'When the whole country needed information fast, we shipped it. Accessible to everyone.',
			},
			{
				year: '2013',
				title: 'ANWB: 7 Years, Multiple Roles',
				description: [
					'From front-end developer to Chapter Lead for 35+ developers over 7 years.',
					'Built the award-winning route planner (300,000 daily visits). Created the design system.',
				],
				quote:
					'Where I grew from developer to tech lead. 3.5 million members. High-volume traffic apps.',
			},
		],
		defaultMedia: [
			{
				type: 'image' as const,
				alt: 'Project screenshot',
				caption: 'Project overview',
			},
			{
				type: 'image' as const,
				alt: 'Technical details',
				caption: 'Technical implementation',
			},
			{
				type: 'image' as const,
				alt: 'Final result',
				caption: 'Final result',
			},
		],
	},
	about: {
		title: 'What I do',
		services: [
			{
				title: 'Tech Lead',
				description:
					'Leading teams, architecture decisions, code reviews, mentoring. Have scaled engineering teams up to 40 developers across multiple squads.',
				quote: 'Good leadership is about making yourself unnecessary.',
				keywords: ['Architecture', 'Mentoring', 'Scale'],
			},
			{
				title: 'Full-Stack Development',
				description:
					'React, Next.js, TypeScript on the front. Node, APIs and headless CMS on the back. Whatever fits the problem.',
				quote: 'The stack should serve the product, not the other way around.',
				keywords: ['React', 'TypeScript', 'Node'],
			},
			{
				title: 'Design Systems',
				description:
					'Component libraries that scale. Documentation that developers actually read. Keeping things consistent across teams.',
				quote: 'A good design system is invisible until you need it.',
				keywords: ['Components', 'Tokens', 'Scale'],
			},
			{
				title: 'Consulting',
				description:
					'Technical audits. Stack decisions. Team assessments. Helping organizations understand where they are and where they could be.',
				quote: 'Sometimes the best code is the code you decide not to write.',
				keywords: ['Audits', 'Strategy', 'Growth'],
			},
		],
	},
	speaking: {
		title: 'Talks',
		talks: [
			{
				title: 'Building a Design System',
				venue: 'React Amsterdam',
				description: [
					"How we built ANWB's design system with (P)React.",
					'Sharing code across teams, consistency, component architecture.',
				],
				quote: 'A design system is a product, not a project.',
			},
			{
				title: 'The Three Layers of Testing',
				venue: 'React Amsterdam',
				description: [
					'Static analysis, type checking, and testing strategies for shipping quality code regularly.',
					'How to structure your testing pyramid and when to use each layer.',
				],
				quote: 'Tests should give you confidence, not false security.',
			},
			{
				title: 'Building a Component Framework',
				venue: 'Rotterdam The Hague Frontend Group',
				description: [
					'Deep dive into component library architecture.',
					'Patterns for building flexible, composable components that scale.',
				],
				quote: 'Good components disappear into the background.',
			},
			{
				title: 'Hybrid App Development',
				venue: 'Bloomreach CMS Connect',
				description: [
					'Mobile development approaches with web technologies.',
					'When to go native, when to go hybrid, and how to make the most of both.',
				],
				quote: 'The best technology is the one that ships.',
			},
		],
	},
	contact: {
		title: "Let's chat.",
		intro: "Whether it's a project, a question, or just talking front-end.",
		email: 'bart@waardenburg.dev',
		emailLabel: 'Drop me a line',
		socialIntro: 'Find me on',
		socialLinks: [
			{ url: 'https://github.com/BartWaardenburg', label: 'GitHub' },
			{ url: 'https://linkedin.com/in/bartwaardenburg', label: 'LinkedIn' },
		],
	},
	footer: {
		name: 'Bart Waardenburg',
		location: 'The Hague, Netherlands',
	},
};

export default function HomePage() {
	return <HomePageContent {...homePageContent} />;
}
