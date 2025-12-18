"use client";

import { useState, useRef, useEffect } from "react";
import Dropdown from "../ui-dropdown/ui-dropdown";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";
import { FormikProps } from "formik";

/**
 * Type definitions for DatePicker component with optional Formik integration
 */
type BaseDatePickerProps = {
	minDate?: Date;
	placeholder?: string;
	className?: string;
	label?: string;
	error?: string;
	containerClassName?: string;
};

type WithFormik = BaseDatePickerProps & {
	formik: FormikProps<any>;
	name: string;
	value?: never;
	onChange?: never;
};

type WithoutFormik = BaseDatePickerProps & {
	formik?: undefined;
	name?: string;
	value?: Date | string;
	onChange: (date: Date) => void;
};

type DatePickerProps = WithFormik | WithoutFormik;

/**
 * DatePicker Component
 * Calendar date picker with modern styling and Formik integration
 *
 * @example
 * // With Formik
 * <DatePicker formik={formik} name="birthDate" label="Birth Date" />
 *
 * @example
 * // Without Formik
 * <DatePicker value={date} onChange={setDate} label="Select Date" />
 */
export default function DatePicker(props: DatePickerProps) {
	const {
		minDate,
		placeholder = "Select date",
		className,
		label,
		error: externalError,
		containerClassName,
		formik,
		name,
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLDivElement>(null);

	/** Check if using Formik and extract relevant state */
	const isFormik = !!formik && !!name;
	const touched = isFormik ? formik.touched?.[name] : false;
	const formikError = isFormik ? formik.errors?.[name] : undefined;
	const hasError = !!(externalError || (touched && formikError));
	const errorMessage =
		externalError ||
		(touched && typeof formikError === "string" ? formikError : undefined);

	// Determine current value based on formik or controlled prop
	const currentValue =
		formik && name ? formik.values?.[name] : (props as WithoutFormik).value;

	// Parse value to date object
	const dateValue = currentValue ? new Date(currentValue) : null;

	// Calendar state (viewing month/year)
	const [viewDate, setViewDate] = useState(dateValue || new Date());

	// Reset view date when opening if value exists
	useEffect(() => {
		if (isOpen && dateValue) {
			setViewDate(dateValue);
		} else if (isOpen && !dateValue) {
			setViewDate(new Date());
		}
	}, [isOpen, currentValue]);

	const daysInMonth = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const firstDayOfMonth = (date: Date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const handlePrevMonth = (e: React.MouseEvent) => {
		e.stopPropagation();
		setViewDate(
			new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
		);
	};

	const handleNextMonth = (e: React.MouseEvent) => {
		e.stopPropagation();
		setViewDate(
			new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
		);
	};

	const handleDateClick = (day: number) => {
		const newDate = new Date(
			viewDate.getFullYear(),
			viewDate.getMonth(),
			day
		);
		newDate.setHours(0, 0, 0, 0);

		if (isDateDisabled(newDate)) return;

		if (formik && name) {
			formik.setFieldValue(name, newDate);
			formik.setFieldTouched(name, true);
		} else {
			const onChange = (props as WithoutFormik).onChange;
			onChange(newDate);
		}

		setIsOpen(false);
	};

	const isDateDisabled = (date: Date) => {
		if (!minDate) return false;
		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);

		const compareMin = new Date(minDate);
		compareMin.setHours(0, 0, 0, 0);

		return compareDate < compareMin;
	};

	const isSameDate = (d1: Date | null, d2: Date) => {
		if (!d1) return false;
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return isSameDate(today, date);
	};

	const renderCalendarDays = () => {
		const days = [];
		const totalDays = daysInMonth(viewDate);
		const startDay = firstDayOfMonth(viewDate);

		// Empty cells for previous month
		for (let i = 0; i < startDay; i++) {
			days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
		}

		// Days of current month
		for (let i = 1; i <= totalDays; i++) {
			const currentDate = new Date(
				viewDate.getFullYear(),
				viewDate.getMonth(),
				i
			);
			const disabled = isDateDisabled(currentDate);
			const selected = isSameDate(dateValue, currentDate);
			const today = isToday(currentDate);

			days.push(
				<div
					key={`day-${i}`}
					className={cx(
						"w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer",
						"transition-colors",
						disabled && "text-gray-300 dark:text-gray-600 cursor-not-allowed",
						!disabled && !selected && "hover:bg-gray-100 dark:hover:bg-gray-800",
						selected && "bg-primary text-white font-medium",
						today && !selected && "border border-primary text-primary"
					)}
					onClick={e => {
						e.stopPropagation();
						if (!disabled) handleDateClick(i);
					}}
				>
					{i}
				</div>
			);
		}

		return days;
	};

	const formatDateDisplay = (date: Date | null) => {
		if (!date) return placeholder;
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className={cx("space-y-2", containerClassName, className)}>
			{/* Label */}
			{label && (
				<label className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-1">
					{label}
				</label>
			)}

			{/* Trigger */}
			<div
				ref={triggerRef}
				className={cx(
					"flex items-center justify-between w-full rounded-xl cursor-pointer",
					"border border-gray-200 dark:border-gray-700",
					"bg-white dark:bg-card-dark py-3.5 px-4",
					"text-text-light dark:text-text-dark",
					"sm:text-sm shadow-sm transition-shadow",
					hasError && "border-red-500",
					isOpen && "border-primary ring-1 ring-primary"
				)}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-2">
					<MaterialIcon
						name="calendar_month"
						className={cx(
							"text-gray-400",
							isOpen && "text-primary"
						)}
					/>
					<span className={cx(!dateValue && "text-gray-400")}>
						{formatDateDisplay(dateValue)}
					</span>
				</div>
				<MaterialIcon
					name="expand_more"
					className={cx(
						"text-gray-400 transition-transform duration-200",
						isOpen && "rotate-180"
					)}
				/>
			</div>

			<Dropdown
				open={isOpen}
				onClose={() => setIsOpen(false)}
				anchorRef={triggerRef as React.RefObject<HTMLElement>}
				className="p-3 min-w-[280px] max-w-[300px]"
				matchTriggerWidth={false}
			>
				{/* Calendar Header */}
				<div className="flex items-center justify-between mb-3">
					<button
						type="button"
						className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						onClick={handlePrevMonth}
					>
						<MaterialIcon name="chevron_left" className="text-gray-600 dark:text-gray-400" />
					</button>
					<span className="font-medium text-sm text-text-light dark:text-text-dark">
						{viewDate.toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<button
						type="button"
						className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						onClick={handleNextMonth}
					>
						<MaterialIcon name="chevron_right" className="text-gray-600 dark:text-gray-400" />
					</button>
				</div>

				{/* Calendar Grid */}
				<div className="grid grid-cols-7 gap-1">
					{/* Weekday Headers */}
					{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
						<div
							key={day}
							className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
						>
							{day}
						</div>
					))}
					{/* Day Cells */}
					{renderCalendarDays()}
				</div>
			</Dropdown>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1">{errorMessage}</p>
			)}
		</div>
	);
}
