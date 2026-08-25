# NOTES.md — Hand-built vs. shadcn/ui

> **Note on how this was written:** the sandbox this repo was scaffolded in
> couldn't reach `ui.shadcn.com` (network is restricted to a small domain
> allowlist), so `npx shadcn@latest init` and `add dialog tabs` need to be
> run locally — see the README for the exact commands. The comparison below
> is based on shadcn/ui's actual published source, which wraps
> `@radix-ui/react-dialog` and `@radix-ui/react-tabs`. **Run the install
> yourself and diff the generated `components/ui/dialog.tsx` and
> `components/ui/tabs.tsx` against this list** — flag anything here that
> doesn't match what actually got generated.

## Setup

```bash
npx shadcn@latest init -d
npx shadcn@latest add dialog tabs
```

This adds `components/ui/dialog.tsx` and `components/ui/tabs.tsx` as
plain, readable source files (shadcn is "open code" — you get the actual
component, not a package import) built on top of Radix UI primitives.

## Gaps between `playground/Modal.tsx` and shadcn's `Dialog`

1. **My focus trap is a static snapshot; Radix's isn't.** My `Modal` calls
   `getFocusableElements()` once per Tab keypress, scanning whatever is in
   the DOM at that instant. If the dialog's content changes while it's open
   (an item gets added, a button becomes enabled), my trap adjusts fine on
   the *next* keypress — but Radix's `FocusScope` tracks focusable elements
   more robustly across dynamic content and edge cases like nested
   dialogs, which my version never had to handle because I only ever
   tested with static content.

2. **Radix enforces an accessible description; I don't enforce anything.**
   Radix's `DialogContent` expects a `DialogDescription` (or an explicit
   opt-out) and logs a dev-time console warning if one is missing. My
   `Modal` happily renders with only a title and no description, and
   nothing tells you that's a gap — you'd only find out by testing with a
   screen reader.

3. **Scroll lock isn't stack-safe in my version.** I lock `body` scroll on
   open and restore it in the effect cleanup on close. That's fine for one
   modal at a time, but if a second modal were ever opened on top of the
   first, closing the second would incorrectly re-enable scrolling while
   the first is still open. Radix ref-counts this internally so stacked
   dialogs don't step on each other.

4. **No exit animation path.** My `Modal` returns `null` immediately when
   `open` becomes `false` — the DOM node is just gone. Radix uses a
   `Presence` component that keeps content mounted during an exit
   transition, which is what makes shadcn's built-in fade/slide-out
   animations possible without extra plumbing.

## Gaps between `playground/Tabs.tsx` and shadcn's `Tabs`

5. **No RTL awareness.** My keyboard handler hardcodes `ArrowRight` = next
   tab, `ArrowLeft` = previous tab. Radix's `Tabs` reads the `dir` context
   and swaps that meaning automatically in a right-to-left layout. Mine
   would feel backwards to an RTL user and I'd have had no way to notice
   without specifically testing `dir="rtl"`.

6. **Only automatic activation, no option for manual.** The ARIA APG
   describes two valid patterns: automatic activation (arrow keys
   immediately switch the active tab — what I built) and manual activation
   (arrow keys move focus, but you need Enter/Space to actually select the
   tab, useful when switching tabs is expensive, e.g. fetches data). Radix
   exposes this as an `activationMode` prop; my implementation only
   supports the automatic variant, with no way to opt into manual without
   a rewrite.

## What I didn't miss

To be fair to the from-scratch versions: correct roles, `aria-selected`,
`aria-controls` / `aria-labelledby` pairing, roving `tabIndex`, Home/End
support, Escape-to-close, and focus-return-to-trigger were all things I
got right without a library. The gaps above are less about "basic
correctness" and more about edge cases and defensive guardrails that come
free with a library that's been hardened against real-world usage.
