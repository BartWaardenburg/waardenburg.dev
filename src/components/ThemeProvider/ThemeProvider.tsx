'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
	theme: Theme;
	resolvedTheme: 'light' | 'dark';
	setTheme: (theme: Theme) => void;
}

const defaultContext: ThemeContextValue = {
	theme: 'system',
	resolvedTheme: 'light',
	setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(defaultContext);

export function useTheme() {
	return useContext(ThemeContext);
}

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>('system');
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);

	const getSystemTheme = useCallback((): 'light' | 'dark' => {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}, []);

	const applyTheme = useCallback(
		(newTheme: Theme) => {
			const root = document.documentElement;
			const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;

			root.classList.remove('light', 'dark');
			root.classList.add(resolved);
			setResolvedTheme(resolved);

			// Update meta theme-color
			const metaThemeColor = document.querySelector('meta[name="theme-color"]');
			if (metaThemeColor) {
				metaThemeColor.setAttribute(
					'content',
					resolved === 'dark' ? '#0a0a0a' : '#fafafa',
				);
			}
		},
		[getSystemTheme],
	);

	const setTheme = useCallback(
		(newTheme: Theme) => {
			setThemeState(newTheme);
			localStorage.setItem('theme', newTheme);
			applyTheme(newTheme);
		},
		[applyTheme],
	);

	// Initialize theme on mount
	useEffect(() => {
		const stored = localStorage.getItem('theme') as Theme | null;
		const initialTheme = stored ?? 'system';
		setThemeState(initialTheme);
		applyTheme(initialTheme);
		setMounted(true);
	}, [applyTheme]);

	// Listen for system theme changes
	useEffect(() => {
		if (!mounted) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (theme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [theme, mounted, applyTheme]);

	// Prevent flash by not rendering until mounted
	if (!mounted) {
		return <div style={{ visibility: 'hidden' }}>{children}</div>;
	}

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
