"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Disclosure, built from scratch against the W3C ARIA Authoring Practices
 * "Disclosure (Show/Hide)" pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 *
 * Requirements implemented:
 * - A native <button> as the trigger, so Enter/Space toggling and focus
 *   styling come for free from the browser — no custom key handling needed
 * - aria-expanded reflects open/closed state
 * - aria-controls points at the id of the content region
 * - The content region is only present in the accessibility tree / tab
 *   order when expanded (uses `hidden`, not just visual hiding)
 */

type DisclosureProps = {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="rounded-md border border-[var(--color-border)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-[var(--color-surface-muted)]"
      >
        <span>{summary}</span>
        <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      <div id={contentId} hidden={!open} className="px-4 pb-4 text-sm text-slate-600">
        {children}
      </div>
    </div>
  );
}
