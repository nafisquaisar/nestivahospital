"use client";

/**
 * TimelineSection — Hospital milestone timeline with alternating layout
 */

import { motion } from "framer-motion";
import {
  Building2, TrendingUp, Award, Ribbon, Monitor, Hospital, Microscope, Cpu, Activity,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Milestone } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, TrendingUp, Award, Ribbon, Monitor, Hospital, Microscope, Cpu, Activity,
};

interface TimelineSectionProps {
  milestones: Milestone[];
}

export function TimelineSection({ milestones }: TimelineSectionProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="timeline-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Our Journey"
          title="A Legacy Built Over Decades"
          titleId="timeline-heading"
          subtitle="From a 60-bed clinic to a 1,200-bed multi-specialty hospital — every milestone is a testament to our commitment."
          align="center"
        />

        <div className="relative mx-auto w-full max-w-4xl">
          {/* Central line */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 via-border to-transparent md:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 md:gap-0">
            {milestones.map((milestone, i) => {
              const Icon = ICON_MAP[milestone.icon ?? "Activity"] ?? Activity;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={isReduced ? undefined : { opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={isReduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={cn(
                    "relative flex items-center gap-6",
                    "md:w-[calc(50%-2rem)]",
                    isLeft ? "md:self-start md:pr-8" : "md:self-end md:pl-8"
                  )}
                >
                  {/* Card */}
                  <div
                    className={cn(
                      "flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm",
                      "transition-shadow duration-300 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10"
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-display text-xl font-extrabold text-primary">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground">{milestone.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Centre dot on desktop */}
                  <div
                    className={cn(
                      "absolute hidden md:flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background",
                      isLeft ? "-right-[calc(2rem+8px)]" : "-left-[calc(2rem+8px)]"
                    )}
                    aria-hidden="true"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
