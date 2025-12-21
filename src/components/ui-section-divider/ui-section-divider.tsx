import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";

interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
	/** Title text displayed centered between the decorative lines */
	title: string;
	/** Custom gradient line color class for light mode (default: "to-gray-300") */
	lineClassName?: string;
	/** Custom gradient line color class for dark mode (default: "dark:to-gray-600") */
	lineDarkClassName?: string;
	/** Custom title text color class (default: "text-gray-500 dark:text-white") */
	titleClassName?: string;
}

/**
 * SectionDivider Component
 *
 * Decorative horizontal divider with centered title text.
 * Used to separate major sections of a page or dashboard.
 * Features gradient lines that fade from the center outward,
 * creating an elegant visual separation.
 *
 * Supports both light and dark modes via Tailwind classes.
 *
 * @example
 * // Basic usage
 * <SectionDivider title="Featured Products" />
 *
 * @example
 * // With custom styling
 * <SectionDivider
 *   title="Premium Collection"
 *   lineClassName="to-primary/30"
 *   titleClassName="text-primary dark:text-primary"
 * />
 *
 * @example
 * // As a section separator in a dashboard
 * <div className="space-y-8">
 *   <StatsCards />
 *   <SectionDivider title="Recent Activity" />
 *   <ActivityTable />
 * </div>
 */
export function SectionDivider({
	title,
	lineClassName,
	lineDarkClassName,
	titleClassName,
	className,
	...props
}: SectionDividerProps) {
	/** Default Tailwind classes for customizable elements */
	const defaultLineClass = "to-gray-300";
	const defaultLineDarkClass = "dark:to-gray-600";
	const defaultTitleClass = "text-gray-500 dark:text-white";

	return (
		<div
			{...props}
			className={cx("flex items-center gap-4 mb-10 opacity-60", className)}
			role="separator"
			aria-orientation="horizontal"
		>
			{/* Left gradient line - fades from transparent on the left to solid on the right */}
			<div
				className={cx(
					"h-px bg-gradient-to-r from-transparent flex-grow",
					lineClassName ?? defaultLineClass,
					lineDarkClassName ?? defaultLineDarkClass
				)}
				aria-hidden="true"
			/>

			{/* Centered title with uppercase styling and wide letter spacing */}
			<h2
				className={cx(
					"text-sm font-bold uppercase tracking-[0.2em] text-center",
					titleClassName ?? defaultTitleClass
				)}
			>
				{title}
			</h2>

			{/* Right gradient line - fades from solid on the left to transparent on the right */}
			<div
				className={cx(
					"h-px bg-gradient-to-l from-transparent flex-grow",
					lineClassName ?? defaultLineClass,
					lineDarkClassName ?? defaultLineDarkClass
				)}
				aria-hidden="true"
			/>
		</div>
	);
}

export default SectionDivider;

