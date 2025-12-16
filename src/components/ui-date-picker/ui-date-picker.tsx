"use client";

import { useState, useRef, useEffect } from "react";
import Dropdown from "../ui-dropdown/ui-dropdown";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";
import { FormikProps } from "formik";

/**
 * Type definitions for DatePicker component with optional Formik integration
 * WithFormik: When using Formik for form state management
 * WithoutFormik: For standalone date picker with controlled value
 */
type BaseDatePickerProps = {
	minDate?: Date;
	placeholder?: string;
	className?: string;
	label?: string;
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
 * Calendar date picker with optional Formik integration
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
		formik,
		name,
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLDivElement>(null);

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
		// Normalize time to midnight for comparison consistency
		newDate.setHours(0, 0, 0, 0);

		if (isDateDisabled(newDate)) return;

		// Handle both Formik and non-Formik cases
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
			days.push(
				<div key={`empty-${i}`} className="calendar-day empty" />
			);
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
						"calendar-day",
						disabled && "disabled",
						selected && "selected",
						today && "today"
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
		<div className={cx("form-group", className)}>
			{label && <label>{label}</label>}
			<div
				ref={triggerRef}
				className={cx("date-picker-trigger", isOpen && "open")}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="date-picker-value">
					<MaterialIcon
						name="calendar_month"
						className="date-picker-icon"
					/>
					<span>{formatDateDisplay(dateValue)}</span>
				</div>
				<MaterialIcon
					name="expand_more"
					className={cx("combobox-chevron", isOpen && "open")}
				/>
			</div>

			<Dropdown
				open={isOpen}
				onClose={() => setIsOpen(false)}
				anchorRef={triggerRef as React.RefObject<HTMLElement>}
				className="date-picker-dropdown"
				matchTriggerWidth={false}
			>
				<div className="calendar-header">
					<button
						type="button"
						className="calendar-nav-btn"
						onClick={handlePrevMonth}
					>
						<MaterialIcon name="chevron_left" />
					</button>
					<span className="current-month">
						{viewDate.toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						})}
					</span>
					<button
						type="button"
						className="calendar-nav-btn"
						onClick={handleNextMonth}
					>
						<MaterialIcon name="chevron_right" />
					</button>
				</div>
				<div className="calendar-grid">
					{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
						<div key={day} className="calendar-weekday">
							{day}
						</div>
					))}
					{renderCalendarDays()}
				</div>
			</Dropdown>

			{/* Error message display for Formik integration */}
			{formik &&
				name &&
				formik.touched?.[name] &&
				formik.errors?.[name] && (
					<span className="error-message">
						{typeof formik.errors[name] === "string"
							? formik.errors[name]
							: "Invalid field"}
					</span>
				)}
		</div>
	);
}
