import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Base props shared between Formik and non-Formik variants
 */
interface BaseCheckboxProps {
	/** Label text displayed next to the checkbox */
	label: string;
	/** Additional description text below the label */
	description?: string;
	/** Error message to display */
	error?: string;
	/** Additional classes for the container */
	containerClassName?: string;
}

/**
 * Props when using with Formik
 */
type WithFormik = BaseCheckboxProps & {
	formik: FormikProps<any>;
	name: string;
} & Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"name" | "checked" | "onChange" | "onBlur" | "type"
	>;

/**
 * Props for standalone usage
 */
type WithoutFormik = BaseCheckboxProps & {
	formik?: undefined;
	name?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

type CheckboxProps = WithFormik | WithoutFormik;

/**
 * Checkbox Component
 *
 * A styled checkbox input with label, optional description, and Formik integration.
 * Supports both controlled and uncontrolled usage patterns.
 *
 * @example
 * // Basic checkbox
 * <Checkbox
 *   label="Remember me"
 *   name="rememberMe"
 *   checked={rememberMe}
 *   onChange={(e) => setRememberMe(e.target.checked)}
 * />
 *
 * @example
 * // With description
 * <Checkbox
 *   label="Email notifications"
 *   description="Receive emails about account activity"
 *   name="emailNotifications"
 *   checked={notifications}
 *   onChange={(e) => setNotifications(e.target.checked)}
 * />
 *
 * @example
 * // Formik integration
 * <Checkbox
 *   formik={formik}
 *   name="agreeToTerms"
 *   label="I agree to the Terms of Service"
 * />
 */
export function Checkbox(props: CheckboxProps) {
	const {
		label,
		description,
		formik,
		name,
		id,
		error: externalError,
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
				checked: !!formik.values?.[name],
				onChange: formik.handleChange,
				onBlur: formik.handleBlur,
			}
		: {};

	return (
		<div className={cx("flex flex-col", containerClassName)}>
			<div className="flex items-center">
				{/* Checkbox input */}
				<input
					type="checkbox"
					id={inputId}
					name={inputName}
					className={cx(
						"h-4 w-4 rounded border-gray-300 dark:border-gray-600",
						"accent-primary focus:ring-primary focus:ring-offset-0",
						"bg-white dark:bg-card-dark",
						"cursor-pointer transition-colors",
						// Explicit checked state styling for cross-browser support
						"checked:bg-primary checked:border-primary",
						hasError && "border-red-500",
						className
					)}
					{...inputProps}
					{...rest}
				/>

				{/* Label and description */}
				<div className="ml-3">
					<label
						htmlFor={inputId}
						className={cx(
							"block text-sm font-medium cursor-pointer",
							"text-text-light dark:text-text-dark",
							hasError && "text-red-500"
						)}
					>
						{label}
					</label>
					{description && (
						<p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-0.5">
							{description}
						</p>
					)}
				</div>
			</div>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1 ml-7">{errorMessage}</p>
			)}
		</div>
	);
}

export default Checkbox;

