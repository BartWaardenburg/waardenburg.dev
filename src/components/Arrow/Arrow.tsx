/** The one icon of the site: an arrow that points out of the page. */
export function Arrow({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 20 20"
			aria-hidden
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`size-[0.95em] shrink-0 ${className ?? ''}`}
		>
			<path d="M5 15 15 5M7 5h8v8" />
		</svg>
	);
}
