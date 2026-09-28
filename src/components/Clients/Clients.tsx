'use client';

import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'motion/react';
import { useRef, useState, type CSSProperties } from 'react';

import { SplitWords } from '@/components/Motion';
import { clients } from '@/content';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Pinned on wide screens: the particle field forms each client's logo on the right
 * while the text on the left follows along. One invisible marker per client drives
 * both, so they can never drift apart.
 */
export function Clients() {
	const markers = useRef<(HTMLDivElement | null)[]>([]);
	const [active, setActive] = useState(0);
	const { scrollY } = useScroll();
	const n = clients.length;

	useMotionValueEvent(scrollY, 'change', () => {
		const mid = window.innerHeight / 2;
		let idx = 0;
		markers.current.forEach((m, i) => {
			if (m && m.getBoundingClientRect().top <= mid) idx = i;
		});
		setActive((prev) => (prev === idx ? prev : idx));
	});

	const current = clients[active]!;

	return (
		<section
			id="clients"
			aria-labelledby="clients-title"
			className="relative"
			style={{ '--n': n } as CSSProperties}
		>
			<div className="relative lg:motion-safe:h-[calc(var(--n)*70svh+100svh)]">
				{clients.map((c, i) => (
					<div
						key={c.name}
						ref={(el) => {
							markers.current[i] = el;
						}}
						aria-hidden
						data-scene="logo"
						data-logo={c.logo}
						className="pointer-events-none absolute inset-x-0"
						style={{ top: `${(i * 100) / n}%`, height: `${100 / n}%` }}
					/>
				))}

				<div className="px-5 py-32 md:px-10 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:items-center lg:motion-safe:py-0">
					<div className="mx-auto w-full max-w-[1600px]">
						<div className="max-w-xl">
							<h2
								id="clients-title"
								className="font-sans text-[clamp(3rem,7vw,6.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
							>
								<SplitWords text="Built *for.*" italicClassName="text-ochre" />
							</h2>

							{/* wide screens: one client at a time, in step with the logo */}
							<div className="relative mt-12 hidden min-h-[15rem] lg:motion-safe:block">
								<AnimatePresence mode="wait">
									<motion.div
										key={current.name}
										initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
										animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
										exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
										transition={{ duration: 0.55, ease: EASE }}
									>
										<p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
											via {current.via} · {current.years}
										</p>
										<h3 className="mt-3 font-sans text-4xl font-bold tracking-tight md:text-5xl">
											{current.name}
										</h3>
										<p className="mt-4 text-lg leading-relaxed text-muted">
											{current.what}
										</p>
									</motion.div>
								</AnimatePresence>
							</div>
							<ol className="mt-10 hidden gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase lg:motion-safe:flex lg:motion-safe:flex-wrap">
								{clients.map((c, i) => (
									<li
										key={c.name}
										className={`transition-colors duration-500 ${i === active ? 'text-fg' : 'text-dim'}`}
									>
										{c.name}
									</li>
								))}
							</ol>

							{/* narrow screens and reduced motion: a plain list */}
							<ul className="mt-12 space-y-4 lg:motion-safe:hidden">
								{clients.map((c) => (
									<li key={c.name} className="glass p-6">
										<p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
											via {c.via} · {c.years}
										</p>
										<h3 className="mt-2 font-sans text-2xl font-bold tracking-tight">
											{c.name}
										</h3>
										<p className="mt-2 text-muted">{c.what}</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
