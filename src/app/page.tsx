import { AgentReady } from '@/components/AgentReady';
import { Career } from '@/components/Career';
import { Clients } from '@/components/Clients';
import { Contact } from '@/components/Contact';
import { Fallow } from '@/components/Fallow';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Manifesto } from '@/components/Manifesto';
import { RevealObserver } from '@/components/Motion';
import { OpenSource } from '@/components/OpenSource';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Talks } from '@/components/Talks';
import { getStats } from '@/lib/stats';

// npm and GitHub numbers refresh once a day
export const revalidate = 86400;

export default async function HomePage() {
	const stats = await getStats();
	return (
		<>
			<SmoothScroll />
			<Header />
			<main id="main">
				<Hero />
				<Manifesto />
				<Fallow stats={stats} />
				<AgentReady />
				<OpenSource />
				<Talks />
				<Career />
				<Clients />
				<Contact />
			</main>
			<RevealObserver />
		</>
	);
}
