"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/** Keep a value inside [min, max) — wraps around like modulo. */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Infinite marquee whose speed AND direction react to scroll velocity: scroll
 * down and it accelerates + shears one way, scroll up and it reverses. Idle, it
 * drifts at baseVelocity. Wires useScroll → useVelocity → useSpring into a
 * requestAnimationFrame loop. Static under reduced motion.
 */
export function VelocityMarquee({
  children,
  baseVelocity = 2,
  className = "",
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // 4 copies → shifting by one copy (25%) is seamless; wrap keeps x in [-25, 0).
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  // Subtle shear that leans into scroll direction.
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [-6, 0, 6], {
    clamp: true,
  });

  const direction = useRef(1);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      let move = direction.current * baseVelocity * (dt / 1000);
      const factor = velocityFactor.get();
      if (factor < 0) direction.current = -1;
      else if (factor > 0) direction.current = 1;
      move += direction.current * move * factor;
      baseX.set(baseX.get() + move);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, baseVelocity, baseX, velocityFactor]);

  return (
    <div className={`mask-fade-x flex overflow-hidden ${className}`}>
      <motion.div style={{ x, skewX }} className="flex shrink-0 flex-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 pr-3"
            aria-hidden={i > 0}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
