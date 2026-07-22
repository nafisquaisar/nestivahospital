"use client";

/**
 * ServiceListGrid — All services overview cards
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { Siren, Microscope, Monitor, Scissors, Activity, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Service } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Siren, Microscope, Monitor, Scissors, Activity,
};

const COLOR_CYCLE = ["primary", "secondary", "accent", "success"] as const;

const COLOR_MAP = {
  primary:   { bg: "bg-primary/10",   icon: "text-primary",   border: "hover:border-primary/30" },
  secondary: { bg: "bg-secondary/10", icon: "text-secondary", border: "hover:border-secondary/30" },
  accent:    { bg: "bg-amber-100/60", icon: "text-amber-600", border: "hover:border-amber-300/50" },
  success:   { bg: "bg-success/10",   icon: "text-success",   border: "hover:border-success/30" },
};

interface ServiceListGridProps {
  services: Service[];
}

export function ServiceListGrid({ services }: ServiceListGridProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="services-grid-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="What We Offer"
          title="Comprehensive Medical Services"
          titleId="services-grid-heading"
          subtitle="From round-the-clock emergency response to precision surgical care — every service is delivered with the expertise and compassion you deserve."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] ?? Activity;
            const color = COLOR_MAP[COLOR_CYCLE[i % COLOR_CYCLE.length]];

            return (
              <motion.div
                key={svc.id}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link
                  href={`/services/${svc.slug}`}
                  className={cn(
                    "group flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    color.border
                  )}
                  aria-label={svc.name}
                >
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                      color.bg
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn("h-7 w-7", color.icon)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {svc.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {svc.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.stats.slice(0, 2).map((stat) => (
                        <span key={stat.label} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {stat.value} {stat.label}
                        </span>
                      ))}
                    </div>
                    <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-200">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
