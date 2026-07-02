"use client";

import { useState } from "react";
import { X, Plus, Upload, Loader2 } from "lucide-react";
import { iconNames, getIcon } from "@/lib/icons";
import { ACCENT_SUGGESTIONS } from "@/lib/admin/config";
import { uploadFile } from "@/app/admin/actions";

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-sky-400/60";

/* ---------------- Tags (chips) ---------------- */
export function TagsInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const parts = draft
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {value.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2.5 py-1 text-xs text-white/80"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
                className="text-white/40 hover:text-red-300"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder="Type and press Enter (or paste comma-separated)"
        className="w-full bg-transparent px-1.5 py-1 text-sm text-white outline-none placeholder:text-white/30"
      />
    </div>
  );
}

/* ---------------- List (multiline rows) ---------------- */
export function ListInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={item}
            rows={2}
            onChange={(e) =>
              onChange(value.map((v, j) => (j === i ? e.target.value : v)))
            }
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="shrink-0 rounded-lg border border-white/10 px-2 text-white/40 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ""])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/60 hover:border-white/30 hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" /> Add item
      </button>
    </div>
  );
}

/* ---------------- Metrics (label/value pairs) ---------------- */
type Metric = { label: string; value: string };
export function MetricsInput({
  value,
  onChange,
}: {
  value: Metric[];
  onChange: (v: Metric[]) => void;
}) {
  return (
    <div className="space-y-2">
      {value.map((m, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={m.label}
            placeholder="Label"
            onChange={(e) =>
              onChange(
                value.map((v, j) =>
                  j === i ? { ...v, label: e.target.value } : v,
                ),
              )
            }
            className={inputCls}
          />
          <input
            value={m.value}
            placeholder="Value"
            onChange={(e) =>
              onChange(
                value.map((v, j) =>
                  j === i ? { ...v, value: e.target.value } : v,
                ),
              )
            }
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="shrink-0 rounded-lg border border-white/10 px-2 text-white/40 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { label: "", value: "" }])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/60 hover:border-white/30 hover:text-white"
      >
        <Plus className="h-3.5 w-3.5" /> Add metric
      </button>
    </div>
  );
}

/* ---------------- Icon picker ---------------- */
export function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const Icon = getIcon(value);
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-sky-300">
        <Icon className="h-5 w-5" />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {!iconNames.includes(value) && value && (
          <option value={value}>{value}</option>
        )}
        {iconNames.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- Accent gradient ---------------- */
export function AccentInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${value}`}
        />
        <input
          list="accent-options"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
          placeholder="from-sky-400 to-blue-600"
        />
      </div>
      <datalist id="accent-options">
        {ACCENT_SUGGESTIONS.map((a) => (
          <option key={a} value={a} />
        ))}
      </datalist>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ACCENT_SUGGESTIONS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onChange(a)}
            className={`h-6 w-6 rounded-md bg-gradient-to-br ${a} ring-offset-2 ring-offset-[#04050a] ${
              value === a ? "ring-2 ring-white" : ""
            }`}
            title={a}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Image / file upload ---------------- */
export function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadFile(fd);
    setUploading(false);
    if (res.ok && res.url) onChange(res.url);
    else setError(res.error ?? "Upload failed");
  }

  const isImage = /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(value);

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload a file"
          className={inputCls}
        />
        <label className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-white/70 hover:bg-white/[0.06]">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload
          <input
            type="file"
            className="hidden"
            onChange={onFile}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
      {value && isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="mt-2 h-20 rounded-lg border border-white/10 object-cover"
        />
      )}
      {value && !isImage && (
        <p className="mt-1.5 truncate text-xs text-white/40">{value}</p>
      )}
    </div>
  );
}
