"use client";

import { cx } from "../../lib/cx";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
	open: boolean;
	onClose: () => void;
	anchorRef: React.RefObject<HTMLElement>;
	children: React.ReactNode;
	className?: string;
	matchTriggerWidth?: boolean;
}

/**
 * Dropdown Component
 * A positioned dialog acting as a dropdown menu
 */
export default function Dropdown({
	open,
	onClose,
	anchorRef,
	children,
	className,
	matchTriggerWidth = true,
}: DropdownProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [position, setPosition] = useState<{
		top: number;
		left: number;
		width: number;
	} | null>(null);

	// Update position when opening or when anchor/window changes
	useEffect(() => {
		if (!open || !anchorRef.current) return;

		const updatePosition = () => {
			if (!anchorRef.current) return;
			const rect = anchorRef.current.getBoundingClientRect();
			const dialog = dialogRef.current;

			// Viewport dimensions
			const vw = window.innerWidth;
			const vh = window.innerHeight;

			// Default position (below)
			let newTop = rect.bottom + 4; // 4px gap
			let newLeft = rect.left;
			const newWidth = rect.width;

			// Collision detection and adjustment
			if (dialog) {
				const dialogRect = dialog.getBoundingClientRect();

				// Only apply adjustment if dialog has dimensions (is rendered)
				if (dialogRect.height > 0 && dialogRect.width > 0) {
					const dialogHeight = dialogRect.height;
					const dialogWidth = dialogRect.width;

					// 1. Vertical Adjustment
					// Check if dropdown goes off the bottom of the screen
					if (newTop + dialogHeight > vh) {
						// Check if there is more space above
						const spaceAbove = rect.top - 4;
						const spaceBelow = vh - newTop;

						// If there is more space above, or if we strictly overflow bottom but fit above
						if (spaceAbove > spaceBelow) {
							// Position above the trigger
							newTop = rect.top - dialogHeight - 4;

							// Ensure we don't go off the top
							if (newTop < 4) newTop = 4;
						}
					}

					// 2. Horizontal Adjustment
					// Check if dropdown goes off the right of the screen
					if (newLeft + dialogWidth > vw) {
						// Shift left to fit content within viewport
						newLeft = vw - dialogWidth - 8; // 8px padding from edge

						// Ensure we don't go off the left
						if (newLeft < 4) newLeft = 4;
					}
				}
			}

			setPosition(prev => {
				// Only update if position has changed significantly to avoid infinite loops/performance issues
				if (
					prev &&
					Math.abs(prev.top - newTop) < 1 &&
					Math.abs(prev.left - newLeft) < 1 &&
					Math.abs(prev.width - newWidth) < 1
				) {
					return prev;
				}

				return {
					top: newTop,
					left: newLeft,
					width: newWidth,
				};
			});
		};

		// Initial update
		updatePosition();

		// Use requestAnimationFrame for smooth tracking of the anchor element
		// This handles layout shifts, animations, and scroll events more reliably
		let animationFrameId: number;
		const loop = () => {
			updatePosition();
			animationFrameId = requestAnimationFrame(loop);
		};
		loop();

		// Additional event listeners for immediate response
		window.addEventListener("resize", updatePosition);
		window.addEventListener("scroll", updatePosition, true);

		// Listen for visualViewport changes (mobile keyboard, pinch zoom)
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", updatePosition);
			window.visualViewport.addEventListener("scroll", updatePosition);
		}

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
			if (window.visualViewport) {
				window.visualViewport.removeEventListener(
					"resize",
					updatePosition
				);
				window.visualViewport.removeEventListener(
					"scroll",
					updatePosition
				);
			}
		};
	}, [open, anchorRef]);

	// Handle open/close of native dialog
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) {
				dialog.showModal();
				// We want a non-modal feel (click outside closes), but showModal gives us top-layer projection
				// To achieve "click outside to close", we can use the click handler on the dialog backdrop
			}
		} else {
			if (dialog.open) {
				dialog.close();
			}
		}
	}, [open, position]);

	// Handle closing when clicking outside (on the backdrop)
	// Note: The backdrop is the area outside the dialog content box.
	const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		// When using showModal(), the backdrop pseudo-element covers the entire screen.
		// Clicks on the backdrop are considered clicks on the dialog element itself.
		// We compare the click coordinates with the dialog's bounding rect.
		const rect = dialog.getBoundingClientRect();

		// Check if click is inside the dialog
		const isInDialog =
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom;

		if (!isInDialog) {
			e.stopPropagation(); // Prevent event bubbling to avoid re-triggering parent handlers
			onClose();
		}
	};

	if (!position) return null;

	return (
		<dialog
			ref={dialogRef}
			className={cx("dropdown-dialog", className)}
			onClick={handleDialogClick}
			onClose={onClose}
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
				// When matchTriggerWidth is true, set explicit width
				// When false, let CSS classes control sizing (width: auto)
				width: matchTriggerWidth ? `${position.width}px` : "auto",
				// Override default dialog centering
				margin: 0,
			}}
		>
			<div className="dropdown-content">{children}</div>
		</dialog>
	);
}
