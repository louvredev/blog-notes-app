"use client";

import { useState, FormEvent } from "react";

// Client Component: needs useState + form event handlers.
// No persistence yet (no DB wired up) — this is a placeholder that proves
// the form and validation flow works. Wiring it to real storage is a
// later-phase task.
export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
        <h1 className="text-xl font-semibold">Note captured ✅</h1>
        <p className="mt-2 text-sm text-slate-500">
          This is a placeholder confirmation — persistence isn&apos;t wired up
          yet. That comes in the Build phase.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setTitle("");
            setBody("");
          }}
          className="mt-4 rounded-md bg-[var(--color-brand-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-brand-700)]"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">New Note</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-500)]"
            placeholder="A short, clear title"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-500)]"
            placeholder="Write your note..."
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-[var(--color-brand-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-brand-700)]"
        >
          Save note
        </button>
      </form>
    </div>
  );
}
