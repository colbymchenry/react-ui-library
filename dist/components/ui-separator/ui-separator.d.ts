import type { HTMLAttributes } from "react";
interface SeparatorStyleVars {
    lineColor?: string;
    labelBackground?: string;
    textColor?: string;
}
interface SeparatorProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
    label?: string;
    styleVars?: SeparatorStyleVars;
}
export declare function Separator({ label, styleVars, className, ...props }: SeparatorProps): import("react/jsx-runtime").JSX.Element;
export default Separator;
//# sourceMappingURL=ui-separator.d.ts.map