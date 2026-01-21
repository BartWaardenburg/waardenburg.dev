'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

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
				className="aspect-[4/3] w-full rounded-lg bg-neutral-200 dark:bg-neutral-800"
				style={{
					y,
					scale,
					rotateX,
					transformStyle: 'preserve-3d',
				}}
				aria-hidden="true"
			/>
			<figcaption className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
				{caption}
			</figcaption>
		</figure>
	);
}

export interface Talk {
	title: string;
	venue: string;
	description: string[];
	quote: string;
}

export interface SpeakingProps {
	title: string;
	talks: Talk[];
}

const IMAGE_COUNT = 2;

function TalkCard({ talk }: { talk: Talk }) {
	const articleRef = useRef<HTMLElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

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

	if (isMobile) {
		return (
			<article ref={articleRef} className="relative">
				<div
					className="sticky top-0 flex h-screen w-full flex-col overflow-hidden"
					style={{ height: '100svh' }}
				>
					<div className="bg-neutral-50 px-6 pb-6 pt-24 dark:bg-neutral-950">
						<div
							ref={progressRef}
							className="relative mb-6 h-1"
							style={{ '--progress': '0' } as React.CSSProperties}
						>
							<div className="absolute inset-0 flex gap-2">
								{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
									<div
										key={i}
										className="flex-1 rounded-full bg-neutral-300 dark:bg-neutral-700"
									/>
								))}
							</div>
							<div
								className="absolute inset-0 origin-left rounded-full bg-neutral-900 dark:bg-neutral-50"
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
												className="absolute h-full w-2 bg-neutral-50 dark:bg-neutral-950"
												style={{
													left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)`,
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>

						<p className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
							{talk.venue}
						</p>
						<h3 className="mb-3 text-xl font-medium leading-tight">
							{talk.title}
						</h3>
						<p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
							{talk.description[0]}
						</p>
					</div>

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
									<div className="aspect-[4/3] w-full max-w-lg rounded-lg bg-neutral-200 dark:bg-neutral-800" />
								</div>
							))}
						</div>
					</div>
				</div>

				<div
					className="relative z-10 bg-neutral-50 px-6 py-12 dark:bg-neutral-950"
					style={{ marginTop: `${(IMAGE_COUNT - 1) * 100}svh` }}
				>
					<blockquote className="max-w-md border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic dark:border-neutral-50">
						&ldquo;{talk.quote}&rdquo;
					</blockquote>
				</div>
			</article>
		);
	}

	return (
		<article ref={articleRef} className="grid gap-8 md:grid-cols-3 md:gap-12">
			<div className="order-2 space-y-24 md:order-1 md:col-span-2">
				<AnimatedImage caption={`Presenting at ${talk.venue}`} index={0} />
				<AnimatedImage caption="Slide highlights" index={1} />
			</div>

			<div className="order-1 md:sticky md:top-32 md:order-2 md:self-start">
				<div
					ref={progressRef}
					className="relative mb-8 h-1"
					style={{ '--progress': '0' } as React.CSSProperties}
				>
					<div className="absolute inset-0 flex gap-2">
						{Array.from({ length: IMAGE_COUNT }).map((_, i) => (
							<div
								key={i}
								className="flex-1 rounded-full bg-neutral-200 dark:bg-neutral-700"
							/>
						))}
					</div>
					<div
						className="absolute inset-0 origin-left rounded-full bg-neutral-900 dark:bg-neutral-50"
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
										className="absolute h-full w-2 bg-white dark:bg-neutral-950"
										style={{
											left: `calc(${((i + 1) / IMAGE_COUNT) * 100}% - 4px)`,
										}}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<p className="mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
					{talk.venue}
				</p>
				<h3 className="mb-6 text-2xl font-medium md:text-3xl">{talk.title}</h3>
				<div className="mb-8 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
					{talk.description.map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
				<blockquote className="border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic dark:border-neutral-50 md:text-xl">
					&ldquo;{talk.quote}&rdquo;
				</blockquote>
			</div>
		</article>
	);
}

export function Speaking({ title, talks }: SpeakingProps) {
	return (
		<section id="speaking" className="px-6 py-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-3xl font-medium md:text-4xl">{title}</h2>
				<div className="space-y-32">
					{talks.map((talk) => (
						<TalkCard key={talk.title} talk={talk} />
					))}
				</div>
			</div>
		</section>
	);
}
