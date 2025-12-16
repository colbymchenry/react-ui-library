import { FormikProps } from "formik";
type BaseDatePickerProps = {
    minDate?: Date;
    placeholder?: string;
    className?: string;
    label?: string;
};
type WithFormik = BaseDatePickerProps & {
    formik: FormikProps<any>;
    name: string;
    value?: never;
    onChange?: never;
};
type WithoutFormik = BaseDatePickerProps & {
    formik?: undefined;
    name?: string;
    value?: Date | string;
    onChange: (date: Date) => void;
};
type DatePickerProps = WithFormik | WithoutFormik;
export default function DatePicker(props: DatePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-date-picker.d.ts.map