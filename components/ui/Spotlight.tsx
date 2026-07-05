"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-tracked radial glow. Drop inside any `position: relative` element that
 * also has the `group` class — the glow fades in on hover and follows the
 * pointer via CSS custom properties (updated outside React, so no re-renders).
 * Skips work entirely on touch/coarse pointers.
 */
export function Spotlight({
  size = 340,
  color = "rgb(var(--a1) / 0.16)",
}: {
  size?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(${size}px circle at var(--sx, 50%) var(--sy, 50%), ${color}, transparent 60%)`,
      }}
    />
  );
}
