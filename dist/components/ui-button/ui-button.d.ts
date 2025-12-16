import type { ButtonHTMLAttributes, ReactNode } from "react";
type ButtonVariant = "primary" | "secondary" | "pill" | "small-pill" | "link" | "ghost";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    iconLeading?: ReactNode;
}
export declare function Button({ variant, iconLeading, className, children, type, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-button.d.ts.map