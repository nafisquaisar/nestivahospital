"use client";

/**
 * ContactHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium hero section for the Contact Us page.
 * Features animated entrance, gradient background, breadcrumb,
 * heading, description, and a decorative right-side visual.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, MessageCircle, HeartPulse, Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useReducedMotion } from "@/hooks";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ContactHero() {
  const isReduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20"
      style={{
        background:
          "linear-gradient(135deg, hsl(210 100% 40% / 0.06) 0%, hsl(220 20% 97%) 50%, hsl(174 62% 42% / 0.05) 100%)",
      }}
      aria-labelledby="contact-hero-heading"
    >
      {/* ── Decorative blobs ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/6 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* ── Left: Text Content ─────────────────────────────── */}
          <motion.div
            variants={isReduced ? undefined : containerVariants}
            initial={isReduced ? undefined : "hidden"}
            animate={isReduced ? undefined : "show"}
            className="flex flex-col gap-5"
          >
            {/* Breadcrumb */}
            <motion.nav
              variants={isReduced ? undefined : itemVariants}
              aria-label="Breadcrumb"
              className="flex items-center gap-1 text-sm"
            >
              <Link
                href="/"
                className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Home"
              >
                <Home className="h-3.5 w-3.5" />
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
              <span className="font-medium text-foreground" aria-current="page">
                Contact
              </span>
            </motion.nav>

            {/* Eyebrow */}
            <motion.span
              variants={isReduced ? undefined : itemVariants}
              className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
            >
              <span className="h-px w-8 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Contact Us
            </motion.span>

            {/* Heading */}
            <motion.h1
              id="contact-hero-heading"
              variants={isReduced ? undefined : itemVariants}
              className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              We&apos;re Here{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                When You Need Us
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={isReduced ? undefined : itemVariants}
              className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Whether you need emergency care, appointment assistance, medical
              information, or general enquiries, our team is available to help
              you — every day, around the clock.
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              variants={isReduced ? undefined : itemVariants}
              className="mt-2 flex flex-wrap gap-6"
            >
              {[
                { icon: HeartPulse, label: "Emergency Care", value: "24 / 7" },
                { icon: MessageCircle, label: "Avg. Response", value: "< 2 hrs" },
                { icon: Clock, label: "OPD Hours", value: "8am – 8pm" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display text-xl font-extrabold text-primary sm:text-2xl">
                    {value}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Decorative Illustration ─────────────────── */}
          <motion.div
            initial={isReduced ? undefined : { opacity: 0, x: 40 }}
            animate={isReduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Main card */}
            <div className="relative z-10 w-full max-w-sm">
              {/* Reception desk illustration (CSS art) */}
              <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white to-primary/5 p-8 shadow-2xl shadow-primary/10 backdrop-blur-sm">
                {/* Inner decoration */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl" />

                {/* Icon grid */}
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { icon: HeartPulse, label: "Emergency", color: "bg-danger/10 text-danger", border: "border-danger/20" },
                    { icon: MessageCircle, label: "Enquiries", color: "bg-primary/10 text-primary", border: "border-primary/20" },
                    { icon: Clock, label: "24 / 7 Care", color: "bg-secondary/10 text-secondary", border: "border-secondary/20" },
                    { icon: Home, label: "Location", color: "bg-accent/10 text-accent-dark", border: "border-accent/20" },
                  ].map(({ icon: Icon, label, color, border }) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center gap-2 rounded-2xl border ${border} ${color} p-4`}
                    >
                      <Icon className="h-7 w-7" />
                      <span className="text-xs font-semibold">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center">
                  <p className="text-xs font-semibold text-foreground/70">
                    We respond to all enquiries within
                  </p>
                  <p className="font-display text-2xl font-extrabold text-primary">
                    2 Business Hours
                  </p>
                </div>
              </div>

              {/* Floating badge 1 */}
              <motion.div
                animate={isReduced ? undefined : {
                  y: [-5, 5, -5],
                  transition: { duration: 4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] },
                }}
                className="absolute -left-6 top-8 flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-2 shadow-lg shadow-black/8"
              >
                <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-foreground">
                  Doctors Online
                </span>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={isReduced ? undefined : {
                  y: [5, -5, 5],
                  transition: { duration: 4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: 1 },
                }}
                className="absolute -right-4 bottom-12 flex items-center gap-2 rounded-full border border-white/80 bg-white px-3 py-2 shadow-lg shadow-black/8"
              >
                <HeartPulse className="h-4 w-4 text-danger" />
                <span className="text-xs font-semibold text-foreground">
                  Emergency Ready
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
