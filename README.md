# Blog / Notes App — Foundations

A small Next.js (App Router) blog/notes app scaffolded as the **Foundations**
phase of the project. Every screen from the spec exists as a routed page,
Server Components are the default, and the app is built to deploy from
commit one.

## Routes

| Route            | Type              | Purpose                              |
|-------------------|-------------------|---------------------------------------|
| `/`                | Server Component | List all notes                        |
| `/notes/[id]`      | Server Component | Note detail (statically pre-rendered) |
| `/notes/new`       | Client Component | Form to draft a new note (no persistence yet) |
| `/about`           | Server Component | About page                            |
| `/health`          | Server Component | Live fetch from GitHub API, no-store  |

`components/Nav.tsx` is the only other Client Component — it needs
`useState` for the mobile menu toggle.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` for local dev. `.env.local` is
git-ignored — never commit real secrets. Add the same keys in
**Vercel → Project Settings → Environment Variables** for each environment
(Production / Preview / Development).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset auto-detects as Next.js — no config needed.
4. Every push (including PR branches) gets its own preview URL automatically.
5. Add any env vars from `.env.example` under Project Settings before they're
   needed by a feature.

## Data layer

`lib/notes.ts` currently returns static in-memory data behind an async
function, so it already looks like a real fetch call. Swapping in a real
database later (Postgres, Supabase, etc.) means only this file changes —
no page component needs to be touched.
# blog-notes-app
