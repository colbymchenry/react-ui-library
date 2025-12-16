import { cx } from "../../lib/cx";
import { FormikProps } from "formik";
import { ReactElement } from "react";

/**
 * Type definition for option elements - enforces only <option> elements as children
 */
type OptionElement = ReactElement<
	React.OptionHTMLAttributes<HTMLOptionElement>
>;
type SelectChildren = OptionElement | OptionElement[];

/**
 * Type definitions for FormGroup component with polymorphic behavior
 * The component renders as:
 * - <select> when children are provided (SelectChildren)
 * - <input> when no children are provided
 */

// Input variant types (no children)
type InputWithFormik = {
	formik: FormikProps<any>;
	name: string;
	label?: string;
	children?: never; // Explicitly no children for input variant
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"name" | "value" | "onChange" | "onBlur" | "children"
>;

type InputWithoutFormik = {
	formik?: undefined;
	name?: string;
	label?: string;
	children?: never; // Explicitly no children for input variant
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

// Select variant types (with children)
type SelectWithFormik = {
	formik: FormikProps<any>;
	name: string;
	label?: string;
	children: SelectChildren; // Required children for select variant
} & Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"name" | "value" | "onChange" | "onBlur" | "children"
>;

type SelectWithoutFormik = {
	formik?: undefined;
	name?: string;
	label?: string;
	children: SelectChildren; // Required children for select variant
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

// Union type that enforces proper usage
type FormGroupProps =
	| InputWithFormik
	| InputWithoutFormik
	| SelectWithFormik
	| SelectWithoutFormik;

/**
 * FormGroup Component - Polymorphic Form Field
 *
 * Intelligently renders as either an input or select based on presence of children.
 * Follows the Single Responsibility Principle by delegating rendering logic
 * based on component variant while maintaining consistent interface.
 *
 * Behavior:
 * - With children (option elements): Renders as <select> dropdown
 * - Without children: Renders as <input> text field
 *
 * @example
 * // Renders as input
 * <FormGroup formik={formik} name="email" label="Email" />
 *
 * @example
 * // Renders as select
 * <FormGroup formik={formik} name="country" label="Country">
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 * </FormGroup>
 */
export default function FormGroup(props: FormGroupProps) {
	const { label, formik, name, id, children, ...rest } = props;

	// Determine if component should render as select (has children) or input (no children)
	const isSelect = children !== undefined && children !== null;

	/**
	 * Render logic for Formik-integrated variant
	 * Handles form state, validation, and error display
	 */
	if (formik) {
		const fieldName = name!;

		if (isSelect) {
			// Render as <select> with Formik integration
			const selectProps = rest as Omit<
				React.SelectHTMLAttributes<HTMLSelectElement>,
				"name" | "value" | "onChange" | "onBlur"
			>;

			return (
				<div className="form-group">
					{label && <label htmlFor={id ?? fieldName}>{label}</label>}
					<select
						id={id ?? fieldName}
						name={fieldName}
						value={formik.values?.[fieldName] ?? ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={cx(
							formik.touched?.[fieldName] &&
								formik.errors?.[fieldName]
								? "error"
								: ""
						)}
						{...selectProps}
					>
						{children}
					</select>
					{formik.touched?.[fieldName] &&
						formik.errors?.[fieldName] && (
							<span className="error-message">
								{typeof formik.errors[fieldName] === "string"
									? formik.errors[fieldName]
									: "Invalid field"}
							</span>
						)}
				</div>
			);
		} else {
			// Render as <input> with Formik integration
			const inputProps = rest as Omit<
				React.InputHTMLAttributes<HTMLInputElement>,
				"name" | "value" | "onChange" | "onBlur"
			>;

			return (
				<div className="form-group">
					{label && <label htmlFor={id ?? fieldName}>{label}</label>}
					<input
						id={id ?? fieldName}
						name={fieldName}
						value={formik.values?.[fieldName] ?? ""}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className={cx(
							"input",
							formik.touched?.[fieldName] &&
								formik.errors?.[fieldName]
								? "error"
								: ""
						)}
						placeholder={inputProps.placeholder || ""}
						{...inputProps}
					/>
					{formik.touched?.[fieldName] &&
						formik.errors?.[fieldName] && (
							<span className="error-message">
								{typeof formik.errors[fieldName] === "string"
									? formik.errors[fieldName]
									: "Invalid field"}
							</span>
						)}
				</div>
			);
		}
	}

	/**
	 * Render logic for standalone variant (without Formik)
	 * Supports both controlled and uncontrolled usage
	 */
	if (isSelect) {
		// Render as standalone <select>
		const selectProps =
			rest as React.SelectHTMLAttributes<HTMLSelectElement>;

		return (
			<div className="form-group">
				{label && <label htmlFor={id || name}>{label}</label>}
				<select id={id || name} name={name} {...selectProps}>
					{children}
				</select>
			</div>
		);
	} else {
		// Render as standalone <input>
		const inputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;

		return (
			<div className="form-group">
				{label && <label htmlFor={id || name}>{label}</label>}
				<input
					id={id || name}
					name={name}
					className={cx("input")}
					{...inputProps}
				/>
			</div>
		);
	}
}
