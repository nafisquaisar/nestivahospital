"use client";
/**
 * useScrollProgress
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the current scroll progress as a 0–1 value.
 * Also returns whether the user has scrolled past a given threshold.
 * Used by the Navbar for transparent → white transition.
 */

import { useState, useEffect } from "react";

interface ScrollProgress {
  /** 0 = top of page, 1 = bottom of page */
  progress: number;
  /** True when scrollY > threshold (default 70px) */
  scrolled: boolean;
  /** Raw scrollY in pixels */
  scrollY: number;
}

export function useScrollProgress(threshold = 70): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrolled: false,
    scrollY:  0,
  });

  useEffect(() => {
    const update = () => {
      const { scrollY } = window;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        progress: maxScroll > 0 ? scrollY / maxScroll : 0,
        scrolled: scrollY > threshold,
        scrollY,
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update(); // Initialize immediately
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return state;
}
