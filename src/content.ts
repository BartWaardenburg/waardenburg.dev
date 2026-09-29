// All copy on the site, in one place.

export const site = {
	name: 'Bart Waardenburg',
	email: 'bart@waardenburg.dev',
	location: 'The Hague, NL',
	github: 'https://github.com/BartWaardenburg',
	linkedin: 'https://www.linkedin.com/in/bartwaardenburg',
	twitter: 'https://x.com/bartwaardenburg',
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
	name: 'Fallow',
	url: 'https://fallow.tools',
	repo: 'https://github.com/fallow-rs/fallow',
	tagline: 'Codebase intelligence for TypeScript and JavaScript.',
	intro:
		'Linters read your code one file at a time. Fallow reads the whole project graph and tells you what to delete, merge or refactor: dead code, duplication, complexity, circular dependencies, architecture boundaries and design-system drift. It ships as one Rust binary on the Oxc parser, needs no TypeScript compiler, and runs deterministically, with no AI inside the analyzer.',
	steps: [
		{
			title: 'Your code is a graph.',
			body: 'Every import is an edge. Fallow resolves all of them across 100+ framework plugins, so it knows which files, exports and dependencies nothing reaches.',
		},
		{
			title: 'One binary. Six kinds of answers.',
			body: 'Built in Rust on Oxc, with no TypeScript compiler and no Node.js runtime. Deterministic output with typed JSON contracts, so CI and coding agents can act on it without guessing.',
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
	finds: [
		{
			name: 'Dead code',
			body: 'Unused files, exports, types, members and dependencies',
		},
		{ name: 'Duplication', body: 'Clone groups across JS, TS and stylesheets' },
		{
			name: 'Complexity',
			body: 'Hotspots, with a 0–100 health score per file',
		},
		{ name: 'Cycles', body: 'Circular imports and re-export loops' },
		{ name: 'Boundaries', body: 'Layered, hexagonal and feature-sliced rules' },
		{ name: 'Design drift', body: 'Styling that escapes the design system' },
	],
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
	ecosystem: [
		{
			label: 'Production layer',
			name: 'Fallow Cloud',
			url: 'https://fallow.cloud',
			body: 'Production call counts per function, so teams can delete cold code with evidence.',
		},
		{
			label: 'Also in the toolchain',
			name: 'srcmap',
			url: 'https://github.com/fallow-rs/srcmap',
			body: 'Source map SDK in Rust. ECMA-426 compliant, 3 ns lookups, with WASM and NAPI bindings.',
		},
		{
			label: 'Also in the toolchain',
			name: 'oxc-coverage-instrument',
			url: 'https://github.com/fallow-rs/oxc-coverage-instrument',
			body: 'Istanbul-compatible coverage instrumentation on the Oxc parser, byte-for-byte verified.',
		},
	],
};

export const isAgentReady = {
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
	wide?: boolean;
}

// Only public, MIT-licensed repositories.
export const openSource: OssProject[] = [
	{
		name: 'MCP servers',
		kind: '8 servers · MCP',
		body: 'Real APIs turned into typed, validated tools that coding agents can use safely. Spaceship alone has 47 tools and is listed in the official MCP Registry.',
		url: 'https://github.com/BartWaardenburg?tab=repositories&q=mcp',
		tags: [
			'Spaceship',
			'IsAgentReady',
			'srcmap',
			'Recraft',
			'ANWB',
			'KVK',
			'PostNL',
			'bol',
		],
		wide: true,
	},
	{
		name: 'srcmap',
		kind: 'Rust SDK',
		body: 'Parse, generate, remap and compose source maps. Full ECMA-426 compliance, with WASM and NAPI bindings.',
		url: 'https://github.com/fallow-rs/srcmap',
		tags: ['Rust', 'WASM', 'NAPI'],
	},
	{
		name: 'oxc-coverage-instrument',
		kind: 'Rust',
		body: 'Istanbul-compatible coverage instrumentation on the Oxc parser, verified byte for byte against the reference.',
		url: 'https://github.com/fallow-rs/oxc-coverage-instrument',
		tags: ['Rust', 'Oxc', 'Coverage'],
	},
	{
		name: 'Agent skills',
		kind: 'Skills',
		body: 'Skills that teach Claude Code, Cursor, Codex and 30+ other agents to use Fallow, IsAgentReady and Spaceship well.',
		url: 'https://github.com/fallow-rs/fallow-skills',
		tags: ['Agent Skills', 'Markdown'],
	},
	{
		name: 'IsAgentReady CLI',
		kind: 'CLI',
		body: 'Agent-readiness scans from the terminal or in CI, with scores, grades and recommendations.',
		url: 'https://github.com/BartWaardenburg/isagentready-cli',
		tags: ['TypeScript', 'npm'],
	},
];

export interface Contribution {
	project: string;
	what: string;
	year: string;
	url: string;
}

// Merged pull requests to other projects, newest first.
export const contributions: Contribution[] = [
	{
		project: 'Turso · libsql-client-ts',
		what: 'Fixed silent data loss when using transactions on in-memory databases',
		year: '2026',
		url: 'https://github.com/tursodatabase/libsql-client-ts/pull/342',
	},
	{
		project: 'Vitest',
		what: 'Added the coverage.instrumenter option, so Istanbul coverage can use native instrumenters',
		year: '2026',
		url: 'https://github.com/vitest-dev/vitest/pull/10119',
	},
	{
		project: 'vite-plugin-istanbul',
		what: 'Support for a custom instrumenter',
		year: '2026',
		url: 'https://github.com/iFaxity/vite-plugin-istanbul/pull/402',
	},
	{
		project: 'Homebrew',
		what: 'Added the fallow formula to homebrew-core',
		year: '2026',
		url: 'https://github.com/Homebrew/homebrew-core/pull/280721',
	},
	{
		project: 'Statamic · Eloquent driver',
		what: 'Fixed stale Blink caches after saves and taxonomy null caching',
		year: '2026',
		url: 'https://github.com/statamic/eloquent-driver/pull/586',
	},
	{
		project: 'Preact SSR prepass',
		what: 'Skip effects during prepass so components with layout effects render on the server',
		year: '2020',
		url: 'https://github.com/preactjs/preact-ssr-prepass/pull/6',
	},
	{
		project: 'Storybook',
		what: 'Added Preact support: the @storybook/preact package',
		year: '2018',
		url: 'https://github.com/storybookjs/storybook/pull/4912',
	},
];

export interface Talk {
	title: string;
	event: string;
	place: string;
	date: string;
	body: string;
	link: { url: string; label: string };
	youtubeId?: string;
	featured?: boolean;
	upcoming?: boolean;
}

export const talks: Talk[] = [
	{
		title: 'JavaScript tooling has a blind spot',
		event: 'dotJS',
		place: 'Paris',
		date: 'Sep 2026',
		body: 'Linters check files and TypeScript checks types, but nothing checks the codebase as a whole. Now that agents write more of our code, the questions that matter are codebase-wide: what is dead, what is duplicated, what crosses a boundary. A look at that blind spot, and at how a project-graph view closes it.',
		link: { url: 'https://youtu.be/E2aFrZpnNbo', label: 'Watch on YouTube' },
		youtubeId: 'E2aFrZpnNbo',
		featured: true,
	},
	{
		title: 'Agentic Engineering for React Teams: Give Your Coding Agent a Map',
		event: 'React Advanced',
		place: 'London',
		date: 'Oct 2026',
		body: 'Generating a React component takes seconds. Changing a real React or Next.js codebase safely does not. How codebase intelligence gives agents the system context to know what is dead, what is duplicated and which boundaries a refactor crosses.',
		link: { url: 'https://reactadvanced.com/', label: 'Event page' },
		upcoming: true,
	},
	{
		title: 'Codebase intelligence with Fallow',
		event: 'Frontmania',
		place: 'Netherlands',
		date: 'Oct 2026',
		body: 'What it takes to keep a TypeScript or JavaScript codebase healthy when more of it is written by agents, with Fallow as the working example.',
		link: { url: 'https://frontmania.com/', label: 'Event page' },
		upcoming: true,
	},
	{
		title: 'Fast Code Generation Is Easy. Safe System-level Change Is Not.',
		event: 'AI Coding Summit',
		place: 'London',
		date: 'Jul 2026',
		body: 'AI tools write good local diffs but miss repo-wide truth: dead exports, duplicated logic, boundary violations and creeping complexity. A workflow where the agent generates, deterministic analysis checks, findings flow back through CLI and MCP, and CI gates the drift.',
		link: {
			url: 'https://gitnation.com/contents/fast-code-generation-is-easy-safe-system-level-change-is-not',
			label: 'Watch on GitNation',
		},
	},
	{
		title:
			"Vibe Coding Doesn't Scale: Deterministic Tooling for Agentic Engineering",
		event: 'FrontValue Meetup',
		place: 'Netherlands',
		date: 'Jun 2026',
		body: 'Vibe coding works until the codebase gets big. Why agent-written code needs deterministic checks, and what those checks look like in a real team.',
		link: {
			url: 'https://www.meetup.com/frontvalue/events/314972778/',
			label: 'Event page',
		},
	},
	{
		title: 'Building a Design System with (P)React',
		event: 'React Amsterdam Meetup',
		place: 'Amsterdam',
		date: 'Feb 2019',
		body: 'The story of the ANWB design system: moving many front-end applications onto one shared component architecture, the process behind it, and the technical choices along the way.',
		link: {
			url: 'https://www.youtube.com/watch?v=L2yOoxzXmw8',
			label: 'Watch on YouTube',
		},
		youtubeId: 'L2yOoxzXmw8',
	},
	{
		title: 'React and the Three Layers of Testing',
		event: 'React Amsterdam Meetup',
		place: 'Amsterdam',
		date: '2017',
		body: 'Static analysis, type checking and tests: how to layer them in a React codebase so you can ship often with real confidence instead of false security.',
		link: {
			url: 'https://www.youtube.com/watch?v=piZOil7OicI',
			label: 'Watch on YouTube',
		},
		youtubeId: 'piZOil7OicI',
	},
	{
		title: 'Creating a (P)React Component Library',
		event: 'Rotterdam The Hague Front-end Meetup',
		place: 'The Hague',
		date: '2018',
		body: 'Component architecture for 200 front-end applications and 30 developers: patterns for flexible, composable components that scale across teams.',
		link: {
			url: '/talks/buildingacomponentframework.pdf',
			label: 'Slides (PDF)',
		},
	},
];

export const teaching = [
	{ value: '6', label: 'talks given, from meetups to dotJS' },
	{ value: '2', label: 'more this autumn: React Advanced and Frontmania' },
	{ value: '35', label: 'developers in the chapter I led at ANWB' },
];

/** Official logo files in public/logos, drawn by the particle field. */
export const logos = {
	anwb: '/logos/anwb.svg',
	incentro: '/logos/incentro.svg',
	sdu: '/logos/sdu.svg',
	rijksoverheid: '/logos/rijksoverheid.svg',
	ind: '/logos/ind.svg',
	rvig: '/logos/rvig.png',
	ictu: '/logos/ictu.svg',
	norday: '/logos/norday.svg',
	portofrotterdam: '/logos/portofrotterdam.svg',
	zeeuwsmuseum: '/logos/zeeuwsmuseum.svg',
	vpro: '/logos/vpro.svg',
	rotterdampas: '/logos/rotterdampas.svg',
	acorn: '/logos/acorn.svg',
	oorlogsbronnen: '/logos/oorlogsbronnen.svg',
	rotterdam: '/logos/rotterdam.svg',
	nldesignsystem: '/logos/nldesignsystem.svg',
	fallow: '/logos/fallow.svg',
	isagentready: '/logos/isagentready.svg',
} as const;

/** How a logo's dark colours should render on the dark particle canvas. */
export const logoTone: Partial<Record<string, 'dim' | 'text'>> = {
	[logos.rijksoverheid]: 'text',
	[logos.ind]: 'text',
	[logos.rvig]: 'text',
};

export interface Client {
	name: string;
	logo: string;
	what: string;
	via: string;
	years: string;
}

export const clients: Client[] = [
	{
		name: 'Port of Rotterdam',
		logo: logos.portofrotterdam,
		what: 'Innovation Bridge: an interactive map of the port’s innovation ecosystem with a strategy canvas, built solo on Next.js 16, Mapbox and a Statamic back end.',
		via: 'Norday',
		years: '2025 — 2026',
	},
	{
		name: 'Acorn',
		logo: logos.acorn,
		what: 'A new website for Acorn, which helps smallholder farmers turn agroforestry into carbon income.',
		via: 'Norday',
		years: '2026',
	},
	{
		name: 'Oorlogsbronnen',
		logo: logos.oorlogsbronnen,
		what: 'The national WWII sources platform, linking millions of records into life stories for more than 750,000 people.',
		via: 'Norday',
		years: '2025 — 2026',
	},
	{
		name: 'Rotterdam Inclusief',
		logo: logos.rotterdam,
		what: 'The Rotterdam Inclusief website for the municipality, on Next.js with the Rotterdam Design System.',
		via: 'Norday',
		years: '2025',
	},
	{
		name: 'NL Design System',
		logo: logos.nldesignsystem,
		what: 'The new Rijkshuisstijl as open-source NL Design System components and design tokens, for central-government websites and apps.',
		via: 'Norday',
		years: '2025 — 2026',
	},
	{
		name: 'Zeeuws Museum',
		logo: logos.zeeuwsmuseum,
		what: 'The museum’s website: a Next.js front end on Statamic, with Algolia-powered search through the collection.',
		via: 'Norday',
		years: '2025',
	},
	{
		name: 'VPRO',
		logo: logos.vpro,
		what: 'ClubLees, a reading app for children, in React Native with an immersive reader module.',
		via: 'Norday',
		years: '2025 — 2026',
	},
	{
		name: 'RotterdamPas',
		logo: logos.rotterdampas,
		what: 'The RotterdamPas app for iOS and Android, built in React Native.',
		via: 'Norday',
		years: '2025 — 2026',
	},
	{
		name: 'IND',
		logo: logos.ind,
		what: 'A Vue 3 JSON Forms adapter library and form runtime used across about ten register front ends of the Immigration and Naturalisation Service.',
		via: 'ICTU',
		years: '2025 —',
	},
	{
		name: 'RvIG',
		logo: logos.rvig,
		what: 'Accessible passport and travel-document application flows, with Keycloak and the NL Design System, audited to WCAG AA.',
		via: 'ICTU',
		years: '2024 —',
	},
];

export interface Role {
	years: string;
	org: string;
	logo: string;
	role: string;
	body: string;
	tags: string[];
}

export const career: Role[] = [
	{
		years: '2025 — 2026',
		org: 'Norday',
		logo: logos.norday,
		role: 'Senior Full-stack Developer',
		body: 'Built Port of Rotterdam Innovation Bridge solo, and new sites for Acorn, Zeeuws Museum and Rotterdam Inclusief. Worked on Oorlogsbronnen, the RotterdamPas and VPRO ClubLees apps, and the new Rijkshuisstijl in NL Design System.',
		tags: ['Next.js', 'React Native', 'NL Design System', 'Laravel'],
	},
	{
		years: '2024 —',
		org: 'Dutch Government',
		logo: logos.ictu,
		role: 'Senior Front-end Developer via ICTU, for the IND and RvIG',
		body: 'Front ends Dutch residents rely on. A Vue 3 JSON Forms adapter library used in about 10 register front ends at the Immigration and Naturalisation Service. Passport and travel-document application flows for RvIG, with Keycloak, NL Design System and audited WCAG AA accessibility.',
		tags: ['Vue 3', 'React', 'JSON Schema', 'WCAG AA'],
	},
	{
		years: '2022 — 2024',
		org: 'Sdu',
		logo: logos.sdu,
		role: 'Senior Front-end Developer',
		body: 'Led the rebuild of sdu.nl from scratch on Next.js and Contentful. Worked on a design system shared by many products, and CI/CD on GitHub Actions and AWS.',
		tags: ['Next.js', 'GraphQL', 'Contentful', 'AWS'],
	},
	{
		years: '2020 — 2024',
		org: 'Ministry of Health (VWS)',
		logo: logos.rijksoverheid,
		role: 'Tech Lead, Quarantine & Vaccination',
		body: 'The Dutch COVID platforms. A setup that took new Rijkshuisstijl sites live within weeks of starting, with OWASP, WCAG 2.1 audits and Kubernetes on OpenShift.',
		tags: ['React', 'Next.js', 'Sanity', 'Kubernetes'],
	},
	{
		years: '2019 — 2020',
		org: 'ANWB',
		logo: logos.anwb,
		role: 'Chapter Lead Front-end',
		body: 'Set the front-end vision for 35 developers. Designed a micro-frontend architecture over Bloomreach, Sitecore and Magento, and a high-traffic e-commerce platform.',
		tags: ['Leadership', 'Architecture', 'AWS'],
	},
	{
		years: '2016 — 2019',
		org: 'ANWB',
		logo: logos.anwb,
		role: 'Tech Lead, Design System & Traffic',
		body: 'Built the ANWB design system in Preact. Solution architect for the traffic and route planner apps, which serve about 300,000 visitors a day.',
		tags: ['Preact', 'Storybook', 'Design systems'],
	},
	{
		years: '2013 — 2016',
		org: 'Incentro',
		logo: logos.incentro,
		role: 'Front-end Consultant',
		body: 'Front-end specialist for ANWB. Designed and taught the 7-day front-end course for young professionals and the Advanced Front-End program.',
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
		body: 'Talks at dotJS, React Advanced and React Amsterdam, plus docs and agent skills. I try to make hard tooling ideas feel obvious.',
	},
	{
		title: 'Grow',
		body: 'Performance, SEO and AEO. IsAgentReady exists because I wanted to measure how products get found by people and by agents.',
	},
];
