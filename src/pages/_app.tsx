import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={spaceGrotesk.variable}>
			<Component {...pageProps} />
		</div>
	);
}
