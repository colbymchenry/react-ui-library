import type { ButtonHTMLAttributes, ReactNode } from "react";
type ButtonVariant = "primary" | "secondary" | "pill" | "small-pill" | "link" | "ghost" | "social";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    iconLeading?: ReactNode;
    iconTrailing?: ReactNode;
    loading?: boolean;
    loadingText?: string;
}
export declare function Button({ variant, iconLeading, iconTrailing, className, children, type, loading, loadingText, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-button.d.ts.map