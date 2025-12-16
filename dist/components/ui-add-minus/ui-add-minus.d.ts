import { FormikProps } from "formik";
type BaseAddMinusProps = {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
};
type WithFormik = BaseAddMinusProps & {
    formik: FormikProps<any>;
    name: string;
    value?: never;
    onChange?: never;
};
type WithoutFormik = BaseAddMinusProps & {
    formik?: undefined;
    name?: string;
    value: number;
    onChange: (value: number) => void;
};
type AddMinusProps = WithFormik | WithoutFormik;
export default function AddMinus(props: AddMinusProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-add-minus.d.ts.map