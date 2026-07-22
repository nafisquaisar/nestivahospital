"use client";

/**
 * HeroContent
 * Left column of the Hero section.
 * Staggered Framer Motion entrance animation.
 * Reads branding values from config.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, UserCheck, Zap, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";

/* ── Animation Variants ───────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

/* ── Highlights ───────────────────────────────────────────────────────────── */
const highlights = [
  { icon: ShieldCheck,   label: "Emergency Care",        desc: "24 / 7 rapid response" },
  { icon: UserCheck,     label: "Expert Doctors",        desc: "500+ certified specialists" },
  { icon: Zap,           label: "Advanced Technology",   desc: "Latest medical equipment" },
  { icon: HeartHandshake,label: "Patient-Centred Care",  desc: "Compassion at every step" },
] as const;

export function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-7 py-6"
    >
      {/* ── Badge ─────────────────────────────────────────── */}
      <motion.div variants={itemVariants}>
        <span
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Certified Healthcare Excellence
        </span>
      </motion.div>

      {/* ── Heading ───────────────────────────────────────── */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
      >
        {branding.name.split(" ").slice(0, 1)[0]}{" "}
        <span className="gradient-text">Advanced</span> Care,
        <br />
        <span className="gradient-text">Human</span> Touch
      </motion.h1>

      {/* ── Description ───────────────────────────────────── */}
      <motion.p
        variants={itemVariants}
        className="max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground"
      >
        {branding.description}
      </motion.p>

      {/* ── CTAs ──────────────────────────────────────────── */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
          <Link href="/appointment">
            Book Appointment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/about">Learn More</Link>
        </Button>
      </motion.div>

      {/* ── Highlights Grid ───────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-3 sm:grid-cols-2"
      >
        {highlights.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="group flex items-center gap-3 rounded-xl border border-border/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{label}</p>
              <p className="truncate text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
