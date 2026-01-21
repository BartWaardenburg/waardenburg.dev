export interface FooterProps {
	name: string;
	location: string;
}

export function Footer({ name, location }: FooterProps) {
	return (
		<footer className="border-t border-neutral-200 px-6 py-8 dark:border-neutral-800 md:px-12">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400 md:flex-row">
				<div>{name}</div>
				<div>{location}</div>
				<div>&copy; {new Date().getFullYear()}</div>
			</div>
		</footer>
	);
}
