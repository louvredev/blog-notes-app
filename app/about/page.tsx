export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">About</h1>
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm leading-relaxed text-slate-600">
        <p>
          This is a small notes/blog app scaffolded as the Foundations phase
          of the project. It ships on day one so every future commit lands on
          a live preview URL instead of sitting unreviewed until the end.
        </p>
      </div>
    </div>
  );
}
