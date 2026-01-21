import type { ReactNode } from 'react';

interface MainProps {
	children: ReactNode;
}

export function Main({ children }: MainProps) {
	return <main id="main">{children}</main>;
}
