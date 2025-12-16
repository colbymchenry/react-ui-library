import type { ReactNode } from "react";
import { MaterialIcon } from "../material-icon/material-icon";

interface SectionHeaderProps {
	icon: string;
	title: string;
	trailing?: ReactNode;
}

/**
 * Template-style section header: icon + uppercase title with divider.
 */
export function SectionHeader({ icon, title, trailing }: SectionHeaderProps) {
	return (
		<div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
			<MaterialIcon name={icon} className="text-primary" />
			<h2 className="text-2xl font-bold uppercase tracking-wide">
				{title}
			</h2>
			{trailing ? <div className="ml-auto">{trailing}</div> : null}
		</div>
	);
}
