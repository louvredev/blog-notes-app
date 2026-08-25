import Link from "next/link";
import { getNotes } from "@/lib/notes";

// Server Component (default) — fetches data on the server, no client JS shipped.
export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <p className="mt-1 text-sm text-slate-500">
          {notes.length} note{notes.length === 1 ? "" : "s"}, newest first.
        </p>
      </div>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-sm"
          >
            <Link href={`/notes/${note.id}`} className="group">
              <h2 className="text-lg font-semibold group-hover:text-[var(--color-brand-600)]">
                {note.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{note.excerpt}</p>
              <p className="mt-3 text-xs text-slate-400">
                {note.author} · {note.createdAt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
