'use client';

import { Component, type ReactNode } from 'react';

export interface ErrorBoundaryContent {
	title: string;
	message: string;
	buttonText: string;
}

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
	content?: ErrorBoundaryContent;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

const defaultContent: ErrorBoundaryContent = {
	title: 'Something went wrong',
	message: 'An unexpected error occurred. Please try refreshing the page.',
	buttonText: 'Refresh page',
};

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

			const content = this.props.content ?? defaultContent;

			return (
				<div className="flex min-h-screen items-center justify-center px-6">
					<div className="max-w-md text-center">
						<h1 className="mb-4 text-2xl font-medium">{content.title}</h1>
						<p className="mb-6 text-neutral-600 dark:text-neutral-400">
							{content.message}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="rounded bg-neutral-900 px-6 py-3 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
						>
							{content.buttonText}
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
