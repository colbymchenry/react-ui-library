import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";
import { FormikProps } from "formik";

/**
 * Type definitions for AddMinus component with optional Formik integration
 * WithFormik: When using Formik for form state management
 * WithoutFormik: For standalone quantity selector with controlled value
 */
type BaseAddMinusProps = {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	className?: string;
};

type WithFormik = BaseAddMinusProps & {
	formik: FormikProps<any>;
	name: string;
	value?: never;
	onChange?: never;
};

type WithoutFormik = BaseAddMinusProps & {
	formik?: undefined;
	name?: string;
	value: number;
	onChange: (value: number) => void;
};

type AddMinusProps = WithFormik | WithoutFormik;

/**
 * AddMinus Component (Quantity Selector)
 *
 * A plus/minus input control for numeric values with optional Formik integration.
 * Features rounded buttons with icons and a centered value display.
 *
 * Design Principles:
 * - Single Responsibility: Handles only numeric increment/decrement UI
 * - Open/Closed: Open for extension via className, closed for modification
 * - Interface Segregation: Clean, focused API for numeric input
 *
 * Features:
 * - Optional label
 * - Min/max value constraints
 * - Custom step increment
 * - Formik integration support
 * - Dark mode support
 * - Accessible button controls
 *
 * @example
 * // With Formik
 * <AddMinus formik={formik} name="quantity" label="Quantity" min={1} max={10} />
 *
 * @example
 * // Without Formik
 * <AddMinus value={quantity} onChange={setQuantity} label="Quantity" min={1} />
 */
export default function AddMinus(props: AddMinusProps) {
	const {
		label,
		min = 0,
		max = Infinity,
		step = 1,
		className,
		formik,
		name,
	} = props;

	// Determine current value based on formik or controlled prop
	const currentValue =
		formik && name
			? (formik.values?.[name] ?? min)
			: (props as WithoutFormik).value;

	/**
	 * Handle decrement action
	 * Decreases value by step amount, respecting minimum constraint
	 */
	const handleDecrement = () => {
		const newValue = Math.max(min, currentValue - step);

		if (formik && name) {
			formik.setFieldValue(name, newValue);
		} else {
			const onChange = (props as WithoutFormik).onChange;
			onChange(newValue);
		}
	};

	/**
	 * Handle increment action
	 * Increases value by step amount, respecting maximum constraint
	 */
	const handleIncrement = () => {
		const newValue = Math.min(max, currentValue + step);

		if (formik && name) {
			formik.setFieldValue(name, newValue);
		} else {
			const onChange = (props as WithoutFormik).onChange;
			onChange(newValue);
		}
	};

	// Check if buttons should be disabled
	const isMinDisabled = currentValue <= min;
	const isMaxDisabled = currentValue >= max;

	return (
		<div className={cx("form-group", className)}>
			{label && (
				<label className="text-sm font-medium text-text-light dark:text-text-dark">
					{label}
				</label>
			)}
			<div className="flex items-center space-x-3 bg-background-light dark:bg-background-dark rounded-full px-2 py-1 border border-border-light dark:border-border-dark w-fit">
				<button
					type="button"
					onClick={handleDecrement}
					disabled={isMinDisabled}
					className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-muted-light dark:disabled:hover:text-text-muted-dark"
					aria-label="Decrease quantity"
				>
					<MaterialIcon name="remove" className="text-sm" />
				</button>
				<span className="text-sm font-semibold text-text-light dark:text-text-dark w-8 text-center">
					{currentValue}
				</span>
				<button
					type="button"
					onClick={handleIncrement}
					disabled={isMaxDisabled}
					className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-muted-light dark:disabled:hover:text-text-muted-dark"
					aria-label="Increase quantity"
				>
					<MaterialIcon name="add" className="text-sm" />
				</button>
			</div>
		</div>
	);
}
