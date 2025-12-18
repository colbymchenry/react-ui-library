import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";

/** Available alert variants for different message types */
export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
	/** The content to display inside the alert */
	children: ReactNode;
	/** The variant/color scheme of the alert */
	variant?: AlertVariant;
	/** Custom icon name from Material Symbols (defaults based on variant) */
	icon?: string;
	/** Whether to show the icon */
	showIcon?: boolean;
	/** Optional title displayed above the content */
	title?: string;
	/** Additional CSS classes for the container */
	className?: string;
}

/**
 * Default icons for each variant
 */
const defaultIcons: Record<AlertVariant, string> = {
	info: "info",
	success: "check_circle",
	warning: "warning",
	error: "error",
};

/**
 * Background, border, and text color classes for each variant
 */
const variantClasses: Record<AlertVariant, string> = {
	info: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300",
	success:
		"bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-300",
	warning:
		"bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-300",
	error:
		"bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-300",
};

/**
 * Icon color classes for each variant
 */
const iconColorClasses: Record<AlertVariant, string> = {
	info: "text-blue-500",
	success: "text-green-500",
	warning: "text-amber-500",
	error: "text-red-500",
};

/**
 * Alert Component
 *
 * Displays informational, success, warning, or error messages with
 * an optional icon and colored background. Perfect for form feedback,
 * system notifications, or contextual information.
 *
 * @example
 * // Info alert (default)
 * <Alert>
 *   We'll send a secure magic link to your inbox.
 * </Alert>
 *
 * @example
 * // Success alert with title
 * <Alert variant="success" title="Payment successful">
 *   Your order has been placed and will ship within 2-3 business days.
 * </Alert>
 *
 * @example
 * // Warning alert with custom icon
 * <Alert variant="warning" icon="schedule">
 *   Your session will expire in 5 minutes.
 * </Alert>
 *
 * @example
 * // Error alert
 * <Alert variant="error">
 *   There was an error processing your request. Please try again.
 * </Alert>
 */
export function Alert({
	children,
	variant = "info",
	icon,
	showIcon = true,
	title,
	className,
}: AlertProps) {
	/** Use custom icon or fall back to variant default */
	const iconName = icon ?? defaultIcons[variant];

	return (
		<div
			className={cx(
				"flex gap-3 items-start rounded-lg border p-3",
				variantClasses[variant],
				className
			)}
			role="alert"
		>
			{/* Icon */}
			{showIcon && (
				<MaterialIcon
					name={iconName}
					className={cx(iconColorClasses[variant], "text-[20px] mt-0.5 shrink-0")}
				/>
			)}

			{/* Content */}
			<div className="flex-1 min-w-0 pt-2">
				{title && (
					<p className="font-semibold text-sm mb-1">{title}</p>
				)}
				<div className="text-xs leading-relaxed">{children}</div>
			</div>
		</div>
	);
}

export default Alert;

