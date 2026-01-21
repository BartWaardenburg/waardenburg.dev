import type { Metadata, Viewport } from 'next';

import { RootBody } from '@/components/RootBody';
import { RootHead } from '@/components/RootHead';
import { RootHtml } from '@/components/RootHtml';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Bart Waardenburg — Full-stack Developer & Front-end Expert',
	description:
		'Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant. Building products that matter.',
	keywords:
		'full-stack developer, front-end expert, tech lead, React, Next.js, TypeScript, design systems, The Hague, Netherlands',
	authors: [{ name: 'Bart Waardenburg' }],
	robots: 'index, follow',
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
		title: 'Bart Waardenburg — Full-stack Developer & Front-end Expert',
		description:
			'Full-stack developer and front-end expert based in The Hague, Netherlands. Building products that matter.',
		images: ['/og-image.png'],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#fafafa',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RootHtml>
			<RootHead />
			<RootBody>{children}</RootBody>
		</RootHtml>
	);
}
