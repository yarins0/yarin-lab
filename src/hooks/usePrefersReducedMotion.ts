import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// The server has no media queries. Assuming motion is allowed keeps the markup
// identical to the common client case, so hydration does not mismatch.
function getServerSnapshot(): boolean {
  return false;
}

/*
  usePrefersReducedMotion — reports whether the visitor asked the system to
  reduce motion, and re-renders when they change that setting.

  Input: none. Output: true when motion should be suppressed.

  CSS handles most motion through a media query. This hook exists for the cases
  CSS cannot reach, such as stopping a <video> from playing on its own.
*/
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
