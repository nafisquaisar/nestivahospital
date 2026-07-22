/**
 * Statistics Data
 * ─────────────────────────────────────────────────────────────────────────────
 * Hospital key metrics displayed in the Stats Section.
 * Icons: Lucide icon names.
 */

import type { Statistic } from "@/types";

export const statistics: Statistic[] = [
  {
    id: "experience",
    value: 25,
    suffix: "+",
    label: "Years of Experience",
    description: "Trusted care since 2000, shaping the future of medicine.",
    icon: "Award",
    color: "primary",
  },
  {
    id: "doctors",
    value: 500,
    suffix: "+",
    label: "Expert Doctors",
    description: "Specialists across every discipline, dedicated to your health.",
    icon: "UserCheck",
    color: "secondary",
  },
  {
    id: "patients",
    value: 50000,
    suffix: "+",
    label: "Happy Patients",
    description: "Lives improved through compassionate, world-class treatment.",
    icon: "Heart",
    color: "accent",
  },
  {
    id: "departments",
    value: 30,
    suffix: "+",
    label: "Departments",
    description: "Comprehensive specialties covering every facet of healthcare.",
    icon: "Building2",
    color: "success",
  },
];

export default statistics;
