import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-sm text-slate-500">
        We couldn&apos;t find that page.
      </p>
      <Link
        href="/"
        className="text-sm text-[var(--color-brand-600)] hover:underline"
      >
        Back home
      </Link>
    </div>
  );
}
