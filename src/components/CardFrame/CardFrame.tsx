'use client';

import type { ReactNode } from 'react';

interface CardFrameProps {
	children: ReactNode;
}

export function CardFrame({ children }: CardFrameProps) {
	return (
		<div className="relative">
			{/* Outer decorative border */}
			<div className="absolute -inset-3 rounded-xl border-2 border-neutral-900/10 transition-colors duration-300 dark:border-neutral-50/10" />
			{/* Offset accent line */}
			<div className="absolute -inset-1.5 rounded-lg border border-neutral-900/20 transition-colors duration-300 dark:border-neutral-50/20" />
			{/* Corner accents */}
			<div className="absolute -left-3 -top-3 h-4 w-4 rounded-tl border-l-2 border-t-2 border-neutral-900/30 transition-colors duration-300 dark:border-neutral-50/30" />
			<div className="absolute -right-3 -top-3 h-4 w-4 rounded-tr border-r-2 border-t-2 border-neutral-900/30 transition-colors duration-300 dark:border-neutral-50/30" />
			<div className="absolute -bottom-3 -left-3 h-4 w-4 rounded-bl border-b-2 border-l-2 border-neutral-900/30 transition-colors duration-300 dark:border-neutral-50/30" />
			<div className="absolute -bottom-3 -right-3 h-4 w-4 rounded-br border-b-2 border-r-2 border-neutral-900/30 transition-colors duration-300 dark:border-neutral-50/30" />
			{/* Main content */}
			<div className="relative">{children}</div>
		</div>
	);
}
