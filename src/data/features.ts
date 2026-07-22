/**
 * Why Choose Us — Features Data
 * ─────────────────────────────────────────────────────────────────────────────
 * Powers the "Why Choose Us" section.
 * Backend-ready: replace array with API fetch via TanStack Query.
 */

import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id: "specialists",
    icon: "UserCheck",
    title: "Experienced Specialists",
    description:
      "Our 500+ board-certified specialists bring decades of combined expertise across every medical discipline, ensuring you receive the highest standard of care.",
    stat: "500+ Certified Doctors",
    color: "primary",
  },
  {
    id: "equipment",
    icon: "Microscope",
    title: "Modern Equipment",
    description:
      "State-of-the-art diagnostic and therapeutic technology — from 3T MRI scanners to robotic surgical systems — enabling faster, more accurate treatment.",
    stat: "Latest Medical Technology",
    color: "secondary",
  },
  {
    id: "emergency",
    icon: "Siren",
    title: "24 / 7 Emergency Care",
    description:
      "Round-the-clock emergency services with rapid response trauma teams, ensuring critical care is always available when every second counts.",
    stat: "Under 5-Min Response Time",
    color: "danger",
  },
  {
    id: "patient-centered",
    icon: "HeartHandshake",
    title: "Patient-Centred Care",
    description:
      "Every treatment plan is tailored to the individual. We listen first, combining clinical excellence with genuine compassion at every step of your journey.",
    stat: "98% Patient Satisfaction",
    color: "success",
  },
];

export default features;
