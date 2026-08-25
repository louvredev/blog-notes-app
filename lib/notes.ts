export type Note = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  createdAt: string; // ISO date
};

// In-memory mock data. Swap this out for a real DB (Postgres, Supabase, etc.)
// in a later phase — the page components below don't need to change shape,
// only this module does.
const NOTES: Note[] = [
  {
    id: "welcome-to-the-blog",
    title: "Welcome to the blog",
    excerpt: "The first post. Setting the stage for everything else.",
    body: "This is the first note in the app. Every note lives at /notes/[id] and is rendered as a Server Component, so this content is fetched and rendered on the server before it ever reaches the browser.",
    author: "You",
    createdAt: "2026-08-01",
  },
  {
    id: "why-deploy-on-day-one",
    title: "Why deploy on day one",
    excerpt: "Shipping early keeps the feedback loop short.",
    body: "Deploying from commit one means every change is checked against a real build, on a real URL, instead of piling up untested work. Small, frequent deploys catch config and environment issues early, when they're cheap to fix.",
    author: "You",
    createdAt: "2026-08-05",
  },
  {
    id: "server-vs-client-components",
    title: "Server vs Client Components",
    excerpt: "Default to server. Opt into client only when you need it.",
    body: "Server Components render on the server and ship no JS to the browser for that component. Client Components (marked with \"use client\") are needed for state, effects, and browser-only APIs — like the mobile nav toggle in this app.",
    author: "You",
    createdAt: "2026-08-10",
  },
];

// Simulated network latency so this behaves like a real async data source.
function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getNotes(): Promise<Note[]> {
  return delay(
    [...NOTES].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );
}

export async function getNote(id: string): Promise<Note | undefined> {
  return delay(NOTES.find((note) => note.id === id));
}
