import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../lib/cx";

export type MaterialIconVariant = "outlined" | "filled";

interface MaterialIconProps extends Omit<
	ComponentPropsWithoutRef<"span">,
	"children"
> {
	name: string;
	variant?: MaterialIconVariant;
}

/**
 * Material symbol icon wrapper (matches `ui_template.html`).
 *
 * Usage:
 * - <MaterialIcon name="contrast" />
 * - <MaterialIcon name="check_circle" variant="filled" />
 */
export function MaterialIcon({
	name,
	variant = "outlined",
	className,
	...props
}: MaterialIconProps) {
	return (
		<span
			{...props}
			className={cx(
				"material-symbols-outlined",
				/**
				 * Senior note:
				 * Material Symbols are font glyphs, so size is controlled via `font-size`.
				 * Default to 16px to match our UI control sizing; callers can override via className.
				 */
				"text-[16px] leading-none",
				variant === "filled" && "icon-filled",
				className
			)}
			aria-hidden="true"
		>
			{name}
		</span>
	);
}
