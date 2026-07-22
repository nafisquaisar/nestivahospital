/**
 * Testimonials Data — Dummy Content
 * ─────────────────────────────────────────────────────────────────────────────
 * Backend-ready: replace with TanStack Query fetch from NestJS REST API.
 */

import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    patientName: "Margaret Thompson",
    patientAge: 58,
    patientLocation: "New York, USA",
    rating: 5,
    review:
      "The cardiac team at Nestiva Hospital saved my life. After my unexpected heart attack, Dr. Mitchell and her team worked tirelessly to ensure my recovery. Their professionalism, compassion and round-the-clock care gave me and my family immense confidence. I'm back to full health and forever grateful.",
    shortReview: "Exceptional cardiac care that truly saved my life.",
    treatmentType: "Cardiac Surgery & Recovery",
    doctorName: "Dr. Sarah Mitchell",
    departmentName: "Cardiology",
    date: "2024-11-15",
    verified: true,
    featured: true,
    order: 1,
  },
  {
    id: "t2",
    patientName: "Robert Andersson",
    patientAge: 45,
    patientLocation: "Stockholm, Sweden",
    rating: 5,
    review:
      "Following a serious knee ligament injury, I feared my active lifestyle was over. Dr. Marcus Reid and the orthopaedic team performed a minimally invasive procedure that had me walking within days. The physiotherapy programme was world-class. Nestiva completely exceeded my expectations.",
    shortReview: "World-class orthopaedic surgery — I'm active again!",
    treatmentType: "ACL Reconstruction",
    doctorName: "Dr. Marcus Reid",
    departmentName: "Orthopedics",
    date: "2024-10-02",
    verified: true,
    featured: true,
    order: 2,
  },
  {
    id: "t3",
    patientName: "Priyanka Mehra",
    patientAge: 34,
    patientLocation: "Mumbai, India",
    rating: 5,
    review:
      "When my daughter was diagnosed with a neurological condition, we were devastated. Dr. Amelia Chen not only provided a precise diagnosis but also walked us through every step of the treatment with patience and warmth. Today my daughter is thriving. Nestiva's paediatric neurology team is simply extraordinary.",
    shortReview: "Our daughter is thriving thanks to the neurology team.",
    treatmentType: "Paediatric Neurology",
    doctorName: "Dr. Amelia Chen",
    departmentName: "Neurology",
    date: "2024-09-18",
    verified: true,
    featured: true,
    order: 3,
  },
  {
    id: "t4",
    patientName: "James Okafor",
    patientAge: 62,
    patientLocation: "Lagos, Nigeria",
    rating: 5,
    review:
      "I travelled internationally to receive cancer treatment at Nestiva after being highly recommended by a colleague. Dr. Priya Sharma's personalised approach to my haematology case was remarkable. The facility, staff and after-care support were all exceptional. I would not hesitate to recommend Nestiva to anyone.",
    shortReview: "Travelled internationally — worth every mile.",
    treatmentType: "Haematological Oncology",
    doctorName: "Dr. Priya Sharma",
    departmentName: "Oncology",
    date: "2024-08-07",
    verified: true,
    featured: true,
    order: 4,
  },
  {
    id: "t5",
    patientName: "Sofia García",
    patientAge: 28,
    patientLocation: "Barcelona, Spain",
    rating: 5,
    review:
      "As a first-time mother, I was anxious about every step of my pregnancy. The paediatric team at Nestiva provided exceptional neonatal care when my baby arrived early. Dr. Oliver Hayes was incredible — calm, reassuring and brilliant. Our little one is now perfectly healthy.",
    shortReview: "Outstanding neonatal care for our premature baby.",
    treatmentType: "Neonatal & Maternity Care",
    doctorName: "Dr. Oliver Hayes",
    departmentName: "Pediatrics",
    date: "2024-07-22",
    verified: true,
    featured: true,
    order: 5,
  },
  {
    id: "t6",
    patientName: "David Kimani",
    patientAge: 40,
    patientLocation: "Nairobi, Kenya",
    rating: 5,
    review:
      "I arrived at Nestiva's emergency department with severe chest pains at 2 AM. The team responded within minutes — diagnosis, treatment and monitoring were all seamless. The follow-up care was just as impressive. This hospital truly operates at the highest level at all hours.",
    shortReview: "Emergency team responded brilliantly at 2 AM.",
    treatmentType: "Emergency Cardiac Event",
    doctorName: "Emergency Medicine Team",
    departmentName: "Emergency Medicine",
    date: "2024-06-11",
    verified: true,
    featured: true,
    order: 6,
  },
];

export default testimonials;
