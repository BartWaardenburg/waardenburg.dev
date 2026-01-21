'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// Custom hook to detect reduced motion preference
function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true); // Default to reduced for SSR

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(mediaQuery.matches);

		const handler = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	return prefersReducedMotion;
}

function AnimatedImage({
	caption,
	index,
}: {
	caption: string;
	index: number;
}) {
	const ref = useRef<HTMLElement>(null);
	const prefersReducedMotion = usePrefersReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	// Subtle parallax - each image moves slightly different
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		prefersReducedMotion ? [0, 0] : [30 + index * 10, -30 - index * 10]
	);
	// Subtle scale - starts slightly smaller, scales to normal
	const scale = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		prefersReducedMotion ? [1, 1, 1, 1] : [0.95, 1, 1, 0.98]
	);
	// Subtle rotation for depth
	const rotateX = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		prefersReducedMotion ? [0, 0, 0] : [2, 0, -2]
	);

	return (
		<figure ref={ref} className="perspective-1000">
			<motion.div
				className="aspect-[4/3] w-full rounded-lg bg-neutral-200"
				style={{
					y,
					scale,
					rotateX,
					transformStyle: 'preserve-3d',
				}}
				aria-hidden="true"
			/>
			<figcaption className="mt-4 text-sm text-neutral-500">{caption}</figcaption>
		</figure>
	);
}

const projects = [
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
	},
	{
		year: '2025',
		title: 'ICTU: Immigration & Identity Systems',
		description: [
			'Building critical digital infrastructure for the Dutch government.',
			'Working through ICTU on systems for IND (Immigration & Naturalisation Service) and RViG (National Office for Identity Data).',
		],
		quote: "Not public, but the kind of work where reliability and security aren't optional.",
	},
	{
		year: '2025',
		title: 'Zeeuws Museum: Digital Experience',
		description: [
			"Website for the museum in Middelburg's medieval abbey.",
			'30,000+ objects of Zeeland history. Built with Norday. Headless CMS architecture.',
		],
		quote: 'Where centuries of Zeeland history meet modern web performance.',
		link: { url: 'zeeuwsmuseum.nl', label: 'zeeuwsmuseum.nl' },
	},
	{
		year: '2026',
		title: "Port of Rotterdam: Europe's Largest Port",
		description: [
			'Web platform for the port authority.',
			'41 square miles. 30,000 vessels per year. 385,000 jobs. 6.2% of Dutch GDP.',
		],
		quote:
			'Building with Norday for one of the most economically significant organizations in NL.',
	},
	{
		year: '2026',
		title: 'Rotterdam Inclusief: Inclusive Employment',
		description: [
			"Platform for the City of Rotterdam's employment initiative.",
			'Helping 2,500+ people with support needs find meaningful work.',
		],
		quote: 'Technology that creates real opportunities for people who need them most.',
	},
	{
		year: '2021',
		title: 'SDU: Legal Publishing Platform',
		description: [
			'Senior Full Stack Developer building complex search and discovery interfaces.',
			'React, Next.js, Apollo GraphQL. Working on the design system used across all products.',
		],
		quote: 'Complex information architecture for professionals who need precision.',
		link: { url: 'sdu.nl', label: 'sdu.nl' },
	},
	{
		year: '2020',
		title: 'Ministerie van VWS: Covid Response Platforms',
		description: [
			'Tech Lead for Team Quarantine & Vaccination.',
			'Built a platform for rapid website delivery — live within weeks of starting development.',
		],
		quote:
			'When the whole country needed information fast, we shipped it. Accessible to everyone.',
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
	},
];

const IMAGE_COUNT = 3;

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
	const articleRef = useRef<HTMLElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Prevent hydration mismatch by only rendering after mount
	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (!isMounted) return;
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, [isMounted]);

	useEffect(() => {
		const handleScroll = () => {
			if (!articleRef.current || !progressRef.current) return;

			const rect = articleRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			let progress: number;

			if (isMobile) {
				// Mobile: track from when article enters view to when it leaves
				const articleTop = rect.top;
				const articleHeight = rect.height - windowHeight;

				if (articleTop >= 0) {
					progress = 0;
				} else if (-articleTop >= articleHeight) {
					progress = 1;
				} else {
					progress = -articleTop / articleHeight;
				}

				// Update horizontal transform for images
				// translateX % is relative to element width (IMAGE_COUNT * 100vw)
				// To move by (IMAGE_COUNT - 1) viewport widths, we need ((IMAGE_COUNT - 1) / IMAGE_COUNT) * 100%
				if (imagesRef.current) {
					const translateX = progress * ((IMAGE_COUNT - 1) / IMAGE_COUNT) * 100;
					imagesRef.current.style.transform = `translateX(-${translateX}%)`;
				}
			} else {
				// Desktop: original behavior with sticky offset
				const stickyOffset = 128;
				const articleTop = rect.top - stickyOffset;
				const articleHeight = rect.height - windowHeight + stickyOffset;

				if (articleTop >= 0) {
					progress = 0;
				} else if (-articleTop >= articleHeight) {
					progress = 1;
				} else {
					progress = -articleTop / articleHeight;
				}
			}

			progressRef.current.style.setProperty('--progress', progress.toString());
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isMobile]);

	// Mobile layout
	if (isMobile) {
		return (
			<article ref={articleRef} className="relative">
				{/* Sticky container */}
				<div
					className="sticky top-0 flex h-screen w-full flex-col overflow-hidden"
					style={{ height: '100svh' }}
				>
					{/* Text at top */}
					<div className="bg-neutral-50 px-6 pb-6 pt-24">
						{/* Progress indicator */}
						<div
							ref={progressRef}
							className="relative mb-6 h-1"
							style={{ '--progress': '0' } as React.CSSProperties}
						>
							<div className="absolute inset-0 flex gap-2">
								{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
									<div key={i} className="flex-1 rounded-full bg-neutral-300" />
								))}
							</div>
							<div
								className="absolute inset-0 origin-left rounded-full bg-neutral-900"
								style={{
									transform: 'scaleX(calc(var(--progress) + 0.01))',
									transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
								}}
							/>
							<div className="absolute inset-0 flex gap-2">
								{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
									<div key={i} className="flex-1">
										{i < IMAGE_COUNT - 1 && (
											<div
												className="absolute h-full w-2 bg-neutral-50"
												style={{ left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)` }}
											/>
										)}
									</div>
								))}
							</div>
						</div>

						<span className="mb-3 inline-block rounded bg-neutral-900 px-2 py-0.5 text-xs font-medium text-neutral-50">
							{project.year}
						</span>
						<h3 className="mb-3 text-xl font-medium leading-tight">{project.title}</h3>
						<p className="mb-4 text-sm leading-relaxed text-neutral-600">
							{project.description[0]}
						</p>
						{project.link && (
							<a
								href={`https://${project.link.url}`}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-sm font-medium"
							>
								{project.link.label} <span aria-hidden="true">&rarr;</span>
							</a>
						)}
					</div>

					{/* Images below */}
					<div className="flex-1 overflow-hidden">
						<div
							ref={imagesRef}
							className="flex h-full transition-transform duration-150 ease-out"
							style={{ width: `${IMAGE_COUNT * 100}%` }}
						>
							{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
								<div
									key={i}
									className="flex h-full items-center justify-center px-4"
									style={{ width: `${100 / IMAGE_COUNT}%` }}
								>
									<div className="aspect-[4/3] w-full max-w-lg rounded-lg bg-neutral-200" />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Quote at the end - scrolls over images */}
				<div
					className="relative z-10 bg-neutral-50 px-6 py-12"
					style={{ marginTop: `${(IMAGE_COUNT - 1) * 100}svh` }}
				>
					<blockquote className="max-w-md border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic">
						"{project.quote}"
					</blockquote>
				</div>
			</article>
		);
	}

	// Desktop layout
	return (
		<article ref={articleRef} className="grid gap-8 md:grid-cols-3 md:gap-12">
			{/* Left: Content (sticky) - 1/3 width */}
			<div className="md:sticky md:top-32 md:self-start">
				{/* Progress indicator */}
				<div
					ref={progressRef}
					className="relative mb-8 h-1"
					style={{ '--progress': '0' } as React.CSSProperties}
				>
					<div className="absolute inset-0 flex gap-2">
						{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
							<div key={i} className="flex-1 rounded-full bg-neutral-200" />
						))}
					</div>
					<div
						className="absolute inset-0 origin-left rounded-full bg-neutral-900"
						style={{
							transform: 'scaleX(calc(var(--progress) + 0.01))',
							transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
						}}
					/>
					<div className="absolute inset-0 flex gap-2">
						{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
							<div key={i} className="flex-1">
								{i < IMAGE_COUNT - 1 && (
									<div
										className="absolute h-full w-2 bg-white"
										style={{ left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)` }}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<span className="mb-4 inline-block rounded bg-neutral-900 px-3 py-1 text-sm font-medium text-neutral-50">
					{project.year}
				</span>
				<h3 className="mb-6 text-2xl font-medium md:text-3xl">{project.title}</h3>
				<div className="mb-8 space-y-4 text-base leading-relaxed text-neutral-600 md:text-lg">
					{project.description.map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
				<blockquote className="mb-8 border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic md:text-xl">
					"{project.quote}"
				</blockquote>
				{project.link && (
					<a
						href={`https://${project.link.url}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-neutral-500"
					>
						{project.link.label} <span aria-hidden="true">&rarr;</span>
					</a>
				)}
			</div>

			{/* Right: Images - 2/3 width */}
			<div className="space-y-24 md:col-span-2">
				<AnimatedImage caption="Project overview and main interface" index={0} />
				<AnimatedImage caption="Key feature detail" index={1} />
				<AnimatedImage caption="Mobile responsive view" index={2} />
			</div>
		</article>
	);
}

export function Work() {
	return (
		<section id="work" className="px-6 py-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-3xl font-medium md:text-4xl">Work</h2>
				<div className="space-y-32">
					{projects.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
