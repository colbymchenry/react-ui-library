import type { InputHTMLAttributes } from "react";
import { FormikProps } from "formik";
export interface RadioOption {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
}
interface BaseRadioGroupProps {
    label?: string;
    options: RadioOption[];
    direction?: "horizontal" | "vertical";
    error?: string;
    containerClassName?: string;
}
type WithFormik = BaseRadioGroupProps & {
    formik: FormikProps<any>;
    name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "value" | "onChange" | "onBlur" | "type">;
type WithoutFormik = BaseRadioGroupProps & {
    formik?: undefined;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
type RadioGroupProps = WithFormik | WithoutFormik;
export declare function RadioGroup(props: RadioGroupProps): import("react/jsx-runtime").JSX.Element;
export default RadioGroup;
//# sourceMappingURL=ui-radio.d.ts.map