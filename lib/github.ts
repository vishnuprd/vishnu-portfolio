import "server-only";

import { cache } from "react";
import type { GitHubStats, GitHubLanguage } from "@/lib/types";

export { nicePlus } from "@/lib/format";

/* ------------------------------------------------------------------ */
/*  Live GitHub stats via the GraphQL API.                            */
/*                                                                    */
/*  Needs a Personal Access Token in GITHUB_TOKEN (classic token with */
/*  `read:user` + `public_repo`, or a fine-grained token with         */
/*  read-only access). Without a token — or on any failure — this     */
/*  returns null and the UI falls back to its hand-tuned defaults, so */
/*  the page always renders.                                          */
/* ------------------------------------------------------------------ */

const GQL = `
  query ($login: String!) {
    user(login: $login) {
      pullRequests(states: MERGED) { totalCount }
      repositories(ownerAffiliations: OWNER, isFork: false) { totalCount }
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          weeks {
            contributionDays { contributionCount weekday }
          }
        }
      }
      topRepos: repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
        }
      }
    }
  }
`;

/** Bucket a day's contribution count into a 0–4 heat level. */
function toLevel(count: number, max: number): number {
  if (count <= 0 || max <= 0) return 0;
  const t = max / 4;
  if (count > t * 3) return 4;
  if (count > t * 2) return 3;
  if (count > t) return 2;
  return 1;
}

/** Longest run of consecutive days with at least one contribution. */
function longestStreak(days: { contributionCount: number }[]): number {
  let best = 0;
  let run = 0;
  for (const d of days) {
    if (d.contributionCount > 0) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 0;
    }
  }
  return best;
}

/** Aggregate per-repo language byte sizes into top-5 + "Other" shares. */
function aggregateLanguages(
  repos: { languages: { edges: { size: number; node: { name: string; color: string | null } }[] } }[],
): GitHubLanguage[] {
  const sizes = new Map<string, number>();
  const colors = new Map<string, string>();

  for (const repo of repos) {
    for (const edge of repo.languages?.edges ?? []) {
      const name = edge.node.name;
      sizes.set(name, (sizes.get(name) ?? 0) + edge.size);
      if (edge.node.color) colors.set(name, edge.node.color);
    }
  }

  const total = [...sizes.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const sorted = [...sizes.entries()].sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5).reduce((a, [, size]) => a + size, 0);

  const langs: GitHubLanguage[] = top.map(([name, size]) => ({
    name,
    pct: Math.round((size / total) * 100),
    color: colors.get(name) ?? "#8b8b8b",
  }));

  const restPct = Math.round((rest / total) * 100);
  if (restPct > 0) {
    langs.push({ name: "Other", pct: restPct, color: "#8b8b8b" });
  }

  // Drop anything that rounds to 0% so the bars stay meaningful.
  return langs.filter((l) => l.pct > 0);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchStats(login: string): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GQL, variables: { login } }),
    // Refresh at most hourly (matches the page's revalidate cadence).
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(`[github] API responded ${res.status}`);
    return null;
  }

  const json = await res.json();
  const user = json?.data?.user;
  if (!user) {
    console.error("[github] unexpected payload:", json?.errors ?? json);
    return null;
  }

  const weeksRaw: any[] =
    user.contributionsCollection?.contributionCalendar?.weeks ?? [];
  const allDays = weeksRaw.flatMap((w: any) => w.contributionDays ?? []);
  const max = allDays.reduce(
    (m: number, d: any) => Math.max(m, d.contributionCount),
    0,
  );

  // weeks × 7 heat levels; pad short leading/trailing weeks to a full column.
  const calendar: number[][] = weeksRaw.map((w: any) => {
    const col = new Array(7).fill(0);
    for (const d of w.contributionDays ?? []) {
      col[d.weekday] = toLevel(d.contributionCount, max);
    }
    return col;
  });

  return {
    githubUser: login,
    totalPRs: user.pullRequests?.totalCount ?? 0,
    commitsThisYear:
      user.contributionsCollection?.totalCommitContributions ?? 0,
    publicRepos: user.repositories?.totalCount ?? 0,
    longestStreak: longestStreak(allDays),
    calendar,
    languages: aggregateLanguages(user.topRepos?.nodes ?? []),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Fetch live GitHub stats for a user. Never throws — returns null on any
 * failure (no token, network error, rate limit) so callers can fall back
 * to defaults. Deduped per-request via React cache.
 */
export const getGitHubStats = cache(
  async (login: string): Promise<GitHubStats | null> => {
    try {
      return await fetchStats(login);
    } catch (err) {
      console.error("[github] falling back to defaults:", err);
      return null;
    }
  },
);
