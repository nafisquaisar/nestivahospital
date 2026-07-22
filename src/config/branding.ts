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
    full: "/assets/logo/logo-full.svg",
    /** Square / icon-only logo */
    icon: "/assets/logo/logo-icon.svg",
    /** Dark-mode variant */
    dark: "/assets/logo/logo-dark.svg",
  },

  /** Favicon path (relative to /public) */
  favicon: "/favicon.ico",

  /** Primary contact email */
  email: "info@nestiva.hospital",

  /** General enquiries phone */
  phone: "+1 (800) 637-8482",

  /** 24/7 emergency hotline */
  emergencyPhone: "+1 (800) 911-0000",

  /** Physical address */
  address: {
    street: "123 Medical Center Drive",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    /** Full single-line version */
    full: "123 Medical Center Drive, New York, NY 10001, United States",
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
