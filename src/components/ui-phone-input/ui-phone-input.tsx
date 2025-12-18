"use client";

import { useMemo, useState, useEffect, memo, useCallback } from "react";
import Combobox, { ComboboxOption } from "../ui-combobox/ui-combobox";
import countriesData from "../../assets/countries.json";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Type definitions for PhoneInput component with optional Formik integration
 */
type BasePhoneInputProps = {
	label?: string;
	placeholder?: string;
	className?: string;
	defaultCountry?: string;
	error?: string;
	containerClassName?: string;
};

type WithFormik = BasePhoneInputProps & {
	formik: FormikProps<any>;
	name: string;
	value?: never;
	onChange?: never;
};

type WithoutFormik = BasePhoneInputProps & {
	formik?: undefined;
	name?: string;
	value: string;
	onChange: (value: string) => void;
};

type PhoneInputProps = WithFormik | WithoutFormik;

/**
 * PhoneInput Component
 * Phone number input with country code selector, modern styling, and Formik integration.
 * Returns the full E.164 formatted number (e.g., "+1-555-123-4567").
 *
 * @example
 * // With Formik
 * <PhoneInput formik={formik} name="phone" label="Phone Number" />
 *
 * @example
 * // Without Formik
 * <PhoneInput value={phone} onChange={setPhone} label="Phone Number" />
 */
function PhoneInput(props: PhoneInputProps) {
	const {
		label,
		placeholder = "Phone number",
		className,
		defaultCountry = "United States",
		error: externalError,
		containerClassName,
		formik,
		name,
	} = props;

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
		formik && name
			? (formik.values?.[name] ?? "")
			: (props as WithoutFormik).value;

	// State to track the explicitly selected country name
	const [selectedCountryName, setSelectedCountryName] =
		useState(defaultCountry);

	// Memoize the sorted countries list
	const sortedCountries = useMemo(() => {
		return [...countriesData].sort(
			(a, b) => b.dial_code.length - a.dial_code.length
		);
	}, []);

	// Derive current state from props + internal selection
	const { countryCode, phoneNumber, activeCountryName } = useMemo(() => {
		if (!currentValue) {
			const defaultData = countriesData.find(
				c => c.name === defaultCountry
			);
			return {
				countryCode: defaultData?.dial_code || "+1",
				phoneNumber: "",
				activeCountryName: defaultData?.name || "United States",
			};
		}

		const cleanValue = currentValue.replace(/-/g, "").replace(/\s/g, "");
		let matchedCountryCode = "";
		let numberPart = "";

		if (cleanValue.startsWith("+")) {
			const matched = sortedCountries.find(c =>
				cleanValue.startsWith(c.dial_code)
			);
			if (matched) {
				matchedCountryCode = matched.dial_code;
				numberPart = cleanValue.substring(matched.dial_code.length);
			}
		}

		if (!matchedCountryCode) {
			const defaultData = countriesData.find(
				c => c.name === defaultCountry
			);
			matchedCountryCode = defaultData?.dial_code || "+1";
			numberPart = currentValue.replace(/\D/g, "");
		}

		// Determine active country
		const currentSelectedData = countriesData.find(
			c => c.name === selectedCountryName
		);
		if (
			currentSelectedData &&
			currentSelectedData.dial_code === matchedCountryCode
		) {
			return {
				countryCode: matchedCountryCode,
				phoneNumber: formatPhoneNumber(numberPart),
				activeCountryName: selectedCountryName,
			};
		}

		const newMatch = countriesData.find(
			c => c.dial_code === matchedCountryCode
		);
		return {
			countryCode: matchedCountryCode,
			phoneNumber: formatPhoneNumber(numberPart),
			activeCountryName: newMatch?.name || "United States",
		};
	}, [currentValue, defaultCountry, selectedCountryName, sortedCountries]);

	// Sync state if derived activeCountry differs
	useEffect(() => {
		if (activeCountryName !== selectedCountryName) {
			setSelectedCountryName(activeCountryName);
		}
	}, [activeCountryName, selectedCountryName]);

	// Format options for the combobox
	const countryOptions = useMemo(() => {
		return countriesData.map(c => ({
			value: c.name,
			label: c.dial_code,
			icon: c.flag,
			searchLabel: `${c.name} ${c.dial_code}`,
		}));
	}, []);

	const handleCountryChange = useCallback(
		(newCountryName: string) => {
			const country = countriesData.find(c => c.name === newCountryName);
			if (country) {
				setSelectedCountryName(country.name);
				const cleanNumber = phoneNumber.replace(/\D/g, "");
				const newValue = `${country.dial_code}-${cleanNumber}`;

				if (formik && name) {
					formik.setFieldValue(name, newValue);
					formik.setFieldTouched(name, true);
				} else {
					const onChange = (props as WithoutFormik).onChange;
					onChange(newValue);
				}
			}
		},
		[phoneNumber, formik, name, props]
	);

	const handleNumberChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const input = e.target.value;
			const numericValue = input.replace(/\D/g, "");
			const newValue =
				numericValue === "" ? "" : `${countryCode}-${numericValue}`;

			if (formik && name) {
				formik.setFieldValue(name, newValue);
			} else {
				const onChange = (props as WithoutFormik).onChange;
				onChange(newValue);
			}
		},
		[countryCode, formik, name, props]
	);

	const renderCountryOption = useCallback((option: ComboboxOption) => {
		const name = option.searchLabel
			? option.searchLabel.substring(
					0,
					option.searchLabel.lastIndexOf(" ")
				)
			: "";

		return (
			<span className="flex items-center gap-2">
				<span>{option.icon}</span>
				<span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">
					{name}
				</span>
				<span className="font-medium">{option.label}</span>
			</span>
		);
	}, []);

	return (
		<div className={cx("space-y-2", containerClassName, className)}>
			{/* Label */}
			{label && (
				<label className="block text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-wider mb-1">
					{label}
				</label>
			)}

			{/* Phone Input Container */}
			<div
				className={cx(
					"flex items-center w-full rounded-xl overflow-hidden",
					"border border-gray-200 dark:border-gray-700",
					"bg-white dark:bg-card-dark",
					"shadow-sm transition-shadow",
					"focus-within:border-primary focus-within:ring-1 focus-within:ring-primary",
					hasError && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
				)}
			>
				{/* Country Code Selector */}
				<Combobox
					options={countryOptions}
					value={activeCountryName}
					onChange={handleCountryChange}
					matchTriggerWidth={false}
					renderOption={renderCountryOption}
					placeholder="+1"
					containerClassName="shrink-0 [&>button]:border-0 [&>button]:shadow-none [&>button]:rounded-none [&>button]:ring-0 [&>button]:bg-gray-50 [&>button]:dark:bg-gray-800/50 [&>button]:min-w-[90px]"
					dropdownClassName="min-w-[280px] max-w-[320px]"
				/>

				{/* Separator */}
				<div className="w-px h-8 bg-gray-200 dark:bg-gray-700 shrink-0" />

				{/* Phone Number Input */}
				<input
					type="tel"
					inputMode="numeric"
					value={phoneNumber}
					onChange={handleNumberChange}
					placeholder={placeholder}
					className="flex-1 py-3.5 px-4 bg-transparent border-0 text-text-light dark:text-text-dark placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
				/>
			</div>

			{/* Error message */}
			{hasError && errorMessage && (
				<p className="text-xs text-red-500 mt-1">{errorMessage}</p>
			)}
		</div>
	);
}

/**
 * Format phone number in US-style: 123-456-7890
 */
function formatPhoneNumber(value: string) {
	if (!value) return value;
	const phoneNumber = value.replace(/[^\d]/g, "");
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 4) return phoneNumber;
	if (phoneNumberLength < 7) {
		return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
	}
	return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export default memo(PhoneInput);
