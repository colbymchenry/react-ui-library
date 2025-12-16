"use client";

import { useState, useRef, useMemo, memo } from "react";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";
import Dropdown from "../ui-dropdown/ui-dropdown";
import { FormikProps } from "formik";

export interface ComboboxOption {
	value: string;
	label: string;
	icon?: string;
	[key: string]: any;
}

/**
 * Type definitions for Combobox component with optional Formik integration
 * WithFormik: When using Formik for form state management
 * WithoutFormik: For standalone combobox with controlled value
 */
type BaseComboboxProps = {
	options: ComboboxOption[];
	label?: string;
	placeholder?: string;
	className?: string;
	searchPlaceholder?: string;
	renderOption?: (option: ComboboxOption) => React.ReactNode;
	matchTriggerWidth?: boolean;
};

type WithFormik = BaseComboboxProps & {
	formik: FormikProps<any>;
	name: string;
	value?: never;
	onChange?: never;
};

type WithoutFormik = BaseComboboxProps & {
	formik?: undefined;
	name?: string;
	value?: string;
	onChange: (value: string) => void;
};

type ComboboxProps = WithFormik | WithoutFormik;

/**
 * Combobox Component
 * Searchable select dropdown using the Dropdown component with optional Formik integration
 *
 * @example
 * // With Formik
 * <Combobox formik={formik} name="country" label="Country" options={countryOptions} />
 *
 * @example
 * // Without Formik
 * <Combobox value={country} onChange={setCountry} options={countryOptions} />
 */
function Combobox(props: ComboboxProps) {
	const {
		options,
		label,
		placeholder = "Select option...",
		className,
		searchPlaceholder = "Search...",
		renderOption,
		matchTriggerWidth = true,
		formik,
		name,
	} = props;

	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const triggerRef = useRef<HTMLButtonElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Determine current value based on formik or controlled prop
	const currentValue =
		formik && name ? formik.values?.[name] : (props as WithoutFormik).value;
	const selectedOption = options.find(opt => opt.value === currentValue);

	const filteredOptions = useMemo(() => {
		if (!search) return options;
		const lowerSearch = search.toLowerCase();

		// Filter first
		const filtered = options.filter(
			opt =>
				opt.label.toLowerCase().includes(lowerSearch) ||
				(opt.value && opt.value.toLowerCase().includes(lowerSearch)) ||
				(opt.searchLabel &&
					typeof opt.searchLabel === "string" &&
					opt.searchLabel.toLowerCase().includes(lowerSearch))
		);

		// Then sort by relevance
		return filtered.sort((a, b) => {
			const aLabel = (a.searchLabel || a.label).toLowerCase();
			const bLabel = (b.searchLabel || b.label).toLowerCase();
			const aValue = (a.value || "").toLowerCase();
			const bValue = (b.value || "").toLowerCase();

			// 1. Exact match on value (e.g. searching "+1")
			const aExactValue = aValue === lowerSearch;
			const bExactValue = bValue === lowerSearch;
			if (aExactValue && !bExactValue) return -1;
			if (!aExactValue && bExactValue) return 1;

			// 2. Exact match on label/searchLabel
			const aExactLabel = aLabel === lowerSearch;
			const bExactLabel = bLabel === lowerSearch;
			if (aExactLabel && !bExactLabel) return -1;
			if (!aExactLabel && bExactLabel) return 1;

			// 3. Starts with on label/searchLabel
			const aStartsLabel = aLabel.startsWith(lowerSearch);
			const bStartsLabel = bLabel.startsWith(lowerSearch);
			if (aStartsLabel && !bStartsLabel) return -1;
			if (!aStartsLabel && bStartsLabel) return 1;

			// 4. Starts with on value
			const aStartsValue = aValue.startsWith(lowerSearch);
			const bStartsValue = bValue.startsWith(lowerSearch);
			if (aStartsValue && !bStartsValue) return -1;
			if (!aStartsValue && bStartsValue) return 1;

			// Default order (alphabetical or original)
			return 0;
		});
	}, [options, search]);

	const handleSelect = (optionValue: string) => {
		// Handle both Formik and non-Formik cases
		if (formik && name) {
			formik.setFieldValue(name, optionValue);
			formik.setFieldTouched(name, true);
		} else {
			const onChange = (props as WithoutFormik).onChange;
			onChange(optionValue);
		}

		setOpen(false);
		setSearch("");
	};

	// Focus search input when opened
	const handleOpen = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent form submission
		setOpen(true);
		// Timeout to wait for dialog to render
		setTimeout(() => {
			searchInputRef.current?.focus();
		}, 50);
	};

	const handleTriggerClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (open) {
			setOpen(false);
		} else {
			handleOpen(e);
		}
	};

	return (
		<div className={cx("form-group", className)}>
			{label && <label>{label}</label>}
			<button
				ref={triggerRef}
				type="button"
				className="input combobox-trigger"
				onClick={handleTriggerClick}
				aria-expanded={open}
				aria-haspopup="dialog"
			>
				<span className={cx(!selectedOption && "text-gray-500")}>
					{selectedOption ? (
						<span className="flex items-center gap-2">
							{selectedOption.icon && (
								<span>{selectedOption.icon}</span>
							)}
							{selectedOption.label}
						</span>
					) : (
						placeholder
					)}
				</span>
				<MaterialIcon
					name="expand_more"
					className={cx("combobox-chevron", open && "open")}
				/>
			</button>

			<Dropdown
				open={open}
				onClose={() => setOpen(false)}
				anchorRef={triggerRef as React.RefObject<HTMLElement>}
				matchTriggerWidth={matchTriggerWidth}
			>
				<div className="dropdown-header">
					<input
						ref={searchInputRef}
						type="text"
						className="dropdown-search-input"
						placeholder={searchPlaceholder}
						value={search}
						onChange={e => setSearch(e.target.value)}
						onClick={e => e.stopPropagation()} // Prevent click from closing dialog if propagated to backdrop handler
					/>
				</div>
				{/* Only render list items if open to improve performance */}
				{open && (
					<ul className="dropdown-list">
						{filteredOptions.length > 0 ? (
							filteredOptions.map(option => (
								<li
									key={`${option.value}-${option.label}`} // Unique key using value + label
									className={cx(
										"dropdown-item",
										option.value === currentValue &&
											"selected"
									)}
									onClick={() => handleSelect(option.value)}
								>
									{renderOption ? (
										renderOption(option)
									) : (
										<>
											{option.icon && (
												<span>{option.icon}</span>
											)}
											<span>{option.label}</span>
										</>
									)}
								</li>
							))
						) : (
							<li className="dropdown-item text-gray-400 cursor-default">
								No results found
							</li>
						)}
					</ul>
				)}
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

export default memo(Combobox);
