import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
	fallback: ['system-ui', 'sans-serif'],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<div className={spaceGrotesk.variable}>
				<Component {...pageProps} />
			</div>
		</ErrorBoundary>
	);
}
