import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { SECTIONS } from "@/lib/admin/config";
import { getIcon } from "@/lib/icons";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { SeedButton } from "./_components/SeedButton";

async function getCounts() {
  const counts: Record<string, number> = {};
  if (!isSupabaseConfigured) return counts;
  try {
    const supabase = await createClient();
    await Promise.all(
      SECTIONS.filter((s) => s.kind === "collection").map(async (s) => {
        const { count } = await supabase
          .from(s.table)
          .select("*", { count: "exact", head: true });
        counts[s.key] = count ?? 0;
      }),
    );
  } catch {
    /* ignore */
  }
  return counts;
}

export default async function AdminHome() {
  const counts = await getCounts();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-white/65">
        Manage every section of your portfolio. Changes go live immediately.
      </p>

      {!isSupabaseConfigured && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Supabase not configured yet</p>
            <p className="mt-1 text-amber-200/80">
              Add <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>,
              run the SQL in <code>supabase/schema.sql</code>, then restart the
              dev server. Until then the public site shows your built-in default
              content.
            </p>
          </div>
        </div>
      )}

      {isSupabaseConfigured && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-sm font-semibold">First time here?</h2>
          <p className="mt-1 text-sm text-white/65">
            Populate the database with your existing content, then edit anything
            below.
          </p>
          <div className="mt-3">
            <SeedButton />
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SECTIONS.map((s) => {
          const Icon = getIcon(s.icon);
          return (
            <Link
              key={s.key}
              href={`/admin/${s.key}`}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-sky-300">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{s.label}</h3>
                  {s.kind === "collection" && counts[s.key] != null && (
                    <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] text-white/65">
                      {counts[s.key]}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-white/60">
                  {s.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/60 transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
