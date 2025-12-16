import { FormikProps } from "formik";
import { ReactElement } from "react";
type OptionElement = ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
type SelectChildren = OptionElement | OptionElement[];
type WithFormik = {
    formik: FormikProps<any>;
    name: string;
    label?: string;
    children: SelectChildren;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "value" | "onChange" | "onBlur" | "children">;
type WithoutFormik = {
    formik?: undefined;
    name?: string;
    label?: string;
    children: SelectChildren;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children">;
type SelectProps = WithFormik | WithoutFormik;
export default function Select(props: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-select.d.ts.map