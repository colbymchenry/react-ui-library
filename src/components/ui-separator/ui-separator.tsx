import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";

/**
 * Configuration for Separator CSS custom properties.
 * These allow per-instance theming without modifying global styles.
 */
interface SeparatorStyleVars {
	/** Color of the horizontal line (default: inherits from CSS) */
	lineColor?: string;
	/** Background color behind the label text (should match container bg) */
	labelBackground?: string;
	/** Color of the label text */
	textColor?: string;
}

interface SeparatorProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
	/** Optional label text displayed centered on the separator line */
	label?: string;
	/** Custom style variables for theming the separator */
	styleVars?: SeparatorStyleVars;
}

/**
 * Separator Component
 * 
 * A horizontal divider line with an optional centered label.
 * Commonly used to separate content sections or provide visual breaks
 * between form sections (e.g., "Or sign in with email").
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
 * // Separator with custom theming
 * <Separator
 *   label="Or sign in with email"
 *   styleVars={{
 *     lineColor: "var(--border-light)",
 *     labelBackground: "var(--text-muted-light)",
 *     textColor: "var(--text-light)",
 *   }}
 * />
 */
export function Separator({
	label,
	styleVars,
	className,
	...props
}: SeparatorProps) {
	/**
	 * Build the inline CSS custom properties object.
	 * Uses Record type to properly type CSS custom properties.
	 */
	const cssVars: Record<string, string> = {};
	
	if (styleVars?.lineColor) {
		cssVars["--line-color"] = styleVars.lineColor;
	}
	if (styleVars?.labelBackground) {
		cssVars["--label-color"] = styleVars.labelBackground;
	}
	if (styleVars?.textColor) {
		cssVars["--text-color"] = styleVars.textColor;
	}

	const hasCustomStyles = Object.keys(cssVars).length > 0;

	return (
		<div
			{...props}
			className={cx("separator", className)}
			data-label={label}
			style={hasCustomStyles ? cssVars as React.CSSProperties : undefined}
			role="separator"
			aria-orientation="horizontal"
		/>
	);
}

export default Separator;

