import type { HTMLAttributes, ReactNode } from "react";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export default function Card({ className, children, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-card.d.ts.map