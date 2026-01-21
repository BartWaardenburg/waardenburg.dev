'use client';

import { useEffect, useRef, useState } from 'react';

interface MarqueeProps {
	text: string;
}

export function Marquee({ text }: MarqueeProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			// Only start moving once the screen is fully black (sticky is locked)
			if (rect.top > 0) {
				setOffset(0);
				return;
			}
			// Calculate how far we've scrolled past the lock point
			const scrolledPast = Math.abs(rect.top);
			const scrollRange = rect.height - windowHeight;
			const progress = Math.min(scrolledPast / scrollRange, 1);
			setOffset(progress * 3500);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div ref={containerRef} className="relative h-[300vh]">
			<div className="sticky top-0 h-screen overflow-hidden bg-neutral-900 transition-colors duration-500 dark:bg-amber-50">
				{/* Stroke text - offset vertically, different horizontal range */}
				<div
					className="absolute left-0 top-1/2 whitespace-nowrap will-change-transform"
					style={{
						transform: `translateX(calc(100vw - ${offset * 1.15}px)) translateY(-80%)`,
					}}
				>
					<span
						className="marquee-stroke text-[12rem] font-bold leading-none tracking-tighter text-transparent"
						style={{
							fontVariationSettings: "'MONO' 1, 'CASL' 0, 'slnt' -15",
						}}
					>
						{text}
					</span>
				</div>
				{/* Solid text - starts off-screen right, scrolls left */}
				<div
					className="absolute left-0 top-1/2 whitespace-nowrap will-change-transform"
					style={{
						transform: `translateX(calc(100vw - ${offset}px)) translateY(-50%)`,
					}}
				>
					<span
						className="text-[12rem] font-bold leading-none tracking-tighter text-neutral-50 transition-colors duration-500 dark:text-amber-900"
						style={{ fontVariationSettings: "'MONO' 1, 'CASL' 0, 'slnt' -15" }}
					>
						{text}
					</span>
				</div>
			</div>
		</div>
	);
}
