import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

// Type definitions to enforce prop requirements
type WithFormik = {
	formik: FormikProps<any>;
	name: string;
	label?: string;
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"name" | "value" | "onChange" | "onBlur"
>;

type WithoutFormik = {
	formik?: undefined;
	name?: string;
	label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type InputProps = WithFormik | WithoutFormik;

export default function Input(props: InputProps) {
	const { label, formik, name, id, ...rest } = props;

	// If using formik, enforce correct field binding
	if (formik) {
		// Type narrowing ensures name is string here
		const inputName = name!;
		return (
			<div className="form-group">
				{label && <label htmlFor={id ?? inputName}>{label}</label>}
				<input
					type="text"
					id={id ?? inputName}
					name={inputName}
					value={formik.values?.[inputName] ?? ""}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className={cx(
						"input",
						formik.touched?.[inputName] &&
							formik.errors?.[inputName]
							? "error"
							: ""
					)}
					placeholder={rest.placeholder || ""}
					{...rest}
				/>
				{formik.touched?.[inputName] && formik.errors?.[inputName] && (
					<span className="error-message">
						{typeof formik.errors[inputName] === "string"
							? formik.errors[inputName]
							: "Invalid field"}
					</span>
				)}
			</div>
		);
	}

	// Non-formik case: regular uncontrolled/controlled input
	return (
		<div className="form-group">
			{label && <label htmlFor={id || name}>{label}</label>}
			<input
				type="text"
				id={id || name}
				name={name}
				className={cx("input")}
				{...rest}
			/>
		</div>
	);
}
