"use client";

/**
 * HeroImage
 * Right column of the Hero section.
 * Doctor image with floating glassmorphism stat cards.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Star, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/utils";

/* ── Floating stat cards ─────────────────────────────────────────────────── */
const floatingCards = [
  {
    id: "patients",
    icon: Users,
    value: "50K+",
    label: "Happy Patients",
    colorClass: "text-secondary",
    bgClass: "bg-secondary/15",
    position: "bottom-16 -left-10 sm:-left-14",
    delay: 0.6,
  },
  {
    id: "rating",
    icon: Star,
    value: "4.9 ★",
    label: "Patient Rating",
    colorClass: "text-accent-dark",
    bgClass: "bg-accent/20",
    position: "top-16 -right-6 sm:-right-10",
    delay: 0.75,
  },
  {
    id: "emergency",
    icon: Clock,
    value: "24 / 7",
    label: "Emergency Care",
    colorClass: "text-danger",
    bgClass: "bg-danger/15",
    position: "-top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-left-6",
    delay: 0.9,
  },
  {
    id: "certified",
    icon: ShieldCheck,
    value: "JCI",
    label: "Accredited",
    colorClass: "text-success",
    bgClass: "bg-success/15",
    position: "bottom-1/4 -right-6 sm:-right-10",
    delay: 1.05,
  },
] as const;

export function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[440px] lg:max-w-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
    >
      {/* Background blobs */}
      <div className="absolute -inset-10 -z-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />
      </div>

      {/* ── Main image frame ──────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto h-[420px] w-[320px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[500px] sm:w-[380px]"
      >
        {/* Gradient background (visible while image loads / as fallback) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10" />

        <Image
          src="/assets/images/hero/doctor.png"
          alt="Expert physician at Nestiva Hospital — compassionate, world-class care"
          fill
          sizes="(max-width: 640px) 320px, 380px"
          className="object-cover object-top"
          priority
        />

        {/* Subtle inner shadow */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20" />
      </motion.div>

      {/* ── Floating cards ────────────────────────────────── */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.id}
          className={cn(
            "absolute z-10 hidden sm:flex",
            "items-center gap-2.5 rounded-2xl px-3.5 py-2.5",
            "glass shadow-lg",
            card.position
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
              card.bgClass
            )}
          >
            <card.icon className={cn("h-4 w-4", card.colorClass)} aria-hidden="true" />
          </div>
          <div>
            <p className="text-[13px] font-bold leading-none text-foreground">{card.value}</p>
            <p className="mt-0.5 text-[11px] leading-none text-muted-foreground">{card.label}</p>
          </div>
        </motion.div>
      ))}

      {/* Decorative dots grid */}
      <div
        className="absolute -bottom-8 -right-8 -z-10 h-32 w-32 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
