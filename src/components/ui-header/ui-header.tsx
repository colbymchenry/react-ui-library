"use client";

import type { ReactNode } from "react";
import { ThemeToggle } from "../ui-theme-toggle/ui-theme-toggle";

interface HeaderProps {
	brand?: ReactNode;
	rightSlot?: ReactNode;
}

/**
 * Sticky header from `ui_template.html`.
 *
 * Senior note:
 * This is a layout component (composition) – keep it dumb and customizable via slots.
 */
export function Header({ brand, rightSlot }: HeaderProps) {
	return (
		<header className="w-full px-8 py-5 flex justify-between items-center bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50">
			{brand ?? (
				<div className="flex items-center gap-4">
					<div className="flex flex-col items-center justify-center font-heading font-black text-2xl tracking-tight leading-none text-text-light dark:text-white">
						<span>VOLCANICA</span>
						<span className="text-[0.6rem] tracking-[0.3em] font-bold text-text-muted-light dark:text-text-muted-dark uppercase mt-0.5">
							Coffee Company
						</span>
					</div>
					<div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2" />
					<span className="font-bold text-sm uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
						UI Library
					</span>
				</div>
			)}

			<div>{rightSlot ?? <ThemeToggle />}</div>
		</header>
	);
}
