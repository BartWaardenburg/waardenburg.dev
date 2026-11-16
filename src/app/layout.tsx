import type { Metadata, Viewport } from 'next';

import { JsonLd } from '@/components/JsonLd';
import { display, mono } from '@/fonts';
import '@/styles/globals.css';

const title = 'Bart Waardenburg · Developer tools, talks & teaching';
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
				alt: 'Bart Waardenburg · Developer tools, talks & teaching',
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
				alt: 'Bart Waardenburg · Developer tools, talks & teaching',
			},
		],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: '32x32' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
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
	themeColor: '#f6efe1',
	colorScheme: 'light',
};

// Marks the document as scripted before first paint, so scroll reveals can start hidden.
const jsProbe = `document.documentElement.classList.add('js');`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${display.variable} ${mono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: jsProbe }} />
				<JsonLd />
			</head>
			<body>{children}</body>
		</html>
	);
}
