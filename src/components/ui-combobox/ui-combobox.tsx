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
 */
type BaseComboboxProps = {
	options: ComboboxOption[];
	label?: string;
	placeholder?: string;
	className?: string;
	searchPlaceholder?: string;
	renderOption?: (option: ComboboxOption) => React.ReactNode;
	matchTriggerWidth?: boolean;
	error?: string;
	containerClassName?: string;
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
 * Searchable select dropdown with modern styling and Formik integration
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
		error: externalError,
		containerClassName,
		formik,
		name,
	} = props;

	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const triggerRef = useRef<HTMLButtonElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

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

			// 1. Exact match on value
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

			return 0;
		});
	}, [options, search]);

	const handleSelect = (optionValue: string) => {
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

	const handleOpen = (e: React.MouseEvent) => {
		e.preventDefault();
		setOpen(true);
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
		<div className={cx("space-y-2", containerClassName, className)}>
			{/* Label */}
			{label && (
				<label className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-1">
					{label}
				</label>
			)}

			{/* Trigger Button */}
			<button
				ref={triggerRef}
				type="button"
				className={cx(
					"flex items-center justify-between w-full rounded-xl",
					"border border-gray-200 dark:border-gray-700",
					"bg-white dark:bg-card-dark py-3.5 px-4",
					"text-text-light dark:text-text-dark",
					"focus:border-primary focus:ring-primary focus:outline-none",
					"sm:text-sm shadow-sm transition-shadow",
					hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
					open && "border-primary ring-primary"
				)}
				onClick={handleTriggerClick}
				aria-expanded={open}
				aria-haspopup="dialog"
			>
				<span className={cx(!selectedOption && "text-gray-400")}>
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
					className={cx(
						"text-gray-400 transition-transform duration-200",
						open && "rotate-180"
					)}
				/>
			</button>

			<Dropdown
				open={open}
				onClose={() => setOpen(false)}
				anchorRef={triggerRef as React.RefObject<HTMLElement>}
				matchTriggerWidth={matchTriggerWidth}
			>
				{/* Search Input */}
				<div className="p-2 border-b border-gray-200 dark:border-gray-700">
					<input
						ref={searchInputRef}
						type="text"
						className={cx(
							"w-full rounded-lg border border-gray-200 dark:border-gray-700",
							"bg-white dark:bg-card-dark py-2 px-3",
							"text-text-light dark:text-text-dark placeholder-gray-400",
							"focus:border-primary focus:ring-primary focus:outline-none",
							"text-sm"
						)}
						placeholder={searchPlaceholder}
						value={search}
						onChange={e => setSearch(e.target.value)}
						onClick={e => e.stopPropagation()}
					/>
				</div>

				{/* Options List */}
				{open && (
					<ul className="max-h-60 overflow-auto py-1">
						{filteredOptions.length > 0 ? (
							filteredOptions.map(option => (
								<li
									key={`${option.value}-${option.label}`}
									className={cx(
										"flex items-center gap-2 px-4 py-2.5 cursor-pointer",
										"text-sm text-text-light dark:text-text-dark",
										"hover:bg-gray-100 dark:hover:bg-gray-800",
										"transition-colors",
										option.value === currentValue &&
											"bg-primary/10 text-primary font-medium"
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
							<li className="px-4 py-2.5 text-sm text-gray-400 cursor-default">
								No results found
							</li>
						)}
					</ul>
				)}
			</Dropdown>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1">{errorMessage}</p>
			)}
		</div>
	);
}

export default memo(Combobox);
