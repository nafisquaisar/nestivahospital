"use client";
/**
 * useReducedMotion
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects the user's prefers-reduced-motion media query.
 * Returns true when the user has requested reduced motion.
 *
 * Usage:
 *   const isReduced = useReducedMotion();
 *   <motion.div {...animationProps(isReduced, { variants: fadeUp })} />
 */

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isReduced;
}
