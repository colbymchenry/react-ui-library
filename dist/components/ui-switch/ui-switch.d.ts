import type { InputHTMLAttributes, ReactNode } from "react";
interface FormikLike {
    values: Record<string, unknown>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    children?: ReactNode;
    formik?: FormikLike;
    error?: string;
    containerClassName?: string;
    trackClassName?: string;
    knobClassName?: string;
}
export declare function Switch({ children, formik, name, error, checked, onChange, onBlur, disabled, containerClassName, trackClassName, knobClassName, className, ...props }: SwitchProps): import("react/jsx-runtime").JSX.Element;
export default Switch;
//# sourceMappingURL=ui-switch.d.ts.map