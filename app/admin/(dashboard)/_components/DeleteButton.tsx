"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";

export function DeleteButton({
  sectionKey,
  id,
  label,
}: {
  sectionKey: string;
  id: string;
  label: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    setLoading(true);
    const res = await deleteRecord(sectionKey, id);
    if (res.ok) router.refresh();
    else {
      setLoading(false);
      alert(res.error ?? "Delete failed");
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
      aria-label="Delete"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}
