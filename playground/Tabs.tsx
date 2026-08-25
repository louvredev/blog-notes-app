"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

/**
 * Tabs, built from scratch against the W3C ARIA Authoring Practices "Tabs"
 * pattern (automatic activation variant):
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 *
 * Requirements implemented:
 * - tablist / tab / tabpanel roles, with aria-selected / aria-controls /
 *   aria-labelledby wiring each tab to its panel
 * - Roving tabindex: only the active tab is in the Tab sequence
 *   (tabIndex 0); inactive tabs are tabIndex -1 and reached via arrow keys
 * - ArrowLeft / ArrowRight move focus and activate the tab immediately
 *   (automatic activation)
 * - Home / End jump to the first / last tab
 * - Tab key leaves the tablist entirely and moves to the active panel
 */

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
};

export default function Tabs({ tabs, defaultTabId }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = tabs.findIndex((t) => t.id === activeId);

  function focusAndActivate(index: number) {
    const clamped = (index + tabs.length) % tabs.length; // wrap around
    const tab = tabs[clamped];
    setActiveId(tab.id);
    tabRefs.current[tab.id]?.focus();
  }

  function handleKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusAndActivate(activeIndex + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusAndActivate(activeIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAndActivate(0);
        break;
      case "End":
        e.preventDefault();
        focusAndActivate(tabs.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Example tabs" className="flex gap-1 border-b border-[var(--color-border)]">
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={handleKeyDown}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
                selected
                  ? "border-[var(--color-brand-600)] text-[var(--color-brand-600)]"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="p-4 text-sm text-slate-600"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
