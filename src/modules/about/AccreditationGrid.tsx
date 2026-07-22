"use client";

/**
 * AccreditationGrid — Certification cards with category, description, validity
 */

import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { AccreditationItem } from "@/types";

const COLOR_MAP: Record<string, { bg: string; badge: string; check: string }> = {
  primary:   { bg: "bg-primary/5 border-primary/20",   badge: "bg-primary/10 text-primary",   check: "text-primary" },
  secondary: { bg: "bg-secondary/5 border-secondary/20", badge: "bg-secondary/10 text-secondary", check: "text-secondary" },
  accent:    { bg: "bg-amber-50 border-amber-200/50",   badge: "bg-amber-100 text-amber-700",  check: "text-amber-600" },
  success:   { bg: "bg-success/5 border-success/20",   badge: "bg-success/10 text-success",   check: "text-success" },
};

interface AccreditationGridProps {
  items: AccreditationItem[];
}

export function AccreditationGrid({ items }: AccreditationGridProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="accred-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Certified Excellence"
          title="Our Accreditations & Certifications"
          titleId="accred-heading"
          subtitle="Every accreditation represents an independent audit of our systems, processes, and patient outcomes against the most rigorous international benchmarks."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const colors = COLOR_MAP[item.color ?? "primary"];
            return (
              <motion.article
                key={item.id}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-6 shadow-sm",
                  "transition-shadow duration-300 hover:shadow-md",
                  colors.bg
                )}
                aria-label={item.fullName}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className={cn("inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold", colors.badge)}>
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-foreground">{item.name}</h3>
                  </div>
                  <CheckCircle2 className={cn("h-6 w-6 shrink-0 mt-1", colors.check)} aria-hidden="true" />
                </div>

                <p className="text-xs font-medium text-muted-foreground leading-tight">{item.fullName}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                <div className="mt-auto flex items-center gap-4 border-t border-current/10 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    Accredited {item.year}
                  </div>
                  {item.validUntil && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      Valid until {item.validUntil}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
