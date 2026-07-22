/**
 * Departments Data — Dummy Content
 * ─────────────────────────────────────────────────────────────────────────────
 * Used in Quick Appointment selector and Departments section.
 */

import type { Department } from "@/types";

export const departments: Department[] = [
  {
    id: "cardiology",
    slug: "cardiology",
    name: "Cardiology",
    shortName: "Cardiology",
    description:
      "Our Cardiology department is equipped with state-of-the-art diagnostic tools and an expert team dedicated to preventing, diagnosing, and treating heart diseases.",
    shortDescription: "Expert heart & cardiovascular care.",
    icon: "Heart",
    image: { src: "/assets/images/departments/cardiology.jpg", alt: "Cardiology Department" },
    services: ["ECG", "Echocardiography", "Angioplasty", "Cardiac Rehabilitation"],
    conditions: ["Heart Attack", "Hypertension", "Arrhythmia", "Heart Failure"],
    totalDoctors: 12,
    featured: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "neurology",
    slug: "neurology",
    name: "Neurology",
    shortName: "Neurology",
    description:
      "Our Neurology department offers comprehensive care for disorders of the brain, spine, and nervous system using the latest neuroimaging and treatment techniques.",
    shortDescription: "Brain, spine & nervous system care.",
    icon: "Brain",
    image: { src: "/assets/images/departments/neurology.jpg", alt: "Neurology Department" },
    services: ["MRI Brain Scan", "EEG", "Lumbar Puncture", "Neuro Rehabilitation"],
    conditions: ["Stroke", "Epilepsy", "Parkinson's Disease", "Multiple Sclerosis"],
    totalDoctors: 9,
    featured: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "orthopedics",
    slug: "orthopedics",
    name: "Orthopedics",
    shortName: "Orthopedics",
    description:
      "World-class orthopedic care for bones, joints, muscles, and ligaments — from diagnosis to surgery and rehabilitation.",
    shortDescription: "Bone, joint & musculoskeletal care.",
    icon: "Bone",
    image: { src: "/assets/images/departments/orthopedics.jpg", alt: "Orthopedics Department" },
    services: ["Joint Replacement", "Arthroscopy", "Fracture Care", "Sports Medicine"],
    conditions: ["Arthritis", "Fractures", "Ligament Tears", "Spinal Disorders"],
    totalDoctors: 10,
    featured: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "oncology",
    slug: "oncology",
    name: "Oncology",
    shortName: "Oncology",
    description:
      "Comprehensive cancer care with a multidisciplinary approach, combining surgery, chemotherapy, radiation therapy, and immunotherapy.",
    shortDescription: "Advanced, compassionate cancer care.",
    icon: "Ribbon",
    image: { src: "/assets/images/departments/oncology.jpg", alt: "Oncology Department" },
    services: ["Chemotherapy", "Radiation Therapy", "Immunotherapy", "Palliative Care"],
    conditions: ["Breast Cancer", "Lung Cancer", "Blood Cancer", "Colon Cancer"],
    totalDoctors: 8,
    featured: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "pediatrics",
    slug: "pediatrics",
    name: "Pediatrics",
    shortName: "Pediatrics",
    description:
      "Dedicated paediatric care in a child-friendly environment. From newborn care to adolescent medicine, our specialists are here for every stage.",
    shortDescription: "Child & adolescent healthcare.",
    icon: "Baby",
    image: { src: "/assets/images/departments/pediatrics.jpg", alt: "Pediatrics Department" },
    services: ["Newborn Care", "Vaccinations", "Growth Monitoring", "Paediatric Surgery"],
    conditions: ["Asthma", "Childhood Infections", "Developmental Disorders", "Malnutrition"],
    totalDoctors: 11,
    featured: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "emergency",
    slug: "emergency",
    name: "Emergency Medicine",
    shortName: "Emergency",
    description:
      "24/7 emergency department staffed by experienced emergency physicians equipped to handle all life-threatening conditions.",
    shortDescription: "24/7 emergency & critical care.",
    icon: "Siren",
    image: { src: "/assets/images/departments/emergency.jpg", alt: "Emergency Department" },
    services: ["Trauma Care", "Resuscitation", "Emergency Surgery", "Critical Care"],
    conditions: ["Trauma", "Cardiac Arrest", "Stroke", "Poisoning"],
    totalDoctors: 15,
    featured: true,
    order: 6,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export default departments;
