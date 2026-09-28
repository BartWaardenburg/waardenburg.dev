'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

import { Magnetic, Reveal, SplitWords } from '@/components/Motion';
import { site } from '@/content';

export function Contact() {
	const ref = useRef<HTMLElement>(null);
	const [copied, setCopied] = useState(false);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end end'],
	});
	const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(site.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			window.location.href = `mailto:${site.email}`;
		}
	};

	return (
		<section
			id="contact"
			ref={ref}
			data-scene="portal"
			aria-labelledby="contact-title"
			className="relative flex min-h-svh flex-col justify-between px-5 pt-40 pb-8 md:px-10"
		>
			<motion.div
				style={{ scale }}
				className="mx-auto w-full max-w-[1600px] text-center"
			>
				<Reveal className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
					{site.availability}
				</Reveal>
				<h2
					id="contact-title"
					className="mt-8 font-sans text-[clamp(4rem,15vw,15rem)] leading-[0.82] font-extrabold tracking-[-0.06em]"
				>
					<SplitWords
						text="Let's *talk.*"
						stagger={0.12}
						italicClassName="text-wine"
					/>
				</h2>
				<p className="mx-auto mt-8 max-w-xl text-lg text-muted">
					DevRel, developer tools, growth engineering, or a hard tooling problem
					you want explained well. I would love to hear about it.
				</p>
				<div className="mt-12 flex flex-wrap items-center justify-center gap-4">
					<Magnetic strength={0.5}>
						<a
							href={`mailto:${site.email}`}
							className="inline-flex items-center gap-3 bg-sage px-8 py-5 font-mono text-sm font-bold tracking-[0.1em] text-bg transition-colors hover:bg-fg"
						>
							{site.email}
						</a>
					</Magnetic>
					<button
						type="button"
						onClick={copy}
						className="cursor-pointer border border-line px-6 py-5 font-mono text-xs tracking-[0.14em] uppercase transition-colors hover:border-fg"
					>
						<span aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</span>
					</button>
				</div>
				<ul className="mt-10 flex justify-center gap-8 font-mono text-xs tracking-[0.16em] uppercase">
					{[
						{ href: site.github, label: 'GitHub' },
						{ href: site.linkedin, label: 'LinkedIn' },
						{ href: 'https://fallow.tools', label: 'Fallow' },
						{ href: 'https://isagentready.com', label: 'IsAgentReady' },
					].map((l) => (
						<li key={l.label}>
							<a
								href={l.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group relative text-muted transition-colors hover:text-fg"
							>
								{l.label}
								<span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
							</a>
						</li>
					))}
				</ul>
			</motion.div>

			<footer className="mx-auto mt-24 flex w-full max-w-[1600px] flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] tracking-[0.12em] text-dim uppercase md:flex-row md:justify-between">
				<p>
					© {new Date().getFullYear()} {site.name} · {site.location}
				</p>
			</footer>
		</section>
	);
}
