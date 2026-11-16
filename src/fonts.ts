import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';

// The width axis gives the narrow poster headings, the optical size axis keeps body text open.
export const display = Bricolage_Grotesque({
	subsets: ['latin'],
	display: 'swap',
	axes: ['opsz', 'wdth'],
	variable: '--font-display',
});

export const mono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-code',
});
