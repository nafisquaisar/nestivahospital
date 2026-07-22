"use client";

/**
 * DoctorsSection
 * Featured doctors showcase — 4-column responsive grid.
 * Uses centralized animation system from @/lib/animations.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DoctorCard } from "@/components/common/DoctorCard";
import { Container } from "@/components/shared/Container";
import { doctors } from "@/data/doctors";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
  lazyViewport,
  animationProps,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

const featuredDoctors = doctors.filter((d) => d.featured).slice(0, 4);

export function DoctorsSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="doctors"
      className="bg-muted/20 py-16 md:py-24"
      aria-labelledby="doctors-heading"
    >
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
        >
          <SectionHeader
            eyebrow="Meet Our Team"
            title="Expert Doctors"
            titleId="doctors-heading"
            subtitle="Our specialists combine decades of clinical experience with genuine compassion, making you feel confident and cared for from day one."
            align="left"
            action={
              <Button asChild variant="outline" className="gap-2 shrink-0">
                <Link href="/doctors">
                  View All Doctors
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </motion.div>

        {/* Doctor grid */}
        <motion.div
          {...animationProps(isReduced, {
            variants: staggerContainer(0.1, 0.1),
            viewport: lazyViewport,
          })}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredDoctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              {...animationProps(isReduced, { variants: staggerItem })}
            >
              <DoctorCard doctor={doctor} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
