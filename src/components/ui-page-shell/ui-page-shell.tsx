import type { ReactNode } from "react";

interface PageShellProps {
	children: ReactNode;
	header?: ReactNode;
}

/**
 * Page shell that matches the template's background + spacing.
 */
export function PageShell({ children, header }: PageShellProps) {
	return (
		<div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen transition-colors duration-200 antialiased">
			{header ?? null}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 space-y-20">
				{children}
			</main>
		</div>
	);
}
