import { FormikProps } from "formik";
type BasePhoneInputProps = {
    label?: string;
    placeholder?: string;
    className?: string;
    defaultCountry?: string;
};
type WithFormik = BasePhoneInputProps & {
    formik: FormikProps<any>;
    name: string;
    value?: never;
    onChange?: never;
};
type WithoutFormik = BasePhoneInputProps & {
    formik?: undefined;
    name?: string;
    value: string;
    onChange: (value: string) => void;
};
type PhoneInputProps = WithFormik | WithoutFormik;
declare function PhoneInput(props: PhoneInputProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof PhoneInput>;
export default _default;
//# sourceMappingURL=ui-phone-input.d.ts.map