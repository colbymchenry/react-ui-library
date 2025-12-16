import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

/**
 * Base card wrapper used by template cards.
 *
 * Senior note:
 * Keep this as a thin presentational primitive; compose variants in specialized components.
 */
export default function Card({ className, children, ...props }: CardProps) {
	return (
		<div
			{...props}
			className={cx(
				"bg-card-light dark:bg-card-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800",
				className
			)}
		>
			{children}
		</div>
	);
}
