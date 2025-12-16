interface DropdownProps {
    open: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    className?: string;
    matchTriggerWidth?: boolean;
}
export default function Dropdown({ open, onClose, anchorRef, children, className, matchTriggerWidth, }: DropdownProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=ui-dropdown.d.ts.map