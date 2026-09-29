'use client';

import {
	animate,
	useInView,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
	type MotionValue,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface TerminalLine {
	kind: 'cmd' | 'dim' | 'blank' | 'head' | 'path' | 'fail';
	text: string;
}

const STYLE: Record<TerminalLine['kind'], string> = {
	cmd: 'text-fg',
	dim: 'text-dim',
	blank: '',
	head: 'text-fg font-bold',
	path: 'text-muted',
	fail: 'text-wine',
};

interface TerminalProps {
	lines: TerminalLine[];
	title?: string;
	/** 0..1 drives the typing from scroll; without it the terminal types itself once seen */
	progress?: MotionValue<number> | undefined;
	className?: string;
}

/** A terminal window that types out its session, scrubbed by scroll or on its own. */
export function Terminal({
	lines,
	title = 'zsh — fallow',
	progress,
	className,
}: TerminalProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
	const total = lines.reduce((s, l) => s + Math.max(1, l.text.length), 0);
	const auto = useMotionValue(0);
	const [chars, setChars] = useState(total);
	const [ready, setReady] = useState(false);
	const source = progress ?? auto;

	useEffect(() => {
		if (reduce) return;
		setReady(true);
		setChars(Math.floor(source.get() * total));
	}, [reduce, source, total]);

	useEffect(() => {
		if (progress || !inView || reduce) return;
		const c = animate(auto, 1, { duration: 3.2, ease: 'linear', delay: 0.2 });
		return () => c.stop();
	}, [auto, inView, progress, reduce]);

	useMotionValueEvent(source, 'change', (v) => {
		if (!ready) return;
		const next = Math.floor(Math.min(1, Math.max(0, v)) * total);
		setChars((prev) => (prev === next ? prev : next));
	});

	let budget = chars;
	let caretPlaced = false;

	return (
		<div
			ref={ref}
			className={`glass shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] ${className ?? ''}`}
		>
			<div className="flex items-center gap-2 border-b border-line px-4 py-3">
				<span className="size-2 bg-wine" />
				<span className="size-2 bg-ochre" />
				<span className="size-2 bg-sage" />
				<span className="ml-3 font-mono text-[11px] text-dim">{title}</span>
			</div>
			<p className="sr-only">{lines.map((l) => l.text).join('\n')}</p>
			<pre
				aria-hidden
				className="min-h-[19.5rem] p-5 font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap sm:text-xs"
			>
				{lines.map((line, i) => {
					const len = Math.max(1, line.text.length);
					const shown = Math.max(0, Math.min(len, budget));
					budget -= len;
					if (shown === 0 && caretPlaced)
						return <div key={i} className="h-[1.6em]" />;
					const partial = shown < len;
					const caret = partial && !caretPlaced;
					if (caret) caretPlaced = true;
					const text = line.text.slice(0, shown);
					return (
						<div
							key={i}
							className={`${STYLE[line.kind]} min-h-[1.6em]`}
							aria-hidden
						>
							{line.kind === 'cmd' && <span className="text-accent">❯ </span>}
							<span className={caret ? 'caret' : ''}>{text}</span>
						</div>
					);
				})}
				{!caretPlaced && (
					<div aria-hidden>
						<span className="text-accent">❯ </span>
						<span className="caret" />
					</div>
				)}
			</pre>
		</div>
	);
}
