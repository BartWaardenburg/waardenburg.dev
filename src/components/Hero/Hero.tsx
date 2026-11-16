'use client';

import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

import allotment from '@/assets/allotment.jpg';
import { Arrow } from '@/components/Arrow';
import { SplitWords } from '@/components/Motion';
import { hero, site } from '@/content';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
	const ref = useRef<HTMLElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});
	// the painting falls behind the text as the page moves on
	const paintingY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
	const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

	return (
		<section
			id="top"
			ref={ref}
			className="paint wash-sky isolate flex min-h-[min(100svh,1080px)] flex-col overflow-hidden px-5 pt-28 pb-[clamp(300px,34vw,430px)] md:px-10 md:pt-36"
		>
			{/* the painting stands on the bottom edge; its sky fades into the wash above it */}
			<motion.div
				aria-hidden
				style={reduce ? {} : { y: paintingY }}
				className="absolute inset-x-0 bottom-0 -z-20 h-[min(86%,118vw)] [mask-image:linear-gradient(to_bottom,transparent,black_24%)]"
			>
				<Image
					src={allotment}
					alt=""
					fill
					priority
					placeholder="blur"
					sizes="(max-aspect-ratio: 2/1) 205vh, 100vw"
					className="object-cover object-[82%_100%]"
				/>
			</motion.div>

			<motion.div
				style={reduce ? {} : { y: copyY }}
				className="mx-auto w-full max-w-[1440px]"
			>
				<h1 className="display -ml-[0.04em] text-[clamp(5rem,15.5vw,11.5rem)] leading-[0.82]">
					<span className="sr-only">{site.name}: </span>
					<SplitWords text="Build." immediate className="block" />
					<SplitWords
						text="*Teach.*"
						immediate
						delay={0.12}
						italicClassName="text-pine"
						className="block"
					/>
				</h1>
				<motion.div
					initial={reduce ? false : { opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.45, ease: EASE }}
					className="max-w-[34rem]"
				>
					<p className="mt-6 text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)] leading-[1.25] font-semibold tracking-[-0.015em] text-balance">
						{hero.title}
					</p>
					<p className="mt-4 max-w-md text-pretty">{hero.lede}</p>
					<div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
						<a href="#fallow" className="btn">
							See Fallow
						</a>
						<a href="#contact" className="stroke-link">
							Get in touch <Arrow />
						</a>
					</div>
					<p className="sheet mt-7 inline-flex items-center gap-3 !rounded-full px-4 py-2 text-sm font-semibold">
						<span
							aria-hidden
							className="dab h-3 w-3 rotate-0 [--dab:var(--color-clay)]"
						/>
						{site.availability}
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
}
