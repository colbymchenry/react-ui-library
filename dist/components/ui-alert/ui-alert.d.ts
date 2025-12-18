import type { ReactNode } from "react";
export type AlertVariant = "info" | "success" | "warning" | "error";
interface AlertProps {
    children: ReactNode;
    variant?: AlertVariant;
    icon?: string;
    showIcon?: boolean;
    title?: string;
    className?: string;
}
export declare function Alert({ children, variant, icon, showIcon, title, className, }: AlertProps): import("react/jsx-runtime").JSX.Element;
export default Alert;
//# sourceMappingURL=ui-alert.d.ts.map