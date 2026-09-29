import type { Metadata, Viewport } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { display, mono, serif } from '@/fonts';
import '@/styles/globals.css';

const title = 'Bart Waardenburg — Developer tools, talks & teaching';
const description =
	'Creator of Fallow, the Rust-powered codebase analyzer for TypeScript and JavaScript built on Oxc, and builder of IsAgentReady. Speaker at dotJS. Twelve years of shipping for the web.';

export const metadata: Metadata = {
	title: {
		default: title,
		template: '%s | Bart Waardenburg',
	},
	description,
	keywords: [
		'Bart Waardenburg',
		'Fallow',
		'IsAgentReady',
		'developer tools',
		'developer relations',
		'DevRel',
		'Oxc',
		'Rust',
		'TypeScript',
		'JavaScript tooling',
		'static analysis',
		'AEO',
		'agent readiness',
		'MCP',
		'dotJS',
		'The Hague',
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
		title,
		description,
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Bart Waardenburg — Developer tools, talks & teaching',
			},
		],
		locale: 'en_US',
		siteName: 'Bart Waardenburg',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@bartwaardenburg',
		creator: '@bartwaardenburg',
		title,
		description,
		images: [
			{
				url: '/twitter-image.png',
				width: 1200,
				height: 600,
				alt: 'Bart Waardenburg — Developer tools, talks & teaching',
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
	category: 'technology',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: '#07070a',
	colorScheme: 'dark',
};

// Decide before first paint whether the particle field will draw the hero name,
// so the fallback text never flashes.
const glProbe = `(function(){document.documentElement.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var c=document.createElement('canvas');if(c.getContext('webgl2'))document.documentElement.classList.add('gl');}catch(e){}})();`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${display.variable} ${mono.variable} ${serif.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: glProbe }} />
				<JsonLd />
			</head>
			<body>{children}</body>
		</html>
	);
}
