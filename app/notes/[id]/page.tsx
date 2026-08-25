import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/lib/notes";

// Pre-render known note pages at build time; still works for unknown ids via SSR.
export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ id: note.id }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const note = await getNote(id);

  if (!note) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <Link
        href="/"
        className="text-sm text-[var(--color-brand-600)] hover:underline"
      >
        ← Back to all notes
      </Link>

      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h1 className="text-2xl font-bold tracking-tight">{note.title}</h1>
        <p className="mt-1 text-xs text-slate-400">
          {note.author} · {note.createdAt}
        </p>
        <p className="mt-4 leading-relaxed text-slate-700">{note.body}</p>
      </div>
    </article>
  );
}
