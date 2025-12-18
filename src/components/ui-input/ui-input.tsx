import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Base props shared between Formik and non-Formik variants
 */
interface BaseInputProps {
	/** Label text displayed above the input */
	label?: string;
	/** Icon or element displayed at the start of the input */
	iconLeading?: ReactNode;
	/** Icon or element displayed at the end of the input */
	iconTrailing?: ReactNode;
	/** Error message to display (overrides Formik error when provided) */
	error?: string;
	/** Additional classes for the input element */
	inputClassName?: string;
	/** Additional classes for the container */
	containerClassName?: string;
}

/**
 * Props when using with Formik - requires formik instance and name
 */
type WithFormik = BaseInputProps & {
	formik: FormikProps<any>;
	name: string;
} & Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"name" | "value" | "onChange" | "onBlur"
	>;

/**
 * Props for standalone usage without Formik
 */
type WithoutFormik = BaseInputProps & {
	formik?: undefined;
	name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputProps = WithFormik | WithoutFormik;

/**
 * Input Component
 *
 * A styled text input with optional label, icons, and Formik integration.
 * Supports leading/trailing icons that respond to focus state.
 *
 * @example
 * // Basic input with label
 * <Input label="Email" name="email" type="email" />
 *
 * @example
 * // Input with leading icon
 * <Input
 *   label="Email"
 *   name="email"
 *   iconLeading={<MaterialIcon name="mail" />}
 *   placeholder="you@example.com"
 * />
 *
 * @example
 * // Formik integration with icons
 * <Input
 *   formik={formik}
 *   name="email"
 *   label="Email Address"
 *   iconLeading={<MaterialIcon name="mail" />}
 *   placeholder="you@example.com"
 * />
 */
export default function Input(props: InputProps) {
	const {
		label,
		formik,
		name,
		id,
		iconLeading,
		iconTrailing,
		error: externalError,
		inputClassName,
		containerClassName,
		className,
		...rest
	} = props;

	/** Determine the input's id/name for label association */
	const inputId = id ?? name;
	const inputName = name;

	/** Check if using Formik and extract relevant state */
	const isFormik = !!formik && !!name;
	const touched = isFormik ? formik.touched?.[name] : false;
	const formikError = isFormik ? formik.errors?.[name] : undefined;
	const hasError = !!(externalError || (touched && formikError));
	const errorMessage =
		externalError ||
		(touched && typeof formikError === "string" ? formikError : undefined);

	/** Build input props based on whether Formik is being used */
	const inputProps = isFormik
		? {
				value: formik.values?.[name] ?? "",
				onChange: formik.handleChange,
				onBlur: formik.handleBlur,
			}
		: {};

	/** Compute padding classes based on icon presence */
	const paddingLeft = iconLeading ? "pl-13" : "pl-4";
	const paddingRight = iconTrailing ? "pr-13" : "pr-4";

	return (
		<div className={cx("space-y-2", containerClassName)}>
			{/* Label */}
			{label && (
				<label
					htmlFor={inputId}
					className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-1"
				>
					{label}
				</label>
			)}

			{/* Input wrapper with icon positioning */}
			<div className="relative group">
				{/* Leading icon */}
				{iconLeading && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 transition-colors text-gray-400 group-focus-within:text-primary">
						{iconLeading}
					</div>
				)}

				{/* Input element */}
				<input
					type="text"
					id={inputId}
					name={inputName}
					className={cx(
						"block w-full rounded-xl border border-gray-200 dark:border-gray-700",
						"bg-white dark:bg-card-dark py-3.5",
						paddingLeft,
						paddingRight,
						"text-text-light dark:text-text-dark placeholder-gray-400",
						"focus:border-primary focus:ring-primary focus:outline-none",
						"sm:text-sm shadow-sm transition-shadow",
						hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
						inputClassName,
						className
					)}
					{...inputProps}
					{...rest}
				/>

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
