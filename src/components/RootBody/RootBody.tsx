'use client';

import type { ReactNode } from 'react';
import { Recursive } from 'next/font/google';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeScript } from '@/components/ThemeScript';

const recursive = Recursive({
	subsets: ['latin'],
	display: 'swap',
	axes: ['CASL', 'MONO', 'slnt'],
	fallback: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
});

interface RootBodyProps {
	children: ReactNode;
}

export function RootBody({ children }: RootBodyProps) {
	return (
		<body>
			<ThemeScript />
			<ErrorBoundary>
				<ThemeProvider>
					<div
						className={recursive.className}
						style={{ fontVariationSettings: "'MONO' 1, 'CASL' 1" }}
					>
						{children}
					</div>
				</ThemeProvider>
			</ErrorBoundary>
		</body>
	);
}
