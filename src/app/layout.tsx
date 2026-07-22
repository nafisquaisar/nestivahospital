/**
 * Root Layout
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Component — wraps every page in the application.
 *
 * Responsibilities:
 *   - Font loading (Inter + Plus Jakarta Sans via next/font/google)
 *   - Global metadata from SEO config
 *   - Provider tree injection
 *   - HTML lang and font class injection
 *   - Skip-to-main-content accessibility link
 *   - JSON-LD structured data (Hospital + Website schemas)
 */

import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { baseMetadata } from "@/config/seo";
import { Providers } from "@/providers";
import { JsonLd }    from "@/components/common/JsonLd";
import "@/app/globals.css";

// ── Font Loading ──────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

// ── Metadata Export ───────────────────────────────────────────────────────

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0066cc" },
    { media: "(prefers-color-scheme: dark)",  color: "#1a1f2e"  },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Layout ───────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <JsonLd type="hospital" />
        <JsonLd type="website"  />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip-to-main-content — first focusable element on page */}
        <a
          href="#main-content"
          className={[
            "sr-only focus:not-sr-only",
            "fixed left-4 top-4 z-[9999]",
            "rounded-md bg-primary px-4 py-2",
            "text-sm font-semibold text-primary-foreground",
            "shadow-lg outline-none",
            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          ].join(" ")}
        >
          Skip to main content
        </a>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
