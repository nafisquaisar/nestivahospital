"use client";

/**
 * AboutStatsRow — horizontal stat strip for About pages
 */

import { motion } from "framer-motion";
import { Calendar, Building2, UserCheck, Activity, Heart, Star } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";

const ICON_MAP: Record<string, React.ElementType> = {
  Calendar, Building2, UserCheck, Activity, Heart, Star,
};

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface AboutStatsRowProps {
  stats: Stat[];
  variant?: "light" | "primary";
}

export function AboutStatsRow({ stats, variant = "light" }: AboutStatsRowProps) {
  const isReduced = useReducedMotion();
  const isDark = variant === "primary";

  return (
    <section
      className={cn(
        "py-10 md:py-12",
        isDark
          ? "bg-gradient-to-r from-primary to-secondary"
          : "bg-muted/40 border-y border-border"
      )}
      aria-label="Hospital statistics"
    >
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] ?? Activity;
            return (
              <motion.div
                key={stat.label}
                initial={isReduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl mb-1",
                    isDark ? "bg-white/15" : "bg-primary/10"
                  )}
                  aria-hidden="true"
                >
                  <Icon className={cn("h-5 w-5", isDark ? "text-white" : "text-primary")} />
                </div>
                <p className={cn("font-display text-2xl font-extrabold", isDark ? "text-white" : "text-foreground")}>
                  {stat.value}
                </p>
                <p className={cn("text-xs font-medium leading-tight", isDark ? "text-white/70" : "text-muted-foreground")}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
