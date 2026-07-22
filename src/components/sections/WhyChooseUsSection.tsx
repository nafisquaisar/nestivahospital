"use client";

/**
 * WhyChooseUsSection
 * Premium feature cards with centralized animation system.
 */

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { features } from "@/data/features";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
  lazyViewport,
  animationProps,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

export function WhyChooseUsSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.04] py-16 md:py-24"
      aria-labelledby="why-choose-heading"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <Container className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
          className="text-center"
        >
          <SectionHeader
            eyebrow="Why Choose Us"
            title="The Nestiva Difference"
            titleId="why-choose-heading"
            subtitle="We combine medical excellence, cutting-edge technology, and genuine compassion to deliver an experience that goes beyond treatment — we care for the whole person."
            align="center"
          />
        </motion.div>

        {/* Features grid */}
        <motion.div
          {...animationProps(isReduced, {
            variants: staggerContainer(0.1, 0.1),
            viewport: lazyViewport,
          })}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              {...animationProps(isReduced, { variants: staggerItem })}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
