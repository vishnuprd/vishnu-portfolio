"use client";

import { motion } from "framer-motion";

const lines: { indent: number; tokens: [string, string][] }[] = [
  { indent: 0, tokens: [["import", "kw"], [" { NextApiHandler } ", "txt"], ["from", "kw"], [" 'next'", "str"]] },
  { indent: 0, tokens: [["const", "kw"], [" handler", "fn"], [": NextApiHandler = ", "txt"], ["async", "kw"], [" (req, res) => {", "txt"]] },
  { indent: 1, tokens: [["const", "kw"], [" user = ", "txt"], ["await", "kw"], [" auth(req)", "txt"]] },
  { indent: 1, tokens: [["if", "kw"], [" (!user) ", "txt"], ["return", "kw"], [" res.status(", "txt"], ["401", "num"], [")", "txt"]] },
  { indent: 1, tokens: [["const", "kw"], [" data = ", "txt"], ["await", "kw"], [" db.query(", "txt"], ["cached", "fn"], [")", "txt"]] },
  { indent: 1, tokens: [["return", "kw"], [" res.json({ ", "txt"], ["ok", "prop"], [": ", "txt"], ["true", "num"], [", data })", "txt"]] },
  { indent: 0, tokens: [["}", "txt"]] },
];

const color: Record<string, string> = {
  kw: "text-violet-400",
  fn: "text-sky-300",
  str: "text-amber-300",
  num: "text-emerald-400",
  prop: "text-fuchsia-300",
  txt: "text-white/70",
};

export function CodeScene() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl border-white/10 p-1.5 shadow-card">
      {/* gradient border glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-500/20 via-transparent to-violet-500/20" />

      {/* window bar */}
      <div className="flex items-center gap-2 rounded-t-2xl bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-white/60">
          api/handler.ts
        </span>
      </div>

      {/* code */}
      <div className="rounded-b-2xl bg-black/40 p-5 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
            className="flex"
          >
            <span className="mr-4 select-none text-white/20">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
              {line.tokens.map(([t, c], j) => (
                <span key={j} className={color[c]}>
                  {t}
                </span>
              ))}
            </span>
          </motion.div>
        ))}

        {/* live pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-[11px] text-white/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Deployed · 200ms · edge · 99.9% uptime
        </motion.div>
      </div>
    </div>
  );
}
