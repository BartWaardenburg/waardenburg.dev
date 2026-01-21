'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

export interface NavLink {
	href: string;
	label: string;
	showOnMobile?: boolean;
}

export interface HeaderProps {
	logo: string;
	logoHref: string;
	navLinks: NavLink[];
	skipLinkText: string;
}

export function Header({
	logo,
	logoHref,
	navLinks,
	skipLinkText,
}: HeaderProps) {
	return (
		<header
			className="fixed left-0 right-0 top-0 z-50 bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-950/80"
			style={{ viewTransitionName: 'header' }}
		>
			{/* Skip navigation link for accessibility */}
			<a
				href="#main"
				className="absolute left-4 top-4 -translate-y-16 rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-50 transition-transform focus:translate-y-0 dark:bg-neutral-50 dark:text-neutral-900"
			>
				{skipLinkText}
			</a>
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-12">
				<a
					href={logoHref}
					className="text-2xl font-bold tracking-tight"
					style={{ viewTransitionName: 'logo' }}
				>
					{logo}
				</a>
				<nav className="flex items-center gap-1 text-base">
					{navLinks.map((link, index) => (
						<span
							key={link.href}
							className={`flex items-center gap-1 ${link.showOnMobile === false ? 'hidden md:flex' : ''}`}
						>
							<a
								href={link.href}
								className="px-3 py-2 transition-colors hover:text-neutral-500 dark:hover:text-neutral-400"
							>
								{link.label}
							</a>
							{index < navLinks.length - 1 && (
								<span className="hidden text-neutral-300 md:inline dark:text-neutral-600">
									|
								</span>
							)}
						</span>
					))}
					<span className="text-neutral-300 dark:text-neutral-600">|</span>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
