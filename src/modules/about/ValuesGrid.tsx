"use client";

/**
 * ValuesGrid — Core values 3-col grid with icon, title, description
 */

import { motion } from "framer-motion";
import {
  HeartHandshake, Award, ShieldCheck, Zap, Users, Handshake, Activity,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { CoreValue } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  HeartHandshake, Award, ShieldCheck, Zap, Users, Handshake, Activity,
};

const COLOR_MAP = {
  primary:   { bg: "bg-primary/10",   icon: "text-primary",   border: "border-primary/20" },
  secondary: { bg: "bg-secondary/10", icon: "text-secondary", border: "border-secondary/20" },
  accent:    { bg: "bg-amber-100/70", icon: "text-amber-600", border: "border-amber-200/50" },
  success:   { bg: "bg-success/10",   icon: "text-success",   border: "border-success/20" },
};

interface ValuesGridProps {
  values: CoreValue[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function ValuesGrid({ values, eyebrow = "What We Stand For", title = "Our Core Values", subtitle }: ValuesGridProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-muted/30 py-16 md:py-20" aria-labelledby="values-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="values-heading"
          subtitle={subtitle}
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => {
            const Icon = ICON_MAP[value.icon] ?? Activity;
            const colors = COLOR_MAP[value.color ?? "primary"];
            return (
              <motion.div
                key={value.id}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border bg-card p-6",
                  "shadow-sm hover:shadow-md transition-all duration-300",
                  colors.border
                )}
              >
                <div
                  className={cn("flex h-12 w-12 items-center justify-center rounded-xl", colors.bg)}
                  aria-hidden="true"
                >
                  <Icon className={cn("h-6 w-6", colors.icon)} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
