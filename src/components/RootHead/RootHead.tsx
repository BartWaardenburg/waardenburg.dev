interface RootHeadProps {
	children?: React.ReactNode;
}

export function RootHead({ children }: RootHeadProps) {
	return (
		<head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="anonymous"
			/>
			{children}
		</head>
	);
}
