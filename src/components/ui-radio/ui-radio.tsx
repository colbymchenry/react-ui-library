import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Individual radio option configuration
 */
export interface RadioOption {
	/** Unique value for this option */
	value: string;
	/** Display label for this option */
	label: string;
	/** Optional description text */
	description?: string;
	/** Whether this option is disabled */
	disabled?: boolean;
}

/**
 * Base props shared between Formik and non-Formik variants
 */
interface BaseRadioGroupProps {
	/** Group label displayed above the options */
	label?: string;
	/** Array of radio options */
	options: RadioOption[];
	/** Layout direction */
	direction?: "horizontal" | "vertical";
	/** Error message to display */
	error?: string;
	/** Additional classes for the container */
	containerClassName?: string;
}

/**
 * Props when using with Formik
 */
type WithFormik = BaseRadioGroupProps & {
	formik: FormikProps<any>;
	name: string;
} & Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"name" | "value" | "onChange" | "onBlur" | "type"
	>;

/**
 * Props for standalone usage
 */
type WithoutFormik = BaseRadioGroupProps & {
	formik?: undefined;
	name: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

type RadioGroupProps = WithFormik | WithoutFormik;

/**
 * RadioGroup Component
 *
 * A group of styled radio button inputs with labels and optional descriptions.
 * Supports both horizontal and vertical layouts with Formik integration.
 *
 * @example
 * // Basic radio group
 * <RadioGroup
 *   name="plan"
 *   label="Select a plan"
 *   options={[
 *     { value: 'free', label: 'Free' },
 *     { value: 'pro', label: 'Pro', description: '$10/month' },
 *     { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing' },
 *   ]}
 *   value={selectedPlan}
 *   onChange={(e) => setSelectedPlan(e.target.value)}
 * />
 *
 * @example
 * // Horizontal layout
 * <RadioGroup
 *   name="size"
 *   label="Size"
 *   direction="horizontal"
 *   options={[
 *     { value: 'sm', label: 'Small' },
 *     { value: 'md', label: 'Medium' },
 *     { value: 'lg', label: 'Large' },
 *   ]}
 *   value={size}
 *   onChange={(e) => setSize(e.target.value)}
 * />
 *
 * @example
 * // Formik integration
 * <RadioGroup
 *   formik={formik}
 *   name="subscription"
 *   label="Subscription Type"
 *   options={subscriptionOptions}
 * />
 */
export function RadioGroup(props: RadioGroupProps) {
	const {
		label,
		options,
		direction = "vertical",
		formik,
		name,
		error: externalError,
		containerClassName,
		className,
		...rest
	} = props;

	/** Check if using Formik and extract relevant state */
	const isFormik = !!formik && !!name;
	const touched = isFormik ? formik.touched?.[name] : false;
	const formikError = isFormik ? formik.errors?.[name] : undefined;
	const hasError = !!(externalError || (touched && formikError));
	const errorMessage =
		externalError ||
		(touched && typeof formikError === "string" ? formikError : undefined);

	/** Get current value based on mode */
	const currentValue = isFormik
		? formik.values?.[name]
		: (rest as WithoutFormik).value;

	/** Build input props based on whether Formik is being used */
	const getInputProps = (optionValue: string) => {
		if (isFormik) {
			return {
				checked: currentValue === optionValue,
				onChange: formik.handleChange,
				onBlur: formik.handleBlur,
			};
		}
		return {
			checked: currentValue === optionValue,
			onChange: (rest as WithoutFormik).onChange,
		};
	};

	return (
		<div className={cx("space-y-2", containerClassName)}>
			{/* Group label */}
			{label && (
				<label className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-2">
					{label}
				</label>
			)}

			{/* Radio options */}
			<div
				className={cx(
					direction === "horizontal"
						? "flex flex-wrap gap-4"
						: "space-y-3"
				)}
				role="radiogroup"
				aria-label={label}
			>
				{options.map((option) => {
					const optionId = `${name}-${option.value}`;
					const isChecked = currentValue === option.value;

					return (
						<div key={option.value} className="flex items-start">
							{/* Radio input */}
							<input
								type="radio"
								id={optionId}
								name={name}
								value={option.value}
								disabled={option.disabled}
								className={cx(
									"h-4 w-4 border-gray-300 dark:border-gray-600",
									"text-primary focus:ring-primary focus:ring-offset-0",
									"bg-white dark:bg-card-dark",
									"cursor-pointer transition-colors",
									option.disabled && "opacity-50 cursor-not-allowed",
									hasError && "border-red-500",
									className
								)}
								{...getInputProps(option.value)}
							/>

							{/* Label and description */}
							<div className="ml-3">
								<label
									htmlFor={optionId}
									className={cx(
										"block text-sm font-medium",
										"text-text-light dark:text-text-dark",
										option.disabled
											? "opacity-50 cursor-not-allowed"
											: "cursor-pointer",
										isChecked && "text-primary"
									)}
								>
									{option.label}
								</label>
								{option.description && (
									<p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-0.5">
										{option.description}
									</p>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1">{errorMessage}</p>
			)}
		</div>
	);
}

export default RadioGroup;

