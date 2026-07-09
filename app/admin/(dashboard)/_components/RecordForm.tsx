"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Check, AlertCircle } from "lucide-react";
import type { Field, SectionKind } from "@/lib/admin/config";
import { saveRecord } from "@/app/admin/actions";
import {
  TagsInput,
  ListInput,
  MetricsInput,
  IconPicker,
  AccentInput,
  ImageInput,
} from "./Fields";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-sky-400/60";

type Values = Record<string, unknown>;

function initValue(field: Field, existing: unknown): unknown {
  if (existing !== undefined && existing !== null) return existing;
  switch (field.type) {
    case "tags":
    case "list":
    case "metrics":
      return [];
    case "boolean":
      return false;
    case "number":
      return 0;
    default:
      return "";
  }
}

export function RecordForm({
  sectionKey,
  kind,
  fields,
  id,
  initial,
}: {
  sectionKey: string;
  kind: SectionKind;
  fields: Field[];
  id: string | null;
  initial: Values;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => {
    const v: Values = {};
    for (const f of fields) v[f.name] = initValue(f, initial[f.name]);
    if (kind === "collection")
      v.sort_order =
        typeof initial.sort_order === "number" ? initial.sort_order : 0;
    return v;
  });
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  function set(name: string, val: unknown) {
    setValues((prev) => ({ ...prev, [name]: val }));
    setState("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    setError(null);

    // Coerce numbers.
    const payload: Values = { ...values };
    for (const f of fields) {
      if (f.type === "number") payload[f.name] = Number(payload[f.name]) || 0;
    }
    if (kind === "collection")
      payload.sort_order = Number(payload.sort_order) || 0;

    const res = await saveRecord(sectionKey, id, payload);
    if (res.ok) {
      setState("saved");
      router.refresh();
      if (kind === "collection" && !id) router.push(`/admin/${sectionKey}`);
    } else {
      setState("error");
      setError(res.error ?? "Save failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            {f.label}
          </label>

          {f.type === "text" && (
            <input
              value={String(values[f.name] ?? "")}
              placeholder={f.placeholder}
              onChange={(e) => set(f.name, e.target.value)}
              className={inputCls}
            />
          )}

          {f.type === "textarea" && (
            <textarea
              value={String(values[f.name] ?? "")}
              rows={f.rows ?? 4}
              placeholder={f.placeholder}
              onChange={(e) => set(f.name, e.target.value)}
              className={`${inputCls} resize-y ${
                f.mono ? "font-mono text-[13px] leading-relaxed" : ""
              }`}
            />
          )}

          {f.type === "number" && (
            <input
              type="number"
              value={Number(values[f.name] ?? 0)}
              onChange={(e) => set(f.name, e.target.value)}
              className={inputCls}
            />
          )}

          {f.type === "boolean" && (
            <button
              type="button"
              onClick={() => set(f.name, !values[f.name])}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                values[f.name] ? "bg-emerald-500" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  values[f.name] ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
          )}

          {f.type === "tags" && (
            <TagsInput
              value={(values[f.name] as string[]) ?? []}
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.type === "list" && (
            <ListInput
              value={(values[f.name] as string[]) ?? []}
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.type === "metrics" && (
            <MetricsInput
              value={
                (values[f.name] as { label: string; value: string }[]) ?? []
              }
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.type === "icon" && (
            <IconPicker
              value={String(values[f.name] ?? "")}
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.type === "accent" && (
            <AccentInput
              value={String(values[f.name] ?? "")}
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.type === "image" && (
            <ImageInput
              value={String(values[f.name] ?? "")}
              onChange={(v) => set(f.name, v)}
            />
          )}

          {f.help && <p className="mt-1 text-xs text-white/60">{f.help}</p>}
        </div>
      ))}

      {kind === "collection" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            Display order
          </label>
          <input
            type="number"
            value={Number(values.sort_order ?? 0)}
            onChange={(e) => set("sort_order", e.target.value)}
            className={`${inputCls} max-w-[120px]`}
          />
          <p className="mt-1 text-xs text-white/60">
            Lower numbers appear first.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-white/10 pt-5">
        <button
          type="submit"
          disabled={state === "saving"}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {state === "saving" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "saved" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {state === "saved" ? "Saved" : "Save changes"}
        </button>
        {error && (
          <span className="flex items-center gap-1.5 text-sm text-red-300">
            <AlertCircle className="h-4 w-4" /> {error}
          </span>
        )}
      </div>
    </form>
  );
}
