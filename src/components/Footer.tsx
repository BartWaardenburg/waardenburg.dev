export function Footer() {
	return (
		<footer className="border-t border-neutral-200 px-6 py-8 md:px-12">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
				<div>Bart Waardenburg</div>
				<div>The Hague, Netherlands</div>
				<div>&copy; {new Date().getFullYear()}</div>
			</div>
		</footer>
	);
}
