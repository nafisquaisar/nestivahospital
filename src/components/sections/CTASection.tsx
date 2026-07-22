"use client";

/**
 * CTASection
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-width Call-to-Action banner — compacted by ~25%.
 * Gradient background from primary to secondary with grid texture overlay.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, CalendarCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { branding } from "@/config/branding";
import { fadeUp, scaleIn, defaultViewport, animationProps } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

export function CTASection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-14 md:py-20"
      aria-labelledby="cta-heading"
    >
      {/* ── Background decoration ────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
        {/* Blurred orbs */}
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        {/* Subtle grid */}
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
        <div className="flex flex-col items-center gap-6 text-center">

          {/* ── Floating icon badge ──────────────────────────── */}
          <motion.div
            animate={isReduced ? undefined : { y: [0, -8, 0] }}
            transition={isReduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            aria-hidden="true"
          >
            <Stethoscope className="h-7 w-7 text-white" />
          </motion.div>

          {/* ── Headline ─────────────────────────────────────── */}
          <motion.div
            {...animationProps(isReduced, {
              variants: fadeUp,
              viewport: defaultViewport,
            })}
            className="flex flex-col gap-3"
          >
            <h2
              id="cta-heading"
              className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl"
            >
              Ready to Take the First Step
              <br className="hidden sm:block" />
              <span className="text-white/80"> Toward Better Health?</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-white/75 sm:text-base">
              Our specialists are ready to help you. Book an appointment in 60 seconds
              or call our 24/7 helpline — expert care is just one step away.
            </p>
          </motion.div>

          {/* ── Stats row ────────────────────────────────────── */}
          <motion.div
            {...animationProps(isReduced, {
              variants: scaleIn,
              viewport: defaultViewport,
            })}
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
            aria-label="Key statistics"
          >
            {[
              { value: "500+",  label: "Specialists" },
              { value: "50K+",  label: "Happy Patients" },
              { value: "24/7",  label: "Emergency Care" },
              { value: "98%",   label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-white/65 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── CTA buttons ──────────────────────────────────── */}
          <motion.div
            {...animationProps(isReduced, {
              variants: fadeUp,
              viewport: defaultViewport,
            })}
            className="flex flex-col gap-3 sm:flex-row sm:gap-3"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10 font-semibold"
            >
              <Link href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book an Appointment
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
          </motion.div>

          {/* ── Trust / accreditation badges ─────────────────── */}
          <div className="flex flex-wrap justify-center gap-2.5" aria-label="Accreditations">
            {branding.accreditations.map((acc) => (
              <span
                key={acc}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm"
              >
                {acc}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
