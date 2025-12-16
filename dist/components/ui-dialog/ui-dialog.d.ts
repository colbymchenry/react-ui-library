interface DialogProps {
    title?: string;
    subtitle?: string;
    description?: string;
    open: boolean;
    onClose: () => void;
    closedBy: "any" | "closerequest" | "none";
    children?: React.ReactNode;
    footer?: React.ReactNode;
    showCloseButton?: boolean;
    className?: string;
}
export default function Dialog({ title, subtitle, className, description, open, onClose, closedBy, children, footer, showCloseButton, }: DialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui-dialog.d.ts.map