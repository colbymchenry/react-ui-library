"use client";

import { useId, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";
import { ThemeToggle } from "../ui-theme-toggle/ui-theme-toggle";

/**
 * Navigation link configuration for the Header component.
 * Supports optional icons and active state styling.
 */
export interface NavLink {
	/** Display text for the navigation link */
	label: string;
	/** URL or path the link navigates to */
	href: string;
	/** Optional Material Symbols icon name (e.g., "admin_panel_settings") */
	icon?: string;
	/** Whether this link is currently active (uses primary color) */
	active?: boolean;
}

interface HeaderProps {
	/** Custom brand/logo content - defaults to Volcanica branding */
	brand?: ReactNode;
	/** Navigation links displayed in the center (hidden on mobile, shown in menu) */
	navLinks?: NavLink[];
	/** Content for the right side of the header (theme toggle, user menu, etc.) */
	rightSlot?: ReactNode;
	/** Additional CSS classes for the header element */
	className?: string;
	/** 
	 * Custom link renderer - allows using router Link components (e.g., Remix, Next.js).
	 * If not provided, renders standard anchor tags.
	 */
	renderLink?: (link: NavLink, className: string) => ReactNode;
}

/**
 * Header Component
 *
 * Responsive sticky header with brand, navigation, and action slots.
 * Features a mobile-friendly hamburger menu that toggles navigation visibility.
 *
 * Uses CSS-only checkbox trick for mobile menu toggle (no JavaScript state needed).
 * Navigation links support optional icons and active state highlighting.
 *
 * @example
 * // Basic header with navigation
 * <Header
 *   navLinks={[
 *     { label: "Dashboard", href: "/dashboard" },
 *     { label: "Settings", href: "/settings" },
 *     { label: "Admin", href: "/admin", icon: "admin_panel_settings", active: true },
 *   ]}
 * />
 *
 * @example
 * // Header with custom brand and right slot
 * <Header
 *   brand={<Logo />}
 *   navLinks={navLinks}
 *   rightSlot={
 *     <div className="flex items-center gap-3">
 *       <ThemeToggle />
 *       <UserAvatar />
 *     </div>
 *   }
 * />
 *
 * @example
 * // Header with Remix Link component
 * <Header
 *   navLinks={navLinks}
 *   renderLink={(link, className) => (
 *     <Link to={link.href} className={className}>
 *       {link.icon && <MaterialIcon name={link.icon} className="text-[16px]" />}
 *       {link.label}
 *     </Link>
 *   )}
 * />
 */
export function Header({
	brand,
	navLinks,
	rightSlot,
	className,
	renderLink,
}: HeaderProps) {
	/**
	 * Generate unique ID for the mobile menu checkbox.
	 * This ensures multiple headers on the same page don't conflict.
	 */
	const menuId = useId();

	/**
	 * Default link renderer using standard anchor tags.
	 * Can be overridden via renderLink prop for router integration.
	 */
	const defaultRenderLink = (link: NavLink, linkClassName: string) => (
		<a href={link.href} className={linkClassName}>
			{link.icon && <MaterialIcon name={link.icon} className="text-[16px]" />}
			{link.label}
		</a>
	);

	const linkRenderer = renderLink ?? defaultRenderLink;

	/**
	 * Generates the appropriate class names for a navigation link.
	 * Active links use primary color, inactive links use muted with hover effect.
	 */
	const getLinkClassName = (link: NavLink) =>
		cx(
			"text-xs font-bold uppercase tracking-wide transition-colors flex items-center gap-1",
			link.active
				? "text-primary hover:text-secondary"
				: "text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary"
		);

	return (
		<header
			className={cx(
				"w-full px-8 py-5 flex flex-wrap xl:flex-nowrap items-center",
				"bg-card-light dark:bg-card-dark",
				"border-b border-border-light dark:border-border-dark",
				"sticky top-0 z-50",
				className
			)}
		>
			{/* Brand Section - always visible */}
			<div className="flex items-center gap-4 flex-shrink-0">
				{brand ?? (
					<div className="flex flex-col items-start justify-center font-heading font-black text-2xl tracking-tight leading-none text-text-light dark:text-white">
						<span>VOLCANICA</span>
						<span className="text-[0.6rem] tracking-[0.3em] font-bold text-text-muted-light dark:text-text-muted-dark uppercase mt-0.5">
							Coffee Company
						</span>
					</div>
				)}
			</div>

			{/* Divider between brand and nav - hidden on mobile */}
			{navLinks && navLinks.length > 0 && (
				<div className="hidden xl:block h-8 w-px bg-border-light dark:bg-border-dark mx-6" />
			)}

			{/* Mobile Controls - theme toggle and hamburger menu */}
			<div className="flex items-center gap-3 ml-auto xl:hidden">
				<ThemeToggle />
				{navLinks && navLinks.length > 0 && (
					<label
						htmlFor={menuId}
						className={cx(
							"bg-gray-100 dark:bg-gray-800 p-2 rounded-full",
							"text-text-light dark:text-text-dark",
							"hover:bg-gray-200 dark:hover:bg-gray-700",
							"transition-colors cursor-pointer select-none"
						)}
						aria-label="Toggle navigation menu"
					>
						<MaterialIcon name="menu" className="text-[20px]" />
					</label>
				)}
			</div>

			{/* 
			 * Hidden checkbox for CSS-only mobile menu toggle.
			 * Using peer class allows the nav to respond to checked state.
			 */}
			{navLinks && navLinks.length > 0 && (
				<input
					type="checkbox"
					id={menuId}
					className="hidden peer"
					aria-hidden="true"
				/>
			)}

			{/* Navigation Links */}
			{navLinks && navLinks.length > 0 && (
				<nav
					className={cx(
						// Mobile: hidden by default, shown when checkbox is checked
						"hidden peer-checked:flex",
						// Desktop: always visible as horizontal row
						"xl:flex",
						// Layout
						"w-full xl:w-auto",
						"flex-col xl:flex-row",
						"items-start xl:items-center",
						"gap-4 xl:gap-6",
						// Spacing and borders for mobile
						"mt-5 xl:mt-0",
						"pt-5 xl:pt-0",
						"border-t xl:border-t-0 border-gray-100 dark:border-gray-800",
						// Order: push to end on mobile, inline on desktop
						"order-last xl:order-none"
					)}
				>
					{navLinks.map((link) => (
						<span key={link.href}>
							{linkRenderer(link, getLinkClassName(link))}
						</span>
					))}
				</nav>
			)}

			{/* Right Slot - hidden on mobile (theme toggle shown in mobile controls) */}
			<div className="hidden xl:flex items-center gap-3 ml-auto">
				{rightSlot ?? <ThemeToggle />}
			</div>
		</header>
	);
}
