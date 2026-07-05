"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Spotlight } from "./Spotlight";

/**
 * Interactive 3D tilt card. Tracks the pointer within the card, maps its
 * position to rotateX/rotateY, and springs toward it — with a cursor-tracked
 * Spotlight glare layered on top. Under reduced motion, MotionConfig collapses
 * the tilt (transforms) automatically; touch users just get the flat card.
 */
export function TiltCard({
  children,
  className = "",
  variants,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** Max tilt in degrees. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  function onMove(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`group relative ${className}`}
    >
      <Spotlight />
      {children}
    </motion.div>
  );
}
