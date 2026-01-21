import type { ReactNode } from 'react';

interface RootHtmlProps {
	children: ReactNode;
}

export function RootHtml({ children }: RootHtmlProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			{children}
		</html>
	);
}
