"use client";

/**
 * AppointmentBanner
 * ─────────────────────────────────────────────────────────────────────────────
 * Compact CTA strip shown above the Footer on every inner page.
 * Matches the CTA section design language but more compact.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { branding } from "@/config/branding";
import { useReducedMotion } from "@/hooks";

interface AppointmentBannerProps {
  heading?: string;
  description?: string;
}

export function AppointmentBanner({
  heading = "Ready to Book Your Appointment?",
  description = "Our specialists are available 6 days a week. Book online in under 60 seconds or call our care team — we're here for you.",
}: AppointmentBannerProps) {
  const isReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-10 md:py-12"
      aria-labelledby="appointment-banner-heading"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={isReduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left lg:items-center"
        >
          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <h2
              id="appointment-banner-heading"
              className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl"
            >
              {heading}
            </h2>
            <p className="max-w-xl text-sm text-white/75 sm:text-base">
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-black/10"
            >
              <Link href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <a href={`tel:${branding.phone.replace(/\D/g, "")}`}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                {branding.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
