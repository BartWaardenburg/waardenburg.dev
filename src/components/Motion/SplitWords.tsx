import type { CSSProperties } from 'react';

interface SplitWordsProps {
	text: string;
	className?: string;
	delay?: number;
	stagger?: number;
	/** play on load instead of when scrolled into view */
	immediate?: boolean;
}

/**
 * Each word slides up out of its own mask, one after another. Words wrapped in
 * *asterisks* render in the accent italic serif. CSS only, see RevealObserver.
 */
export function SplitWords({
	text,
	className,
	delay = 0,
	stagger = 0.06,
	immediate = false,
}: SplitWordsProps) {
	const words = text.split(' ');
	return (
		<span className={className}>
			<span className="sr-only">{text.replaceAll('*', '')}</span>
			<span aria-hidden data-reveal-words={immediate ? 'now' : ''}>
				{words.map((raw, i) => {
					const italic =
						raw.startsWith('*') && raw.replace(/[.,!?]$/, '').endsWith('*');
					const word = raw.replaceAll('*', '');
					return (
						<span key={`${word}-${i}`} className="sw-mask">
							<span
								className={`sw-word ${italic ? 'font-serif font-normal text-accent italic' : ''}`}
								style={{ '--wd': `${delay + i * stagger}s` } as CSSProperties}
							>
								{word}
								{i < words.length - 1 ? ' ' : ''}
							</span>
						</span>
					);
				})}
			</span>
		</span>
	);
}
