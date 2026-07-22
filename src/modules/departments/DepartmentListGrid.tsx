"use client";

/**
 * DepartmentListGrid — All departments overview card grid
 */

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Heart, Brain, Bone, Ribbon, Baby, Siren, Activity, ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Department } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Ribbon, Baby, Siren, Activity,
};

const GRADIENTS = [
  "from-blue-50 to-indigo-100",
  "from-teal-50 to-cyan-100",
  "from-purple-50 to-violet-100",
  "from-rose-50 to-pink-100",
  "from-amber-50 to-orange-100",
  "from-emerald-50 to-green-100",
];

interface DepartmentListGridProps {
  departments: Department[];
}

function DepartmentCard({ dept, index }: { dept: Department; index: number }) {
  const [imgError, setImgError] = useState(false);
  const Icon = ICON_MAP[dept.icon] ?? Activity;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link
      href={`/departments/${dept.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={`${dept.name} department`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {!imgError ? (
          <Image
            src={dept.image.src}
            alt={dept.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={cn("h-full w-full bg-gradient-to-br flex items-center justify-center", gradient)}>
            <Icon className="h-16 w-16 text-foreground/20" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 text-xs font-semibold text-white">
            {dept.totalDoctors} Specialists
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10" aria-hidden="true">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {dept.name}
            </h3>
            <p className="text-xs text-muted-foreground">{dept.shortDescription}</p>
          </div>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label={`${dept.name} services`}>
          {dept.services.slice(0, 3).map((svc) => (
            <li key={svc} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {svc}
            </li>
          ))}
          {dept.services.length > 3 && (
            <li className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{dept.services.length - 3} more
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2">
          Learn more <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export function DepartmentListGrid({ departments }: DepartmentListGridProps) {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="depts-grid-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="All Departments"
          title="Comprehensive Specialty Care"
          titleId="depts-grid-heading"
          subtitle="28 specialties under one roof — each staffed by fellowship-trained experts with dedicated diagnostic and treatment facilities."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={isReduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <DepartmentCard dept={dept} index={i} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
