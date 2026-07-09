"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-scrubbed parallax wrapper (GSAP ScrollTrigger).
 *
 * The element is translated on the Y axis as its own box travels through the
 * viewport, locked to scroll via `scrub`. `speed` sets both direction and
 * strength: positive drifts the layer DOWN as you scroll (it "lags" — reads as
 * background depth), negative drifts it UP (reads as foreground). ~0.15 is
 * subtle; ~0.5 is dramatic.
 *
 * Uses `yPercent` so it composes with any static CSS transform on the same box
 * and never fights a child's own Framer Motion transforms. No-op under
 * `prefers-reduced-motion`, and fully reverted on unmount via gsap.context.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const distance = speed * 100;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -distance },
        {
          yPercent: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
