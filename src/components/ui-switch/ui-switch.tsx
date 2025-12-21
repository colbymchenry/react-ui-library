import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

/**
 * Formik-compatible interface for automatic form binding.
 * Allows the Switch to integrate seamlessly with Formik forms.
 */
interface FormikLike {
	values: Record<string, unknown>;
	errors: Record<string, string>;
	touched: Record<string, boolean>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	/** Content displayed to the right of the switch toggle (label, description, badges, etc.) */
	children?: ReactNode;
	/** Formik instance for automatic checked/onChange/onBlur binding */
	formik?: FormikLike;
	/** Error message to display (overrides Formik error when provided) */
	error?: string;
	/** Additional CSS classes for the outer container */
	containerClassName?: string;
	/** Additional CSS classes for the toggle track */
	trackClassName?: string;
	/** Additional CSS classes for the toggle knob */
	knobClassName?: string;
}

/**
 * Switch Component
 *
 * A toggle switch input with customizable content area.
 * The switch toggle appears on the left, and any children
 * are rendered on the right side for maximum customization.
 *
 * Supports Formik integration for seamless form handling.
 * Features smooth animations and dark mode support.
 *
 * @example
 * // Basic switch with simple label
 * <Switch
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 * >
 *   <span className="text-sm font-medium">Enable notifications</span>
 * </Switch>
 *
 * @example
 * // Switch with label, description, and badge
 * <Switch
 *   checked={includeOatMilk}
 *   onChange={(e) => setIncludeOatMilk(e.target.checked)}
 * >
 *   <div className="flex-grow">
 *     <div className="flex justify-between items-center">
 *       <span className="text-sm font-bold text-gray-900 dark:text-white">
 *         Free Oat Milk Add-on
 *       </span>
 *       <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
 *         FREE
 *       </span>
 *     </div>
 *     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 *       Barista edition, 1L carton
 *     </p>
 *   </div>
 * </Switch>
 *
 * @example
 * // Formik integration
 * <Switch formik={formik} name="darkMode">
 *   <span className="text-sm font-medium">Dark Mode</span>
 * </Switch>
 */
export function Switch({
	children,
	formik,
	name,
	error,
	checked,
	onChange,
	onBlur,
	disabled,
	containerClassName,
	trackClassName,
	knobClassName,
	className,
	...props
}: SwitchProps) {
	/**
	 * Derive checked state from Formik if provided, otherwise use controlled prop.
	 * Formik stores boolean values directly in the values object.
	 */
	const isChecked = formik && name
		? Boolean(formik.values[name])
		: checked;

	/**
	 * Derive error message from Formik if provided.
	 * Only show error if field has been touched.
	 */
	const errorMessage = error ?? (
		formik && name && formik.touched[name] && formik.errors[name]
			? formik.errors[name]
			: undefined
	);

	/**
	 * Handle change event - use Formik handler if available,
	 * otherwise fall back to provided onChange prop.
	 */
	const handleChange = formik?.handleChange ?? onChange;

	/**
	 * Handle blur event - use Formik handler if available,
	 * otherwise fall back to provided onBlur prop.
	 */
	const handleBlur = formik?.handleBlur ?? onBlur;

	return (
		<div className={cx("flex flex-col", containerClassName)}>
			<label
				className={cx(
					"flex items-start gap-3 cursor-pointer group",
					disabled && "cursor-not-allowed opacity-50",
					className
				)}
			>
				{/* Switch toggle container */}
				<div className="relative flex items-center flex-shrink-0">
					{/* Hidden checkbox for accessibility and form submission */}
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={disabled}
						name={name}
						className="peer sr-only"
						{...props}
					/>

					{/* Toggle track - the oval background */}
					<div
						className={cx(
							"w-10 h-6 rounded-full transition-colors duration-200",
							"bg-gray-300 dark:bg-gray-700",
							"peer-checked:bg-primary dark:peer-checked:bg-primary",
							"peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
							trackClassName
						)}
						aria-hidden="true"
					>
						{/* Toggle knob - the sliding circle */}
						<div
							className={cx(
								"absolute top-[2px] left-[2px]",
								"h-5 w-5 rounded-full",
								"bg-white border border-gray-300",
								"transition-transform duration-200 ease-in-out",
								"peer-checked:translate-x-4 peer-checked:border-white",
								knobClassName
							)}
						/>
					</div>
				</div>

				{/* Customizable content area - renders children */}
				{children && (
					<div className="flex-grow min-w-0">
						{children}
					</div>
				)}
			</label>

			{/* Error message display */}
			{errorMessage && (
				<p className="mt-1 ml-[52px] text-xs text-red-500 dark:text-red-400">
					{errorMessage}
				</p>
			)}
		</div>
	);
}

export default Switch;

