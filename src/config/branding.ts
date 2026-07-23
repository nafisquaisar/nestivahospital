/**
 * Branding Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all hospital identity values.
 * Replace values here — NEVER hardcode anywhere else in the codebase.
 */

export const branding = {
  /** Hospital / Platform Name */
  name: "Nestiva Hospital",

  /** Short display name */
  shortName: "Nestiva",

  /** Tagline shown in hero, footer, etc. */
  tagline: "Advanced Care, Human Touch",

  /** Sub-tagline for extended contexts */
  description:
    "A world-class multi-specialty hospital delivering compassionate, technology-driven healthcare to every patient.",

  /** Logo paths (relative to /public) */
  logo: {
    /** Full horizontal logo */
    full: "/assets/logo/logo-full-bg.png",
    /** Square / icon-only logo */
    icon: "/assets/logo/logo-full-bg.png",
    /** Dark-mode variant */
    dark: "/assets/logo/logo-full-bg.png",
  },

  /** Favicon path (relative to /public) */
  favicon: "/favicon.ico",

  /** Primary contact email */
  email: "nestivahospital@gmail.com",

  /** General enquiries phone */
  phone: "011-42422000",

  /** 24/7 emergency hotline */
  emergencyPhone: "011-42422000",

  /** Physical address */
  address: {
    street: "384, JS Complex, near Indane Gas godown, Munirka",
    city: "New Delhi",
    state: "Delhi",
    zip: "110068",
    country: "India",
    /** Full single-line version */
    full: "384, JS Complex, near Indane Gas godown, Munirka, New Delhi-110068",
  },

  /** Social media links */
  social: {
    facebook: "https://facebook.com/nestiva",
    twitter: "https://twitter.com/nestiva",
    instagram: "https://instagram.com/nestiva",
    linkedin: "https://linkedin.com/company/nestiva",
    youtube: "https://youtube.com/@nestiva",
  },

  /** Copyright line (year injected at runtime) */
  copyright: `© ${new Date().getFullYear()} Nestiva Hospital. All rights reserved.`,

  /** Registered / accreditation badges */
  accreditations: ["JCI Accredited", "ISO 9001:2015", "NABH Certified"],
} as const;

export type Branding = typeof branding;
