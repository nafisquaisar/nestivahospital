"use client";

/**
 * StatsSection
 * Renders a responsive grid of StatCards.
 * Reads data from data/statistics.ts — no hardcoded values.
 */

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatCard } from "@/components/common/StatCard";
import { statistics } from "@/data/statistics";
import { fadeUp, staggerContainer, staggerItem, defaultViewport, lazyViewport, animationProps } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

export function StatsSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      className="bg-muted/40 py-16 md:py-24"
      aria-label="Hospital statistics"
    >
      <Container>
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
        >
          <SectionHeader
            eyebrow="Our Achievements"
            title="Trusted by Thousands"
            subtitle="Decades of excellence, thousands of lives transformed — our numbers speak to the trust our patients place in us."
            align="center"
          />
        </motion.div>

        <motion.div
          {...animationProps(isReduced, {
            variants: staggerContainer(0.1, 0.1),
            viewport: lazyViewport,
          })}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statistics.map((stat, i) => (
            <motion.div
              key={stat.id}
              {...animationProps(isReduced, { variants: staggerItem })}
            >
              <StatCard stat={stat} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
