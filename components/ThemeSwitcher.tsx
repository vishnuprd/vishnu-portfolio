"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "lucide-react";

export const THEMES = [
  { id: "aurora", label: "Aurora", colors: ["#22d3ee", "#8b5cf6", "#d946ef"] },
  { id: "ocean", label: "Ocean", colors: ["#38bdf8", "#3b82f6", "#6366f1"] },
  { id: "sunset", label: "Sunset", colors: ["#fbbf24", "#f472b6", "#a855f7"] },
  { id: "emerald", label: "Emerald", colors: ["#2dd4bf", "#10b981", "#84cc16"] },
  { id: "crimson", label: "Crimson", colors: ["#fb7185", "#ec4899", "#a855f7"] },
] as const;

const STORAGE_KEY = "portfolio-theme";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>("aurora");

  useEffect(() => {
    const saved =
      document.documentElement.dataset.theme ||
      localStorage.getItem(STORAGE_KEY) ||
      "aurora";
    setTheme(saved);
  }, []);

  function apply(id: string) {
    setTheme(id);
    document.documentElement.dataset.theme = id;
    localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div className="fixed bottom-6 left-6 z-[70] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-strong flex flex-col gap-1.5 rounded-2xl p-2 shadow-card"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => apply(t.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  theme === t.id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex -space-x-1">
                  {t.colors.map((c) => (
                    <span
                      key={c}
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ background: c }}
                    />
                  ))}
                </span>
                <span className="flex-1">{t.label}</span>
                {theme === t.id && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Change accent color"
        className="grid h-12 w-12 place-items-center rounded-full bg-accent-br text-white shadow-glow"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }}>
          <Palette className="h-5 w-5" />
        </motion.span>
      </motion.button>
    </div>
  );
}
