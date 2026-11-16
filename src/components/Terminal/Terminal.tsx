'use client';

import {
	animate,
	useInView,
	useMotionValue,
	useMotionValueEvent,
	useReducedMotion,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface TerminalLine {
	kind: 'cmd' | 'dim' | 'blank' | 'head' | 'path' | 'fail';
	text: string;
}

const STYLE: Record<TerminalLine['kind'], string> = {
	cmd: 'text-[#fff8ea] font-semibold',
	dim: 'text-[#f4ecdc]/55',
	blank: '',
	head: 'text-sun font-bold',
	path: 'text-[#cdd6bc]',
	fail: 'text-[#f39270]',
};

interface TerminalProps {
	lines: TerminalLine[];
	title?: string;
	className?: string;
}

/** A terminal window that types out its session the first time it is seen. */
export function Terminal({
	lines,
	title = 'zsh: fallow',
	className,
}: TerminalProps) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();
	const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
	const total = lines.reduce((s, l) => s + Math.max(1, l.text.length), 0);
	const typed = useMotionValue(0);
	const [chars, setChars] = useState(total);
	const [ready, setReady] = useState(false);

	// server HTML carries the full session; once hydrated, start from an empty prompt
	useEffect(() => {
		if (reduce) return;
		setReady(true);
		setChars(Math.floor(typed.get() * total));
	}, [reduce, typed, total]);

	useEffect(() => {
		if (!inView || reduce) return;
		const c = animate(typed, 1, { duration: 3.2, ease: 'linear', delay: 0.2 });
		return () => c.stop();
	}, [typed, inView, reduce]);

	useMotionValueEvent(typed, 'change', (v) => {
		if (!ready) return;
		const next = Math.floor(Math.min(1, Math.max(0, v)) * total);
		setChars((prev) => (prev === next ? prev : next));
	});

	let budget = chars;
	let caretPlaced = false;

	return (
		<div
			ref={ref}
			className={`overflow-hidden rounded-xl bg-[#15110c] text-[#f4ecdc] shadow-[0_30px_44px_-22px_rgb(0_0_0/0.85)] ${className ?? ''}`}
		>
			<div className="flex items-center gap-2 border-b border-[#f4ecdc]/10 px-4 py-3">
				<span className="size-2.5 rounded-full bg-clay" />
				<span className="size-2.5 rounded-full bg-sun" />
				<span className="size-2.5 rounded-full bg-sage" />
				<span className="ml-3 font-mono text-[11px] text-[#f4ecdc]/60">
					{title}
				</span>
			</div>
			<p className="sr-only">{lines.map((l) => l.text).join('\n')}</p>
			<pre
				aria-hidden
				className="min-h-[19.5rem] p-5 font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap sm:text-xs md:text-[13px]"
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
							{line.kind === 'cmd' && <span className="text-sun">❯ </span>}
							<span className={caret ? 'caret' : ''}>{text}</span>
						</div>
					);
				})}
				{!caretPlaced && (
					<div aria-hidden>
						<span className="text-sun">❯ </span>
						<span className="caret" />
					</div>
				)}
			</pre>
		</div>
	);
}
