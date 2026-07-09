"use client";

import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created by <SmoothScroll>.
 * Lets non-provider components (anchor links, "back to top") drive the same
 * momentum scroll instead of calling native scroll APIs that would fight it.
 * When Lenis is absent (reduced motion, SSR), the helpers fall back to native
 * smooth scrolling so behaviour degrades gracefully.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

type ScrollTarget = string | number | HTMLElement;

/** Smooth-scroll to an element, selector, or offset — via Lenis if active. */
export function lenisScrollTo(
  target: ScrollTarget,
  opts: { offset?: number; duration?: number } = {}
) {
  if (instance) {
    instance.scrollTo(target, { offset: opts.offset ?? 0, duration: opts.duration });
    return;
  }

  // Native fallback (reduced motion / Lenis not mounted).
  if (typeof window === "undefined") return;
  if (typeof target === "number") {
    window.scrollTo({ top: target + (opts.offset ?? 0), behavior: "smooth" });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
