"use client";

/**
 * DoctorProfileContent — Full doctor profile sections.
 * All rendering logic, keeping [slug]/page.tsx as a server component.
 */

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star, MessageSquare, Clock, Award, Globe2, Stethoscope,
  GraduationCap, CalendarDays, Phone, ChevronDown, ChevronUp,
  CheckCircle2, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { DoctorCard } from "@/components/common/DoctorCard";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { Doctor } from "@/types";

/* ── Star Rating ─────────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "h-4 w-4",
            n <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-foreground">{rating}</span>
    </div>
  );
}

/* ── Availability badge ──────────────────────────────────────────────────── */
const AVAIL_MAP = {
  available: { label: "Available", class: "bg-success/10 text-success border-success/20" },
  busy:      { label: "Busy",      class: "bg-amber-100 text-amber-700 border-amber-200" },
  "on-leave":{ label: "On Leave",  class: "bg-muted text-muted-foreground border-border" },
};

/* ── Sample patient reviews ──────────────────────────────────────────────── */
const SAMPLE_REVIEWS = [
  {
    id: "r1",
    name: "Margaret T.",
    rating: 5,
    date: "Nov 2024",
    treatment: "Routine Consultation",
    review: "Absolutely exceptional care. The doctor took time to listen to every concern, explained everything clearly, and followed up personally. I have never felt more confident in my healthcare.",
  },
  {
    id: "r2",
    name: "David K.",
    rating: 5,
    date: "Oct 2024",
    treatment: "Specialist Referral",
    review: "My experience was outstanding from start to finish. The level of knowledge and genuine warmth made a stressful situation manageable. Highly recommend.",
  },
  {
    id: "r3",
    name: "Aisha B.",
    rating: 4,
    date: "Sep 2024",
    treatment: "Follow-up Visit",
    review: "Very thorough and professional. Took time to answer all my questions. The treatment plan has made a real difference to my quality of life.",
  },
];

/* ── Sample FAQ ──────────────────────────────────────────────────────────── */
const PROFILE_FAQS = [
  {
    q: "How do I book an appointment?",
    a: "You can book online through our appointment portal, call our reception, or walk in during consultation hours. Online booking is available 24/7.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Please bring a valid photo ID, your insurance card, any previous medical records or test results, and a list of current medications.",
  },
  {
    q: "What is the consultation fee?",
    a: "Consultation fees vary by specialist and appointment type. The fee is displayed when you book online. We accept all major insurance plans.",
  },
  {
    q: "Can I request a telemedicine appointment?",
    a: "Yes. Many of our specialists offer video consultations. Select 'Telemedicine' when booking online and you will receive a video link before your appointment.",
  },
];

/* ── Department label mapping ──────────────────────────────────────────────── */
const DEPT_LABELS: Record<string, string> = {
  cardiology:  "Cardiology",
  neurology:   "Neurology",
  orthopedics: "Orthopaedics",
  oncology:    "Oncology",
  pediatrics:  "Paediatrics",
};

/* ── Working hours (static demo) ────────────────────────────────────────── */
const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ──────────────────────────────────────────────────────────────────────────── */

interface DoctorProfileContentProps {
  doctor: Doctor;
  related: Doctor[];
}

export function DoctorProfileContent({ doctor, related }: DoctorProfileContentProps) {
  const isReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const avail = AVAIL_MAP[doctor.availability];

  return (
    <>
      {/* ── Hero / Profile Header ───────────────────────────────────── */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16" aria-label="Doctor profile">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">

            {/* Left col — photo + quick actions */}
            <motion.div
              initial={isReduced ? undefined : { opacity: 0, y: 20 }}
              animate={isReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col gap-4 lg:sticky lg:top-24"
            >
              {/* Photo card */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  {!imgError ? (
                    <Image
                      src={doctor.image.src}
                      alt={doctor.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                      className="object-cover object-top"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-7xl font-black text-primary/20 select-none">
                        {doctor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  )}
                  {/* Availability badge */}
                  <div className="absolute right-3 top-3">
                    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", avail.class)}>
                      {avail.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <StarRating rating={doctor.rating} />
                    <span className="text-xs text-muted-foreground">({doctor.reviewCount} reviews)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild className="gap-1.5">
                      <Link href={`/appointment?doctor=${doctor.id}`}>
                        <CalendarDays className="h-4 w-4" />
                        Book Now
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="gap-1.5">
                      <Link href="tel:+18005001000">
                        <Phone className="h-4 w-4" />
                        Call
                      </Link>
                    </Button>
                  </div>

                  <div className="rounded-xl bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    <p className="font-display text-2xl font-extrabold text-primary">${doctor.consultationFee}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right col — profile info */}
            <motion.div
              initial={isReduced ? undefined : { opacity: 0, x: 20 }}
              animate={isReduced ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              {/* Name / designation */}
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit text-xs font-semibold text-primary border-primary/30">
                  {DEPT_LABELS[doctor.departmentId] ?? doctor.departmentId}
                </Badge>
                <h1 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                  {doctor.prefix} {doctor.name}
                </h1>
                <p className="text-lg font-medium text-primary">{doctor.specialization}</p>
                <p className="text-sm text-muted-foreground">{doctor.designation}</p>

                {/* Quick stats row */}
                <div className="mt-3 flex flex-wrap gap-4">
                  {[
                    { icon: Award,       label: `${doctor.experience}+ yrs experience` },
                    { icon: Globe2,      label: doctor.languages.join(", ") },
                    { icon: MessageSquare, label: `${doctor.reviewCount} patient reviews` },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Qualifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.qualifications.map((q) => (
                    <span key={q} className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground">
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biography */}
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  <Stethoscope className="h-4 w-4" aria-hidden="true" />
                  Biography
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>
              </div>

              {/* Areas of Expertise */}
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Areas of Expertise
                </h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Complex case diagnosis",
                    "Evidence-based treatment planning",
                    "Patient-centred care",
                    "Multidisciplinary team collaboration",
                    "Clinical research & education",
                    `${doctor.specialization} interventions`,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Schedule */}
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Consultation Schedule
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ALL_DAYS.map((day) => {
                    const slot = doctor.schedule.find((s) => s.day === day);
                    return (
                      <div
                        key={day}
                        className={cn(
                          "rounded-xl border p-3 text-xs",
                          slot
                            ? "border-primary/20 bg-primary/5 text-foreground"
                            : "border-border bg-muted/30 text-muted-foreground"
                        )}
                      >
                        <p className="font-semibold">{day.slice(0, 3)}</p>
                        <p className="mt-0.5">
                          {slot ? `${slot.startTime} – ${slot.endTime}` : "Not available"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Awards & Recognition */}
              <div className="flex flex-col gap-3">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  Awards & Recognition
                </h2>
                <div className="flex flex-col gap-2">
                  {[
                    `Best ${DEPT_LABELS[doctor.departmentId] ?? "Specialist"} — National Medical Excellence Awards 2023`,
                    "Patient's Choice Award — Nestiva Hospital 2022, 2023",
                    `Top Doctor — ${DEPT_LABELS[doctor.departmentId] ?? "Specialty"} Excellence 2021`,
                  ].map((award) => (
                    <div key={award} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400 mt-0.5" aria-hidden="true" />
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Patient Reviews ──────────────────────────────────────────── */}
      <section className="bg-muted/30 py-14" aria-labelledby="reviews-heading">
        <Container>
          <h2 id="reviews-heading" className="font-display text-2xl font-extrabold text-foreground mb-8">
            Patient Reviews
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {SAMPLE_REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={cn("h-3.5 w-3.5", n <= review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80 italic">"{review.review}"</p>
                <div className="mt-auto border-t border-border pt-3">
                  <p className="text-xs font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.treatment}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-background py-14" aria-labelledby="doctor-faq-heading">
        <Container className="max-w-2xl">
          <h2 id="doctor-faq-heading" className="font-display text-2xl font-extrabold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {PROFILE_FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  aria-expanded={openFaqIndex === i}
                >
                  {faq.q}
                  {openFaqIndex === i
                    ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  }
                </button>
                {openFaqIndex === i && (
                  <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Related Doctors ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-muted/30 py-14" aria-labelledby="related-doctors-heading">
          <Container>
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 id="related-doctors-heading" className="font-display text-2xl font-extrabold text-foreground">
                More {DEPT_LABELS[doctor.departmentId] ?? ""} Specialists
              </h2>
              <Button asChild variant="outline" size="sm" className="gap-1.5 shrink-0">
                <Link href="/doctors">
                  All Doctors
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Appointment CTA ──────────────────────────────────────────── */}
      <AppointmentBanner
        heading={`Book with ${doctor.prefix} ${doctor.name}`}
        description={`Consultations available ${doctor.schedule.length} days a week. Book online or call us — appointments often available within 48 hours.`}
      />
    </>
  );
}
