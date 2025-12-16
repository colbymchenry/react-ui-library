import type { ComponentPropsWithoutRef } from "react";
export type MaterialIconVariant = "outlined" | "filled";
interface MaterialIconProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
    name: string;
    variant?: MaterialIconVariant;
}
export declare function MaterialIcon({ name, variant, className, ...props }: MaterialIconProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=material-icon.d.ts.map