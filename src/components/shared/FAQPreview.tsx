"use client";

/**
 * FAQPreview
 * ─────────────────────────────────────────────────────────────────────────────
 * Accordion FAQ preview section — shows 4-5 FAQs with a "View All" link.
 * Reusable on any inner page. Accepts a filtered subset of FAQs.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { FAQ } from "@/types";

interface FAQPreviewProps {
  faqs: FAQ[];
  /** Link for "View all FAQs" — defaults to /faq */
  viewAllHref?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function FAQPreview({
  faqs,
  viewAllHref = "/faq",
  eyebrow = "Got Questions?",
  title = "Frequently Asked Questions",
  subtitle,
}: FAQPreviewProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const isReduced = useReducedMotion();

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      className="bg-muted/30 py-16 md:py-20"
      aria-labelledby="faq-preview-heading"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="faq-preview-heading"
          subtitle={subtitle}
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
                  "rounded-xl border bg-card transition-shadow duration-300",
                  isOpen
                    ? "border-primary/20 shadow-md shadow-primary/5"
                    : "border-border hover:border-border/80"
                )}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full items-start gap-3 p-5 text-left"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                    aria-hidden="true"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-sm font-semibold leading-snug sm:text-base",
                      isOpen ? "text-primary" : "text-foreground"
                    )}
                  >
                    {faq.question}
                  </span>
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
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-14 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* View all FAQs */}
        <div className="text-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            View all frequently asked questions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
