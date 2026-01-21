import {
	HomePageContent,
	type HomePageContentProps,
} from '@/components/HomePageContent';

const homePageContent: HomePageContentProps = {
	header: {
		logo: 'BW',
		logoHref: '/',
		navLinks: [
			{ href: '#work', label: 'Work', showOnMobile: false },
			{ href: '#speaking', label: 'Talks', showOnMobile: false },
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
				media: [
					{
						type: 'image' as const,
						src: '/images/projects/leveret-hero.png',
						alt: 'Leveret.run homepage showing dramatic typography and trail running focus',
						caption: 'Landing page — precision tools for the modern alpinist',
					},
					{
						type: 'code' as const,
						language: 'typescript',
						filename: 'lib/trpc-client.ts',
						caption: 'Type-safe API with tRPC — end-to-end TypeScript',
						code: `import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/server/trpc/routers';
import superjson from 'superjson';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      transformer: superjson,
    }),
  ],
});

// Usage in components
const workouts = await trpc.workouts.getAll.query();
const route = await trpc.routes.getById.query({ id });`,
					},
					{
						type: 'code' as const,
						language: 'json',
						filename: 'package.json',
						caption: 'Modern stack — Next.js 16, React 19, tRPC, Drizzle ORM',
						code: `{
  "dependencies": {
    "next": "^16.0.10",
    "react": "^19.2.3",
    "@trpc/client": "^11.7.2",
    "@trpc/react-query": "^11.7.2",
    "@trpc/server": "^11.7.2",
    "@tanstack/react-query": "^5.90.12",
    "drizzle-orm": "^0.45.1",
    "@neondatabase/serverless": "^1.0.2",
    "next-auth": "5.0.0-beta.30",
    "@maptiler/sdk": "^3.9.0",
    "zod": "^4.1.13"
  }
}`,
					},
				],
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
				media: [
					{
						type: 'quote' as const,
						quote:
							'Internal tooling that saves caseworkers hours every day. Complex forms made simple through smart validation and auto-save.',
						caption: 'Efficiency tools for government employees',
					},
					{
						type: 'code' as const,
						language: 'vue',
						filename: 'DynamicForm.vue',
						caption: 'Dynamic forms with JSON Forms and Vue 3',
						code: `<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import { useFormStore } from '@/stores/form';

const props = defineProps<{
  schema: JsonSchema;
  uischema: UISchemaElement;
}>();

const store = useFormStore();
const data = ref(store.formData);

const handleChange = ({ data }) => {
  store.updateForm(data);
  store.autoSave();
};
</script>

<template>
  <JsonForms
    :data="data"
    :schema="props.schema"
    :uischema="props.uischema"
    :renderers="vanillaRenderers"
    @change="handleChange"
  />
</template>`,
					},
					{
						type: 'quote' as const,
						quote:
							'The best internal tools are invisible. Caseworkers focus on people, not software.',
						author: 'Product principle',
						caption: 'Tools that get out of the way',
					},
				],
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
				media: [
					{
						type: 'image' as const,
						src: '/images/projects/zeeuwsmuseum-hero.png',
						alt: 'Zeeuws Museum homepage featuring the DARN exhibition',
						caption:
							'Homepage — showcasing current exhibitions and collections',
					},
					{
						type: 'code' as const,
						language: 'typescript',
						filename: 'components/CollectionSearch.tsx',
						caption:
							'Instant search across 30,000+ museum objects with Algolia',
						code: `import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';

const client = algoliasearch(APP_ID, SEARCH_KEY);

export const CollectionSearch = () => (
  <InstantSearch searchClient={client} indexName="collection">
    <SearchBox placeholder="Zoek in de collectie..." />
    <Hits hitComponent={CollectionItem} />
  </InstantSearch>
);

const CollectionItem = ({ hit }) => (
  <article className="collection-item">
    <img src={hit.imageUrl} alt={hit.title} />
    <h3>{hit.title}</h3>
    <p>{hit.period}</p>
  </article>
);`,
					},
					{
						type: 'code' as const,
						language: 'json',
						filename: 'package.json',
						caption: 'Next.js 15, React 19, Algolia search, Styled Components',
						code: `{
  "dependencies": {
    "next": "15.3.8",
    "react": "^19.1.0",
    "styled-components": "^6.1.17",
    "framer-motion": "^12.7.5",
    "algoliasearch": "^5.46.0",
    "react-instantsearch": "^7.21.0",
    "next-intl": "^4.0.3",
    "jotai": "^2.12.3",
    "swiper": "^11.0.7"
  }
}`,
					},
				],
			},
			{
				year: '2025',
				title: 'Amictus.ai: Custom AI Solutions',
				description: [
					'Building AI-powered solutions for businesses and government organizations.',
					'From knowledge systems to process automation. Cloud and on-premises deployments.',
				],
				quote:
					'AI as powerful support for people and processes — not technology for its own sake.',
				link: { url: 'amictus.ai', label: 'amictus.ai' },
				media: [
					{
						type: 'image' as const,
						src: '/images/projects/amictus-hero.png',
						alt: 'Amictus.ai homepage with gradient background and AI solutions tagline',
						caption: 'Landing page — breakthrough AI solutions for tomorrow',
					},
					{
						type: 'code' as const,
						language: 'typescript',
						filename: 'api/chat/route.ts',
						caption: 'Streaming AI responses with React Server Components',
						code: `// Server-side AI streaming with Vercel AI SDK
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { messages, systemPrompt } = await request.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    messages,
    maxTokens: 4096,
  });

  return result.toDataStreamResponse();
}`,
					},
					{
						type: 'code' as const,
						language: 'json',
						filename: 'package.json',
						caption: 'Next.js 15, React 19, Tailwind, Motion, Zod validation',
						code: `{
  "dependencies": {
    "next": "15.1.7",
    "react": "19.0.0",
    "tailwind-merge": "2.6.0",
    "motion": "12.4.7",
    "react-hook-form": "7.54.2",
    "@hookform/resolvers": "4.1.1",
    "zod": "3.24.2",
    "resend": "4.1.2",
    "next-themes": "0.4.4"
  }
}`,
					},
				],
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
				media: [
					{
						type: 'image' as const,
						src: '/images/projects/sdu-hero.png',
						alt: 'Lefebvre SDU homepage showing legal publishing platform',
						caption: 'Homepage — making legal information accessible',
					},
					{
						type: 'code' as const,
						language: 'typescript',
						filename: 'lib/contentful.ts',
						caption: 'GraphQL queries for legal content from Contentful CMS',
						code: `import { gql } from '@apollo/client';

export const GET_ARTICLE = gql\`
  query GetArticle($slug: String!) {
    articleCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publicationDate
        content {
          json
          links {
            assets { block { url title } }
          }
        }
        relatedArticlesCollection {
          items { title slug }
        }
      }
    }
  }
\`;

// Usage with Apollo Client
const { data } = useQuery(GET_ARTICLE, {
  variables: { slug: 'arbeidsrecht-2024' },
});`,
					},
					{
						type: 'code' as const,
						language: 'json',
						filename: 'package.json',
						caption: 'React 18, Apollo GraphQL, Styled Components, Contentful',
						code: `{
  "dependencies": {
    "@apollo/client": "^3.8.0",
    "graphql": "^16.8.0",
    "contentful": "^10.6.0",
    "@contentful/rich-text-react-renderer": "^15.19.0",
    "styled-components": "^5.3.6",
    "framer-motion": "^10.12.16",
    "zustand": "^4.3.6"
  }
}`,
					},
				],
			},
			{
				year: '2020',
				title: 'Ministerie van VWS: Covid Response Platforms',
				description: [
					'Tech Lead for Team Quarantine & Vaccination.',
					'Built 5 public-facing websites for rapid information delivery — live within weeks of starting development.',
				],
				quote:
					'When the whole country needed information fast, we shipped it. Accessible to everyone.',
				media: [
					{
						type: 'image' as const,
						src: '/images/projects/vws-quarantainecheck.png',
						alt: 'Quarantainecheck.rijksoverheid.nl - Covid quarantine check tool',
						caption:
							'Quarantainecheck.rijksoverheid.nl — one of 5 platforms we delivered',
					},
					{
						type: 'code' as const,
						language: 'astro',
						filename: 'pages/[lang]/quarantine.astro',
						caption: 'Multi-language pages with Astro and Sanity CMS',
						code: `---
import { sanityClient } from '@/lib/sanity';
import Layout from '@/layouts/Layout.astro';
import RichText from '@/components/RichText.astro';

const { lang } = Astro.params;

const page = await sanityClient.fetch(\`
  *[_type == "quarantinePage" && language == $lang][0] {
    title,
    content,
    lastUpdated,
    "countries": *[_type == "country"] | order(name)
  }
\`, { lang });
---

<Layout title={page.title}>
  <main>
    <h1>{page.title}</h1>
    <RichText content={page.content} />
    <CountrySelector countries={page.countries} client:load />
  </main>
</Layout>`,
					},
					{
						type: 'code' as const,
						language: 'json',
						filename: 'package.json',
						caption: 'Astro 3, Sanity CMS, i18n, Islands Architecture',
						code: `{
  "dependencies": {
    "astro": "^3.0.0",
    "@astrojs/react": "^3.0.0",
    "@sanity/client": "^6.4.0",
    "@sanity/image-url": "^1.0.2",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@astrojs/sitemap": "^3.0.0",
    "astro-i18n-aut": "^0.5.0"
  }
}`,
					},
				],
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
				media: [
					{
						type: 'quote' as const,
						quote:
							'300,000 daily users planning their routes. When the system goes down, people notice.',
						author: 'Route Planner',
						role: 'Award-winning application',
						caption: 'High-traffic, high-stakes development',
					},
					{
						type: 'code' as const,
						language: 'typescript',
						filename: 'design-system/Button.tsx',
						caption:
							'Design system components — consistency across 35+ developers',
						code: `// Shared component library used across all ANWB products
import { styled } from 'preact-emotion';
import { tokens } from '@anwb/design-tokens';

export const Button = styled.button<ButtonProps>\`
  font-family: \${tokens.fontFamily.brand};
  font-weight: \${tokens.fontWeight.semibold};
  border-radius: \${tokens.borderRadius.md};
  padding: \${tokens.spacing.sm} \${tokens.spacing.lg};

  \${({ variant }) => variants[variant]}

  &:focus-visible {
    outline: 2px solid \${tokens.color.focus};
    outline-offset: 2px;
  }
\`;`,
					},
					{
						type: 'quote' as const,
						quote:
							'A design system is a product, not a project. It needs ownership, roadmap, and continuous investment.',
						author: 'React Amsterdam',
						role: 'Conference talk',
						caption: 'Lessons from building at scale',
					},
				],
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
				link: {
					url: 'https://www.youtube.com/watch?v=L2yOoxzXmw8',
					label: 'Watch on YouTube',
				},
				images: [
					{
						src: '/images/talks/design-system-1.png',
						alt: 'What does Poncho include - documentation, sketch symbols, and Preact components',
					},
					{
						src: '/images/talks/design-system-2.png',
						alt: 'Design system learnings and best practices',
					},
				],
			},
			{
				title: 'The Three Layers of Testing',
				venue: 'React Amsterdam',
				description: [
					'Static analysis, type checking, and testing strategies for shipping quality code regularly.',
					'How to structure your testing pyramid and when to use each layer.',
				],
				quote: 'Tests should give you confidence, not false security.',
				link: {
					url: 'https://www.youtube.com/watch?v=piZOil7OicI',
					label: 'Watch on YouTube',
				},
				images: [
					{
						src: '/images/talks/testing-1.png',
						alt: 'Introduction to the three layers of testing',
					},
					{
						src: '/images/talks/testing-2.png',
						alt: 'Testing strategy conclusions and takeaways',
					},
				],
			},
			{
				title: 'Building a Component Framework',
				venue: 'Rotterdam The Hague Frontend Group',
				description: [
					'Deep dive into component library architecture.',
					'Patterns for building flexible, composable components that scale.',
				],
				quote: 'Good components disappear into the background.',
				images: [
					{
						src: '/images/talks/component-framework-1.png',
						alt: 'The challenge of working with 200 front-end applications and 30 developers',
					},
					{
						src: '/images/talks/component-framework-2.png',
						alt: 'Component framework architecture and patterns',
					},
				],
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
