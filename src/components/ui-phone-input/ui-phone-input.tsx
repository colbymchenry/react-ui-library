"use client";

import { useMemo, useState, useEffect, memo, useCallback } from "react";
import Combobox, { ComboboxOption } from "../ui-combobox/ui-combobox";
import countriesData from "../../assets/countries.json";
import { cx } from "../../lib/cx";
import { FormikProps } from "formik";

/**
 * Type definitions for PhoneInput component with optional Formik integration
 * WithFormik: When using Formik for form state management
 * WithoutFormik: For standalone phone input with controlled value
 */
type BasePhoneInputProps = {
	label?: string;
	placeholder?: string;
	className?: string;
	defaultCountry?: string; // Country name to default the code to
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
 * A custom input for phone numbers with a country code selector and optional Formik integration.
 * Formats the phone number as the user types.
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
		formik,
		name,
	} = props;

	// Determine current value based on formik or controlled prop
	const currentValue =
		formik && name
			? (formik.values?.[name] ?? "")
			: (props as WithoutFormik).value;
	// State to track the explicitly selected country name (to disambiguate shared codes like +1)
	const [selectedCountryName, setSelectedCountryName] =
		useState(defaultCountry);

	// Memoize the sorted countries list (optimization)
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
			// Find matching code
			const matched = sortedCountries.find(c =>
				cleanValue.startsWith(c.dial_code)
			);
			if (matched) {
				matchedCountryCode = matched.dial_code;
				numberPart = cleanValue.substring(matched.dial_code.length);
			}
		}

		if (!matchedCountryCode) {
			// Fallback
			const defaultData = countriesData.find(
				c => c.name === defaultCountry
			);
			matchedCountryCode = defaultData?.dial_code || "+1";
			numberPart = currentValue.replace(/\D/g, "");
		}

		// Determine active country
		// Check if currently selected country matches the code
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

		// If not, find the first country that matches this code
		// (This happens if value changes externally to a different region code)
		const newMatch = countriesData.find(
			c => c.dial_code === matchedCountryCode
		);
		return {
			countryCode: matchedCountryCode,
			phoneNumber: formatPhoneNumber(numberPart),
			activeCountryName: newMatch?.name || "United States",
		};
	}, [currentValue, defaultCountry, selectedCountryName, sortedCountries]);

	// Sync state if derived activeCountry differs (e.g. external prop change to different code)
	useEffect(() => {
		if (activeCountryName !== selectedCountryName) {
			setSelectedCountryName(activeCountryName);
		}
	}, [activeCountryName, selectedCountryName]);

	// Format options for the combobox
	const countryOptions = useMemo(() => {
		return countriesData.map(c => ({
			value: c.name, // UNIQUE KEY: Use Country Name
			label: c.dial_code,
			icon: c.flag,
			searchLabel: `${c.name} ${c.dial_code}`, // Helper for better search
		}));
	}, []);

	const handleCountryChange = useCallback(
		(newCountryName: string) => {
			const country = countriesData.find(c => c.name === newCountryName);
			if (country) {
				setSelectedCountryName(country.name);
				const cleanNumber = phoneNumber.replace(/\D/g, "");
				const newValue = `${country.dial_code}-${cleanNumber}`;

				// Handle both Formik and non-Formik cases
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
			// Enforce numeric only (allow hyphens/spaces for user comfort but strip them for logic)
			const numericValue = input.replace(/\D/g, "");

			// Combine with current country code
			const newValue =
				numericValue === "" ? "" : `${countryCode}-${numericValue}`;

			// Handle both Formik and non-Formik cases
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
		// Extract country name from searchLabel which is formatted as "Name Code"
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
		<div className={cx("form-group", className)}>
			{label && <label>{label}</label>}
			<div className={"phone-input-container"}>
				<div className="phone-input-code-selector">
					<Combobox
						options={countryOptions}
						value={activeCountryName} // Controlled by activeCountryName
						onChange={handleCountryChange}
						className="phone-input-combobox"
						matchTriggerWidth={false}
						renderOption={renderCountryOption}
						placeholder="+1"
					/>
				</div>
				<div className="phone-input-separator" />
				<input
					type="tel"
					inputMode="numeric"
					value={phoneNumber}
					onChange={handleNumberChange}
					placeholder={placeholder}
					className="phone-input-field"
				/>
			</div>
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

// Simple US-style formatter: 123-456-7890
// We can make this smarter later if needed
function formatPhoneNumber(value: string) {
	if (!value) return value;
	const phoneNumber = value.replace(/[^\d]/g, "");
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 4) return phoneNumber;
	if (phoneNumberLength < 7) {
		return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
	}
	return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6, 10)}`;
}

export default memo(PhoneInput);
