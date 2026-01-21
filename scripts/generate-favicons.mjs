/**
 * Favicon Generation Script
 * Generates all favicon sizes and formats from the base SVG
 *
 * Run with: node scripts/generate-favicons.mjs
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

// Base SVG for the icon (BW initials with gradient background)
const createIconSvg = (size, padding = 0) => {
	const viewBox = size;
	const radius = Math.round(size * 0.1875); // 96/512 ratio
	const fontSize = Math.round(size * 0.46875); // 240/512 ratio
	const textY = Math.round(size * 0.664); // 340/512 ratio
	const letterSpacing = Math.round(size * -0.0234); // -12/512 ratio

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#262626"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect x="${padding}" y="${padding}" width="${size - padding * 2}" height="${size - padding * 2}" rx="${radius}" fill="url(#bg-gradient)"/>
  <text x="${size / 2}" y="${textY}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" fill="#fafafa" letter-spacing="${letterSpacing}">BW</text>
</svg>`;
};

// Maskable icon with safe zone padding (for PWA)
const createMaskableIconSvg = (size) => {
	const padding = Math.round(size * 0.1); // 10% padding for safe zone
	const innerSize = size - padding * 2;
	const radius = Math.round(innerSize * 0.1875);
	const fontSize = Math.round(innerSize * 0.46875);
	const textY = padding + Math.round(innerSize * 0.664);
	const letterSpacing = Math.round(innerSize * -0.0234);

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#171717"/>
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#262626"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${radius}" fill="url(#bg-gradient)"/>
  <text x="${size / 2}" y="${textY}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" fill="#fafafa" letter-spacing="${letterSpacing}">BW</text>
</svg>`;
};

// OpenGraph image (1200x630) with more context
const createOgImageSvg = () => {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#171717"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#262626" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg-gradient)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.5"/>
  <text x="600" y="280" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="180" font-weight="700" text-anchor="middle" fill="#fafafa" letter-spacing="-8">BW</text>
  <text x="600" y="380" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="32" font-weight="500" text-anchor="middle" fill="#a3a3a3">waardenburg.dev</text>
  <text x="600" y="430" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="400" text-anchor="middle" fill="#737373">Full-stack Developer &amp; Front-end Expert</text>
</svg>`;
};

// Twitter card image (can be same as OG or 2:1 ratio)
const createTwitterImageSvg = () => {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#171717"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#262626" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="600" fill="url(#bg-gradient)"/>
  <rect width="1200" height="600" fill="url(#grid)" opacity="0.5"/>
  <text x="600" y="265" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="180" font-weight="700" text-anchor="middle" fill="#fafafa" letter-spacing="-8">BW</text>
  <text x="600" y="365" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="32" font-weight="500" text-anchor="middle" fill="#a3a3a3">waardenburg.dev</text>
  <text x="600" y="415" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="400" text-anchor="middle" fill="#737373">Full-stack Developer &amp; Front-end Expert</text>
</svg>`;
};

async function generateFavicons() {
	console.log('Generating favicons...\n');

	// Generate standard icon sizes
	const iconSizes = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

	for (const size of iconSizes) {
		const svg = createIconSvg(size);
		const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

		if (size === 192 || size === 512) {
			await fs.writeFile(path.join(PUBLIC_DIR, `icon-${size}.png`), buffer);
			console.log(`  Created icon-${size}.png`);
		}

		if (size === 180) {
			await fs.writeFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), buffer);
			console.log(`  Created apple-touch-icon.png`);
		}
	}

	// Generate Apple Touch Icon (180x180)
	const appleSvg = createIconSvg(180);
	const appleBuffer = await sharp(Buffer.from(appleSvg)).png().toBuffer();
	await fs.writeFile(
		path.join(PUBLIC_DIR, 'apple-touch-icon.png'),
		appleBuffer,
	);
	console.log('  Created apple-touch-icon.png');

	// Generate maskable icons for PWA
	const maskableSizes = [192, 512];
	for (const size of maskableSizes) {
		const svg = createMaskableIconSvg(size);
		const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
		await fs.writeFile(
			path.join(PUBLIC_DIR, `icon-${size}-maskable.png`),
			buffer,
		);
		console.log(`  Created icon-${size}-maskable.png`);
	}

	// Generate favicon PNG sizes
	const favicon32Svg = createIconSvg(32);
	const favicon32Buffer = await sharp(Buffer.from(favicon32Svg))
		.png()
		.toBuffer();
	await fs.writeFile(
		path.join(PUBLIC_DIR, 'favicon-32x32.png'),
		favicon32Buffer,
	);
	console.log('  Created favicon-32x32.png');

	const favicon16Svg = createIconSvg(16);
	const favicon16Buffer = await sharp(Buffer.from(favicon16Svg))
		.png()
		.toBuffer();
	await fs.writeFile(
		path.join(PUBLIC_DIR, 'favicon-16x16.png'),
		favicon16Buffer,
	);
	console.log('  Created favicon-16x16.png');

	// Generate favicon.ico (multi-size ICO with 16x16, 32x32, 48x48)
	const favicon48Svg = createIconSvg(48);
	const favicon48Buffer = await sharp(Buffer.from(favicon48Svg))
		.png()
		.toBuffer();

	const icoBuffer = await pngToIco([
		favicon16Buffer,
		favicon32Buffer,
		favicon48Buffer,
	]);
	await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
	console.log('  Created favicon.ico (16x16, 32x32, 48x48)');

	// Generate OpenGraph image
	const ogSvg = createOgImageSvg();
	const ogBuffer = await sharp(Buffer.from(ogSvg)).png().toBuffer();
	await fs.writeFile(path.join(PUBLIC_DIR, 'og-image.png'), ogBuffer);
	console.log('  Created og-image.png');

	// Generate Twitter image
	const twitterSvg = createTwitterImageSvg();
	const twitterBuffer = await sharp(Buffer.from(twitterSvg)).png().toBuffer();
	await fs.writeFile(path.join(PUBLIC_DIR, 'twitter-image.png'), twitterBuffer);
	console.log('  Created twitter-image.png');

	// Update the main SVG icon
	const mainIconSvg = createIconSvg(512);
	await fs.writeFile(path.join(PUBLIC_DIR, 'icon.svg'), mainIconSvg);
	console.log('  Updated icon.svg');

	console.log('\nFavicon generation complete!');
	console.log('\nGenerated files:');
	console.log('  - icon.svg (vector favicon)');
	console.log('  - icon-192.png, icon-512.png (PWA icons)');
	console.log(
		'  - icon-192-maskable.png, icon-512-maskable.png (maskable PWA icons)',
	);
	console.log('  - apple-touch-icon.png (Apple devices)');
	console.log('  - favicon-16x16.png, favicon-32x32.png (browser tabs)');
	console.log('  - og-image.png (OpenGraph/social sharing)');
	console.log('  - twitter-image.png (Twitter cards)');
}

generateFavicons().catch(console.error);
