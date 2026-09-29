import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	as?: 'div' | 'li' | 'p' | 'span';
}

/**
 * Fades, lifts and un-blurs its children the first time they scroll into view.
 * Pure CSS driven by one shared IntersectionObserver (RevealObserver), so it costs
 * nothing to hydrate.
 */
export function Reveal({
	children,
	className,
	delay = 0,
	y = 32,
	as: Tag = 'div',
}: RevealProps) {
	return (
		<Tag
			data-reveal=""
			className={className}
			style={{ '--rd': `${delay}s`, '--ry': `${y}px` } as CSSProperties}
		>
			{children}
		</Tag>
	);
}
