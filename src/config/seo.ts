/**
 * SEO Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * All metadata, OpenGraph, Twitter card, and structured data config.
 * Consumed by the root layout and individual page metadata exports.
 */

import { branding } from "@/config/branding";
import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestiva.hospital";

export const defaultKeywords = [
  "hospital",
  "healthcare",
  "medical center",
  "doctors",
  "emergency care",
  "multi-specialty hospital",
  "Nestiva",
  "Nestiva Hospital",
  "patient care",
  "clinical excellence",
  "diagnostics",
  "surgery",
  "telemedicine",
];

/**
 * Base metadata shared across all pages.
 * Individual pages should spread this and override title/description.
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${branding.name} — ${branding.tagline}`,
    template: `%s | ${branding.shortName}`,
  },

  description: branding.description,

  keywords: defaultKeywords,

  authors: [{ name: branding.name, url: siteUrl }],

  creator: branding.name,

  publisher: branding.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: branding.name,
    title: `${branding.name} — ${branding.tagline}`,
    description: branding.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${branding.name} — ${branding.tagline}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@nestiva",
    creator: "@nestiva",
    title: `${branding.name} — ${branding.tagline}`,
    description: branding.description,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: branding.favicon,
    shortcut: branding.favicon,
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

/**
 * Helper: build page-level metadata by merging with base defaults.
 */
export function buildMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    ...baseMetadata,
    ...overrides,
  };
}
