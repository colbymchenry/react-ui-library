import { cx } from "../../lib/cx";
import { ReactNode, ElementType } from "react";

/**
 * Typography Variant Types
 * Defines the available typography styles based on the design system
 */
export type TypographyVariant =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "body-large"
	| "body"
	| "caption"
	| "micro"
	| "label";

/**
 * Typography Component Props
 */
interface TypographyProps {
	variant?: TypographyVariant;
	children: ReactNode;
	className?: string;
	as?: ElementType;
}

/**
 * Typography Configuration
 * Maps each variant to its HTML element and CSS classes
 * Follows Single Responsibility Principle by separating style logic from rendering
 */
const TYPOGRAPHY_CONFIG: Record<
	TypographyVariant,
	{
		element: ElementType;
		className: string;
	}
> = {
	h1: {
		element: "h1",
		className:
			"text-4xl md:text-5xl font-black tracking-tight uppercase font-display",
	},
	h2: {
		element: "h2",
		className: "text-2xl font-bold uppercase tracking-wide font-display",
	},
	h3: {
		element: "h3",
		className: "text-xl font-bold font-display",
	},
	h4: {
		element: "h4",
		className: "font-bold uppercase tracking-wide text-sm font-display",
	},
	"body-large": {
		element: "p",
		className: "text-lg text-text-light dark:text-text-dark",
	},
	body: {
		element: "p",
		className: "text-base text-text-muted-light dark:text-text-muted-dark",
	},
	caption: {
		element: "p",
		className: "text-sm text-text-muted-light dark:text-text-muted-dark",
	},
	micro: {
		element: "p",
		className:
			"text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400",
	},
	label: {
		element: "p",
		className: "text-xs font-mono text-gray-400 dark:text-gray-500",
	},
};

/**
 * Typography Component
 *
 * A polymorphic typography component that enforces consistent text styling
 * across the application based on the design system.
 *
 * Features:
 * - Variant-based styling (h1, h2, h3, h4, body-large, body, caption, micro)
 * - Semantic HTML elements by default (can be overridden with 'as' prop)
 * - Dark mode support
 * - Custom className support for extending styles
 *
 * Design Principles:
 * - Open/Closed Principle: Open for extension via className, closed for modification
 * - Single Responsibility: Handles only typography presentation
 * - Interface Segregation: Simple, focused API
 *
 * @example
 * // Display heading
 * <Typography variant="h1">Volcanica Coffee</Typography>
 *
 * @example
 * // Body text with custom class
 * <Typography variant="body" className="mt-4">
 *   Your subscription details
 * </Typography>
 *
 * @example
 * // Override element type
 * <Typography variant="h2" as="div">
 *   Styled as h2 but rendered as div
 * </Typography>
 */
export function Typography({
	variant = "body",
	children,
	className,
	as,
}: TypographyProps) {
	const config = TYPOGRAPHY_CONFIG[variant];
	const Element = as || config.element;

	return (
		<Element className={cx(config.className, className)}>
			{children}
		</Element>
	);
}
