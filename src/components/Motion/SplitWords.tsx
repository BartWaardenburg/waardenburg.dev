import type { CSSProperties } from 'react';

interface SplitWordsProps {
	text: string;
	className?: string;
	delay?: number;
	stagger?: number;
	/** the paint that fills the *accent* words, one of the `ink-*` classes */
	accentClassName?: string;
	/** play on load instead of when scrolled into view */
	immediate?: boolean;
}

/**
 * Each word slides up out of its own mask, one after another. Words wrapped in
 * *asterisks* are filled with paint. CSS only, see RevealObserver.
 */
export function SplitWords({
	text,
	className,
	delay = 0,
	stagger = 0.06,
	accentClassName = 'ink-meadow',
	immediate = false,
}: SplitWordsProps) {
	// *asterisks* may span several words
	let open = false;
	const words = text.split(' ').map((raw) => {
		const starts = raw.startsWith('*');
		const ends =
			raw.replace(/[.,!?]$/, '').endsWith('*') && (raw.length > 1 || !starts);
		const accent = open || starts;
		if (starts) open = true;
		if (ends) open = false;
		return { word: raw.replaceAll('*', ''), accent };
	});
	return (
		<span className={className}>
			<span className="sr-only">{text.replaceAll('*', '')}</span>
			<span aria-hidden data-reveal-words={immediate ? 'now' : ''}>
				{words.map(({ word, accent }, i) => {
					return (
						<span key={`${word}-${i}`} className="sw-mask">
							<span
								className={`sw-word ${accent ? `painted ${accentClassName}` : ''}`}
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
