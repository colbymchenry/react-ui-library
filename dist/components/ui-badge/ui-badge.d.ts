import type { HTMLAttributes, ReactNode } from "react";
type BadgeVariant = "status-active" | "gift" | "active-gifted";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant: BadgeVariant;
    iconName?: string;
    iconFilled?: boolean;
    children: ReactNode;
}
export declare function Badge({ variant, iconName, iconFilled, className, children, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-badge.d.ts.map