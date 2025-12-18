import type { ReactNode } from "react";
import { FormikProps } from "formik";
interface BaseInputProps {
    label?: string;
    iconLeading?: ReactNode;
    iconTrailing?: ReactNode;
    error?: string;
    inputClassName?: string;
    containerClassName?: string;
}
type WithFormik = BaseInputProps & {
    formik: FormikProps<any>;
    name: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "onBlur">;
type WithoutFormik = BaseInputProps & {
    formik?: undefined;
    name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
type InputProps = WithFormik | WithoutFormik;
export default function Input(props: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-input.d.ts.map