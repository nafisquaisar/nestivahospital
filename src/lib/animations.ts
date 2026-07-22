/**
 * Animation System
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized Framer Motion variant library.
 * ALL section and component animations import from here.
 * No inline variant definitions elsewhere in the codebase.
 *
 * Usage:
 *   import { fadeUp, staggerContainer, staggerItem, defaultViewport } from "@/lib/animations";
 *
 * Reduced-motion support:
 *   Use the useReducedMotion hook and spread the result of animationProps().
 */

import type { Variants } from "framer-motion";

// ─── Scroll Reveal Variants ────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Stagger Variants ─────────────────────────────────────────────────────

/**
 * Grid/list child variant. Pair with staggerContainer() on the parent.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/**
 * Creates a stagger container variant.
 * @param staggerChildren - delay between each child animation (default 0.1s)
 * @param delayChildren   - delay before first child starts (default 0.1s)
 */
export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren   = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  };
}

// ─── Float (Infinite Loop) ────────────────────────────────────────────────

/**
 * Gentle floating animation for hero image, badges, etc.
 * @example
 * <motion.div
 *   animate={floatAnimation.animate}
 *   transition={floatAnimation.transition}
 * />
 */
export const floatAnimation = {
  animate:    { y: [0, -8, 0] } as const,
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
} as const;

// ─── Hover Animations (whileHover values) ─────────────────────────────────

export const hoverLift  = { y: -3,    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const } };
export const hoverScale = { scale: 1.02, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const } };
export const imageZoom  = { scale: 1.05, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } };

// ─── Viewport Presets ─────────────────────────────────────────────────────

/** Standard scroll-reveal viewport — suitable for most sections. */
export const defaultViewport = { once: true, margin: "-60px" } as const;

/** Early reveal — hero, stats, above-fold sections. */
export const earlyViewport   = { once: true, margin: "-20px" } as const;

/** Lazy reveal — gallery, testimonials, below-fold heavy sections. */
export const lazyViewport    = { once: true, margin: "-80px" } as const;

// ─── Reduced-Motion Helper ────────────────────────────────────────────────

interface AnimationProps {
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  animate?: string;
  viewport?: typeof defaultViewport | typeof earlyViewport | typeof lazyViewport;
}

/**
 * Returns animation props, or an empty object when prefers-reduced-motion is
 * enabled. Accepts `isReduced` from the useReducedMotion() hook.
 *
 * @example
 * const isReduced = useReducedMotion();
 * <motion.div {...animationProps(isReduced, { variants: fadeUp })} />
 */
export function animationProps(isReduced: boolean, props: AnimationProps) {
  if (isReduced) return {};
  return {
    variants:    props.variants,
    initial:     props.initial    ?? "hidden",
    whileInView: props.whileInView ?? "show",
    animate:     props.animate,
    viewport:    props.viewport   ?? defaultViewport,
  };
}
