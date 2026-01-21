import Head from 'next/head';

import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Speaking } from '@/components/Speaking';
import { Work } from '@/components/Work';

export default function Home() {
	return (
		<>
			<Head>
				{/* Primary Meta Tags */}
				<title>Bart Waardenburg — Full-stack Developer & Front-end Expert</title>
				<meta
					name="description"
					content="Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant. Building products that matter."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
				<meta name="author" content="Bart Waardenburg" />
				<meta
					name="keywords"
					content="full-stack developer, front-end expert, tech lead, React, Next.js, TypeScript, design systems, The Hague, Netherlands"
				/>
				<link rel="canonical" href="https://waardenburg.dev" />

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content="#fafafa" />

				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://waardenburg.dev" />
				<meta property="og:title" content="Bart Waardenburg — Full-stack Developer & Front-end Expert" />
				<meta
					property="og:description"
					content="Full-stack developer and front-end expert based in The Hague, Netherlands. Tech lead, design systems architect, and consultant. Building products that matter."
				/>
				<meta property="og:image" content="https://waardenburg.dev/og-image.png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:site_name" content="Bart Waardenburg" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content="https://waardenburg.dev" />
				<meta name="twitter:title" content="Bart Waardenburg — Full-stack Developer & Front-end Expert" />
				<meta
					name="twitter:description"
					content="Full-stack developer and front-end expert based in The Hague, Netherlands. Building products that matter."
				/>
				<meta name="twitter:image" content="https://waardenburg.dev/og-image.png" />
			</Head>

			<Header />

			<main>
				<Hero />
				<Marquee />
				<Work />
				<Marquee />
				<About />
				<Marquee />
				<Speaking />
				<Marquee />
				<Contact />
			</main>

			<Footer />
		</>
	);
}
