"use client";

import { cx } from "../../lib/cx";
import { useEffect, useRef } from "react";
import { MaterialIcon } from "../material-icon/material-icon";

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

/**
 * Dialog Component
 *
 * A reusable dialog/modal component using the native HTML dialog element.
 * Features fixed header and footer with scrollable content area.
 *
 * Structure:
 * - Fixed Header: Title, subtitle, and close button (always visible)
 * - Scrollable Content: Main dialog content that scrolls independently
 * - Fixed Footer: Action buttons and controls (always visible)
 *
 * Design Principles:
 * - Single Responsibility: Handles only dialog presentation and behavior
 * - Open/Closed: Open for extension via children and footer props
 * - Interface Segregation: Clean, focused API
 *
 * @example
 * <Dialog
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Subscription Details"
 *   subtitle="Costa Rica Coffee, Original, Tarrazu"
 *   closedBy="any"
 *   footer={
 *     <>
 *       <Button variant="secondary" onClick={onClose}>Close</Button>
 *       <Button variant="primary" onClick={onSave}>Save Changes</Button>
 *     </>
 *   }
 * >
 *   <div>Your scrollable content here</div>
 * </Dialog>
 */
export default function Dialog({
	title,
	subtitle,
	className,
	description,
	open,
	onClose,
	closedBy,
	children,
	footer,
	showCloseButton = true,
}: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	/**
	 * Handle dialog open/close state changes
	 * Opens modal when open prop is true, closes when false
	 */
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) {
				dialog.showModal();
			}
		} else {
			if (dialog.open) {
				dialog.close();
			}
		}
	}, [open]);

	/**
	 * Track if the close was initiated by backdrop click
	 * The native dialog element doesn't distinguish between close methods,
	 * so we track clicks on the dialog element itself
	 */
	const backdropClickRef = useRef(false);
	/**
	 * Track if close was handled by cancel event (ESC key)
	 * Prevents double-handling when both cancel and close events fire
	 */
	const handledByCancelRef = useRef(false);
	/**
	 * Track if we're currently processing a close event
	 * Prevents re-entrancy and infinite loops from programmatic closes
	 */
	const isClosingRef = useRef(false);

	/**
	 * Handle clicks on the dialog element (backdrop)
	 */
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClick = (event: MouseEvent) => {
			// If click target is the dialog element itself (not a child), it's a backdrop click
			if (event.target === dialog) {
				backdropClickRef.current = true;
			}
		};

		dialog.addEventListener("click", handleClick);

		return () => {
			dialog.removeEventListener("click", handleClick);
		};
	}, []);

	/**
	 * Handle cancel event (ESC key)
	 * Respects closedBy prop and prevents default if closing is not allowed
	 */
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleCancel = (event: Event) => {
			if (closedBy === "none") {
				// Prevent ESC from closing
				event.preventDefault();
				handledByCancelRef.current = false;
			} else {
				// Allow ESC to close for "any" and "closerequest"
				handledByCancelRef.current = true;
				// onClose will be called by the close handler
			}
		};

		dialog.addEventListener("cancel", handleCancel);

		return () => {
			dialog.removeEventListener("cancel", handleCancel);
		};
	}, [closedBy]);

	/**
	 * Handle dialog close events
	 * Listens for the native 'close' event and calls onClose callback
	 * Respects the closedBy prop to determine when to allow closing
	 */
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClose = () => {
			// Prevent re-entrancy - if we're already closing, don't process again
			if (isClosingRef.current) {
				return;
			}

			// Handle different close scenarios based on closedBy prop
			if (closedBy === "none") {
				// Prevent closing - reopen the dialog
				if (open) {
					// Only reopen if it was supposed to stay open
					dialog.showModal();
				}
				backdropClickRef.current = false;
				handledByCancelRef.current = false;
				return;
			}

			if (
				closedBy === "closerequest" &&
				backdropClickRef.current &&
				!handledByCancelRef.current
			) {
				// Only allow closing via explicit close request (ESC key or programmatic)
				// If user clicked backdrop, prevent closing
				if (open) {
					// Only reopen if state says it should be open
					dialog.showModal();
				}
				backdropClickRef.current = false;
				handledByCancelRef.current = false;
				return;
			}

			// closedBy === "any" or "closerequest" with non-backdrop close (ESC or programmatic)
			backdropClickRef.current = false;
			handledByCancelRef.current = false;

			// Only call onClose if the state is still open
			if (open) {
				isClosingRef.current = true;

				// Call onClose which will update parent state
				onClose();

				// Reset flag after a tick to allow the state update to propagate
				setTimeout(() => {
					isClosingRef.current = false;
				}, 0);
			}
		};

		dialog.addEventListener("close", handleClose);

		return () => {
			dialog.removeEventListener("close", handleClose);
		};
	}, [onClose, closedBy, open]);

	return (
		<dialog ref={dialogRef} className={cx("dialog", className)}>
			<div className="dialog-wrapper">
				{/* Fixed Header */}
				{(title || subtitle || showCloseButton) && (
					<div className="dialog-header">
						<div className="dialog-header-content">
							{title && <h2 className="dialog-title">{title}</h2>}
							{subtitle && (
								<p className="dialog-subtitle">{subtitle}</p>
							)}
						</div>
						{showCloseButton && (
							<button
								type="button"
								onClick={onClose}
								className="dialog-close-button"
								aria-label="Close dialog"
							>
								<MaterialIcon name="close" />
							</button>
						)}
					</div>
				)}

				{/* Scrollable Content */}
				<div className="dialog-body">
					{description && (
						<p className="dialog-description">{description}</p>
					)}
					{children}
				</div>

				{/* Fixed Footer */}
				{footer && <div className="dialog-footer">{footer}</div>}
			</div>
		</dialog>
	);
}
