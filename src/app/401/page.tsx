import type { Metadata } from "next";
import { ErrorPageContent } from "@/components/layout/ErrorPageContent";

export const metadata: Metadata = {
  title: "401 | Unauthorised | Nestiva Hospital",
  description: "You must be signed in to access this page. Please log in to your Nestiva Hospital account.",
  robots: { index: false, follow: true },
};

export default function UnauthorisedPage() {
  return <ErrorPageContent variant="401" />;
}
