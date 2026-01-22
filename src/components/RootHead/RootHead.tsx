interface RootHeadProps {
	children?: React.ReactNode;
}

export function RootHead({ children }: RootHeadProps) {
	return <head>{children}</head>;
}
