"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  download,
  target,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  download?: boolean;
  target?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15 });
  const y = useSpring(my, { stiffness: 200, damping: 15 });
  const tx = useTransform(x, (v) => v * 0.35);
  const ty = useTransform(y, (v) => v * 0.35);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 will-change-transform";
  const styles = {
    primary:
      "text-white shadow-glow bg-accent hover:shadow-glow-violet",
    outline:
      "text-white glass hover:bg-white/[0.08] border-white/15",
    ghost: "text-white/80 hover:text-white",
  }[variant];

  const inner = (
    <motion.span style={{ x: tx, y: ty }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const commonProps = {
    className: `${base} ${styles} ${className}`,
    onMouseMove: handleMove,
    onMouseLeave: reset,
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      whileTap={{ scale: 0.96 }}
    >
      {href ? (
        <a href={href} download={download} target={target} rel={target ? "noopener noreferrer" : undefined} {...commonProps}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...commonProps}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
