import { FormikProps } from "formik";
export interface ComboboxOption {
    value: string;
    label: string;
    icon?: string;
    [key: string]: any;
}
type BaseComboboxProps = {
    options: ComboboxOption[];
    label?: string;
    placeholder?: string;
    className?: string;
    searchPlaceholder?: string;
    renderOption?: (option: ComboboxOption) => React.ReactNode;
    matchTriggerWidth?: boolean;
    error?: string;
    containerClassName?: string;
    dropdownClassName?: string;
};
type WithFormik = BaseComboboxProps & {
    formik: FormikProps<any>;
    name: string;
    value?: never;
    onChange?: never;
};
type WithoutFormik = BaseComboboxProps & {
    formik?: undefined;
    name?: string;
    value?: string;
    onChange: (value: string) => void;
};
type ComboboxProps = WithFormik | WithoutFormik;
declare function Combobox(props: ComboboxProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof Combobox>;
export default _default;
//# sourceMappingURL=ui-combobox.d.ts.map