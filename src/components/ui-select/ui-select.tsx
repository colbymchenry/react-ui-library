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
 * Type definitions to enforce prop requirements for Select component
 * WithFormik: When using Formik for form state management
 * WithoutFormik: For standalone select elements
 */
type WithFormik = {
	formik: FormikProps<any>;
	name: string;
	label?: string;
	children: SelectChildren;
} & Omit<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	"name" | "value" | "onChange" | "onBlur" | "children"
>;

type WithoutFormik = {
	formik?: undefined;
	name?: string;
	label?: string;
	children: SelectChildren;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;

type SelectProps = WithFormik | WithoutFormik;

/**
 * Select Component
 * Reusable select dropdown component with optional Formik integration
 * Accepts only <option> elements as children
 *
 * @example
 * // With Formik
 * <Select formik={formik} name="country" label="Country">
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 * </Select>
 *
 * @example
 * // Without Formik
 * <Select name="country" label="Country">
 *   <option value="">Select a country</option>
 *   <option value="us">United States</option>
 * </Select>
 */
export default function Select(props: SelectProps) {
	const { label, formik, name, id, children, ...rest } = props;

	// If using formik, enforce correct field binding
	if (formik) {
		// Type narrowing ensures name is string here
		const selectName = name!;
		return (
			<div className="form-group">
				{label && <label htmlFor={id ?? selectName}>{label}</label>}
				<select
					id={id ?? selectName}
					name={selectName}
					value={formik.values?.[selectName] ?? ""}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={cx(
						formik.touched?.[selectName] &&
							formik.errors?.[selectName]
							? "error"
							: ""
					)}
					{...rest}
				>
					{children}
				</select>
				{formik.touched?.[selectName] &&
					formik.errors?.[selectName] && (
						<span className="error-message">
							{typeof formik.errors[selectName] === "string"
								? formik.errors[selectName]
								: "Invalid field"}
						</span>
					)}
			</div>
		);
	}

	// Non-formik case: regular uncontrolled/controlled select
	return (
		<div className="form-group">
			{label && <label htmlFor={id || name}>{label}</label>}
			<select id={id || name} name={name} {...rest}>
				{children}
			</select>
		</div>
	);
}
