"use client";

/**
 * DepartmentDetailContent — Full content for a single department page.
 * Shows: description, conditions treated, services offered, and stats.
 */

import { motion } from "framer-motion";
import { CheckCircle2, Activity } from "lucide-react";
import { Heart, Brain, Bone, Ribbon, Baby, Siren } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Department } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Ribbon, Baby, Siren, Activity,
};

interface DepartmentDetailContentProps {
  department: Department;
}

export function DepartmentDetailContent({ department }: DepartmentDetailContentProps) {
  const isReduced = useReducedMotion();
  const Icon = ICON_MAP[department.icon] ?? Activity;

  return (
    <>
      {/* ── About section ─────────────────────────────────────────── */}
      <section className="bg-background py-14 md:py-18" aria-labelledby="dept-about-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: text */}
            <motion.div
              initial={isReduced ? undefined : { opacity: 0, x: -24 }}
              whileInView={isReduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col gap-5"
            >
              <SectionHeader
                eyebrow="About this Department"
                title={`${department.name} at Nestiva`}
                titleId="dept-about-heading"
                subtitle={department.description}
                align="left"
              />
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10" aria-hidden="true">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{department.totalDoctors} Specialist Doctors</p>
                  <p className="text-xs text-muted-foreground">Available for consultation & treatment</p>
                </div>
              </div>
            </motion.div>

            {/* Right: services + conditions */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Services */}
              <motion.div
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
                  Services Offered
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {department.services.map((svc) => (
                    <li key={svc} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {svc}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Conditions */}
              <motion.div
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-secondary">
                  Conditions Treated
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {department.conditions.map((cond) => (
                    <li key={cond} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      {cond}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Why Choose section ────────────────────────────────────── */}
      <section className="bg-muted/30 py-14 md:py-18" aria-labelledby="dept-why-heading">
        <Container>
          <SectionHeader
            eyebrow="Our Advantage"
            title={`Why Choose Nestiva for ${department.shortName ?? department.name}?`}
            titleId="dept-why-heading"
            subtitle={`Our ${department.name} department combines fellowship-trained specialists, cutting-edge technology, and a patient-first approach to deliver outcomes you can trust.`}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Expert Specialists", value: `${department.totalDoctors}+`, desc: "Board-certified physicians" },
              { label: "Services Available", value: `${department.services.length}+`, desc: "Diagnostic & treatment options" },
              { label: "Conditions Treated", value: `${department.conditions.length}+`, desc: "Common & complex conditions" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={isReduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="font-display text-3xl font-extrabold text-primary">{item.value}</span>
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
