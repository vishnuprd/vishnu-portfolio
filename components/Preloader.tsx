"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { markAppReady } from "@/lib/loadState";
import { duration, ease } from "@/lib/motion";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      setDone(true);
      markAppReady();
    };

    // Gate on a real signal (fonts) rather than a fixed timeout, but keep a
    // brief minimum so the brand mark doesn't flash, and a hard cap so a slow
    // font network can never hang the page behind the loader.
    const minDisplay = new Promise<void>((r) => setTimeout(r, 550));
    const fontsReady = document.fonts
      ? document.fonts.ready.then(() => undefined)
      : Promise.resolve();

    Promise.all([minDisplay, fontsReady]).then(finish);
    const cap = setTimeout(finish, 3000);

    return () => {
      cancelled = true;
      clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: ease.out }}
          className="fixed inset-0 z-[200] grid place-items-center bg-ink-950"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative grid h-16 w-16 place-items-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-sky-400/50" />
              <motion.span
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-br font-mono text-xl font-bold text-white shadow-glow"
              >
                VP
              </motion.span>
            </div>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full bg-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
