/**
 * Theme Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Design token system. Every visual decision flows from here.
 * Future hospitals swap this file ONLY — no other changes needed.
 *
 * Values use HSL notation for seamless CSS variable integration.
 * Format: "H S% L%" (no hsl() wrapper — consumed by CSS custom properties)
 */

export const theme = {
  colors: {
    /** Brand / Action colors */
    primary: {
      DEFAULT: "210 100% 40%",   // Deep medical blue
      foreground: "0 0% 100%",
      light: "210 100% 92%",
      dark: "210 100% 28%",
    },
    secondary: {
      DEFAULT: "174 62% 42%",    // Teal — clinical trust
      foreground: "0 0% 100%",
      light: "174 62% 90%",
      dark: "174 62% 30%",
    },
    accent: {
      DEFAULT: "38 92% 55%",     // Warm amber — warmth & care
      foreground: "0 0% 10%",
      light: "38 92% 90%",
      dark: "38 92% 38%",
    },

    /** Neutral palette */
    background: {
      DEFAULT: "220 20% 97%",
      dark: "220 20% 8%",
    },
    foreground: {
      DEFAULT: "220 25% 10%",
      dark: "220 10% 95%",
    },
    muted: {
      DEFAULT: "220 14% 92%",
      foreground: "220 10% 46%",
      dark: "220 14% 18%",
    },
    border: {
      DEFAULT: "220 13% 87%",
      dark: "220 13% 22%",
    },
    card: {
      DEFAULT: "0 0% 100%",
      dark: "220 20% 13%",
    },
    popover: {
      DEFAULT: "0 0% 100%",
      dark: "220 20% 13%",
    },
    input: {
      DEFAULT: "220 13% 87%",
      dark: "220 13% 22%",
    },

    /** Semantic / status colors */
    success: {
      DEFAULT: "142 71% 40%",
      foreground: "0 0% 100%",
      light: "142 71% 90%",
    },
    warning: {
      DEFAULT: "38 92% 50%",
      foreground: "0 0% 10%",
      light: "38 92% 92%",
    },
    danger: {
      DEFAULT: "0 84% 50%",
      foreground: "0 0% 100%",
      light: "0 84% 93%",
    },
    info: {
      DEFAULT: "199 89% 48%",
      foreground: "0 0% 100%",
      light: "199 89% 90%",
    },

    /** Ring / focus */
    ring: "210 100% 40%",
    ringOffset: "0 0% 100%",
  },

  /** Border radius scale */
  radius: {
    none: "0px",
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  /** Elevation / shadow system */
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none",
    /** Branded glow */
    glow: "0 0 20px hsl(210 100% 40% / 0.25)",
    glowStrong: "0 0 40px hsl(210 100% 40% / 0.4)",
  },

  /** Spacing scale (extends Tailwind defaults) */
  spacing: {
    section: "5rem",       // 80px — vertical section padding
    container: "1.25rem",  // 20px — horizontal container padding
    gap: "1.5rem",         // 24px — card/grid gap
  },

  /** Typography system */
  typography: {
    fontFamily: {
      /** UI / body font */
      sans: ["Inter", "system-ui", "sans-serif"],
      /** Display / heading font */
      display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      /** Monospace */
      mono: ["JetBrains Mono", "Fira Code", "monospace"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1.15" }],
      "6xl": ["3.75rem", { lineHeight: "1.1" }],
      "7xl": ["4.5rem", { lineHeight: "1.05" }],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
  },

  /** Animation / motion */
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "800ms",
    },
    easing: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },

  /** Responsive breakpoints (matches Tailwind defaults) */
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  /** Container max-widths */
  container: {
    maxWidth: "1280px",
    narrow: "860px",
    wide: "1440px",
  },
} as const;

export type Theme = typeof theme;
