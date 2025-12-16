"use client";

import { useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "../material-icon/material-icon";
import { cx } from "../../lib/cx";

type ThemeMode = "light" | "dark";

const THEME_COOKIE_NAME = "theme";

function getInitialTheme(): ThemeMode {
	if (typeof window === "undefined") return "light";
	const stored = window.localStorage.getItem(THEME_COOKIE_NAME);
	if (stored === "dark" || stored === "light") return stored;
	return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
		? "dark"
		: "light";
}

function applyTheme(mode: ThemeMode) {
	document.documentElement.classList.toggle("dark", mode === "dark");
	document.documentElement.style.colorScheme = mode;
}

function persistTheme(mode: ThemeMode) {
	/**
	 * Senior note:
	 * - localStorage keeps the UX sticky for client-only cases (and the inline pre-paint script).
	 * - a cookie enables SSR to render the correct `<html class="dark">`, avoiding theme flash.
	 *
	 * Cookie is intentionally non-HttpOnly so the client can set it without a server roundtrip.
	 */
	window.localStorage.setItem(THEME_COOKIE_NAME, mode);
	document.cookie = `${THEME_COOKIE_NAME}=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

/**
 * Theme toggle button that controls Tailwind `darkMode: 'class'`.
 *
 * Mirrors the template behavior (icon-only pill).
 */
export function ThemeToggle({ className }: { className?: string }) {
	const [theme, setTheme] = useState<ThemeMode>("light");
	const isDark = theme === "dark";

	useEffect(() => {
		const initial = getInitialTheme();
		setTheme(initial);
		applyTheme(initial);
		persistTheme(initial);
	}, []);

	const label = useMemo(
		() => (isDark ? "Switch to light mode" : "Switch to dark mode"),
		[isDark]
	);

	return (
		<button
			type="button"
			title="Toggle Theme"
			aria-label={label}
			aria-pressed={isDark}
			onClick={() => {
				const next = isDark ? "light" : "dark";
				setTheme(next);
				persistTheme(next);
				applyTheme(next);
			}}
			className={cx(
				"bg-gray-100 dark:bg-gray-800 w-10 h-10 inline-flex items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
				className
			)}
		>
			<MaterialIcon name="contrast" className="text-[20px]" />
		</button>
	);
}
