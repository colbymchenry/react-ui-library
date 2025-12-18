import type { HTMLAttributes } from "react";
interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    lineClassName?: string;
    labelBgClassName?: string;
    labelTextClassName?: string;
}
export declare function Separator({ label, lineClassName, labelBgClassName, labelTextClassName, className, ...props }: SeparatorProps): import("react/jsx-runtime").JSX.Element;
export default Separator;
//# sourceMappingURL=ui-separator.d.ts.map