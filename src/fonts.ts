import { Recursive } from 'next/font/google';

export const recursive = Recursive({
	subsets: ['latin'],
	display: 'swap',
	axes: ['CASL', 'MONO', 'slnt'],
	fallback: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
});
