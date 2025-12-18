import type { InputHTMLAttributes } from "react";
import { FormikProps } from "formik";
interface BaseCheckboxProps {
    label: string;
    description?: string;
    error?: string;
    containerClassName?: string;
}
type WithFormik = BaseCheckboxProps & {
    formik: FormikProps<any>;
    name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "checked" | "onChange" | "onBlur" | "type">;
type WithoutFormik = BaseCheckboxProps & {
    formik?: undefined;
    name?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
type CheckboxProps = WithFormik | WithoutFormik;
export declare function Checkbox(props: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export default Checkbox;
//# sourceMappingURL=ui-checkbox.d.ts.map