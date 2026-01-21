import type { Metadata, Viewport } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { RootBody } from '@/components/RootBody';
import { RootHead } from '@/components/RootHead';
import { RootHtml } from '@/components/RootHtml';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: {
		default: 'Bart Waardenburg — Full-stack Developer & Front-end Expert',
		template: '%s | Bart Waardenburg',
	},
	description:
		'Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant. Building products that matter.',
	keywords: [
		'full-stack developer',
		'front-end expert',
		'tech lead',
		'React',
		'Next.js',
		'TypeScript',
		'design systems',
		'The Hague',
		'Netherlands',
		'software engineer',
		'web development',
		'consultant',
	],
	authors: [{ name: 'Bart Waardenburg', url: 'https://waardenburg.dev' }],
	creator: 'Bart Waardenburg',
	publisher: 'Bart Waardenburg',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	metadataBase: new URL('https://waardenburg.dev'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		url: 'https://waardenburg.dev',
		title: 'Bart Waardenburg — Full-stack Developer & Front-end Expert',
		description:
			'Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant. Building products that matter.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Bart Waardenburg - Full-stack Developer & Front-end Expert',
			},
		],
		locale: 'en_US',
		siteName: 'Bart Waardenburg',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@bartwaardenburg',
		creator: '@bartwaardenburg',
		title: 'Bart Waardenburg — Full-stack Developer & Front-end Expert',
		description:
			'Full-stack developer and front-end expert based in The Hague, Netherlands. Building products that matter.',
		images: [
			{
				url: '/twitter-image.png',
				width: 1200,
				height: 600,
				alt: 'Bart Waardenburg - Full-stack Developer & Front-end Expert',
			},
		],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '32x32' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon.ico',
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
	},
	manifest: '/site.webmanifest',
	verification: {
		// Add your verification codes here when you have them
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
	},
	category: 'technology',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fafafa' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RootHtml>
			<RootHead>
				<JsonLd />
			</RootHead>
			<RootBody>{children}</RootBody>
		</RootHtml>
	);
}
