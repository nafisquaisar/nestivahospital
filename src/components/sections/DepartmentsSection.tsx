"use client";

/**
 * DepartmentsSection
 * Responsive 3-column grid of department cards with scroll-reveal stagger.
 * Uses centralized animation system from @/lib/animations.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentCard } from "@/components/common/DepartmentCard";
import { Container } from "@/components/shared/Container";
import { departments } from "@/data/departments";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
  lazyViewport,
  animationProps,
} from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

export function DepartmentsSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="departments"
      className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24"
      aria-labelledby="departments-heading"
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
            eyebrow="Our Specialties"
            title="World-Class Departments"
            titleId="departments-heading"
            subtitle="Comprehensive medical care across every discipline — from routine check-ups to complex surgical interventions, all under one roof."
            align="left"
            action={
              <Button asChild variant="outline" className="gap-2">
                <Link href="/departments">
                  All Departments
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </motion.div>

        {/* Department grid */}
        <motion.div
          {...animationProps(isReduced, {
            variants: staggerContainer(0.08, 0.1),
            viewport: lazyViewport,
          })}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              {...animationProps(isReduced, { variants: staggerItem })}
            >
              <DepartmentCard department={dept} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
