"use client";

/**
 * FAQSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Accordion-style FAQ with Framer Motion expand/collapse animation.
 * No third-party accordion library needed.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Container } from "@/components/shared/Container";
import { faqs } from "@/data/faqs";
import { fadeUp, fadeLeft, staggerContainer, staggerItem, defaultViewport, lazyViewport, animationProps } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";
import type { FAQ } from "@/types";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  isReduced: boolean;
}

function FAQItem({ faq, isOpen, onToggle, isReduced }: FAQItemProps) {
  return (
    <motion.div
      {...animationProps(isReduced, { variants: staggerItem })}
      className={cn(
        "overflow-hidden rounded-xl border transition-colors duration-200",
        isOpen
          ? "border-primary/30 bg-primary/[0.03]"
          : "border-border/60 bg-card hover:border-primary/20"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        id={`faq-btn-${faq.id}`}
      >
        <span
          className={cn(
            "font-display text-sm font-semibold leading-snug sm:text-base",
            isOpen ? "text-primary" : "text-foreground"
          )}
        >
          {faq.question}
        </span>
        <span
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
          aria-hidden="true"
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            role="region"
            aria-labelledby={`faq-btn-${faq.id}`}
            key="content"
            initial={isReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={isReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const isReduced = useReducedMotion();
  const [openId, setOpenId] = useState<string>(faqs[0]?.id ?? "");

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? "" : id));

  const leftColumn  = faqs.filter((_, i) => i % 2 === 0);
  const rightColumn = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="faq"
      className="bg-background py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
          className="text-center"
        >
          <SectionHeader
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            titleId="faq-heading"
            subtitle="Everything you need to know about appointments, insurance, services, and what to expect at Nestiva Hospital."
            align="center"
          />
        </motion.div>

        {/* Two-column accordion grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Left column */}
          <motion.div
            {...animationProps(isReduced, {
              variants: staggerContainer(0.07, 0.1),
              viewport: lazyViewport,
            })}
            className="flex flex-col gap-4"
          >
            {leftColumn.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                isReduced={isReduced}
              />
            ))}
          </motion.div>

          {/* Right column */}
          <motion.div
            {...animationProps(isReduced, {
              variants: staggerContainer(0.07, 0.15),
              viewport: lazyViewport,
            })}
            className="flex flex-col gap-4"
          >
            {rightColumn.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
                isReduced={isReduced}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
