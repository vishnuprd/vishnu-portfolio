"use client";

import { useEffect } from "react";
import { RotateCw, Home } from "lucide-react";

/**
 * Route error boundary. Catches render/data errors in the segment (e.g. a
 * failed Supabase fetch) and offers recovery instead of a white screen.
 * `reset()` re-renders the segment; the Home link is the hard fallback.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for logging/observability; a real deploy would forward to Sentry.
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6">
      <div className="w-full max-w-md rounded-3xl glass-strong p-8 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-500/15 text-red-400">
          <RotateCw className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          An unexpected error interrupted this page. You can try again, or head
          back to the home page.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[11px] text-white/60">
            Ref: {error.digest}
          </p>
        )}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <RotateCw className="h-4 w-4" /> Try again
          </button>
          <a
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
          >
            <Home className="h-4 w-4" /> Go home
          </a>
        </div>
      </div>
    </div>
  );
}
