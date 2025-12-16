import { FormikProps } from "formik";
type WithFormik = {
    formik: FormikProps<any>;
    name: string;
    label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "onBlur">;
type WithoutFormik = {
    formik?: undefined;
    name?: string;
    label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
type InputProps = WithFormik | WithoutFormik;
export default function Input(props: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-input.d.ts.map