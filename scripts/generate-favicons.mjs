/**
 * Makes every favicon and app icon from one painted source image.
 *
 * The source, scripts/art/icon.jpg, is a full square: the initials in sunset
 * paint on the forest green. Each kind of icon shows a part of it.
 *
 * Run with: pnpm generate:favicons
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SOURCE = path.join(process.cwd(), 'scripts/art/icon.jpg');

/** The share of the source that an icon shows. A smaller share gives larger letters. */
const SHARE = {
	// the system cuts its own shape out of these, so the letters stay in the safe zone
	maskable: 1,
	app: 0.84,
	// browser tabs are tiny: the letters fill the icon
	tab: 0.68,
};
/** The corner radius of an icon with transparent corners, as a share of its size. */
const CORNER = 0.22;
/** Icons of this size and larger are saved with a colour palette. */
const PALETTE_FROM = 180;

const crop = async (share) => {
	const { width } = await sharp(SOURCE).metadata();
	const side = Math.round(width * share);
	const offset = Math.round((width - side) / 2);
	return sharp(SOURCE).extract({
		left: offset,
		top: offset,
		width: side,
		height: side,
	});
};

const roundedMask = (size) =>
	Buffer.from(
		`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * CORNER)}" fill="#fff"/></svg>`,
	);

/** A square icon. With `rounded`, the corners are transparent. */
const icon = async (size, share, rounded) => {
	// a palette keeps the large icons small; the tiny ones keep every colour
	const png = { palette: size >= PALETTE_FROM, quality: 90, effort: 10 };
	const square = (await crop(share)).resize(size, size);
	if (!rounded) return square.png(png).toBuffer();
	return sharp(await square.png().toBuffer())
		.composite([{ input: roundedMask(size), blend: 'dest-in' }])
		.png(png)
		.toBuffer();
};

const write = async (name, buffer) => {
	await fs.writeFile(path.join(PUBLIC_DIR, name), buffer);
	console.log(`  ${name}`);
};

const generate = async () => {
	console.log('Icons from scripts/art/icon.jpg:');

	const tab16 = await icon(16, SHARE.tab, true);
	const tab32 = await icon(32, SHARE.tab, true);
	const tab48 = await icon(48, SHARE.tab, true);
	await write('favicon-16x16.png', tab16);
	await write('favicon-32x32.png', tab32);
	await write('favicon.ico', await pngToIco([tab16, tab32, tab48]));

	for (const size of [192, 512]) {
		await write(`icon-${size}.png`, await icon(size, SHARE.app, true));
		await write(
			`icon-${size}-maskable.png`,
			await icon(size, SHARE.maskable, false),
		);
	}

	// iOS rounds the corners itself and shows transparent pixels as black
	await write('apple-touch-icon.png', await icon(180, SHARE.app, false));
};

generate().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
