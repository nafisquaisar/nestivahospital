/**
 * FeatureCard
 * "Why Choose Us" feature highlight card.
 * Server Component — hover via Tailwind, icons dynamically resolved.
 */

import {
  UserCheck, Microscope, Siren, HeartHandshake,
  Shield, Award, Activity, Zap,
} from "lucide-react";
import { cn } from "@/utils";
import type { Feature } from "@/types";

/* ── Icon registry ────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck, Microscope, Siren, HeartHandshake, Shield, Award, Activity, Zap,
};

/* ── Color system ─────────────────────────────────────────────────────────── */
type ColorKey = NonNullable<Feature["color"]>;

const COLOR_MAP: Record<
  ColorKey,
  { bg: string; iconBg: string; icon: string; accent: string }
> = {
  primary: {
    bg: "hover:bg-primary/[0.03]",
    iconBg: "bg-primary/10",
    icon: "text-primary",
    accent: "bg-primary",
  },
  secondary: {
    bg: "hover:bg-secondary/[0.03]",
    iconBg: "bg-secondary/10",
    icon: "text-secondary",
    accent: "bg-secondary",
  },
  accent: {
    bg: "hover:bg-accent/[0.03]",
    iconBg: "bg-amber-100",
    icon: "text-amber-600",
    accent: "bg-accent",
  },
  success: {
    bg: "hover:bg-success/[0.03]",
    iconBg: "bg-success/10",
    icon: "text-success",
    accent: "bg-success",
  },
  danger: {
    bg: "hover:bg-danger/[0.03]",
    iconBg: "bg-danger/10",
    icon: "text-danger",
    accent: "bg-danger",
  },
};

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon   = ICON_MAP[feature.icon] ?? Activity;
  const colors = COLOR_MAP[(feature.color ?? "primary") as ColorKey];

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/50 bg-card p-6",
        "shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        colors.bg
      )}
      aria-label={feature.title}
    >
      {/* Accent bar */}
      <div
        className={cn(
          "absolute left-0 top-6 h-10 w-1 rounded-r-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.accent
        )}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
          colors.iconBg
        )}
      >
        <Icon className={cn("h-7 w-7", colors.icon)} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold text-foreground">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>

      {/* Stat badge */}
      {feature.stat && (
        <div
          className={cn(
            "mt-auto inline-flex self-start items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            colors.iconBg, colors.icon
          )}
        >
          <span className={cn("h-1 w-1 rounded-full", colors.accent)} />
          {feature.stat}
        </div>
      )}
    </article>
  );
}
