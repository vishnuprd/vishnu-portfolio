import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

/**
 * 404 page — rendered for unmatched routes and for explicit `notFound()`
 * calls (e.g. an unknown blog slug).
 */
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6">
      <div className="w-full max-w-md text-center">
        <div className="text-gradient bg-gradient-animated text-7xl font-black tracking-tight sm:text-8xl">
          404
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link
            href="/#blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
