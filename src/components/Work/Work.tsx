'use client';

import { useEffect, useRef, useState } from 'react';

import {
	MediaCard,
	MobileMediaCard,
	type MediaCardData,
} from '@/components/MediaCard';

export interface Project {
	year: string;
	title: string;
	description: string[];
	quote: string;
	link?: { url: string; label: string };
	media?: MediaCardData[];
}

export interface WorkProps {
	title: string;
	projects: Project[];
	defaultMedia: MediaCardData[];
}

function ProjectCard({
	project,
	defaultMedia,
}: {
	project: Project;
	defaultMedia: MediaCardData[];
}) {
	const articleRef = useRef<HTMLElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const mediaRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const media = project.media ?? defaultMedia;

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

				if (mediaRef.current) {
					const translateX =
						progress * ((media.length - 1) / media.length) * 100;
					mediaRef.current.style.transform = `translateX(-${translateX}%)`;
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
	}, [isMobile, media.length]);

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
								{media.map((_, i) => (
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
								{media.map((_, i) => (
									<div key={i} className="flex-1">
										{i < media.length - 1 && (
											<div
												className="absolute h-full w-2 bg-neutral-50 dark:bg-neutral-950"
												style={{
													left: `calc(${((i + 1) / media.length) * 100}% - 4px)`,
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>

						<span className="mb-3 inline-block rounded bg-neutral-900 px-2 py-0.5 text-xs font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
							{project.year}
						</span>
						<h3 className="mb-3 text-xl font-medium leading-tight">
							{project.title}
						</h3>
						<p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
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

					<div className="flex-1 overflow-hidden">
						<div
							ref={mediaRef}
							className="flex h-full will-change-transform"
							style={{ width: `${media.length * 100}%` }}
						>
							{media.map((item, i) => (
								<div
									key={i}
									className="flex h-full items-start justify-center px-6 pt-4"
									style={{ width: `${100 / media.length}%` }}
								>
									<div className="w-full max-w-sm">
										<MobileMediaCard data={item} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div
					className="relative z-10 bg-neutral-50 px-6 pb-16 pt-24 dark:bg-neutral-950"
					style={{ marginTop: `${(media.length - 1) * 100}svh` }}
				>
					<blockquote className="max-w-md border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic dark:border-neutral-50">
						&ldquo;{project.quote}&rdquo;
					</blockquote>
				</div>
			</article>
		);
	}

	return (
		<article ref={articleRef} className="grid gap-8 md:grid-cols-3 md:gap-12">
			<div className="md:sticky md:top-32 md:self-start">
				<div
					ref={progressRef}
					className="relative mb-8 h-1"
					style={{ '--progress': '0' } as React.CSSProperties}
				>
					<div className="absolute inset-0 flex gap-2">
						{media.map((_, i) => (
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
						{media.map((_, i) => (
							<div key={i} className="flex-1">
								{i < media.length - 1 && (
									<div
										className="absolute h-full w-2 bg-white dark:bg-neutral-950"
										style={{
											left: `calc(${((i + 1) / media.length) * 100}% - 4px)`,
										}}
									/>
								)}
							</div>
						))}
					</div>
				</div>

				<span className="mb-4 inline-block rounded bg-neutral-900 px-3 py-1 text-sm font-medium text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
					{project.year}
				</span>
				<h3 className="mb-6 text-2xl font-medium md:text-3xl">
					{project.title}
				</h3>
				<div className="mb-8 space-y-4 text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
					{project.description.map((paragraph, i) => (
						<p key={i}>{paragraph}</p>
					))}
				</div>
				<blockquote className="mb-8 border-l-4 border-neutral-900 py-2 pl-6 text-lg font-medium italic dark:border-neutral-50 md:text-xl">
					&ldquo;{project.quote}&rdquo;
				</blockquote>
				{project.link && (
					<a
						href={`https://${project.link.url}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-base font-medium transition-colors hover:text-neutral-500 dark:hover:text-neutral-400"
					>
						{project.link.label} <span aria-hidden="true">&rarr;</span>
					</a>
				)}
			</div>

			<div className="space-y-24 md:col-span-2">
				{media.map((item, i) => (
					<MediaCard key={i} data={item} index={i} />
				))}
			</div>
		</article>
	);
}

export function Work({ title, projects, defaultMedia }: WorkProps) {
	return (
		<section id="work" className="px-6 py-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<h2 className="mb-16 text-3xl font-medium md:text-4xl">{title}</h2>
				<div className="space-y-32">
					{projects.map((project) => (
						<ProjectCard
							key={project.title}
							project={project}
							defaultMedia={defaultMedia}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
