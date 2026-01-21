export interface SocialLink {
	url: string;
	label: string;
}

export interface ContactProps {
	title: string;
	intro: string;
	email: string;
	emailLabel: string;
	socialIntro: string;
	socialLinks: SocialLink[];
}

export function Contact({
	title,
	intro,
	email,
	emailLabel,
	socialIntro,
	socialLinks,
}: ContactProps) {
	return (
		<section
			id="contact"
			className="flex min-h-screen items-center px-6 md:px-12"
		>
			<div className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<h2 className="mb-8 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
						{title}
					</h2>
					<div className="space-y-6 text-xl leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-2xl">
						<p>{intro}</p>
						<p>
							{emailLabel}{' '}
							<a
								href={`mailto:${email}`}
								className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:text-neutral-50 dark:decoration-neutral-600 dark:hover:decoration-neutral-50"
							>
								{email}
							</a>
						</p>
						<p className="pt-4 text-neutral-900 dark:text-neutral-50">
							{socialIntro}{' '}
							{socialLinks.map((link, index) => (
								<span key={link.url}>
									<a
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:decoration-neutral-600 dark:hover:decoration-neutral-50"
									>
										{link.label}
									</a>
									{index < socialLinks.length - 1 ? ' and ' : '.'}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
