'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { codeToHtml, type BundledLanguage } from 'shiki';

import { CardFrame } from '@/components/CardFrame';
import { useTheme } from '@/components/ThemeProvider';

// Custom hook to detect reduced motion preference
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

// Card type definitions
export type ImageCardData = {
	type: 'image';
	src?: string;
	alt: string;
	caption: string;
};

export type QuoteCardData = {
	type: 'quote';
	quote: string;
	author?: string;
	role?: string;
	caption: string;
};

export type CodeCardData = {
	type: 'code';
	code: string;
	language: BundledLanguage;
	filename?: string;
	caption: string;
};

export type MediaCardData = ImageCardData | QuoteCardData | CodeCardData;

// Shared animation wrapper for all card types
function AnimatedCardWrapper({
	children,
	index,
	caption,
}: {
	children: React.ReactNode;
	index: number;
	caption: string;
}) {
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
				style={{
					y,
					scale,
					rotateX,
					transformStyle: 'preserve-3d',
				}}
			>
				{children}
			</motion.div>
			<figcaption className="mt-7 text-sm text-neutral-500 transition-colors duration-300 dark:text-neutral-400">
				{caption}
			</figcaption>
		</figure>
	);
}

// Image card component
function ImageCard({ data }: { data: ImageCardData }) {
	if (data.src) {
		return (
			<CardFrame>
				<img
					src={data.src}
					alt={data.alt}
					className="aspect-[4/3] w-full rounded-lg object-cover"
				/>
			</CardFrame>
		);
	}

	return (
		<CardFrame>
			<div
				className="aspect-[4/3] w-full rounded-lg bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800"
				aria-hidden="true"
			/>
		</CardFrame>
	);
}

// Quote card component
function QuoteCard({ data }: { data: QuoteCardData }) {
	return (
		<CardFrame>
			<div className="flex aspect-[4/3] w-full flex-col justify-center rounded-lg bg-neutral-900 p-8 text-neutral-50 transition-colors duration-300 dark:bg-neutral-100 dark:text-neutral-900 md:p-12">
				<blockquote className="mb-6 text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl">
					&ldquo;{data.quote}&rdquo;
				</blockquote>
				{(data.author || data.role) && (
					<div className="flex items-center gap-3">
						<div className="h-px flex-1 bg-neutral-700 transition-colors duration-300 dark:bg-neutral-300" />
						<div className="text-right">
							{data.author && (
								<p className="font-medium text-neutral-200 transition-colors duration-300 dark:text-neutral-700">
									{data.author}
								</p>
							)}
							{data.role && (
								<p className="text-sm text-neutral-400 transition-colors duration-300 dark:text-neutral-500">
									{data.role}
								</p>
							)}
						</div>
					</div>
				)}
			</div>
		</CardFrame>
	);
}

// Code card component with syntax highlighting
// Uses DOMPurify to sanitize shiki output for safe HTML rendering
function CodeCard({ data }: { data: CodeCardData }) {
	const { resolvedTheme } = useTheme();
	const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
	const codeRef = useRef<HTMLDivElement>(null);
	const isDark = resolvedTheme === 'dark';

	useEffect(() => {
		codeToHtml(data.code, {
			lang: data.language,
			theme: isDark ? 'vitesse-dark' : 'vitesse-light',
		}).then(setHighlightedCode);
	}, [data.code, data.language, isDark]);

	// Sanitize and set the highlighted code HTML
	useEffect(() => {
		if (codeRef.current && highlightedCode) {
			// Use DOMPurify to sanitize the shiki output
			const sanitizedHtml = DOMPurify.sanitize(highlightedCode, {
				USE_PROFILES: { html: true },
			});
			codeRef.current.innerHTML = sanitizedHtml;
		}
	}, [highlightedCode]);

	return (
		<CardFrame>
			<div
				className={`aspect-[4/3] w-full overflow-hidden rounded-lg transition-colors duration-300 ${
					isDark ? 'bg-[#121212]' : 'bg-[#ffffff]'
				}`}
			>
				{/* Title bar */}
				<div
					className={`flex items-center gap-2 border-b px-4 py-3 transition-colors duration-300 ${
						isDark
							? 'border-neutral-800 bg-[#1a1a1a]'
							: 'border-neutral-200 bg-[#f5f5f5]'
					}`}
				>
					<div className="flex gap-1.5">
						<div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
						<div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
						<div className="h-3 w-3 rounded-full bg-[#27c93f]" />
					</div>
					{data.filename && (
						<span
							className={`ml-2 text-sm transition-colors duration-300 ${
								isDark ? 'text-neutral-400' : 'text-neutral-600'
							}`}
						>
							{data.filename}
						</span>
					)}
				</div>
				{/* Code content */}
				<div className="h-[calc(100%-44px)] overflow-auto p-4">
					{highlightedCode ? (
						<div
							ref={codeRef}
							className="text-sm leading-relaxed [&_code]:!bg-transparent [&_pre]:!bg-transparent"
						/>
					) : (
						<pre
							className={`text-sm leading-relaxed transition-colors duration-300 ${
								isDark ? 'text-neutral-400' : 'text-neutral-600'
							}`}
						>
							<code>{data.code}</code>
						</pre>
					)}
				</div>
			</div>
		</CardFrame>
	);
}

// Main MediaCard component that renders the appropriate card type
export function MediaCard({
	data,
	index,
}: {
	data: MediaCardData;
	index: number;
}) {
	return (
		<AnimatedCardWrapper index={index} caption={data.caption}>
			{data.type === 'image' && <ImageCard data={data} />}
			{data.type === 'quote' && <QuoteCard data={data} />}
			{data.type === 'code' && <CodeCard data={data} />}
		</AnimatedCardWrapper>
	);
}

// Mobile card component (without scroll animations, for carousel)
export function MobileMediaCard({ data }: { data: MediaCardData }) {
	return (
		<>
			{data.type === 'image' && <ImageCard data={data} />}
			{data.type === 'quote' && <QuoteCard data={data} />}
			{data.type === 'code' && <CodeCard data={data} />}
		</>
	);
}
