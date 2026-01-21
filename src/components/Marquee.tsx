export function Marquee() {
	const text = 'BUILDING PRODUCTS THAT MATTER';
	const repeatedText = Array(10).fill(text).join(' · ');

	return (
		<div className="overflow-hidden border-y border-neutral-200 bg-neutral-900 py-5">
			<div className="animate-marquee flex whitespace-nowrap">
				<span className="text-2xl italic tracking-widest text-neutral-50">
					{repeatedText} ·{' '}
				</span>
				<span className="text-2xl italic tracking-widest text-neutral-50">
					{repeatedText} ·{' '}
				</span>
			</div>
		</div>
	);
}
