/**
 * Route-level loading UI — shown while a server component (e.g. the Supabase
 * content fetch) is in flight. Mirrors the Preloader's brand mark so the
 * transition feels intentional rather than a flash of empty page.
 */
export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950">
      <div className="flex flex-col items-center gap-6" role="status" aria-label="Loading">
        <div className="relative grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full border border-sky-400/40" />
          <span className="grid h-14 w-14 animate-pulse place-items-center rounded-2xl bg-accent-br font-mono text-xl font-bold text-white shadow-glow">
            VP
          </span>
        </div>
        <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full w-1/3 animate-loadingbar rounded-full bg-accent" />
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
