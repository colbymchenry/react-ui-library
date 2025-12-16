import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";

type BadgeVariant = "status-active" | "gift" | "active-gifted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant: BadgeVariant;
	iconName?: string;
	iconFilled?: boolean;
	children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
	"status-active":
		"bg-active-bg dark:bg-green-900/30 text-active-green dark:text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase border border-green-100 dark:border-green-900",
	gift: "bg-accent-purple text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase shadow-sm",
	"active-gifted":
		"bg-gradient-to-r from-accent-purple to-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase",
};

/**
 * Template badges (status/gift).
 */
export function Badge({
	variant,
	iconName,
	iconFilled,
	className,
	children,
	...props
}: BadgeProps) {
	return (
		<span {...props} className={cx(variantClasses[variant], className)}>
			{iconName ? (
				<MaterialIcon
					name={iconName}
					variant={iconFilled ? "filled" : "outlined"}
					className="text-[14px]"
				/>
			) : null}
			{children}
		</span>
	);
}
