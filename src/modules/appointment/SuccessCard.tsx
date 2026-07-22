/**
 * SuccessCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Thank-you card shown on /appointment/success.
 * - Reads appointment summary from URL query params
 * - Displays reference number, patient details, appointment info
 * - Animated success icon with pulse ring
 * - Action buttons: Back to Home, Book Another
 * - Emergency contact card
 */
"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Home,
  CalendarPlus,
  Phone,
  AlertTriangle,
  Clock,
  CalendarCheck,
  ArrowRight,
  User,
  Building2,
  UserCheck,
  CalendarDays,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { useReducedMotion } from "@/hooks";

// ── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "backOut" as const,
    },
  },
};

// ── Summary Detail Row ────────────────────────────────────────────────────────

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SuccessCard() {
  const isReduced = useReducedMotion();
  const searchParams = useSearchParams();

  // Read appointment summary from query params
  const fullName = searchParams.get("fullName") ?? "";
  const department = searchParams.get("department") ?? "";
  const doctor = searchParams.get("doctor") ?? "";
  const appointmentDate = searchParams.get("appointmentDate") ?? "";
  const appointmentTime = searchParams.get("appointmentTime") ?? "";
  const referenceNumber = searchParams.get("referenceNumber") ?? "";

  // Format date for display (yyyy-mm-dd → "July 22, 2026")
  const formattedDate = appointmentDate
    ? new Date(appointmentDate + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const emergencyPhoneRaw = branding.emergencyPhone.replace(/\D/g, "");
  const hasSummary = !!(fullName || department || appointmentDate);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <motion.div
        variants={isReduced ? undefined : containerVariants}
        initial={isReduced ? undefined : "hidden"}
        animate={isReduced ? undefined : "show"}
        className="flex flex-col items-center gap-8"
      >
        {/* ── Success Icon ─────────────────────────────────────────────── */}
        <motion.div
          variants={isReduced ? undefined : iconVariants}
          className="relative flex items-center justify-center"
        >
          {!isReduced && (
            <>
              <span className="absolute h-36 w-36 animate-ping rounded-full bg-success/20 [animation-duration:1.8s]" />
              <span className="absolute h-28 w-28 rounded-full bg-success/15" />
            </>
          )}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-xl shadow-emerald-500/30">
            <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2} aria-hidden="true" />
          </div>
        </motion.div>

        {/* ── Main Card ────────────────────────────────────────────────── */}
        <motion.div
          variants={isReduced ? undefined : itemVariants}
          className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm text-center"
        >
          {/* Status badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Request Submitted to Nestiva Hospital
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Appointment Request Received!
          </h1>

          {/* Description */}
          <div className="mx-auto mt-4 max-w-lg space-y-2 text-base text-muted-foreground">
            <p>
              Thank you for contacting{" "}
              <span className="font-semibold text-foreground">
                {branding.shortName} Hospital
              </span>
              .
            </p>
            <p>
              Our hospital team will review your request and contact you
              shortly to confirm your appointment.
            </p>
          </div>

          {/* Notice */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 ring-1 ring-amber-200">
            <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            This request is not a confirmed appointment.
          </div>

          {/* ── Appointment Summary ─────────────────────────────────────── */}
          {hasSummary && (
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Appointment Summary
              </p>

              {referenceNumber && (
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-primary/8 px-3 py-2">
                  <Hash className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">Reference Number</p>
                    <p className="font-mono text-sm font-bold text-primary tracking-wide">
                      {referenceNumber}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-2">
                <SummaryRow icon={User} label="Patient Name" value={fullName} />
                <SummaryRow icon={Building2} label="Department" value={department} />
                <SummaryRow icon={UserCheck} label="Preferred Doctor" value={doctor} />
                <SummaryRow icon={CalendarDays} label="Preferred Date" value={formattedDate} />
                <SummaryRow icon={Clock} label="Preferred Time" value={appointmentTime} />
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 h-px bg-border" role="separator" />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 shadow-md shadow-primary/20">
              <Link href="/">
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/appointment">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                Book Another Appointment
              </Link>
            </Button>
          </div>

          {/* What happens next */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3 text-left">
            {[
              { step: "1", text: "Our team reviews your request within 2 hours" },
              { step: "2", text: "We call you to confirm your preferred slot" },
              { step: "3", text: "Receive a confirmation SMS/email" },
            ].map(({ step, text }) => (
              <div
                key={step}
                className="flex items-start gap-2.5 rounded-xl bg-muted/50 p-3"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {step}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Emergency Contact Card ────────────────────────────────────── */}
        <motion.div
          variants={isReduced ? undefined : itemVariants}
          className="w-full rounded-2xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-rose-50 p-6 shadow-sm"
          role="complementary"
          aria-label="Emergency contact information"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-500" aria-hidden="true" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="font-display text-base font-bold text-red-700">
                Need Immediate Medical Assistance?
              </p>
              <p className="mt-0.5 text-sm text-red-600/80">
                If this is an emergency, please call our 24×7 emergency hotline immediately.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1 sm:items-end">
              <a
                href={`tel:${emergencyPhoneRaw}`}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-600 hover:shadow-red-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                aria-label={`Call emergency line ${branding.emergencyPhone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {branding.emergencyPhone}
              </a>
              <span className="flex items-center gap-1 text-xs font-medium text-red-600">
                <Clock className="h-3 w-3" aria-hidden="true" />
                Available 24×7
              </span>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div variants={isReduced ? undefined : itemVariants}>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
            Submit another request
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
