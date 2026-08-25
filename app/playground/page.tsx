"use client";

import { useRef, useState } from "react";
import Modal from "@/playground/Modal";
import Tabs from "@/playground/Tabs";
import Disclosure from "@/playground/Disclosure";

export default function PlaygroundPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Accessible Component Playground
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Three components built from scratch against the ARIA Authoring
          Practices patterns. Try each one with keyboard only (Tab, Shift+Tab,
          Escape, arrow keys).
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Modal dialog</h2>
        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-[var(--color-brand-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-brand-700)]"
        >
          Open modal
        </button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example modal"
        >
          <p className="text-sm text-slate-600">
            Focus is trapped in here. Try Tab and Shift+Tab — it should never
            reach the page behind this dialog. Press Escape to close; focus
            should land back on the &quot;Open modal&quot; button.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-md bg-[var(--color-brand-600)] px-3 py-1.5 text-sm text-white"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tabs</h2>
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Tabs
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <p>
                    Use ArrowLeft/ArrowRight to move between tabs — focus and
                    selection move together. Home/End jump to the first/last
                    tab.
                  </p>
                ),
              },
              {
                id: "keyboard",
                label: "Keyboard",
                content: (
                  <p>
                    Tab moves focus out of the tablist and into this panel,
                    not to the next tab — that&apos;s the part people usually
                    get wrong.
                  </p>
                ),
              },
              {
                id: "aria",
                label: "ARIA",
                content: (
                  <p>
                    Each tab has <code>aria-controls</code> pointing at its
                    panel; each panel has <code>aria-labelledby</code>
                    pointing back at its tab.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Disclosure</h2>
        <div className="space-y-2">
          <Disclosure summary="What is a disclosure widget?">
            A button that shows or hides a section of content. The simplest
            of the three — a native button gives keyboard support for free.
          </Disclosure>
          <Disclosure summary="Why not use <details>/<summary>?">
            <code>&lt;details&gt;</code> is a perfectly valid native
            alternative. This version exists to practice the manual
            aria-expanded / aria-controls wiring by hand.
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
