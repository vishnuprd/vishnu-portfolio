"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Pinned horizontal-scroll section. The outer element is made tall enough to
 * absorb the horizontal travel; an inner sticky viewport stays put while the
 * track slides left, mapped 1:1 to vertical scroll. Distance is MEASURED
 * (track width − viewport width) so the pin length is pixel-accurate regardless
 * of item count.
 *
 * Falls back to a normal swipe-scroll row on reduced motion or when the content
 * already fits (nothing to pin).
 */
export function HorizontalScroll({
  children,
  trackClassName = "",
}: {
  children: ReactNode;
  trackClassName?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400); // after fonts settle
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [children]);

  // NOTE: useScroll must target an element that is ALWAYS mounted — otherwise,
  // during the initial fallback render its ref is null and it silently tracks
  // whole-page scroll instead of this section. So sectionRef wraps both modes.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  const pinned = !reduce && distance > 0;

  return (
    <div
      ref={sectionRef}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      className="relative"
    >
      {pinned ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className={`flex gap-5 ${trackClassName}`}
          >
            {children}
          </motion.div>
        </div>
      ) : (
        <div
          ref={trackRef}
          className={`flex gap-5 overflow-x-auto scroll-smooth pb-4 ${trackClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
