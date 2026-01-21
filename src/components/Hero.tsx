export function Hero() {
	return (
		<section className="flex min-h-screen items-center px-6 pt-24 md:px-12">
			<div className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<h1 className="mb-8 text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
						Hello. I'm Bart.
					</h1>
					<div className="space-y-6 text-xl leading-relaxed text-neutral-700 md:text-2xl">
						<p>Full-stack developer. Front-end expert.</p>
						<p>Sometimes tech lead, sometimes deep in the code.</p>
						<p className="pt-4 text-neutral-900">
							I build things that work well for the people using them.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
