"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Hand-drawn accent stroke that draws itself on scroll-in via SVG pathLength.
 * Place inside a `position: relative` inline wrapper around the word to accent.
 */
export function DrawUnderline({
  className = "",
  delay = 0.4,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 14"
      fill="none"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-1 left-0 h-[0.35em] w-full ${className}`}
    >
      <motion.path
        d="M3 9 C 70 3, 130 2, 190 6 S 262 12, 297 5"
        stroke="url(#draw-underline)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: ease.out, delay }}
      />
      <defs>
        <linearGradient id="draw-underline" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(var(--a1))" />
          <stop offset="0.5" stopColor="rgb(var(--a2))" />
          <stop offset="1" stopColor="rgb(var(--a3))" />
        </linearGradient>
      </defs>
    </svg>
  );
}
