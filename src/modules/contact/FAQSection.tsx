"use client";

/**
 * FAQSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Accordion FAQ section for the Contact page.
 * Smooth AnimatePresence expand/collapse animations.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: "book-appointment",
    question: "How can I book an appointment at Nestiva Hospital?",
    answer:
      "You can book an appointment online via our website by clicking the 'Book Appointment' button, calling us at 011-42422000, sending an email to nestivahospital@gmail.com, or visiting our reception at Munirka, New Delhi during OPD hours (Mon–Sat, 8 AM–8 PM).",
  },
  {
    id: "insurance",
    question: "Do you accept health insurance?",
    answer:
      "Yes, Nestiva Hospital is empanelled with most major health insurance providers and TPAs. Please carry your insurance card and policy documents at the time of visit. Our billing team can assist you with cashless claims and reimbursement procedures.",
  },
  {
    id: "emergency",
    question: "Is emergency care available 24/7?",
    answer:
      "Absolutely. Our emergency department operates 24 hours a day, 7 days a week, 365 days a year. Our emergency helpline 011-42422000 is always active. We have a fully equipped trauma unit and ICU ready to handle all medical emergencies.",
  },
  {
    id: "reports",
    question: "How do I get my medical reports?",
    answer:
      "Medical reports can be collected from our reports counter at the hospital within the stipulated time mentioned on your receipt. Digital reports (for applicable tests) are sent to your registered email address. You can also request copies through our patient portal or by contacting us at nestivahospital@gmail.com.",
  },
  {
    id: "online-consult",
    question: "Can I consult a doctor online / via telemedicine?",
    answer:
      "Yes, Nestiva Hospital offers telemedicine consultations. You can book an online consultation through our website or app. All you need is a smartphone or computer with a camera and a stable internet connection. No app download required for browser-based consultations.",
  },
  {
    id: "opd-hours",
    question: "What are the OPD working hours?",
    answer:
      "Our OPD operates Monday to Friday from 8:00 AM to 8:00 PM, Saturday from 9:00 AM to 5:00 PM, and Sunday from 10:00 AM to 2:00 PM. Emergency services are available 24/7. Please call ahead for specialist availability.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const isReduced = useReducedMotion();

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      className="bg-background py-16 md:py-20"
      aria-labelledby="contact-faq-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          titleId="contact-faq-heading"
          subtitle="Find quick answers to the most common questions about our services, appointments, and facilities."
          align="center"
        />

        <div className="mx-auto w-full max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={isReduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-primary/25 bg-card shadow-lg shadow-primary/5"
                    : "border-border bg-card hover:border-primary/20 hover:shadow-sm"
                )}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${faq.id}`}
                  className="flex w-full items-start gap-3 p-5 text-left transition-colors"
                >
                  {/* Icon */}
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                    )}
                    aria-hidden="true"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </span>

                  {/* Question */}
                  <span
                    className={cn(
                      "flex-1 text-sm font-semibold leading-snug sm:text-base transition-colors duration-200",
                      isOpen ? "text-primary" : "text-foreground"
                    )}
                  >
                    {faq.question}
                  </span>

                  {/* Chevron */}
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-primary"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
