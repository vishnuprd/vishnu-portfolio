import type { Transition, Variants } from "framer-motion";

/**
 * Motion design tokens — one shared vocabulary so every animation across the
 * site feels like it comes from the same hand. Import these instead of
 * hand-writing easings/springs per component.
 */

/** Cubic-bezier easing curves. */
export const ease = {
  /** Snappy decelerate — the default for entrances. */
  out: [0.16, 1, 0.3, 1],
  /** Balanced in-out for looping/continuous motion. */
  inOut: [0.65, 0, 0.35, 1],
  /** The softer curve used across the original design. */
  smooth: [0.22, 1, 0.36, 1],
} as const;

/** Durations in seconds. */
export const duration = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
} as const;

/** Spring presets for physical, interruptible motion. */
export const spring = {
  /** UI feedback — pills, toggles, magnetic pulls. */
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  /** General purpose — cards, modals. */
  soft: { type: "spring", stiffness: 220, damping: 26 },
  /** Slow parallax follow. */
  gentle: { type: "spring", stiffness: 60, damping: 20 },
} as const satisfies Record<string, Transition>;

/** The canonical entrance transition. */
export const entrance: Transition = {
  duration: duration.base,
  ease: ease.out,
};

/** Fade-and-rise variant used by most reveal-on-scroll elements. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: entrance },
};
