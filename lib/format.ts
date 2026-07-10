/** Shared, client-safe formatters (no server-only imports). */

/** Format a raw count into a compact "470+" / "1.2k+" style string. */
export function nicePlus(n: number): string {
  if (n >= 1000) return `${(Math.floor(n / 100) / 10).toFixed(1)}k+`;
  if (n >= 10) return `${Math.floor(n / 10) * 10}+`;
  return `${n}+`;
}
