"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single place that registers GSAP plugins. Registration is a no-op on the
 * server, so importing this from a client component is SSR-safe. Import
 * `gsap` / `ScrollTrigger` from here instead of the raw package so every
 * caller shares one registered instance.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
