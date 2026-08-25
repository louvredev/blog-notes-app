type RepoInfo = {
  full_name: string;
  stargazers_count: number;
  open_issues_count: number;
};

async function getRepoHealth(): Promise<{ ok: boolean; data?: RepoInfo; error?: string }> {
  try {
    const res = await fetch("https://api.github.com/repos/vercel/next.js", {
      // Always hit the network so this page proves live data fetching works
      // on every request, rather than serving a cached build-time snapshot.
      cache: "no-store",
    });

    if (!res.ok) {
      return { ok: false, error: `Upstream responded with ${res.status}` };
    }

    const data = (await res.json()) as RepoInfo;
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export default async function HealthPage() {
  const result = await getRepoHealth();
  const checkedAt = new Date().toISOString();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Health Check</h1>

      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              result.ok ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <span className="font-medium">
            {result.ok ? "Live data fetch succeeded" : "Live data fetch failed"}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-400">Checked at {checkedAt}</p>

        {result.ok && result.data ? (
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-400">Source repo</dt>
              <dd className="font-medium">{result.data.full_name}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Stars</dt>
              <dd className="font-medium">
                {result.data.stargazers_count.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">Open issues</dt>
              <dd className="font-medium">{result.data.open_issues_count}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-red-600">{result.error}</p>
        )}
      </div>

      <p className="text-xs text-slate-400">
        This page fetches live data from the GitHub API on every request
        (Server Component, <code>cache: &quot;no-store&quot;</code>) to prove
        the deployed environment can reach the network and render real data.
      </p>
    </div>
  );
}
