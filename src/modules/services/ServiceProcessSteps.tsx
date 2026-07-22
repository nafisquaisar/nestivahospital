"use client";

/**
 * ServiceProcessSteps — How it works / step-by-step process section
 */

import { motion } from "framer-motion";
import {
  LogIn, ClipboardList, Stethoscope, Activity, CheckCircle, Calendar, FileText,
  Pipette, Search, Send, Video, MessageCircle, ClipboardCheck, MessageSquare,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { ProcessStep } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  LogIn, ClipboardList, Stethoscope, Activity, CheckCircle, Calendar, FileText,
  Pipette, Search, Send, Video, MessageCircle, ClipboardCheck, MessageSquare,
};

interface ServiceProcessStepsProps {
  steps: ProcessStep[];
  eyebrow?: string;
  title?: string;
}

export function ServiceProcessSteps({
  steps,
  eyebrow = "How It Works",
  title = "Your Care Journey, Step by Step",
}: ServiceProcessStepsProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="process-heading">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="process-heading"
          subtitle="We've streamlined every step of your care experience so you can focus on what matters most — your health."
          align="center"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-1/2 top-8 hidden h-0.5 w-[calc(100%-6rem)] -translate-x-1/2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => {
              const Icon = ICON_MAP[step.icon ?? "Activity"] ?? Activity;
              return (
                <motion.div
                  key={step.step}
                  initial={isReduced ? undefined : { opacity: 0, y: 20 }}
                  whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  {/* Step circle */}
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                    {/* Step number badge */}
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary text-xs font-extrabold text-primary">
                      {step.step}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
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
