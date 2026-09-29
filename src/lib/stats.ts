// Live numbers for the Fallow section, fetched on the server and revalidated daily.

export interface Stats {
	fallowDownloads: number;
	fallowStars: number;
}

const FALLBACK: Stats = { fallowDownloads: 4_217_650, fallowStars: 4_900 };
const DAY = 60 * 60 * 24;

const getJson = async <T>(url: string): Promise<T | null> => {
	try {
		const res = await fetch(url, {
			next: { revalidate: DAY },
			signal: AbortSignal.timeout(5000),
			headers: { Accept: 'application/json', 'User-Agent': 'waardenburg.dev' },
		});
		return res.ok ? ((await res.json()) as T) : null;
	} catch {
		return null;
	}
};

export const getStats = async (): Promise<Stats> => {
	const [npm, gh] = await Promise.all([
		getJson<{ downloads?: number }>(
			'https://api.npmjs.org/downloads/point/last-month/fallow',
		),
		getJson<{ stargazers_count?: number }>(
			'https://api.github.com/repos/fallow-rs/fallow',
		),
	]);
	return {
		fallowDownloads: npm?.downloads || FALLBACK.fallowDownloads,
		fallowStars: gh?.stargazers_count || FALLBACK.fallowStars,
	};
};
