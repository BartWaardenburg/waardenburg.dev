import Image, { type StaticImageData } from 'next/image';

interface PaintedPropProps {
	image: StaticImageData;
	/** the rendered width, for the browser to pick a file size */
	sizes: string;
	/** sets the size: give a width or a height, the other one follows */
	className?: string;
}

/** A painted object from the garden, cut out, that stands in the page. Decoration. */
export function PaintedProp({ image, sizes, className }: PaintedPropProps) {
	return (
		<Image
			src={image}
			alt=""
			aria-hidden
			sizes={sizes}
			className={`painted-prop pointer-events-none max-w-none select-none ${className ?? ''}`}
		/>
	);
}
