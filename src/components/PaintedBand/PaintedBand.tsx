import Image, { type StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';

interface PaintedBandProps {
	image: StaticImageData;
	/** the colour at the bottom of the section above; its paint runs over the top edge */
	from: string;
	/** which part of the painting stays in view, as a CSS `object-position` */
	focus?: string;
}

/**
 * A strip of a painting between two sections. It is decoration. The section above
 * runs over its top edge, and the `brushed` section below runs over its bottom edge.
 */
export function PaintedBand({
	image,
	from,
	focus = '50% 60%',
}: PaintedBandProps) {
	return (
		<div
			aria-hidden
			className="painted-band"
			style={{ '--from': from } as CSSProperties}
		>
			<span className="painted-band-drift">
				<Image
					src={image}
					alt=""
					fill
					placeholder="blur"
					sizes="(max-aspect-ratio: 3/2) 150vh, 100vw"
					className="object-cover"
					style={{ objectPosition: focus }}
				/>
			</span>
		</div>
	);
}
