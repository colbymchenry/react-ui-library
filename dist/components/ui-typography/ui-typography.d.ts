import { ReactNode, ElementType } from "react";
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body-large" | "body" | "caption" | "micro" | "label";
interface TypographyProps {
    variant?: TypographyVariant;
    children: ReactNode;
    className?: string;
    as?: ElementType;
}
export declare function Typography({ variant, children, className, as, }: TypographyProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-typography.d.ts.map