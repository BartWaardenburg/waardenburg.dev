import type { CSSProperties } from 'react';

interface SplitWordsProps {
	text: string;
	className?: string;
	delay?: number;
	stagger?: number;
	/** colour for the *italic* words */
	italicClassName?: string;
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
	italicClassName = 'text-accent',
	immediate = false,
}: SplitWordsProps) {
	// *asterisks* may span several words
	let open = false;
	const words = text.split(' ').map((raw) => {
		const starts = raw.startsWith('*');
		const ends =
			raw.replace(/[.,!?]$/, '').endsWith('*') && (raw.length > 1 || !starts);
		const italic = open || starts;
		if (starts) open = true;
		if (ends) open = false;
		return { word: raw.replaceAll('*', ''), italic };
	});
	return (
		<span className={className}>
			<span className="sr-only">{text.replaceAll('*', '')}</span>
			<span aria-hidden data-reveal-words={immediate ? 'now' : ''}>
				{words.map(({ word, italic }, i) => {
					return (
						<span key={`${word}-${i}`} className="sw-mask">
							<span
								className={`sw-word ${italic ? `font-serif font-normal italic ${italicClassName}` : ''}`}
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
