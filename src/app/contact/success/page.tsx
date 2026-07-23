/**
 * Contact Success Page
 * Route: /contact/success
 * ─────────────────────────────────────────────────────────────────────────────
 * Thank-you page shown after successful contact form submission.
 * No-index — not meant for search crawlers.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar }        from "@/components/layout/Navbar";
import { Footer }        from "@/components/layout/Footer";
import { Container }     from "@/components/shared/Container";
import { Button }        from "@/components/ui/button";
import { branding }      from "@/config/branding";
import { contact }       from "@/config/contact";
import {
  CheckCircle2, Home, CalendarCheck, PhoneCall,
  MessageCircle, Clock, ArrowRight,
} from "lucide-react";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Message Received — Thank You",
  description:
    "Your message has been received. Our team at Nestiva Hospital will get back to you within 2 business hours.",
  alternates: { canonical: `${siteUrl}/contact/success` },
  robots: { index: false, follow: false },
});

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactSuccessPage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <section
          className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-emerald-50/60 via-background to-primary/5 py-20 md:py-28"
          aria-labelledby="contact-success-heading"
        >
          {/* Decorative blobs */}
          <div
            className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-200/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary/8 blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            <div className="mx-auto max-w-2xl text-center">

              {/* Success icon */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/30">
                    <CheckCircle2 className="h-12 w-12 text-white" aria-hidden="true" />
                  </div>
                  {/* Rings */}
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" aria-hidden="true" />
                  <div className="absolute -inset-3 rounded-full border-2 border-emerald-300/30" aria-hidden="true" />
                </div>
              </div>

              {/* Heading */}
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Message Sent Successfully
              </span>

              <h1
                id="contact-success-heading"
                className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl mb-4"
              >
                Thank You for Reaching Out!
              </h1>

              <p className="text-base leading-relaxed text-muted-foreground mb-10">
                We&apos;ve received your message and our team will get back to you within
                <strong className="text-foreground"> 2 business hours</strong>.
                For urgent matters, please call us directly.
              </p>

              {/* Info cards */}
              <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Clock,
                    title: "Response Time",
                    desc: "Within 2 business hours",
                    color: "text-primary",
                    bg: "bg-primary/5",
                  },
                  {
                    icon: MessageCircle,
                    title: "Check Your Email",
                    desc: "Confirmation sent to your inbox",
                    color: "text-secondary",
                    bg: "bg-secondary/5",
                  },
                  {
                    icon: PhoneCall,
                    title: "Need Urgent Help?",
                    desc: contact.emergencyPhone,
                    href: `tel:${contact.emergencyPhone.replace(/\D/g, "")}`,
                    color: "text-danger",
                    bg: "bg-danger/5",
                  },
                ].map(({ icon: Icon, title, desc, href, color, bg }) => (
                  <div
                    key={title}
                    className={`rounded-2xl border border-border ${bg} p-5 text-center`}
                  >
                    <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                      <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                    </div>
                    <p className="text-xs font-bold text-foreground">{title}</p>
                    {href ? (
                      <a href={href} className={`text-xs font-semibold ${color} hover:underline`}>
                        {desc}
                      </a>
                    ) : (
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2 font-semibold shadow-lg shadow-primary/20">
                  <Link href="/">
                    <Home className="h-5 w-5" aria-hidden="true" />
                    Back to Home
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="gap-2">
                  <Link href="/appointment">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Book Appointment
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              {/* Hospital name */}
              <p className="mt-10 text-xs text-muted-foreground">
                {branding.name} · {branding.address.full}
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
