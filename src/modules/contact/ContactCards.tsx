"use client";

/**
 * ContactCards
 * ─────────────────────────────────────────────────────────────────────────────
 * Quick-contact cards with glassmorphism style, gradient borders, and hover animations.
 */

import { motion } from "framer-motion";
import { PhoneCall, CalendarCheck, Mail, Clock } from "lucide-react";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { Container } from "@/components/shared/Container";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

interface ContactCardData {
  id: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  detail: string;
  href?: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  borderGradient: string;
}

const cards: ContactCardData[] = [
  {
    id: "emergency",
    icon: PhoneCall,
    title: "Emergency Care",
    badge: "24 / 7 Available",
    detail: "011-42422000",
    href: `tel:01142422000`,
    gradient: "from-danger/5 to-danger/10",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
    borderGradient: "from-danger/40 via-danger/20 to-transparent",
  },
  {
    id: "appointments",
    icon: CalendarCheck,
    title: "Appointments",
    badge: "Book Consultation",
    detail: contact.appointmentEmail,
    href: `mailto:${contact.appointmentEmail}`,
    gradient: "from-primary/5 to-primary/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderGradient: "from-primary/40 via-primary/20 to-transparent",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Support",
    badge: "We reply within 2 hrs",
    detail: contact.supportEmail,
    href: `mailto:${contact.supportEmail}`,
    gradient: "from-secondary/5 to-secondary/10",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    borderGradient: "from-secondary/40 via-secondary/20 to-transparent",
  },
  {
    id: "hours",
    icon: Clock,
    title: "Working Hours",
    badge: "Mon – Sat",
    detail: "8:00 AM – 8:00 PM",
    gradient: "from-accent/5 to-accent/10",
    iconBg: "bg-accent/10",
    iconColor: "text-accent-dark",
    borderGradient: "from-accent/40 via-accent/20 to-transparent",
  },
];

export function ContactCards() {
  const isReduced = useReducedMotion();

  return (
    <section className="bg-background py-14 md:py-16" aria-label="Quick contact options">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const Wrapper = card.href ? "a" : "div";
            const wrapperProps = card.href
              ? { href: card.href, ...(card.id === "emergency" || card.id === "appointments" || card.id === "email" ? {} : {}) }
              : {};

            return (
              <motion.div
                key={card.id}
                initial={isReduced ? undefined : { opacity: 0, y: 24 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={isReduced ? undefined : { y: -4, scale: 1.01 }}
                className="group relative"
              >
                {/* Gradient border wrapper */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    "p-px"
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${
                      card.id === "emergency"
                        ? "hsl(0 84% 60% / 0.5), transparent"
                        : card.id === "appointments"
                        ? "hsl(210 100% 40% / 0.5), transparent"
                        : card.id === "email"
                        ? "hsl(174 62% 42% / 0.5), transparent"
                        : "hsl(38 92% 55% / 0.5), transparent"
                    })`,
                  }}
                />

                {/* Card */}
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-2xl border border-border/60",
                    "bg-gradient-to-br from-white to-white/80",
                    "p-6 shadow-sm transition-shadow duration-300 group-hover:shadow-xl",
                    "backdrop-blur-sm"
                  )}
                >
                  {/* Background gradient */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      card.gradient
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                        card.iconBg
                      )}
                    >
                      <Icon className={cn("h-6 w-6", card.iconColor)} aria-hidden="true" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {card.badge}
                      </span>
                      <h3 className="font-display text-base font-bold text-foreground">
                        {card.title}
                      </h3>
                      {card.href ? (
                        <a
                          href={card.href}
                          className={cn(
                            "text-sm font-semibold transition-colors duration-200 break-all",
                            card.iconColor,
                            "hover:underline"
                          )}
                        >
                          {card.detail}
                        </a>
                      ) : (
                        <span className={cn("text-sm font-semibold", card.iconColor)}>
                          {card.detail}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div
                    className={cn(
                      "absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60",
                      card.iconBg
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
