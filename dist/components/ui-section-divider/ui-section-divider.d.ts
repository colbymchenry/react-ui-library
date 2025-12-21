import type { HTMLAttributes } from "react";
interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    lineClassName?: string;
    lineDarkClassName?: string;
    titleClassName?: string;
}
export declare function SectionDivider({ title, lineClassName, lineDarkClassName, titleClassName, className, ...props }: SectionDividerProps): import("react/jsx-runtime").JSX.Element;
export default SectionDivider;
//# sourceMappingURL=ui-section-divider.d.ts.map