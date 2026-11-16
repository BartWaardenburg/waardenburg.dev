'use client';

import { useState } from 'react';

import { Arrow } from '@/components/Arrow';
import { Reveal, SplitWords } from '@/components/Motion';
import { site } from '@/content';

const COPIED_MS = 1800;

const LINKS = [
	{ href: site.github, label: 'GitHub' },
	{ href: site.linkedin, label: 'LinkedIn' },
	{ href: site.twitter, label: 'X / Twitter' },
	{ href: 'https://fallow.tools', label: 'Fallow' },
	{ href: 'https://isagentready.com', label: 'IsAgentReady' },
];

export function Contact() {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(site.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), COPIED_MS);
		} catch {
			window.location.href = `mailto:${site.email}`;
		}
	};

	return (
		<section
			id="contact"
			aria-labelledby="contact-title"
			className="paint brushed wash-soil flex min-h-[80svh] flex-col justify-between px-5 pt-32 pb-8 md:px-10 md:pt-44"
		>
			<div className="mx-auto w-full max-w-[1440px]">
				<h2
					id="contact-title"
					className="display -ml-[0.04em] text-[clamp(4.5rem,17vw,13rem)] leading-[0.8]"
				>
					<SplitWords
						text="Let's *talk.*"
						stagger={0.12}
						accentClassName="ink-dusk"
					/>
				</h2>
				<Reveal>
					<p className="mt-8 text-xl font-semibold tracking-tight md:text-2xl">
						{site.availability}
					</p>
					<p className="mt-4 max-w-xl text-lg text-muted">
						DevRel, developer tools, growth engineering, or a hard tooling
						problem you want explained well. I would love to hear about it.
					</p>
					<div className="mt-10 flex flex-wrap items-center gap-4">
						<a href={`mailto:${site.email}`} className="btn btn-light">
							{site.email}
						</a>
						<button
							type="button"
							onClick={copy}
							className="stroke-link cursor-pointer px-1 py-2"
						>
							<span aria-live="polite">
								{copied ? 'Copied' : 'Copy address'}
							</span>
						</button>
					</div>
					<ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
						{LINKS.map((l) => (
							<li key={l.label}>
								<a
									href={l.href}
									target="_blank"
									rel="noopener noreferrer"
									className="stroke-link"
								>
									{l.label} <Arrow />
								</a>
							</li>
						))}
					</ul>
				</Reveal>
			</div>

			<footer className="mx-auto mt-24 w-full max-w-[1440px] border-t border-line pt-6 text-sm text-muted">
				<p>
					© {new Date().getFullYear()} {site.name} · {site.location}
				</p>
			</footer>
		</section>
	);
}
