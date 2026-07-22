/**
 * FAQ Data
 * ─────────────────────────────────────────────────────────────────────────────
 * Frequently asked questions for the homepage FAQ section.
 */

import type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  {
    id: "faq-appointment",
    question: "How do I book an appointment at Nestiva Hospital?",
    answer:
      "You can book an appointment through our website's Quick Appointment form, call our 24/7 helpline at +1 (800) 637-8482, or walk in to any of our reception desks. Online bookings are confirmed within 30 minutes via SMS and email.",
    category: "Appointments",
    order: 1,
  },
  {
    id: "faq-emergency",
    question: "Is the emergency department open 24/7?",
    answer:
      "Yes. Our Emergency Department operates 24 hours a day, 365 days a year with a dedicated trauma team, intensive care unit, and specialist on-call roster. In a medical emergency, call +1 (800) 911-0000 or proceed directly to our Emergency entrance on the ground floor.",
    category: "Emergency",
    order: 2,
  },
  {
    id: "faq-insurance",
    question: "Which insurance providers does Nestiva Hospital accept?",
    answer:
      "We work with over 200 insurance networks including BlueCross BlueShield, Aetna, Cigna, UnitedHealth, Humana, and many more. Please contact our billing team or present your insurance card at reception and our staff will verify your coverage before your appointment.",
    category: "Insurance & Billing",
    order: 3,
  },
  {
    id: "faq-second-opinion",
    question: "Can I get a second medical opinion at Nestiva?",
    answer:
      "Absolutely. We offer dedicated second-opinion consultations with our senior specialists for complex diagnoses, planned surgeries, or cancer staging. You can bring your existing reports, scans, and records. Our team reviews them thoroughly and provides a comprehensive written opinion within 48 hours.",
    category: "Consultations",
    order: 4,
  },
  {
    id: "faq-teleconsult",
    question: "Do you offer telemedicine / virtual consultations?",
    answer:
      "Yes. Our telemedicine platform allows you to consult with most of our specialists via secure video call. Teleconsultations are available Monday through Saturday, 8 AM to 8 PM. Follow-up consultations, prescription renewals, and chronic disease management are all well-suited for virtual visits.",
    category: "Telemedicine",
    order: 5,
  },
  {
    id: "faq-reports",
    question: "How long does it take to receive lab and diagnostic reports?",
    answer:
      "Routine blood and urine reports are available within 6–12 hours. Advanced diagnostics such as biopsies, genetic panels, and specialised cultures may take 3–7 business days. All reports are delivered digitally to your secure patient portal and can also be collected at our reporting counter.",
    category: "Diagnostics",
    order: 6,
  },
  {
    id: "faq-visiting-hours",
    question: "What are the visiting hours for admitted patients?",
    answer:
      "General ward visiting hours are 10 AM to 12 PM and 4 PM to 7 PM. ICU and post-operative ward visits are limited to immediate family, 15 minutes per visit, once per day. All visitors must register at reception and follow our infection-control protocols.",
    category: "Patient Services",
    order: 7,
  },
  {
    id: "faq-parking",
    question: "Is parking available at the hospital?",
    answer:
      "Yes. We have a multi-level covered parking facility with over 500 spaces available 24/7. The first two hours are complimentary for patients and visitors with a validated parking ticket from reception. Valet parking is also available at the main entrance for ₹150 per visit.",
    category: "Facilities",
    order: 8,
  },
];

export default faqs;
