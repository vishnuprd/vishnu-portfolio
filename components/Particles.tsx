"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field — floating dots with connecting lines
 * that react subtly to the cursor. No dependencies, respects reduced motion.
 */
export function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = ref.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    // read accent color for particles
    const rootStyle = getComputedStyle(document.documentElement);
    const accent = () =>
      (rootStyle.getPropertyValue("--a1").trim() || "34 211 238")
        .split(" ")
        .map(Number);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];

    function resize() {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, (_, i) => ({
        x: ((i * 97.13) % w),
        y: ((i * 53.71) % h),
        vx: (((i % 7) - 3) / 10) * 0.5,
        vy: (((i % 5) - 2) / 10) * 0.5,
        r: 1 + (i % 3) * 0.5,
      }));
    }

    function frame() {
      const [ar, ag, ab] = accent();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle cursor attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 18000) {
          p.x += dx * 0.0015;
          p.y += dy * 0.0015;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar},${ag},${ab},0.6)`;
        ctx.fill();

        // links
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const lx = p.x - q.x;
          const ly = p.y - q.y;
          const dist = Math.sqrt(lx * lx + ly * ly);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${ar},${ag},${ab},${
              0.14 * (1 - dist / 120)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reduce) {
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
