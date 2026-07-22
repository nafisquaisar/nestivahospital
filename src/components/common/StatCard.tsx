"use client";

/**
 * StatCard
 * Reusable statistics card with:
 *   • Lucide icon (dynamically loaded by name)
 *   • Animated counter
 *   • Hover lift animation
 *   • Scroll reveal via whileInView
 */

import { motion } from "framer-motion";
import {
  Award,
  UserCheck,
  Heart,
  Building2,
  Star,
  Clock,
  ShieldCheck,
  Activity,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/utils";
import type { Statistic } from "@/types";

/* ── Icon registry ───────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Award, UserCheck, Heart, Building2, Star,
  Clock, ShieldCheck, Activity, TrendingUp, Users,
};

/* ── Color map (color token → Tailwind classes) ──────────────────────────── */
const COLOR_MAP = {
  primary:   { bg: "bg-primary/10",   icon: "text-primary",   border: "border-primary/20"   },
  secondary: { bg: "bg-secondary/10", icon: "text-secondary", border: "border-secondary/20" },
  accent:    { bg: "bg-accent/10",    icon: "text-amber-500", border: "border-accent/20"    },
  success:   { bg: "bg-success/10",   icon: "text-success",   border: "border-success/20"   },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

interface StatCardProps {
  stat: Statistic;
  index?: number;
}

export function StatCard({ stat, index = 0 }: StatCardProps) {
  const Icon = ICON_MAP[stat.icon] ?? Activity;
  const colors = COLOR_MAP[(stat.color ?? "primary") as ColorKey];

  /* Format large numbers */
  const displayValue =
    stat.value >= 1000
      ? `${(stat.value / 1000).toFixed(0)}K${stat.suffix}`
      : `${stat.value}${stat.suffix}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border bg-card p-6",
        "shadow-sm hover:shadow-xl transition-all duration-300",
        colors.border
      )}
      aria-label={`${displayValue} ${stat.label}`}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          colors.bg
        )}
        aria-hidden="true"
      >
        <Icon className={cn("h-6 w-6", colors.icon)} />
      </div>

      {/* Value */}
      <div>
        <p className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          {displayValue}
        </p>
        <p className="mt-0.5 text-base font-semibold text-foreground/80">{stat.label}</p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">{stat.description}</p>

      {/* Decorative accent bar */}
      <div
        className={cn(
          "absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.bg
        )}
        style={{
          background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
