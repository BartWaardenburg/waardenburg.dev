'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { ReactNode, PointerEvent } from 'react';

/** Pulls its child a little towards the pointer, then springs back. */
export function Magnetic({
	children,
	strength = 0.35,
	className,
}: {
	children: ReactNode;
	strength?: number;
	className?: string;
}) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
	const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });
	const onMove = (e: PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== 'mouse') return;
		const r = e.currentTarget.getBoundingClientRect();
		x.set((e.clientX - r.left - r.width / 2) * strength);
		y.set((e.clientY - r.top - r.height / 2) * strength);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	return (
		<motion.div
			className={`inline-block ${className ?? ''}`}
			style={{ x: sx, y: sy }}
			onPointerMove={onMove}
			onPointerLeave={reset}
		>
			{children}
		</motion.div>
	);
}
