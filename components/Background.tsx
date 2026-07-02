"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 260]);

  // mouse-following spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgb(var(--a2) / 0.14), transparent 60%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* aurora mesh */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(40% 55% at 15% 10%, rgb(var(--a1) / 0.18), transparent 60%), radial-gradient(45% 50% at 85% 15%, rgb(var(--a2) / 0.18), transparent 60%), radial-gradient(50% 55% at 50% 100%, rgb(var(--a3) / 0.12), transparent 60%)",
        }}
      />

      {/* faint grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* gradient blobs (theme-aware) */}
      <motion.div
        style={{ y: y1, background: "rgb(var(--a1) / 0.22)" }}
        className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full blur-[130px] animate-blob"
      />
      <motion.div
        style={{ y: y2, background: "rgb(var(--a2) / 0.22)" }}
        className="absolute right-[-15%] top-[15%] h-[38rem] w-[38rem] rounded-full blur-[130px] animate-blob [animation-delay:-6s]"
      />
      <motion.div
        style={{ y: y1, background: "rgb(var(--a3) / 0.16)" }}
        className="absolute bottom-[-10%] left-[25%] h-[36rem] w-[36rem] rounded-full blur-[140px] animate-blob [animation-delay:-12s]"
      />

      {/* mouse-following spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* noise / film grain */}
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,5,10,0.65)_100%)]" />
    </div>
  );
}
