/**
 * Appointment Success Page
 * Route: /appointment/success
 * ─────────────────────────────────────────────────────────────────────────────
 * Thank-you page shown after successful Formspree submission.
 * SuccessCard reads appointment summary from URL query params.
 *
 * Wrapped in Suspense because SuccessCard uses useSearchParams() —
 * required by Next.js 15 for client components that read query params.
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { SuccessCard, AppointmentBreadcrumb } from "@/modules/appointment";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Appointment Request Received",
  description:
    "Your appointment request has been received. Our hospital team will review and contact you shortly to confirm your appointment.",
  alternates: { canonical: `${siteUrl}/appointment/success` },
  robots: {
    index: false,
    follow: false,
  },
});

// ── Loading Skeleton ───────────────────────────────────────────────────────────

function SuccessCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl animate-pulse">
      {/* Icon skeleton */}
      <div className="flex justify-center mb-8">
        <div className="h-24 w-24 rounded-full bg-muted" />
      </div>
      {/* Card skeleton */}
      <div className="rounded-2xl border border-border bg-card p-8">
        <div className="flex justify-center mb-4">
          <div className="h-6 w-40 rounded-full bg-muted" />
        </div>
        <div className="h-10 w-3/4 mx-auto rounded-lg bg-muted mb-4" />
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 mx-auto rounded bg-muted" />
        </div>
        <div className="h-10 w-full rounded-xl bg-muted" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AppointmentSuccessPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section
          className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-emerald-50/60 via-background to-primary/5 py-14 md:py-20"
          aria-labelledby="success-heading"
        >
          {/* Decorative background blobs */}
          <div
            className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-200/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <AppointmentBreadcrumb
              items={[
                { label: "Appointment", href: "/appointment" },
                { label: "Request Received" },
              ]}
              className="mb-10"
            />

            {/* Hidden h1 for screen readers */}
            <h1 id="success-heading" className="sr-only">
              Appointment Request Received
            </h1>

            {/* Suspense wraps SuccessCard because it calls useSearchParams() */}
            <Suspense fallback={<SuccessCardSkeleton />}>
              <SuccessCard />
            </Suspense>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
