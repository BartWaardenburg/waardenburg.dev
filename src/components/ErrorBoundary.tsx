'use client';

import { Component, type ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error caught by boundary:', error, errorInfo);
	}

	override render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-screen items-center justify-center px-6">
					<div className="max-w-md text-center">
						<h1 className="mb-4 text-2xl font-medium">Something went wrong</h1>
						<p className="mb-6 text-neutral-600">
							An unexpected error occurred. Please try refreshing the page.
						</p>
						<button
							onClick={() => window.location.reload()}
							className="rounded bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700"
						>
							Refresh page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
