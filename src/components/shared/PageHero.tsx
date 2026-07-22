"use client";

/**
 * PageHero
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium inner-page hero banner used on all section pages.
 * Replaces the basic PageHeader with animated entrance, gradient bg,
 * built-in breadcrumb, optional stats row, and decorative blobs.
 *
 * Server-safe (no hooks) — animations use CSS classes + Framer Motion.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroStat {
  value: string;
  label: string;
}

interface PageHeroProps {
  /** Small eyebrow label above the title */
  eyebrow?: string;
  /** Main page title — rendered as h1 */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Breadcrumb trail */
  breadcrumbs: BreadcrumbItem[];
  /** Optional stat row below the subtitle */
  stats?: PageHeroStat[];
  /** Visual variant */
  variant?: "gradient" | "primary" | "dark";
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  stats,
  variant = "gradient",
  className,
}: PageHeroProps) {
  const isReduced = useReducedMotion();

  const isDark = variant === "primary" || variant === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16",
        variant === "gradient" &&
          "bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04]",
        variant === "primary" &&
          "bg-gradient-to-br from-primary via-primary/90 to-secondary",
        variant === "dark" &&
          "bg-gradient-to-br from-foreground/95 via-foreground to-foreground/90",
        className
      )}
      aria-label={`${title} page header`}
    >
      {/* Decorative background blobs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-3xl",
            isDark ? "bg-white/5" : "bg-primary/8"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-3xl",
            isDark ? "bg-white/5" : "bg-secondary/8"
          )}
        />
        {/* Dot grid */}
        <div
          className={cn(
            "absolute inset-0 opacity-[0.03]",
            isDark && "opacity-[0.06]"
          )}
          style={{
            backgroundImage: `radial-gradient(circle, ${
              isDark ? "white" : "hsl(210 100% 40%)"
            } 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container>
        <motion.div
          variants={isReduced ? undefined : containerVariants}
          initial={isReduced ? undefined : "hidden"}
          animate={isReduced ? undefined : "show"}
          className="flex flex-col gap-4"
        >
          {/* ── Breadcrumb ──────────────────────────────────────── */}
          <motion.nav
            variants={isReduced ? undefined : itemVariants}
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-sm"
          >
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1 transition-colors",
                isDark
                  ? "text-white/60 hover:text-white"
                  : "text-muted-foreground hover:text-primary"
              )}
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5",
                    isDark ? "text-white/30" : "text-muted-foreground/50"
                  )}
                  aria-hidden="true"
                />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "transition-colors",
                      isDark
                        ? "text-white/60 hover:text-white"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-medium",
                      isDark ? "text-white/90" : "text-foreground"
                    )}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>

          {/* ── Eyebrow ─────────────────────────────────────────── */}
          {eyebrow && (
            <motion.span
              variants={isReduced ? undefined : itemVariants}
              className={cn(
                "inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]",
                isDark ? "text-white/70" : "text-primary"
              )}
            >
              <span
                className={cn(
                  "h-px w-8 shrink-0 rounded-full",
                  isDark
                    ? "bg-white/40"
                    : "bg-gradient-to-r from-primary to-secondary"
                )}
              />
              {eyebrow}
            </motion.span>
          )}

          {/* ── Title ────────────────────────────────────────────── */}
          <motion.h1
            variants={isReduced ? undefined : itemVariants}
            className={cn(
              "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl",
              isDark ? "text-white" : "text-foreground"
            )}
          >
            {title}
          </motion.h1>

          {/* ── Subtitle ─────────────────────────────────────────── */}
          {subtitle && (
            <motion.p
              variants={isReduced ? undefined : itemVariants}
              className={cn(
                "max-w-2xl text-base leading-relaxed md:text-lg",
                isDark ? "text-white/75" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {/* ── Stats row ────────────────────────────────────────── */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={isReduced ? undefined : itemVariants}
              className="mt-2 flex flex-wrap gap-6 sm:gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className={cn(
                      "font-display text-2xl font-extrabold sm:text-3xl",
                      isDark ? "text-white" : "text-primary"
                    )}
                  >
                    {stat.value}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isDark ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
