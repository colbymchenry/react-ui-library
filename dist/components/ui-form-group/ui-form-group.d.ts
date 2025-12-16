import { FormikProps } from "formik";
import { ReactElement } from "react";
type OptionElement = ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
type SelectChildren = OptionElement | OptionElement[];
type InputWithFormik = {
    formik: FormikProps<any>;
    name: string;
    label?: string;
    children?: never;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "onBlur" | "children">;
type InputWithoutFormik = {
    formik?: undefined;
    name?: string;
    label?: string;
    children?: never;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;
type SelectWithFormik = {
    formik: FormikProps<any>;
    name: string;
    label?: string;
    children: SelectChildren;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "value" | "onChange" | "onBlur" | "children">;
type SelectWithoutFormik = {
    formik?: undefined;
    name?: string;
    label?: string;
    children: SelectChildren;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;
type FormGroupProps = InputWithFormik | InputWithoutFormik | SelectWithFormik | SelectWithoutFormik;
export default function FormGroup(props: FormGroupProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-form-group.d.ts.map