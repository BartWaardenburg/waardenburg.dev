'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * A ring that trails the pointer and swells over anything clickable, labelled by
 * data-cursor when present. The native cursor stays: this only adds to it.
 */
export function Cursor() {
	const [enabled, setEnabled] = useState(false);
	const [hover, setHover] = useState(false);
	const [label, setLabel] = useState<string | null>(null);
	const [down, setDown] = useState(false);
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
	const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

	useEffect(() => {
		const mq = window.matchMedia(
			'(pointer: fine) and (prefers-reduced-motion: no-preference)',
		);
		setEnabled(mq.matches);
		if (!mq.matches) return;
		const move = (e: PointerEvent) => {
			x.set(e.clientX);
			y.set(e.clientY);
			const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
				'a, button, [data-cursor]',
			);
			setHover(Boolean(target));
			setLabel(target?.dataset.cursor ?? null);
		};
		const press = () => setDown(true);
		const release = () => setDown(false);
		window.addEventListener('pointermove', move, { passive: true });
		window.addEventListener('pointerdown', press);
		window.addEventListener('pointerup', release);
		return () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerdown', press);
			window.removeEventListener('pointerup', release);
		};
	}, [x, y]);

	if (!enabled) return null;

	const size = label ? 88 : hover ? 56 : 28;

	return (
		<motion.div
			aria-hidden
			className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
			style={{ x: sx, y: sy }}
		>
			<motion.div
				className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70"
				animate={{
					width: size,
					height: size,
					backgroundColor: label
						? 'rgb(255 255 255 / 1)'
						: 'rgb(255 255 255 / 0)',
					scale: down ? 0.85 : 1,
				}}
				transition={{ type: 'spring', stiffness: 400, damping: 30 }}
			>
				{label && (
					<span className="font-mono text-[10px] font-bold tracking-[0.14em] text-black uppercase">
						{label}
					</span>
				)}
			</motion.div>
		</motion.div>
	);
}
