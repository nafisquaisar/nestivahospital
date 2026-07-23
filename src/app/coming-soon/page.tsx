/**
 * Coming Soon Page
 * Route: /coming-soon
 */
import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { ComingSoonContent } from "@/modules/system/ComingSoonContent";

export const metadata: Metadata = buildMetadata({
  title: "Coming Soon — New Healthcare Services",
  description:
    "Nestiva Hospital is launching exciting new healthcare services. Subscribe to be the first to know when we go live.",
  alternates: { canonical: `${siteUrl}/coming-soon` },
  robots: { index: true, follow: true },
});

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
