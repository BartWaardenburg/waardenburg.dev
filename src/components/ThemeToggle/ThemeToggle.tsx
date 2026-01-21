'use client';

import { useEffect, useState } from 'react';

import { useTheme } from '@/components/ThemeProvider';

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setIsAnimating(true);
		setTimeout(() => {
			setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
			setTimeout(() => setIsAnimating(false), 400);
		}, 150);
	};

	// Prevent hydration mismatch
	if (!mounted) {
		return (
			<button
				className="relative h-9 w-9 overflow-hidden rounded-full p-2"
				aria-label="Toggle theme"
			>
				<div className="h-5 w-5" />
			</button>
		);
	}

	const isDark = resolvedTheme === 'dark';

	return (
		<button
			onClick={toggleTheme}
			className="group relative h-9 w-9 overflow-hidden rounded-full p-2 transition-all duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
		>
			{/* Sun icon */}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
					isDark
						? 'translate-y-0 rotate-0 scale-100 opacity-100'
						: '-translate-y-full rotate-90 scale-50 opacity-0'
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-5 w-5 text-amber-500"
				>
					{/* Sun center */}
					<circle
						cx="12"
						cy="12"
						r="4"
						className="transition-all duration-300 group-hover:r-[4.5]"
						style={{ fill: 'currentColor', fillOpacity: 0.2 }}
					/>
					{/* Sun rays - animated */}
					<g
						className={`origin-center ${isAnimating ? '' : 'animate-[rays-spin_20s_linear_infinite]'}`}
					>
						<path d="M12 2v2" />
						<path d="M12 20v2" />
						<path d="m4.93 4.93 1.41 1.41" />
						<path d="m17.66 17.66 1.41 1.41" />
						<path d="M2 12h2" />
						<path d="M20 12h2" />
						<path d="m6.34 17.66-1.41 1.41" />
						<path d="m19.07 4.93-1.41 1.41" />
					</g>
				</svg>
			</div>

			{/* Moon icon */}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
					isDark
						? 'translate-y-full -rotate-90 scale-50 opacity-0'
						: 'translate-y-0 rotate-0 scale-100 opacity-100'
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="h-5 w-5 text-indigo-500"
				>
					<path
						d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
						style={{ fill: 'currentColor', fillOpacity: 0.15 }}
					/>
					{/* Stars */}
					<circle
						cx="19"
						cy="5"
						r="0.5"
						className="animate-pulse"
						style={{ fill: 'currentColor' }}
					/>
					<circle
						cx="21"
						cy="9"
						r="0.3"
						className="animate-pulse [animation-delay:0.5s]"
						style={{ fill: 'currentColor' }}
					/>
				</svg>
			</div>
		</button>
	);
}
