export function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm">
			{/* Skip navigation link for accessibility */}
			<a
				href="#main"
				className="absolute left-4 top-4 -translate-y-16 rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 transition-transform focus:translate-y-0"
			>
				Skip to main content
			</a>
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-12">
				<a href="/" className="text-2xl font-bold tracking-tight">
					BW
				</a>
				<nav className="flex items-center gap-1 text-base">
					<a
						href="#work"
						className="px-3 py-2 transition-colors hover:text-neutral-500"
					>
						Work
					</a>
					<span className="text-neutral-300">|</span>
					<a
						href="#speaking"
						className="px-3 py-2 transition-colors hover:text-neutral-500"
					>
						Talks
					</a>
					<span className="text-neutral-300">|</span>
					<a
						href="#contact"
						className="px-3 py-2 transition-colors hover:text-neutral-500"
					>
						Contact
					</a>
				</nav>
			</div>
		</header>
	);
}
