export function Contact() {
	return (
		<section id="contact" className="flex min-h-screen items-center px-6 md:px-12">
			<div className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<h2 className="mb-8 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
						Let's chat.
					</h2>
					<div className="space-y-6 text-xl leading-relaxed text-neutral-700 md:text-2xl">
						<p>Whether it's a project, a question, or just talking front-end.</p>
						<p>
							Drop me a line at{' '}
							<a
								href="mailto:bart@waardenburg.dev"
								className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
							>
								bart@waardenburg.dev
							</a>
						</p>
						<p className="pt-4 text-neutral-900">
							Find me on{' '}
							<a
								href="https://github.com/BartWaardenburg"
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
							>
								GitHub
							</a>{' '}
							and{' '}
							<a
								href="https://linkedin.com/in/bartwaardenburg"
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
							>
								LinkedIn
							</a>
							.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
