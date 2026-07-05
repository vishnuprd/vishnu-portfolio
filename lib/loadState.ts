"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store that tracks whether the app's initial load sequence
 * (the Preloader) has finished. Lets the Preloader coordinate with entrance
 * animations elsewhere (e.g. the Hero) without prop drilling or context.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** `true` once the preloader has dismissed. Safe for SSR (starts `false`). */
export function useAppReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false
  );
}
