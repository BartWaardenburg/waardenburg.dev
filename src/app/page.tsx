import { AgentReady } from '@/components/AgentReady';
import { Career } from '@/components/Career';
import { Contact } from '@/components/Contact';
import { Fallow } from '@/components/Fallow';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Hud } from '@/components/Hud';
import { Manifesto } from '@/components/Manifesto';
import { RevealObserver } from '@/components/Motion';
import { OpenSource } from '@/components/OpenSource';
import { Scene } from '@/components/Scene';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Talks } from '@/components/Talks';
import { getStats } from '@/lib/stats';

// npm and GitHub numbers refresh once a day
export const revalidate = 86400;

export default async function HomePage() {
	const stats = await getStats();
	return (
		<>
			<Scene />
			<SmoothScroll />
			<Header />
			<Hud />
			<main id="main" className="relative z-10">
				<Hero />
				<Manifesto />
				<Fallow stats={stats} />
				<AgentReady />
				<OpenSource />
				<Talks />
				<Career />
				<Contact />
			</main>
			<RevealObserver />
		</>
	);
}
