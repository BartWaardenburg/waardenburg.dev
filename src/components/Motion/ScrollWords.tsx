'use client';

import { motion, useScroll, type MotionStyle } from 'motion/react';
import { useRef, type CSSProperties } from 'react';

/**
 * A paragraph that lights up word by word as it scrolls through the viewport.
 * One motion value feeds a CSS variable; each word derives its own opacity from it.
 */
export function ScrollWords({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start 0.85', 'end 0.45'],
	});
	const words = text.split(' ');
	return (
		<motion.p
			ref={ref}
			className={className}
			style={
				{
					'--p': scrollYProgress,
					'--n': words.length,
				} as unknown as MotionStyle
			}
		>
			<span className="sr-only">{text}</span>
			<span aria-hidden>
				{words.map((w, i) => (
					<span
						key={`${w}-${i}`}
						className="scroll-word"
						style={{ '--i': i } as CSSProperties}
					>
						{w}{' '}
					</span>
				))}
			</span>
		</motion.p>
	);
}
