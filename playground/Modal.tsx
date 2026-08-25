"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/**
 * Modal dialog, built from scratch against the W3C ARIA Authoring Practices
 * "Dialog (Modal)" pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * Requirements implemented:
 * - role="dialog" + aria-modal="true" + aria-labelledby pointing at the title
 * - Focus moves into the dialog when it opens
 * - Focus is trapped inside the dialog while it's open (Tab / Shift+Tab cycle)
 * - Escape closes the dialog
 * - Focus returns to the element that opened the dialog when it closes
 * - Content behind the dialog is marked inert so screen readers and
 *   sequential Tab navigation can't reach it while the dialog is open
 */

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => el.offsetParent !== null // skip hidden elements
  );
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previouslyFocusedEl = useRef<HTMLElement | null>(null);
  const mainRootRef = useRef<HTMLElement | null>(null);

  // On open: remember what had focus, move focus in, mark the rest of the
  // page inert. On close: restore both.
  useEffect(() => {
    if (!open) return;

    previouslyFocusedEl.current = document.activeElement as HTMLElement | null;

    const dialogEl = dialogRef.current;
    if (dialogEl) {
      const focusables = getFocusableElements(dialogEl);
      (focusables[0] ?? dialogEl).focus();
    }

    // Mark everything outside the dialog inert so background content isn't
    // reachable via Tab, screen reader virtual cursor, or accidental click.
    const root = document.getElementById("app-root");
    mainRootRef.current = root;
    root?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";

    return () => {
      root?.removeAttribute("inert");
      document.body.style.overflow = "";
      previouslyFocusedEl.current?.focus();
    };
  }, [open]);

  function handleKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    const focusables = getFocusableElements(dialogEl);
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    // Manual focus trap: wrap Tab/Shift+Tab at the dialog's edges instead of
    // letting focus escape into the (inert, but still worth guarding) page.
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
