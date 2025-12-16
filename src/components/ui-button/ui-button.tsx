import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

type ButtonVariant =
	| "primary"
	| "secondary"
	| "pill"
	| "small-pill"
	| "link"
	| "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	iconLeading?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm uppercase tracking-wide",
	secondary:
		"bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-light dark:text-text-dark text-xs font-bold py-2 px-5 rounded-md transition-colors uppercase tracking-wide",
	pill: "bg-primary hover:bg-secondary text-white text-xs font-bold py-2 px-5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg transform active:scale-95",
	"small-pill":
		"bg-primary hover:bg-secondary text-white text-[10px] font-bold py-1.5 px-4 rounded-full flex items-center gap-1 transition-all shadow hover:shadow-md",
	link: "text-primary hover:text-secondary font-bold text-xs uppercase tracking-wide underline decoration-2 underline-offset-4",
	ghost: "text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark px-4 py-2 transition-colors hover:bg-background-light dark:hover:bg-background-dark rounded-lg cursor-pointer",
};

/**
 * Buttons from `ui_template.html` as a reusable component.
 */
export function Button({
	variant = "primary",
	iconLeading,
	className,
	children,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			{...props}
			className={cx(variantClasses[variant], className)}
		>
			{iconLeading ? iconLeading : null}
			{children}
		</button>
	);
}
