"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DownloadCloud, Loader2, Check, AlertCircle } from "lucide-react";
import { seedDefaults } from "@/app/admin/actions";

export function SeedButton() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function run() {
    if (
      !confirm(
        "Import starter content? This REPLACES all rows in every table with the built-in defaults from your original site. Use it once to populate an empty database.",
      )
    )
      return;

    setState("loading");
    setError(null);
    const res = await seedDefaults();
    if (res.ok) {
      setState("done");
      router.refresh();
    } else {
      setState("error");
      setError(res.error ?? "Something went wrong");
    }
  }

  return (
    <div>
      <button
        onClick={run}
        disabled={state === "loading"}
        className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.1] disabled:opacity-60"
      >
        {state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <DownloadCloud className="h-4 w-4" />
        )}
        {state === "done" ? "Imported!" : "Import starter content"}
      </button>
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}
