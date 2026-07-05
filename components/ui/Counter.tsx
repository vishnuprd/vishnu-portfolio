"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { duration as tokens, ease } from "@/lib/motion";

/**
 * Count-up that writes straight to the DOM node via animate()'s onUpdate —
 * so it does NOT re-render React ~60×/sec the way a setState loop would.
 * Respects reduced motion by jumping straight to the final value.
 */
export function Counter({
  to,
  suffix = "",
  duration = tokens.slow,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: ease.out,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}
