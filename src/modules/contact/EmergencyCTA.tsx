"use client";

/**
 * EmergencyCTA
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-width gradient emergency CTA section with pulse animation.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, CalendarCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { branding } from "@/config/branding";
import { useReducedMotion } from "@/hooks";

export function EmergencyCTA() {
  const isReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background: "linear-gradient(135deg, hsl(0 84% 60%) 0%, hsl(0 72% 48%) 60%, hsl(210 100% 40%) 100%)",
      }}
      aria-labelledby="emergency-cta-heading"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
        {/* Grid pattern */}
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
          initial={isReduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Icon */}
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <AlertTriangle className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            {/* Ping rings */}
            <span className="absolute inset-0 animate-ping rounded-full bg-white/20" aria-hidden="true" />
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h2
              id="emergency-cta-heading"
              className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            >
              Need Immediate Medical Assistance?
            </h2>
            <p className="mx-auto max-w-xl text-base text-white/80">
              Our emergency team is available around the clock — 24 hours, 7 days a week,
              365 days a year. Don&apos;t hesitate, call us right now.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2.5 bg-white text-danger hover:bg-white/90 font-bold text-base shadow-xl shadow-black/20"
              id="emergency-call-btn"
            >
              <a href={`tel:${branding.emergencyPhone.replace(/\D/g, "")}`}>
                <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger" />
                </span>
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                Call Emergency: {branding.emergencyPhone}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-semibold"
              id="emergency-appt-btn"
            >
              <Link href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white/60 max-w-sm">
            For life-threatening emergencies, please call your local emergency services (112) immediately.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
