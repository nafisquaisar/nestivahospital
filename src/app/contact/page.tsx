/**
 * Contact Page
 * Route: /contact
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium Contact Us page for Nestiva Hospital.
 * Sections:
 *   1. Hero
 *   2. Quick Contact Cards
 *   3. Contact Form + Hospital Info (side-by-side)
 *   4. Google Map
 *   5. FAQ Accordion
 *   6. Emergency CTA
 *   7. Trust Stats
 */

import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar }             from "@/components/layout/Navbar";
import { Footer }             from "@/components/layout/Footer";
import { Container }          from "@/components/shared/Container";
import { SectionHeader }      from "@/components/common/SectionHeader";
import {
  ContactHero,
  ContactCards,
  ContactForm,
  HospitalInfo,
  MapSection,
  FAQSection,
  EmergencyCTA,
  TrustStats,
} from "@/modules/contact";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Nestiva Hospital — book appointments, reach our emergency team, find our location in Munirka, New Delhi, or send us a message. We respond within 2 hours.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Nestiva Hospital — New Delhi",
    description:
      "Emergency: 011-42422000 | Address: 384, JS Complex, Munirka, New Delhi-110068 | Email: nestivahospital@gmail.com",
    url: `${siteUrl}/contact`,
  },
});

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <ContactHero />

        {/* 2. Quick Contact Cards */}
        <ContactCards />

        {/* 3. Form + Info (2-column) */}
        <section
          className="bg-muted/20 py-16 md:py-20"
          aria-labelledby="contact-form-heading"
        >
          <Container>
            <SectionHeader
              eyebrow="Get In Touch"
              title="Send Us a Message"
              titleId="contact-form-heading"
              subtitle="Our team will respond to your enquiry within 2 business hours during working days."
              align="center"
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
              {/* Form */}
              <ContactForm />

              {/* Hospital Info */}
              <HospitalInfo />
            </div>
          </Container>
        </section>

        {/* 4. Trust Stats */}
        <TrustStats />

        {/* 5. Google Map */}
        <MapSection />

        {/* 6. FAQ */}
        <FAQSection />

        {/* 7. Emergency CTA */}
        <EmergencyCTA />
      </main>

      <Footer />
    </>
  );
}
