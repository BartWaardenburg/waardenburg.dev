'use client';

import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
	wrap,
} from 'motion/react';
import { useRef } from 'react';

/** An endless ticker that speeds up, reverses and leans with the scroll velocity. */
export function Marquee({
	items,
	baseVelocity = -2.5,
}: {
	items: string[];
	baseVelocity?: number;
}) {
	const reduce = useReducedMotion();
	const x = useMotionValue(0);
	const { scrollY } = useScroll();
	const velocity = useVelocity(scrollY);
	const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
	const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], {
		clamp: false,
	});
	const skew = useTransform(smooth, [-3000, 0, 3000], [8, 0, -8]);
	const dir = useRef(1);
	const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

	useAnimationFrame((_, delta) => {
		if (reduce) return;
		const f = factor.get();
		if (f < 0) dir.current = -1;
		else if (f > 0) dir.current = 1;
		x.set(
			x.get() + dir.current * baseVelocity * (delta / 1000) * (1 + Math.abs(f)),
		);
	});

	const row = items.map((item, i) => (
		<span key={`${item}-${i}`} className="flex items-center gap-8 pr-8">
			<span className={i % 2 ? 'text-muted' : ''}>{item}</span>
			<span className={['text-sage', 'text-wine', 'text-ochre'][i % 3]}>✦</span>
		</span>
	));

	return (
		<div
			aria-hidden
			className="relative z-10 overflow-hidden border-y border-line bg-bg/70 py-5 backdrop-blur-sm"
		>
			<motion.div
				className="flex w-max font-sans text-4xl font-extrabold tracking-tight whitespace-nowrap uppercase md:text-6xl"
				style={{ x: pos, skewX: skew }}
			>
				<div className="flex">{row}</div>
				<div className="flex">{row}</div>
			</motion.div>
		</div>
	);
}
