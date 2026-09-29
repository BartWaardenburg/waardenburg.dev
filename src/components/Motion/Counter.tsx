'use client';

import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
	value: number;
	format?: 'compact' | 'plain';
	decimals?: number;
	suffix?: string;
	className?: string;
}

const fmt = (n: number, format: CounterProps['format'], decimals: number) => {
	if (format === 'compact') {
		if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
		if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
	}
	return n.toFixed(decimals);
};

/** Rolls a number up from zero the first time it is seen. */
export function Counter({
	value,
	format = 'plain',
	decimals = 0,
	suffix = '',
	className,
}: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
	const reduce = useReducedMotion();
	const [shown, setShown] = useState(value);
	const started = useRef(false);

	// server HTML carries the real number; once hydrated, park it at zero until it is seen
	useEffect(() => {
		if (!reduce && !started.current) setShown(0);
	}, [reduce]);

	useEffect(() => {
		if (!inView || reduce || started.current) return;
		started.current = true;
		const controls = animate(0, value, {
			duration: 2.2,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: setShown,
		});
		return () => controls.stop();
	}, [inView, reduce, value]);

	return (
		<span ref={ref} className={`tabular-nums ${className ?? ''}`}>
			{fmt(shown, format, decimals)}
			{suffix}
		</span>
	);
}
