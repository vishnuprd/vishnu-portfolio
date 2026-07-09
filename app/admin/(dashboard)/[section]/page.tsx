import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Pencil, AlertTriangle } from "lucide-react";
import { getSection } from "@/lib/admin/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { RecordForm } from "../_components/RecordForm";
import { DeleteButton } from "../_components/DeleteButton";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: key } = await params;
  const section = getSection(key);
  if (!section) notFound();

  if (!isSupabaseConfigured) {
    return <NotConfigured label={section.label} />;
  }

  const supabase = await createClient();

  /* ---------- Singleton: show the form directly ---------- */
  if (section.kind === "singleton") {
    const { data } = await supabase
      .from(section.table)
      .select("*")
      .eq("id", true)
      .maybeSingle();

    return (
      <div className="mx-auto max-w-2xl">
        <Header title={section.label} description={section.description} />
        <div className="mt-6">
          <RecordForm
            sectionKey={section.key}
            kind="singleton"
            fields={section.fields}
            id={null}
            initial={data ?? {}}
          />
        </div>
      </div>
    );
  }

  /* ---------- Collection: list of records ---------- */
  const { data: rows } = await supabase
    .from(section.table)
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <Header title={section.label} description={section.description} />
        <Link
          href={`/admin/${section.key}/new`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> New
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {(!rows || rows.length === 0) && (
          <p className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-white/60">
            No items yet. Click “New” to add one.
          </p>
        )}
        {rows?.map((row) => {
          const title = String(row[section.titleField ?? "id"] ?? "Untitled");
          const subtitle = section.subtitleField
            ? String(row[section.subtitleField] ?? "")
            : "";
          return (
            <Link
              key={row.id}
              href={`/admin/${section.key}/${row.id}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-white">{title}</h3>
                {subtitle && (
                  <p className="truncate text-xs text-white/60">{subtitle}</p>
                )}
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white/60 group-hover:text-white">
                <Pencil className="h-4 w-4" />
              </span>
              <DeleteButton
                sectionKey={section.key}
                id={String(row.id)}
                label={title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Header({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="mt-1 text-sm text-white/65">{description}</p>
    </div>
  );
}

function NotConfigured({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-white">{label}</h1>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <p>
          Connect Supabase (add keys to <code>.env.local</code> and run the
          schema SQL) to edit this section.
        </p>
      </div>
    </div>
  );
}
