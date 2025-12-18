import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

/**
 * Supported button visual variants
 * Each variant provides a distinct visual style for different use cases
 */
type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'pill'
	| 'small-pill'
	| 'link'
	| 'ghost'
	| 'social';

/**
 * Props for the Button component
 * Extends native button HTML attributes with custom functionality
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Visual variant of the button */
	variant?: ButtonVariant;
	/** Icon or element to display before the button text */
	iconLeading?: ReactNode;
	/** Icon or element to display after the button text */
	iconTrailing?: ReactNode;
	/** Whether the button is in a loading state */
	loading?: boolean;
	/** Text to display when loading (falls back to children if not provided) */
	loadingText?: string;
}

/**
 * Mapping of button variants to their Tailwind CSS classes
 * Uses BEM-inspired class organization for maintainability
 */
const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
	secondary:
		'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-light dark:text-text-dark text-xs font-bold py-2 px-5 rounded-md transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed',
	pill: 'bg-primary hover:bg-secondary text-white text-xs font-bold py-2 px-5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
	'small-pill':
		'bg-primary hover:bg-secondary text-white text-[10px] font-bold py-1.5 px-4 rounded-full flex items-center gap-1 transition-all shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
	link: 'text-primary hover:text-secondary font-bold text-xs uppercase tracking-wide underline decoration-2 underline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed',
	ghost:
		'text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark px-4 py-2 transition-colors hover:bg-background-light dark:hover:bg-background-dark rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
	social:
		'w-full flex items-center justify-center gap-3 bg-white dark:bg-card-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
};

/**
 * Button component - A flexible, accessible button with multiple variants
 * 
 * Features:
 * - Multiple visual variants (primary, secondary, pill, link, ghost, social)
 * - Leading and trailing icon support
 * - Loading state with optional custom loading text
 * - Automatic disabled state when loading
 * - Full TypeScript support with native button attributes
 * - Dark mode support
 * - Accessibility-ready (inherits native button accessibility)
 * 
 * Design Principles:
 * - Single Responsibility: Handles button rendering with various styles
 * - Open/Closed: Extendable through className prop, closed for modification
 * - Dependency Inversion: Accepts ReactNode for icons, not concrete implementations
 * 
 * @example
 * ```tsx
 * // Primary button with loading state
 * <Button variant="primary" loading={isLoading} loadingText="Sending...">
 *   Submit
 * </Button>
 * 
 * // Button with icons
 * <Button 
 *   variant="primary" 
 *   iconLeading={<Icon name="email" />}
 *   iconTrailing={<Icon name="arrow_forward" />}
 * >
 *   Continue with Email
 * </Button>
 * 
 * // Social sign-in button
 * <Button 
 *   variant="social" 
 *   iconLeading={<GoogleLogo />}
 *   loading={isLoading}
 * >
 *   Sign in with Google
 * </Button>
 * ```
 */
export function Button({
	variant = 'primary',
	iconLeading,
	iconTrailing,
	className,
	children,
	type = 'button',
	loading = false,
	loadingText,
	disabled,
	...props
}: ButtonProps) {
	// Combine disabled prop with loading state
	const isDisabled = disabled || loading;

	// Determine button content based on loading state
	const buttonContent = loading && loadingText ? loadingText : children;

	return (
		<button
			type={type}
			disabled={isDisabled}
			{...props}
			className={cx(variantClasses[variant], className)}
		>
			{/* Leading icon - hidden during loading if loadingText is provided */}
			{iconLeading && !(loading && loadingText) && (
				<span className="button__icon-leading">{iconLeading}</span>
			)}

			{/* Button text content */}
			{buttonContent && (
				<span className="button__content">{buttonContent}</span>
			)}

			{/* Trailing icon - hidden during loading if loadingText is provided */}
			{iconTrailing && !(loading && loadingText) && (
				<span className="button__icon-trailing">{iconTrailing}</span>
			)}
		</button>
	);
}
