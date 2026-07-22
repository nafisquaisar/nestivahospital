"use client";

/**
 * ServiceFeatureList — Feature highlights for a single service page
 */

import { motion } from "framer-motion";
import {
  Clock, Ambulance, Heart, Brain, Baby, Shield, Scan, Zap, Activity, FlaskConical, Dna, Eye,
  Video, Stethoscope, FileText, RefreshCw, Lock, Globe, Bot, Minimize2, Bone,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { ServiceFeature } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Clock, Ambulance, Heart, Brain, Baby, Shield, Scan, Zap, Activity, FlaskConical, Dna, Eye,
  Video, Stethoscope, FileText, RefreshCw, Lock, Globe, Bot, Minimize2, Bone,
};

interface ServiceFeatureListProps {
  features: ServiceFeature[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function ServiceFeatureList({
  features,
  eyebrow = "Key Capabilities",
  title = "What We Offer",
  subtitle,
}: ServiceFeatureListProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-muted/30 py-16 md:py-20" aria-labelledby="service-features-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="service-features-heading"
          subtitle={subtitle}
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Activity;
            return (
              <motion.div
                key={feature.title}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
