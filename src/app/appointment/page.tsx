/**
 * Appointment Request Page
 * Route: /appointment
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Component — wraps the interactive AppointmentForm client module.
 * Premium hospital-grade UI: gradient header, two-column form card layout.
 */

import type { Metadata } from "next";
import type React from "react";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { AppointmentForm, AppointmentBreadcrumb } from "@/modules/appointment";
import {
  CalendarCheck,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { branding } from "@/config/branding";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Request an Appointment",
  description:
    "Book your appointment at Nestiva Hospital. Fill in your details and our care team will confirm your preferred date and time. Fast, easy, and secure.",
  alternates: { canonical: `${siteUrl}/appointment` },
  openGraph: {
    title: "Request an Appointment | Nestiva Hospital",
    url: `${siteUrl}/appointment`,
  },
});

// ── Trust Badges ──────────────────────────────────────────────────────────────

interface TrustBadge {
  icon: React.ElementType;
  label: string;
  description: string;
  href?: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: Clock,
    label: "Fast Response",
    description: "Within 2 hours",
  },
  {
    icon: ShieldCheck,
    label: "100% Secure",
    description: "Data protected",
  },
  {
    icon: Phone,
    label: "24/7 Support",
    description: branding.emergencyPhone,
    href: `tel:${branding.emergencyPhone.replace(/\D/g, "")}`,
  },
  {
    icon: CalendarCheck,
    label: "No Hidden Fees",
    description: "Transparent booking",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AppointmentPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-secondary/5 border-b border-border py-14 md:py-20">
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/6 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/8 blur-3xl"
            aria-hidden="true"
          />
          {/* Dot grid pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <Container className="relative z-10">
            {/* Breadcrumb */}
            <AppointmentBreadcrumb
              items={[{ label: "Appointment" }]}
              className="mb-5"
            />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {/* Eyebrow */}
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/20">
                  <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Appointment Request
                </div>

                {/* Title */}
                <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
                  Request an{" "}
                  <span className="gradient-text">Appointment</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Fill in your details and our hospital team will contact you
                  shortly to confirm your appointment.
                </p>
              </div>

              {/* Trust badges — desktop */}
              <div className="hidden shrink-0 grid-cols-2 gap-2 lg:grid">
                {TRUST_BADGES.map(({ icon: Icon, label, description, href }) => {
                  const inner = (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-card/80 px-3.5 py-2.5 shadow-sm backdrop-blur-sm"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a key={label} href={href} className="transition-transform hover:scale-[1.02]">
                      {inner}
                    </a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Trust badges — mobile (horizontal scroll) */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {TRUST_BADGES.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold text-foreground whitespace-nowrap">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ── Form Section ─────────────────────────────────────────────── */}
        <section
          className="py-14 md:py-20 bg-background"
          aria-labelledby="appointment-form-heading"
        >
          <h2 id="appointment-form-heading" className="sr-only">
            Appointment Request Form
          </h2>
          <Container>
            <AppointmentForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
