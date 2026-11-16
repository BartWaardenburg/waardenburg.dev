import type { CSSProperties } from 'react';

import { logoMasks } from '@/lib/logoMasks';

/** `size` is the height, in rem, of a logo that is three times as wide as it is high. */
const DEFAULT_SIZE = 3.25;
const BASE_RATIO = 3;

interface PaintedLogoProps {
	/** a path from `logos` in content.ts */
	logo: string;
	/** a CSS colour for the paint; the text colour by default */
	paint?: string;
	size?: number;
	className?: string;
}

/**
 * A company logo as one shape of thick paint. It is decoration: the name of the
 * company is always in the text next to it. Wide logos get less height and tall
 * logos more, so that all of them cover about the same area.
 */
export function PaintedLogo({
	logo,
	paint,
	size = DEFAULT_SIZE,
	className,
}: PaintedLogoProps) {
	const mask = logoMasks[logo];
	if (!mask) return null;
	const height = size * Math.sqrt(BASE_RATIO / mask.ratio);
	return (
		<span
			aria-hidden
			className={`paint-logo ${className ?? ''}`}
			style={
				{
					'--logo': `url(${mask.src})`,
					'--paint': paint,
					height: `${height.toFixed(2)}rem`,
					aspectRatio: mask.ratio,
				} as CSSProperties
			}
		/>
	);
}
