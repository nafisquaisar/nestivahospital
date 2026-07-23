"use client";

/**
 * TrustStats
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated counter statistics section. Four key hospital metrics.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, HeartPulse, Clock, Star } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

interface Stat {
  id: string;
  icon: React.ElementType;
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  bg: string;
}

const stats: Stat[] = [
  {
    id: "doctors",
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Expert Doctors",
    description: "Board-certified specialists",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "patients",
    icon: HeartPulse,
    value: 100,
    suffix: "K+",
    label: "Patients Treated",
    description: "And counting every year",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    id: "emergency",
    icon: Clock,
    prefix: "",
    value: 24,
    suffix: "/7",
    label: "Emergency Care",
    description: "Always ready, always there",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    id: "satisfaction",
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Patient Satisfaction",
    description: "Rated by verified patients",
    color: "text-accent-dark",
    bg: "bg-accent/10",
  },
];

function AnimatedCounter({
  value,
  suffix,
  prefix,
  active,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!active || isReduced) {
      setCount(value);
      return;
    }
    let start = 0;
    const duration = 1800;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, value, isReduced]);

  return (
    <span>
      {prefix ?? ""}
      {count}
      {suffix}
    </span>
  );
}

export function TrustStats() {
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.04] py-16 md:py-20"
      aria-labelledby="trust-stats-heading"
    >
      <Container>
        <h2 id="trust-stats-heading" className="sr-only">
          Nestiva Hospital Statistics
        </h2>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={isReduced ? undefined : { opacity: 0, y: 24 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Background glow */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    stat.bg
                  )}
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                      stat.bg
                    )}
                  >
                    <Icon className={cn("h-5 w-5", stat.color)} aria-hidden="true" />
                  </div>

                  {/* Counter */}
                  <div
                    className={cn(
                      "font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
                      stat.color
                    )}
                    aria-live="polite"
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      active={isInView}
                    />
                  </div>

                  {/* Labels */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-foreground">{stat.label}</span>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
