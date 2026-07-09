"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DownloadCloud,
  Loader2,
  Check,
  AlertCircle,
  AlertTriangle,
  X,
} from "lucide-react";
import { seedDefaults } from "@/app/admin/actions";

export function SeedButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  // Close on Escape (unless a seed is in flight) and lock body scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state !== "loading") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, state]);

  function openDialog() {
    setError(null);
    setState("idle");
    setOpen(true);
  }

  async function confirmImport() {
    setState("loading");
    setError(null);
    const res = await seedDefaults();
    if (res.ok) {
      setState("done");
      setOpen(false);
      router.refresh();
    } else {
      setState("error");
      setError(res.error ?? "Something went wrong");
    }
  }

  return (
    <div>
      <button
        onClick={openDialog}
        className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]"
      >
        {state === "done" ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <DownloadCloud className="h-4 w-4" />
        )}
        {state === "done" ? "Imported!" : "Import starter content"}
      </button>

      {state === "error" && !open && error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="seed-title"
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => state !== "loading" && setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0d16] p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="seed-title"
                  className="text-lg font-bold text-white"
                >
                  Import starter content?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  This <strong className="font-semibold text-white/90">replaces
                  all rows</strong> in every table with the built-in defaults from
                  your original site — profile, projects, skills, and all blog
                  posts. Use it once to populate an empty database.
                </p>
              </div>
              <button
                onClick={() => state !== "loading" && setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-40"
                disabled={state === "loading"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {state === "error" && error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={state === "loading"}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={confirmImport}
                disabled={state === "loading"}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Importing…
                  </>
                ) : (
                  <>
                    <DownloadCloud className="h-4 w-4" /> Yes, import
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
