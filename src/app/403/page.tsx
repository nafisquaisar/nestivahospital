import type { Metadata } from "next";
import { ErrorPageContent } from "@/components/layout/ErrorPageContent";

export const metadata: Metadata = {
  title: "403 | Access Denied | Nestiva Hospital",
  description: "You do not have permission to view this page. Please contact Nestiva Hospital support if you believe this is an error.",
  robots: { index: false, follow: true },
};

export default function ForbiddenPage() {
  return <ErrorPageContent variant="403" />;
}
