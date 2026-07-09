"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis, lenisScrollTo } from "@/lib/lenis";

/**
 * Global momentum smooth-scroll (Lenis) wired into GSAP's ScrollTrigger.
 *
 * This is the single biggest lever on the site's "feel": Lenis interpolates
 * the real scroll position so wheel/trackpad input glides with inertia, and
 * because it moves the native scroll offset (not a transform) every existing
 * consumer — Framer Motion's `useScroll`, the Navbar progress bar, Intersection
 * observers, `data-lenis` parallax — keeps working untouched.
 *
 * ScrollTrigger and Lenis are driven off the SAME clock (`gsap.ticker`) so
 * scrubbed animations stay locked to the interpolated scroll with no jitter.
 *
 * Also owns in-page anchor navigation (routes `#hash` clicks through Lenis and
 * keeps the address bar clean). Under `prefers-reduced-motion` Lenis is never
 * created and everything falls back to the browser's native smooth scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Strip any hash on first load so the URL stays clean.
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        // ~1s glide with an exponential ease-out — enough inertia to feel
        // premium without the "laggy" over-smoothing awwwards sites get wrong.
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      setLenis(lenis);

      // Keep ScrollTrigger in sync with every interpolated frame.
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker (one RAF loop for the whole page).
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // In-page anchor navigation → Lenis (or native fallback).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      e.preventDefault();
      lenisScrollTo(el, { offset: 0 });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
