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

function AnimatedImage({ caption, index }: { caption: string; index: number }) {
	const ref = useRef<HTMLElement>(null);
	const prefersReducedMotion = usePrefersReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(
		scrollYProgress,
		[0, 1],
		prefersReducedMotion ? [0, 0] : [30 + index * 10, -30 - index * 10],
	);
	const scale = useTransform(
		scrollYProgress,
		[0, 0.3, 0.7, 1],
		prefersReducedMotion ? [1, 1, 1, 1] : [0.95, 1, 1, 0.98],
	);
	const rotateX = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		prefersReducedMotion ? [0, 0, 0] : [2, 0, -2],
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
			<figcaption className="mt-4 text-sm text-neutral-500">
				{caption}
			</figcaption>
		</figure>
	);
}

const talks = [
	{
		title: 'Building a Design System',
		venue: 'React Amsterdam',
		description: [
			"How we built ANWB's design system with (P)React.",
			'Sharing code across teams, consistency, component architecture.',
		],
		quote: 'A design system is a product, not a project.',
	},
	{
		title: 'The Three Layers of Testing',
		venue: 'React Amsterdam',
		description: [
			'Static analysis, type checking, and testing strategies for shipping quality code regularly.',
			'How to structure your testing pyramid and when to use each layer.',
		],
		quote: 'Tests should give you confidence, not false security.',
	},
	{
		title: 'Building a Component Framework',
		venue: 'Rotterdam The Hague Frontend Group',
		description: [
			'Deep dive into component library architecture.',
			'Patterns for building flexible, composable components that scale.',
		],
		quote: 'Good components disappear into the background.',
	},
	{
		title: 'Hybrid App Development',
		venue: 'Bloomreach CMS Connect',
		description: [
			'Mobile development approaches with web technologies.',
			'When to go native, when to go hybrid, and how to make the most of both.',
		],
		quote: 'The best technology is the one that ships.',
	},
];

const IMAGE_COUNT = 2;

function TalkCard({ talk }: { talk: (typeof talks)[number] }) {
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
				const articleTop = rect.top;
				const articleHeight = rect.height - windowHeight;

				if (articleTop >= 0) {
					progress = 0;
				} else if (-articleTop >= articleHeight) {
					progress = 1;
				} else {
					progress = -articleTop / articleHeight;
				}

				// translateX % is relative to element width (IMAGE_COUNT * 100vw)
				if (imagesRef.current) {
					const translateX = progress * ((IMAGE_COUNT - 1) / IMAGE_COUNT) * 100;
					imagesRef.current.style.transform = `translateX(-${translateX}%)`;
				}
			} else {
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
				<div
					className="sticky top-0 flex h-screen w-full flex-col overflow-hidden"
					style={{ height: '100svh' }}
				>
					{/* Text at top */}
					<div className="bg-neutral-50 px-6 pb-6 pt-24">
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
												style={{
													left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)`,
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>

						<p className="mb-2 text-xs font-medium text-neutral-500">
							{talk.venue}
						</p>
						<h3 className="mb-3 text-xl font-medium leading-tight">
							{talk.title}
						</h3>
						<p className="text-sm leading-relaxed text-neutral-600">
							{talk.description[0]}
						</p>
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
						"{talk.quote}"
					</blockquote>
				</div>
			</article>
		);
	}

	// Desktop layout (images left, content right)
	return (
		<article ref={articleRef} className="grid gap-8 md:grid-cols-3 md:gap-12">
			{/* Left: Images - 2/3 width */}
			<div className="order-2 space-y-24 md:order-1 md:col-span-2">
				<AnimatedImage caption={`Presenting at ${talk.venue}`} index={0} />
				<AnimatedImage caption="Slide highlights" index={1} />
			</div>

			{/* Right: Content (sticky) - 1/3 width */}
			<div className="order-1 md:sticky md:top-32 md:order-2 md:self-start">
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
										style={{
											left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)`,
										}}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<p className="mb-4 text-sm font-medium text-neutral-500">
					{talk.venue}
				</p>
				<h3 className="mb-6 text-2xl font-medium md:text-3xl">{talk.title}</h3>
				<div className="mb-8 space-y-4 text-base leading-relaxed text-neutral-600 md:text-lg">
					{talk.description.map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
				<blockquote className="border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic md:text-xl">
					"{talk.quote}"
				</blockquote>
			</div>
		</article>
	);
}

export function Speaking() {
	return (
		<section id="speaking" className="px-6 py-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-3xl font-medium md:text-4xl">Talks</h2>
				<div className="space-y-32">
					{talks.map((talk) => (
						<TalkCard key={talk.title} talk={talk} />
					))}
				</div>
			</div>
		</section>
	);
}
