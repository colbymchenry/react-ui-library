import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
	/** Optional label text displayed centered on the separator line */
	label?: string;
	/** Custom border/line color class (default: "border-border-light dark:border-border-dark") */
	lineClassName?: string;
	/** Custom label background color class (default: "bg-card-light dark:bg-background-dark") */
	labelBgClassName?: string;
	/** Custom label text color class (default: "text-text-muted-light dark:text-text-muted-dark") */
	labelTextClassName?: string;
}

/**
 * Separator Component
 * 
 * A horizontal divider line with an optional centered label.
 * Commonly used to separate content sections or provide visual breaks
 * between form sections (e.g., "Or sign in with email").
 * 
 * Uses Tailwind classes for styling with automatic dark mode support.
 * Colors are customizable via className props.
 * 
 * @example
 * // Simple line separator
 * <Separator />
 * 
 * @example
 * // Separator with label
 * <Separator label="Or continue with" />
 * 
 * @example
 * // Separator with custom colors
 * <Separator
 *   label="Or sign in with email"
 *   lineClassName="border-gray-300 dark:border-gray-600"
 *   labelBgClassName="bg-white dark:bg-gray-900"
 *   labelTextClassName="text-gray-500 dark:text-gray-400"
 * />
 */
export function Separator({
	label,
	lineClassName,
	labelBgClassName,
	labelTextClassName,
	className,
	...props
}: SeparatorProps) {
	/** Default Tailwind classes for each customizable element */
	const defaultLineClass = "border-border-light dark:border-border-dark";
	const defaultLabelBgClass = "bg-card-light dark:bg-background-dark";
	const defaultLabelTextClass = "text-text-muted-light dark:text-text-muted-dark";

	return (
		<div
			{...props}
			className={cx("relative", className)}
			role="separator"
			aria-orientation="horizontal"
		>
			{/* Horizontal line positioned absolutely to span full width */}
			<div className="absolute inset-0 flex items-center">
				<div
					className={cx(
						"w-full border-t",
						lineClassName ?? defaultLineClass
					)}
				/>
			</div>

			{/* Centered label with background to "cut" through the line */}
			{label && (
				<div className="relative flex justify-center text-sm">
					<span
						className={cx(
							"px-4 uppercase tracking-wider font-bold text-[10px]",
							labelBgClassName ?? defaultLabelBgClass,
							labelTextClassName ?? defaultLabelTextClass
						)}
					>
						{label}
					</span>
				</div>
			)}
		</div>
	);
}

export default Separator;
