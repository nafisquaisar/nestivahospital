/**
 * Home Page
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Component — composes ALL homepage sections in order.
 *
 * Section order:
 *   1.  Navbar             — sticky, transparent → solid on scroll
 *   2.  Hero               — full-screen two-column layout
 *   3.  StatsSection       — 4 KPI cards
 *   4.  DepartmentsSection — 6-card department grid
 *   5.  DoctorsSection     — 4 featured doctors
 *   6.  WhyChooseUsSection — 4 feature cards
 *   7.  TestimonialsSection — testimonial carousel
 *   8.  GallerySection     — asymmetric image grid
 *   9.  BlogSection        — 3 featured blog posts
 *   10. FAQSection         — 2-column accordion FAQ
 *   11. CTASection         — full-width gradient CTA banner
 *   12. Footer             — 4-column site footer
 */

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar }             from "@/components/layout/Navbar";
import { Footer }             from "@/components/layout/Footer";
import { Hero }               from "@/components/sections/Hero";
import { StatsSection }       from "@/components/sections/StatsSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { DoctorsSection }     from "@/components/sections/DoctorsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { CTASection }         from "@/components/sections/CTASection";
import {
  SectionSkeleton,
  TestimonialCardSkeleton,
  GalleryCardSkeleton,
  Skeleton,
} from "@/components/ui/skeleton";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";

// ── Dynamic imports — code-split heavy / client-heavy below-fold sections ─────

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (m) => ({ default: m.TestimonialsSection })
    ),
  {
    loading: () => (
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionSkeleton
            count={3}
            gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            CardSkeleton={TestimonialCardSkeleton}
          />
        </div>
      </section>
    ),
    ssr: true,
  }
);

const GallerySection = dynamic(
  () =>
    import("@/components/sections/GallerySection").then(
      (m) => ({ default: m.GallerySection })
    ),
  {
    loading: () => (
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <GalleryCardSkeleton key={i} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const BlogSection = dynamic(
  () =>
    import("@/components/sections/BlogSection").then(
      (m) => ({ default: m.BlogSection })
    ),
  {
    loading: () => (
      <section className="bg-muted/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/50 bg-card">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="flex flex-col gap-3 p-5">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true,
  }
);

const FAQSection = dynamic(
  () =>
    import("@/components/sections/FAQSection").then(
      (m) => ({ default: m.FAQSection })
    ),
  {
    loading: () => (
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    ),
    ssr: true, // "use client" component — hooks run client-side automatically
  }
);

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description:
    "Nestiva Hospital — Advanced Care, Human Touch. Book appointments with 500+ expert doctors, explore 12+ specialist departments, and experience world-class healthcare.",
  alternates: { canonical: "/" },
});

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* ── Above the fold ─────────────────────────────── */}
        <Hero />
        <StatsSection />

        {/* ── Below the fold — SSR ───────────────────────── */}
        <DepartmentsSection />
        <DoctorsSection />
        <WhyChooseUsSection />

        {/* ── Dynamic sections — skeleton fallback ──────── */}
        <Suspense
          fallback={
            <section className="bg-muted/30 py-16">
              <div className="mx-auto max-w-7xl px-4">
                <SectionSkeleton count={3} CardSkeleton={TestimonialCardSkeleton} />
              </div>
            </section>
          }
        >
          <TestimonialsSection />
        </Suspense>

        <Suspense
          fallback={
            <section className="bg-background py-16">
              <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <GalleryCardSkeleton key={i} className="h-48" />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <GallerySection />
        </Suspense>

        <Suspense
          fallback={
            <section className="bg-muted/20 py-16">
              <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-80 rounded-2xl" />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <BlogSection />
        </Suspense>

        <Suspense
          fallback={
            <section className="bg-background py-16">
              <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-xl" />
                  ))}
                </div>
              </div>
            </section>
          }
        >
          <FAQSection />
        </Suspense>

        {/* ── CTA — server component, no Suspense needed ─── */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
