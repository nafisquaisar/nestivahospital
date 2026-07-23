/**
 * Custom 404 — Not Found Page
 * Route: Catches all unmatched routes in the Next.js 15 App Router.
 * ─────────────────────────────────────────────────────────────────────────────
 * This is a SERVER Component — all animated / interactive logic lives in
 * <NotFoundContent> (client component) to avoid hydration mismatches.
 *
 * Next.js automatically serves this for any unmatched URL.
 * The HTTP status code 404 is set automatically by the framework.
 */

import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "404 | Page Not Found | Nestiva Hospital",
  description:
    "The page you are looking for could not be found. Visit Nestiva Hospital's homepage or use the quick links to find what you need.",
  robots: {
    index: false,
    follow: true,
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NotFound() {
  return <NotFoundContent />;
}
