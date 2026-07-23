import type { Metadata } from "next";
import { ErrorPageContent } from "@/components/layout/ErrorPageContent";

export const metadata: Metadata = {
  title: "500 | Server Error | Nestiva Hospital",
  description: "An unexpected error occurred on Nestiva Hospital's server. Our team is working on it. Please try again shortly.",
  robots: { index: false, follow: true },
};

export default function ServerErrorPage() {
  return <ErrorPageContent variant="500" />;
}
