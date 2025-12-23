import { type ReactNode } from "react";
export interface NavLink {
    label: string;
    href: string;
    icon?: string;
    active?: boolean;
}
interface HeaderProps {
    brand?: ReactNode;
    navLinks?: NavLink[];
    rightSlot?: ReactNode;
    className?: string;
    renderLink?: (link: NavLink, className: string) => ReactNode;
}
export declare function Header({ brand, navLinks, rightSlot, className, renderLink, }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-header.d.ts.map