import { About, type Service } from '@/components/About';
import { Contact, type SocialLink } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header, type NavLink } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Main } from '@/components/Main';
import { type MediaCardData } from '@/components/MediaCard';
import { Marquee } from '@/components/Marquee';
import { Speaking, type Talk } from '@/components/Speaking';
import { Work, type Project } from '@/components/Work';

export interface HomePageContentProps {
	header: {
		logo: string;
		logoHref: string;
		navLinks: NavLink[];
		skipLinkText: string;
	};
	hero: {
		greeting: string;
		taglines: string[];
		statement: string;
	};
	marquees: {
		work: string;
		about: string;
		speaking: string;
		contact: string;
	};
	work: {
		title: string;
		projects: Project[];
		defaultMedia: MediaCardData[];
	};
	about: {
		title: string;
		services: Service[];
	};
	speaking: {
		title: string;
		talks: Talk[];
	};
	contact: {
		title: string;
		intro: string;
		email: string;
		emailLabel: string;
		socialIntro: string;
		socialLinks: SocialLink[];
	};
	footer: {
		name: string;
		location: string;
	};
}

export function HomePageContent({
	header,
	hero,
	marquees,
	work,
	about,
	speaking,
	contact,
	footer,
}: HomePageContentProps) {
	return (
		<>
			<Header
				logo={header.logo}
				logoHref={header.logoHref}
				navLinks={header.navLinks}
				skipLinkText={header.skipLinkText}
			/>
			<Main>
				<Hero
					greeting={hero.greeting}
					taglines={hero.taglines}
					statement={hero.statement}
				/>
				<Marquee text={marquees.work} />
				<Work
					title={work.title}
					projects={work.projects}
					defaultMedia={work.defaultMedia}
				/>
				<Marquee text={marquees.about} />
				<About title={about.title} services={about.services} />
				<Marquee text={marquees.speaking} />
				<Speaking title={speaking.title} talks={speaking.talks} />
				<Marquee text={marquees.contact} />
				<Contact
					title={contact.title}
					intro={contact.intro}
					email={contact.email}
					emailLabel={contact.emailLabel}
					socialIntro={contact.socialIntro}
					socialLinks={contact.socialLinks}
				/>
			</Main>
			<Footer name={footer.name} location={footer.location} />
		</>
	);
}
