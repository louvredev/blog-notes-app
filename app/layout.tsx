import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Notes — Blog",
  description: "A small blog/notes app scaffolded with Next.js App Router.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-[var(--color-surface-muted)] text-[var(--color-foreground)] font-sans">
        <div id="app-root" className="flex min-h-full flex-1 flex-col">
          <Nav />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-[var(--color-border)] py-6 text-center text-xs text-slate-400">
            Built with Next.js · Deployed on Vercel
          </footer>
        </div>
      </body>
    </html>
  );
}
