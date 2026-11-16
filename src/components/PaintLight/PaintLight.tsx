/**
 * The wet paint under the pointer. Put one in every `paint` section, as a direct
 * child. `PaintLightDriver` moves the three blobs: the first follows the pointer,
 * the others drag behind it like a brush stroke.
 */
export function PaintLight({ className }: { className?: string }) {
	return (
		<span aria-hidden className={`paint-light ${className ?? ''}`}>
			<i />
			<i />
			<i />
		</span>
	);
}
