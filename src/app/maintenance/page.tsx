/**
 * Maintenance Page
 * Route: /maintenance
 */
import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { MaintenanceContent } from "@/modules/system/MaintenanceContent";

export const metadata: Metadata = buildMetadata({
  title: "Scheduled Maintenance",
  description:
    "Nestiva Hospital's website is undergoing scheduled maintenance. We'll be back shortly. For emergencies, call 011-42422000.",
  alternates: { canonical: `${siteUrl}/maintenance` },
  robots: { index: false, follow: true },
});

export default function MaintenancePage() {
  return <MaintenanceContent />;
}
