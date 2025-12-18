import type { ReactNode, ReactElement } from "react";
import { FormikProps } from "formik";
type OptionElement = ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
type SelectChildren = OptionElement | OptionElement[];
type ElementVariant = "input" | "select" | "textarea";
interface BaseFormGroupProps {
    label?: string;
    as?: ElementVariant;
    iconLeading?: ReactNode;
    iconTrailing?: ReactNode;
    error?: string;
    fieldClassName?: string;
    containerClassName?: string;
    children?: SelectChildren;
}
type WithFormik = BaseFormGroupProps & {
    formik: FormikProps<any>;
    name: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement> & React.SelectHTMLAttributes<HTMLSelectElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "value" | "onChange" | "onBlur">;
type WithoutFormik = BaseFormGroupProps & {
    formik?: undefined;
    name?: string;
} & (React.InputHTMLAttributes<HTMLInputElement> | React.SelectHTMLAttributes<HTMLSelectElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>);
type FormGroupProps = WithFormik | WithoutFormik;
export default function FormGroup(props: FormGroupProps): import("react/jsx-runtime").JSX.Element;
export { default as Input } from "./ui-form-group";
//# sourceMappingURL=ui-form-group.d.ts.map