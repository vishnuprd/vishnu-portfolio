"use client";

import { motion, type Variants } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Premium text reveal — splits into words (or characters) that rise out from a
 * clipped mask on scroll-in. Accessible: the real string is exposed via
 * aria-label and every visual fragment is aria-hidden, so screen readers read
 * it once, normally. Under reduced motion, MotionConfig collapses the travel to
 * a plain fade.
 */
export function SplitText({
  text,
  className,
  per = "word",
  stagger = 0.045,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  per?: "word" | "char";
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const parts = per === "char" ? Array.from(text) : text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "115%" },
    show: { y: 0, transition: { duration: 0.6, ease: ease.out } },
  };

  return (
    <motion.span
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span variants={child} className="inline-block will-change-transform">
            {part}
            {per === "word" && i < parts.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
