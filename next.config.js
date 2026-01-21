const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
	runtimeCaching: [
		{
			urlPattern: /^https?.*/,
			handler: 'NetworkFirst',
			options: {
				cacheName: 'https-calls',
				networkTimeoutSeconds: 15,
				expiration: {
					maxEntries: 150,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
	],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
	},
};

module.exports = withPWA(nextConfig);
