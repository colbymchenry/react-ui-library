import type { ReactNode, ReactElement } from "react";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Type definition for option elements in select variant
 */
type OptionElement = ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
type SelectChildren = OptionElement | OptionElement[];

/**
 * Element variant determines which HTML element renders
 */
type ElementVariant = "input" | "select" | "textarea";

/**
 * Base props shared across all variants
 */
interface BaseFormGroupProps {
	/** Label text displayed above the field */
	label?: string;
	/** Element variant - defaults to "input", auto-detects "select" if children provided */
	as?: ElementVariant;
	/** Icon or element displayed at the start of the field */
	iconLeading?: ReactNode;
	/** Icon or element displayed at the end of the field */
	iconTrailing?: ReactNode;
	/** Error message to display (overrides Formik error when provided) */
	error?: string;
	/** Additional classes for the field element */
	fieldClassName?: string;
	/** Additional classes for the container */
	containerClassName?: string;
	/** Children - only used for select variant (option elements) */
	children?: SelectChildren;
}

/**
 * Props when using with Formik
 */
type WithFormik = BaseFormGroupProps & {
	formik: FormikProps<any>;
	name: string;
} & Omit<
		React.InputHTMLAttributes<HTMLInputElement> &
			React.SelectHTMLAttributes<HTMLSelectElement> &
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		"name" | "value" | "onChange" | "onBlur"
	>;

/**
 * Props for standalone usage without Formik
 */
type WithoutFormik = BaseFormGroupProps & {
	formik?: undefined;
	name?: string;
} & (
		| React.InputHTMLAttributes<HTMLInputElement>
		| React.SelectHTMLAttributes<HTMLSelectElement>
		| React.TextareaHTMLAttributes<HTMLTextAreaElement>
	);

type FormGroupProps = WithFormik | WithoutFormik;

/**
 * FormGroup Component
 *
 * A unified form field component that renders as input, select, or textarea.
 * Supports leading/trailing icons, Formik integration, and modern styling.
 *
 * Behavior:
 * - Default: Renders as <input>
 * - With children: Renders as <select>
 * - With as="textarea": Renders as <textarea>
 *
 * @example
 * // Basic input
 * <FormGroup label="Email" name="email" type="email" />
 *
 * @example
 * // Input with icon
 * <FormGroup
 *   label="Email"
 *   name="email"
 *   iconLeading={<MaterialIcon name="mail" />}
 *   placeholder="you@example.com"
 * />
 *
 * @example
 * // Select dropdown
 * <FormGroup label="Country" name="country">
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 * </FormGroup>
 *
 * @example
 * // Textarea
 * <FormGroup
 *   as="textarea"
 *   label="Message"
 *   name="message"
 *   rows={4}
 *   placeholder="Enter your message..."
 * />
 *
 * @example
 * // Formik integration
 * <FormGroup
 *   formik={formik}
 *   name="email"
 *   label="Email Address"
 *   iconLeading={<MaterialIcon name="mail" />}
 * />
 */
export default function FormGroup(props: FormGroupProps) {
	const {
		label,
		as,
		formik,
		name,
		id,
		iconLeading,
		iconTrailing,
		error: externalError,
		fieldClassName,
		containerClassName,
		className,
		children,
		...rest
	} = props;

	/** Determine element variant: select if children, otherwise use `as` prop or default to input */
	const variant: ElementVariant = children ? "select" : as ?? "input";

	/** Determine the field's id/name for label association */
	const fieldId = id ?? name;
	const fieldName = name;

	/** Check if using Formik and extract relevant state */
	const isFormik = !!formik && !!name;
	const touched = isFormik ? formik.touched?.[name] : false;
	const formikError = isFormik ? formik.errors?.[name] : undefined;
	const hasError = !!(externalError || (touched && formikError));
	const errorMessage =
		externalError ||
		(touched && typeof formikError === "string" ? formikError : undefined);

	/** Build field props based on whether Formik is being used */
	const formikProps = isFormik
		? {
				value: formik.values?.[name] ?? "",
				onChange: formik.handleChange,
				onBlur: formik.handleBlur,
			}
		: {};

	/** Compute padding classes based on icon presence */
	const paddingLeft = iconLeading ? "pl-12" : "pl-4";
	const paddingRight = iconTrailing ? "pr-12" : "pr-4";

	/** Shared field classes for consistent styling across variants */
	const fieldClasses = cx(
		"block w-full rounded-xl border border-gray-200 dark:border-gray-700",
		"bg-white dark:bg-card-dark py-3.5",
		paddingLeft,
		paddingRight,
		"text-text-light dark:text-text-dark placeholder-gray-400",
		"focus:border-primary focus:ring-primary focus:outline-none",
		"sm:text-sm shadow-sm transition-shadow",
		hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
		fieldClassName,
		className
	);

	/** Render the appropriate field element based on variant */
	const renderField = () => {
		switch (variant) {
			case "select":
				return (
					<select
						id={fieldId}
						name={fieldName}
						className={fieldClasses}
						{...formikProps}
						{...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
					>
						{children}
					</select>
				);

			case "textarea":
				return (
					<textarea
						id={fieldId}
						name={fieldName}
						className={fieldClasses}
						{...formikProps}
						{...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
					/>
				);

			default:
				return (
					<input
						type="text"
						id={fieldId}
						name={fieldName}
						className={fieldClasses}
						{...formikProps}
						{...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
					/>
				);
		}
	};

	return (
		<div className={cx("space-y-2", containerClassName)}>
			{/* Label */}
			{label && (
				<label
					htmlFor={fieldId}
					className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-1"
				>
					{label}
				</label>
			)}

			{/* Field wrapper with icon positioning */}
			<div className="relative group">
				{/* Leading icon */}
				{iconLeading && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors text-gray-400 group-focus-within:text-primary">
						{iconLeading}
					</div>
				)}

				{/* Field element (input, select, or textarea) */}
				{renderField()}

				{/* Trailing icon */}
				{iconTrailing && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 transition-colors text-gray-400 group-focus-within:text-primary">
						{iconTrailing}
					</div>
				)}
			</div>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1">{errorMessage}</p>
			)}
		</div>
	);
}

/**
 * Re-export as Input for backwards compatibility and semantic clarity
 * when specifically rendering text inputs
 */
export { default as Input } from "./ui-form-group";
