'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CardFrame } from '@/components/CardFrame';

export interface Service {
	title: string;
	description: string;
	quote: string;
	keywords: string[];
}

export interface AboutProps {
	title: string;
	services: Service[];
}

const positions = [
	{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 10 },
	{ x: 12, y: 12, rotate: 2, scale: 0.98, opacity: 0.6, zIndex: 9 },
	{ x: 24, y: 24, rotate: 4, scale: 0.96, opacity: 0.3, zIndex: 8 },
	{ x: 36, y: 36, rotate: 6, scale: 0.94, opacity: 0, zIndex: 7 },
];

const exitLeft = {
	x: -300,
	y: -60,
	rotate: -15,
	scale: 0.85,
	opacity: 0,
	zIndex: 20,
};
const enterFromLeft = {
	x: -300,
	y: -60,
	rotate: -15,
	scale: 0.85,
	opacity: 0,
	zIndex: 15,
};

export function About({ title, services }: AboutProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
	const [animPhase, setAnimPhase] = useState<'idle' | 'ready' | 'animating'>(
		'idle',
	);
	const targetIndexRef = useRef(0);
	const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

	const animate = useCallback(
		(dir: 'next' | 'prev') => {
			if (isAnimating) return;

			const target =
				dir === 'next'
					? (currentIndex + 1) % services.length
					: (currentIndex - 1 + services.length) % services.length;

			targetIndexRef.current = target;
			setDirection(dir);
			setIsAnimating(true);

			if (dir === 'prev') {
				setAnimPhase('ready');
			} else {
				setAnimPhase('animating');
			}
		},
		[isAnimating, currentIndex, services.length],
	);

	useEffect(() => {
		if (animPhase === 'ready' && direction === 'prev') {
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setAnimPhase('animating');
				});
			});
		}
		return undefined;
	}, [animPhase, direction]);

	useEffect(() => {
		if (animPhase === 'animating') {
			const timer = setTimeout(() => {
				setCurrentIndex(targetIndexRef.current);
				setIsAnimating(false);
				setDirection(null);
				setAnimPhase('idle');
			}, 400);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [animPhase]);

	const getCardStyle = (index: number): React.CSSProperties => {
		const stackPos = (index - currentIndex + services.length) % services.length;
		const targetIndex = targetIndexRef.current;

		if (direction === 'next' && animPhase === 'animating') {
			if (index === currentIndex) {
				return {
					transform: `translateX(${exitLeft.x}px) translateY(${exitLeft.y}px) rotate(${exitLeft.rotate}deg) scale(${exitLeft.scale})`,
					opacity: exitLeft.opacity,
					zIndex: exitLeft.zIndex,
					transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
				};
			}
			const newStackPos =
				(index - targetIndex + services.length) % services.length;
			const pos = positions[Math.min(newStackPos, positions.length - 1)];
			return {
				transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
				opacity: pos.opacity,
				zIndex: pos.zIndex,
				transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
			};
		}

		if (direction === 'prev') {
			const prevIndex = targetIndex;

			if (index === prevIndex) {
				if (animPhase === 'ready') {
					return {
						transform: `translateX(${enterFromLeft.x}px) translateY(${enterFromLeft.y}px) rotate(${enterFromLeft.rotate}deg) scale(${enterFromLeft.scale})`,
						opacity: enterFromLeft.opacity,
						zIndex: enterFromLeft.zIndex,
						transition: 'none',
					};
				}
				if (animPhase === 'animating') {
					const pos = positions[0];
					return {
						transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
						opacity: pos.opacity,
						zIndex: pos.zIndex,
						transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
					};
				}
			}

			if (animPhase === 'animating') {
				const newStackPos =
					(index - prevIndex + services.length) % services.length;
				const pos = positions[Math.min(newStackPos, positions.length - 1)];
				return {
					transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
					opacity: pos.opacity,
					zIndex: pos.zIndex,
					transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
				};
			}
		}

		const pos = positions[Math.min(stackPos, positions.length - 1)];
		return {
			transform: `translateX(${pos.x}px) translateY(${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
			opacity: pos.opacity,
			zIndex: pos.zIndex,
			transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
		};
	};

	return (
		<section
			id="about"
			className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-12"
		>
			<div className="mx-auto w-full max-w-6xl">
				<h2 className="mb-16 text-center text-3xl font-medium md:text-4xl">
					{title}
				</h2>

				<div className="flex justify-center">
					<div className="relative">
						<div className="relative h-[420px] w-[280px] sm:h-[460px] sm:w-[340px] md:h-[420px] md:w-[500px]">
							{services.map((service, index) => {
								const number = String(index + 1).padStart(2, '0');

								return (
									<div
										key={service.title}
										ref={(el) => {
											if (el) cardRefs.current.set(index, el);
										}}
										className="absolute inset-0"
										style={getCardStyle(index)}
									>
										<CardFrame>
											<div className="flex h-[420px] flex-col rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 sm:h-[460px] sm:p-6 md:h-[420px] md:p-8">
												<span className="font-mono text-5xl font-bold text-neutral-300 dark:text-neutral-700 sm:text-6xl md:text-7xl">
													{number}
												</span>

												<h3 className="mb-2 mt-2 text-lg font-medium sm:mb-3 sm:mt-3 sm:text-xl md:text-2xl">
													{service.title}
												</h3>

												<div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
													{service.keywords.map((keyword) => (
														<span
															key={keyword}
															className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 sm:px-3 sm:py-1 sm:text-xs"
														>
															{keyword}
														</span>
													))}
												</div>

												<p className="mb-auto text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-sm md:text-base">
													{service.description}
												</p>

												<blockquote className="border-l-4 border-neutral-900 py-1.5 pl-3 text-xs font-medium italic dark:border-neutral-50 sm:py-2 sm:pl-4 sm:text-sm md:text-base">
													&ldquo;{service.quote}&rdquo;
												</blockquote>
											</div>
										</CardFrame>
									</div>
								);
							})}
						</div>

						<button
							onClick={() => animate('prev')}
							disabled={isAnimating}
							aria-label="Previous service"
							className="absolute -left-14 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-neutral-300 text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-50 dark:hover:text-neutral-50 md:-left-20 md:h-12 md:w-12"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M15 18l-6-6 6-6" />
							</svg>
						</button>

						<button
							onClick={() => animate('next')}
							disabled={isAnimating}
							aria-label="Next service"
							className="absolute -right-14 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-neutral-300 text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-50 dark:hover:text-neutral-50 md:-right-20 md:h-12 md:w-12"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M9 18l6-6-6-6" />
							</svg>
						</button>

						<div className="absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
							<span className="font-mono text-sm text-neutral-400 dark:text-neutral-500">
								{String(currentIndex + 1).padStart(2, '0')}
							</span>
							<div className="flex gap-2">
								{services.map((_, index) => (
									<button
										key={index}
										onClick={() => {
											if (isAnimating || index === currentIndex) return;
											animate(index > currentIndex ? 'next' : 'prev');
										}}
										aria-label={`Go to service ${index + 1}`}
										className={`h-1 rounded-full transition-all ${
											index === currentIndex
												? 'w-8 bg-neutral-900 dark:bg-neutral-50'
												: 'w-4 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
										}`}
									/>
								))}
							</div>
							<span className="font-mono text-sm text-neutral-400 dark:text-neutral-500">
								{String(services.length).padStart(2, '0')}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
