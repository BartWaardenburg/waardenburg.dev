import Script from 'next/script';

// Theme initialization script - runs before React hydrates to prevent flash.
// This script is a hardcoded developer-provided constant, not user input.
const THEME_SCRIPT = `
(function() {
	try {
		var theme = localStorage.getItem('theme');
		var isDark = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList.add(isDark ? 'dark' : 'light');
	} catch (e) {}
})();
`;

export function ThemeScript() {
	return (
		<Script id="theme-script" strategy="beforeInteractive">
			{THEME_SCRIPT}
		</Script>
	);
}
