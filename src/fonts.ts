import {
	Instrument_Serif,
	Inter_Tight,
	JetBrains_Mono,
} from 'next/font/google';

export const display = Inter_Tight({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-display',
});

export const mono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-code',
});

export const serif = Instrument_Serif({
	subsets: ['latin'],
	weight: '400',
	style: ['italic'],
	display: 'swap',
	variable: '--font-italic',
});
