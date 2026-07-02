import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSection } from "@/lib/admin/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { RecordForm } from "../../_components/RecordForm";

export default async function RecordEditPage({
  params,
}: {
  params: Promise<{ section: string; id: string }>;
}) {
  const { section: key, id } = await params;
  const section = getSection(key);
  if (!section) notFound();
  if (section.kind === "singleton") redirect(`/admin/${key}`);

  const isNew = id === "new";
  let initial: Record<string, unknown> = {};

  if (!isNew && isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from(section.table)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!data) notFound();
    initial = data;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/admin/${section.key}`}
        className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {section.label}
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-white">
        {isNew ? `New ${section.label}` : `Edit ${section.label}`}
      </h1>

      <div className="mt-6">
        <RecordForm
          sectionKey={section.key}
          kind="collection"
          fields={section.fields}
          id={isNew ? null : id}
          initial={initial}
        />
      </div>
    </div>
  );
}
