/**
 * DepartmentCard
 * Premium department card with gradient top, icon, name, description & CTA.
 * Server Component — hover effects via Tailwind CSS transitions.
 */

import type React from "react";
import Link from "next/link";
import {
  Heart, Brain, Bone, Ribbon, Baby, Siren, Activity,
  Stethoscope, Microscope, Eye, Wind, Pill,
} from "lucide-react";
import { cn } from "@/utils";
import type { Department } from "@/types";

/* ── Icon registry ────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Brain, Bone, Ribbon, Baby, Siren, Activity,
  Stethoscope, Microscope, Eye, Wind, Pill,
};

/* ── Gradient palette — cycling through 6 variants ───────────────────────── */
const GRADIENTS = [
  "from-blue-50   via-sky-50     to-indigo-50",
  "from-violet-50 via-purple-50  to-fuchsia-50",
  "from-cyan-50   via-teal-50    to-emerald-50",
  "from-rose-50   via-pink-50    to-red-50",
  "from-amber-50  via-yellow-50  to-orange-50",
  "from-green-50  via-emerald-50 to-teal-50",
] as const;

const ICON_COLORS = [
  "text-blue-500",   "text-violet-500",
  "text-teal-500",   "text-rose-500",
  "text-amber-500",  "text-green-500",
] as const;

interface DepartmentCardProps {
  department: Department;
  index?: number;
}

export function DepartmentCard({ department, index = 0 }: DepartmentCardProps) {
  const Icon      = ICON_MAP[department.icon] ?? Stethoscope;
  const gradient  = GRADIENTS[index % GRADIENTS.length];
  const iconColor = ICON_COLORS[index % ICON_COLORS.length];

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
      )}
      aria-label={department.name}
    >
      {/* ── Gradient illustration top ─────────────────────── */}
      <div
        className={cn(
          "relative flex h-44 items-center justify-center overflow-hidden",
          "bg-gradient-to-br",
          gradient
        )}
      >
        {/* Large faded icon */}
        <Icon
          className={cn("h-24 w-24 opacity-20 transition-transform duration-500 group-hover:scale-110", iconColor)}
          aria-hidden="true"
        />
        {/* Floating icon badge */}
        <div
          className={cn(
            "absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-border/20"
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} aria-hidden="true" />
        </div>
        {/* Doctor count badge */}
        <div className="absolute right-4 top-4 rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
          {department.totalDoctors} Doctors
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {department.name}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {department.shortDescription}
        </p>

        {/* Learn more link */}
        <Link
          href={`/departments/${department.slug}`}
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
            "hover:gap-2.5 transition-all duration-200"
          )}
          aria-label={`Learn more about ${department.name}`}
        >
          Learn More
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
