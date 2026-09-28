// All copy on the site, in one place.

export const site = {
	name: 'Bart Waardenburg',
	email: 'bart@waardenburg.dev',
	location: 'The Hague, NL',
	github: 'https://github.com/BartWaardenburg',
	linkedin: 'https://www.linkedin.com/in/bartwaardenburg',
	availability: 'Building Fallow · open to DevRel & developer-tools roles',
};

export const nav = [
	{ href: '#fallow', label: 'Fallow' },
	{ href: '#isagentready', label: 'IsAgentReady' },
	{ href: '#open-source', label: 'Open source' },
	{ href: '#talks', label: 'Talks' },
	{ href: '#career', label: 'Career' },
];

export const hero = {
	eyebrow: ['Developer tools', 'Talks & teaching', 'The Hague, NL'],
	title: 'I build developer tools, and I teach people how to use them.',
	lede: 'Creator of Fallow, the Rust-powered codebase analyzer for TypeScript and JavaScript, built on Oxc. Builder of IsAgentReady. Twelve years of shipping for the web before that.',
};

export const manifesto =
	'For twelve years I built the web for other people: design systems, government portals, and apps hundreds of thousands of people use every day. Along the way I kept reaching for tools that did not exist yet. So now I build them, in the open, and I explain them from a stage, in docs, and in the terminal.';

export const fallow = {
	index: '01',
	name: 'Fallow',
	url: 'https://fallow.tools',
	repo: 'https://github.com/fallow-rs/fallow',
	tagline: 'Codebase intelligence for TypeScript and JavaScript.',
	intro:
		'Linters read your code one file at a time. Fallow reads the whole project graph and tells you what to delete, merge or refactor: dead code, duplication, complexity, circular dependencies, architecture boundaries and design-system drift. It ships as one Rust binary on the Oxc parser, needs no TypeScript compiler, and runs deterministically, with no AI inside the analyzer.',
	role: 'Creator & maintainer',
	steps: [
		{
			title: 'Your code is a graph.',
			body: 'Every import is an edge. Fallow resolves all of them across 100+ framework plugins, so it knows which files, exports and dependencies nothing reaches.',
		},
		{
			title: 'Fast enough to run on every keystroke.',
			body: 'Built in Rust on Oxc. It analyzes preact in 74 ms, 27× faster than knip, and it completes on repos where other tools give up, next.js included.',
		},
		{
			title: 'Where developers already are.',
			body: 'CLI, VS Code, Neovim, Zed, an LSP server, GitHub Actions, GitLab CI, Node bindings, and an MCP server so coding agents check the blast radius before they edit.',
		},
	],
	terminal: [
		{ kind: 'cmd', text: 'npx fallow audit' },
		{ kind: 'dim', text: 'Audit scope: 19 changed files vs HEAD~15' },
		{ kind: 'blank', text: '' },
		{ kind: 'head', text: '● Unused files (2)' },
		{ kind: 'path', text: '  packages/vitest/src/public/reporters.ts' },
		{
			kind: 'path',
			text: '  test/coverage-test/test/configuration-options.test-d.ts',
		},
		{ kind: 'blank', text: '' },
		{ kind: 'head', text: '● Circular dependencies (6)' },
		{ kind: 'path', text: '  packages/vitest/src/integrations/vi.ts' },
		{ kind: 'dim', text: '    → wait.ts → vi.ts' },
		{ kind: 'blank', text: '' },
		{
			kind: 'fail',
			text: '✗ dead code: 156 issues · complexity: 6 findings · duplication: 8 clone groups (1.05s)',
		},
	] as {
		kind: 'cmd' | 'dim' | 'blank' | 'head' | 'path' | 'fail';
		text: string;
	}[],
	bench: [
		{ repo: 'preact', fallow: 74, other: 2010 },
		{ repo: 'fastify', fallow: 64, other: 205 },
	],
	benchOther: 'knip 6',
	integrations: [
		'CLI',
		'VS Code',
		'Neovim',
		'Zed',
		'LSP',
		'MCP server',
		'GitHub Actions',
		'GitLab CI',
		'Node bindings',
		'Agent skills',
	],
	cloud:
		'Fallow Cloud adds production call counts per function, so teams can delete cold code with evidence. I also rendered its launch film from code: a deterministic WebGL renderer, every frame a function of the track time.',
	ecosystem: [
		{
			name: 'srcmap',
			url: 'https://github.com/fallow-rs/srcmap',
			body: 'Source map SDK in Rust. ECMA-426 compliant, 3 ns lookups, with WASM and NAPI bindings.',
		},
		{
			name: 'oxc-coverage-instrument',
			url: 'https://github.com/fallow-rs/oxc-coverage-instrument',
			body: 'Istanbul-compatible coverage instrumentation on the Oxc parser, byte-for-byte verified.',
		},
	],
};

export const isAgentReady = {
	index: '02',
	name: 'IsAgentReady',
	url: 'https://isagentready.com',
	tagline: 'Is your website ready for AI agents?',
	intro:
		'Search is splitting in two: people and agents. IsAgentReady scans any site against 41 checkpoints and tells you exactly what to fix so LLMs and agents can find, understand and act on it. Think of it as Lighthouse for answer engines.',
	scanUrl: 'https://your-site.com',
	categories: [
		{ name: 'AI Content Discovery', weight: 30, score: 92 },
		{ name: 'AI Search Signals', weight: 20, score: 84 },
		{ name: 'Content & Semantics', weight: 20, score: 88 },
		{ name: 'Agent Protocols', weight: 15, score: 71 },
		{ name: 'Security & Trust', weight: 15, score: 95 },
	],
	facts: [
		{ label: 'Checkpoints', value: '41' },
		{ label: 'Categories', value: '5' },
		{ label: 'Languages', value: 'EN · NL' },
	],
	stack: [
		'Elixir',
		'Phoenix LiveView',
		'Oban',
		'PostgreSQL',
		'Floki',
		'ChromicPDF',
	],
	surfaces: [
		{
			name: 'Web app',
			body: 'Letter grades, public rankings, and PDF reports.',
		},
		{ name: 'CLI', body: 'Scan from the terminal or in CI.' },
		{
			name: 'MCP server',
			body: 'Agents can scan sites and read the rankings.',
		},
		{ name: 'Agent skills', body: 'Fix the findings inside your editor.' },
	],
};

export interface OssProject {
	name: string;
	kind: string;
	body: string;
	url: string;
	tags: string[];
	stat?: string;
}

export const openSource: OssProject[] = [
	{
		name: 'Spaceship MCP',
		kind: 'MCP server',
		body: 'Domains, DNS and marketplace listings for AI assistants. 47 tools, 13 type-safe DNS record creators, listed in the official MCP Registry.',
		url: 'https://github.com/BartWaardenburg/spaceship-mcp',
		tags: ['TypeScript', 'Zod', 'MCP'],
	},
	{
		name: 'srcmap',
		kind: 'Rust SDK',
		body: 'Parse, generate, remap and compose source maps. Full ECMA-426 compliance, 8× faster than trace-mapping on single lookups.',
		url: 'https://github.com/fallow-rs/srcmap',
		tags: ['Rust', 'WASM', 'NAPI'],
	},
	{
		name: 'oxc-coverage-instrument',
		kind: 'Rust',
		body: 'A drop-in, Rust-native replacement for Istanbul instrumentation, built on the Oxc parser.',
		url: 'https://github.com/fallow-rs/oxc-coverage-instrument',
		tags: ['Rust', 'Oxc', 'Coverage'],
	},
	{
		name: 'IsAgentReady CLI & MCP',
		kind: 'CLI · MCP',
		body: 'Agent-readiness scans from the terminal, in CI, or inside Claude, Cursor and friends.',
		url: 'https://github.com/BartWaardenburg/isagentready-mcp',
		tags: ['TypeScript', 'MCP'],
	},
	{
		name: 'Dutch services MCP',
		kind: 'MCP servers',
		body: 'ANWB, KVK, PostNL and bol: Dutch APIs made usable by agents, with typed tools and validated inputs.',
		url: 'https://github.com/BartWaardenburg/kvk-mcp',
		tags: ['TypeScript', 'MCP', 'APIs'],
	},
	{
		name: 'Leveret',
		kind: 'Product',
		body: 'Precision tools for trail runners: high-fidelity topography meets training science. Product, design and full stack.',
		url: 'https://leveret.run',
		tags: ['Next.js', 'tRPC', 'Drizzle', 'MapTiler'],
	},
];

export interface Talk {
	title: string;
	event: string;
	year: string;
	body: string;
	url?: string;
	youtubeId?: string;
	image?: string;
	featured?: boolean;
}

export const talks: Talk[] = [
	{
		title: 'JavaScript tooling has a blind spot',
		event: 'dotJS · Paris',
		year: '2026',
		body: 'Linters, type checkers and agents all look at one file at a time. The questions that matter are codebase-wide. What we are missing, and how a project-graph view changes the way we write code with AI.',
		url: 'https://youtu.be/E2aFrZpnNbo',
		youtubeId: 'E2aFrZpnNbo',
		featured: true,
	},
	{
		title: 'Building a Design System',
		event: 'React Amsterdam',
		year: '2019',
		body: 'How we built the ANWB design system with (P)React, and how it let teams share code, stay consistent and ship faster.',
		url: 'https://www.youtube.com/watch?v=L2yOoxzXmw8',
		youtubeId: 'L2yOoxzXmw8',
		image: '/images/talks/design-system-1.png',
	},
	{
		title: 'The Three Layers of Testing',
		event: 'React Amsterdam',
		year: '2017',
		body: 'Static analysis, type checking and tests: how to layer them so you can ship with confidence, not a false sense of security.',
		url: 'https://www.youtube.com/watch?v=piZOil7OicI',
		youtubeId: 'piZOil7OicI',
		image: '/images/talks/testing-1.png',
	},
	{
		title: 'Building a Component Framework',
		event: 'Rotterdam The Hague Frontend',
		year: '2018',
		body: 'Component architecture for 200 front-end applications and 30 developers: patterns for flexible, composable components that scale.',
		url: '/talks/buildingacomponentframework.pdf',
		image: '/images/talks/component-framework-1.png',
	},
	{
		title: 'Hybrid App Development',
		event: 'Bloomreach CMS Connect',
		year: '2015',
		body: 'Shipping native-feeling apps from one web codebase, with content managed in a headless CMS.',
	},
];

export const teaching = [
	{ value: '5', label: 'talks on stage, most recently dotJS 2026' },
	{ value: '35', label: 'developers in the chapter I led at ANWB' },
	{ value: '7-day', label: 'front-end course I built and taught' },
];

export interface Role {
	years: string;
	org: string;
	role: string;
	body: string;
	tags: string[];
}

export const career: Role[] = [
	{
		years: '2025 —',
		org: 'Norday',
		role: 'Senior Full-stack Developer',
		body: 'RotterdamPas and VPRO ClubLees apps in React Native. Built Port of Rotterdam Innovation Bridge solo on Next.js 16 with Mapbox. Zeeuws Museum on Next.js, Statamic and Algolia.',
		tags: ['React Native', 'Next.js', 'Laravel', 'Mapbox'],
	},
	{
		years: '2024 —',
		org: 'ICTU · IND & RvIG',
		role: 'Senior Front-end Developer',
		body: 'A Vue 3 JSON Forms adapter library used in about 10 IND register frontends. Passport application flows for RvIG with Keycloak, NL Design System and audited WCAG AA.',
		tags: ['Vue 3', 'React', 'JSON Schema', 'WCAG AA'],
	},
	{
		years: '2022 — 2024',
		org: 'Sdu',
		role: 'Senior Front-end Developer',
		body: 'Led the rebuild of sdu.nl from scratch on Next.js and Contentful. Worked on a design system shared by many products, and CI/CD on GitHub Actions and AWS.',
		tags: ['Next.js', 'GraphQL', 'Contentful', 'AWS'],
	},
	{
		years: '2020 — 2024',
		org: 'Ministry of Health (VWS)',
		role: 'Tech Lead, Quarantine & Vaccination',
		body: 'The Dutch COVID platforms. A setup that took new Rijkshuisstijl sites live within weeks of starting, with OWASP, WCAG 2.1 audits and Kubernetes on OpenShift.',
		tags: ['React', 'Next.js', 'Sanity', 'Kubernetes'],
	},
	{
		years: '2019 — 2020',
		org: 'ANWB',
		role: 'Chapter Lead Front-end',
		body: 'Set the front-end vision for 35 developers. Designed a micro-frontend architecture over Bloomreach, Sitecore and Magento, and a high-traffic e-commerce platform.',
		tags: ['Leadership', 'Architecture', 'AWS'],
	},
	{
		years: '2016 — 2019',
		org: 'ANWB',
		role: 'Tech Lead, Design System & Traffic',
		body: 'Built the ANWB design system in Preact. Solution architect for the traffic and route planner apps, which serve about 300,000 visitors a day.',
		tags: ['Preact', 'Storybook', 'Design systems'],
	},
	{
		years: '2013 — 2016',
		org: 'Incentro',
		role: 'Front-end Consultant',
		body: 'Front-end specialist for KPN and ANWB. Designed and taught the 7-day front-end course for young professionals and the Advanced Front-End program.',
		tags: ['Teaching', 'AngularJS', 'React'],
	},
];

export const pillars = [
	{
		title: 'Build',
		body: 'Rust, TypeScript, Elixir. From an Oxc-based analyzer to Phoenix LiveView apps and MCP servers. I ship the thing I talk about.',
	},
	{
		title: 'Teach',
		body: 'Talks at dotJS and React Amsterdam, courses I designed, docs and agent skills. I make hard tooling ideas feel obvious.',
	},
	{
		title: 'Grow',
		body: 'Performance, SEO and AEO. IsAgentReady exists because I wanted to measure how products get found by people and by agents.',
	},
];
