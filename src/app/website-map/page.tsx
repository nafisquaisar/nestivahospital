import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { WebsiteMapContent } from "@/modules/sitemap/WebsiteMapContent";

export const metadata: Metadata = buildMetadata({
  title: "Website Map",
  description:
    "Navigate the complete Nestiva Hospital website — find all sections including departments, doctors, services, appointments, and legal pages.",
  alternates: { canonical: `${siteUrl}/website-map` },
  openGraph: {
    title: "Website Map | Nestiva Hospital",
    description: "Find any page on the Nestiva Hospital website at a glance.",
    url: `${siteUrl}/website-map`,
  },
});

export default function WebsiteMapPage() {
  return <WebsiteMapContent />;
}
