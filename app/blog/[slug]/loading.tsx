/**
 * Skeleton shown while a blog post loads. Shape mirrors the article header +
 * body so the layout doesn't jump when content arrives.
 */
export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 sm:px-8" aria-hidden>
      <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
      <div className="mt-6 h-10 w-3/4 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-3 h-10 w-1/2 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-6 flex gap-3">
        <div className="h-4 w-20 animate-pulse rounded-full bg-white/[0.07]" />
        <div className="h-4 w-16 animate-pulse rounded-full bg-white/[0.07]" />
      </div>
      <div className="mt-12 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded bg-white/[0.06]"
            style={{ width: `${[100, 96, 88, 92, 70, 100, 84, 60][i]}%` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading article…</span>
    </div>
  );
}
