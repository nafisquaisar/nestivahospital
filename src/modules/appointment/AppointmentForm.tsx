/**
 * AppointmentForm
 * ─────────────────────────────────────────────────────────────────────────────
 * Full appointment request form with:
 * - Client-side validation via react-hook-form + zod
 * - Formspree AJAX submission via AppointmentService (no page refresh)
 * - Double-submit guard via isSubmitting state
 * - Success toast → 1.5s → redirect to /appointment/success?{summary}
 * - Error toast with retry — keeps all entered data
 * - Inline animated field errors
 * - Framer Motion staggered entrance animations
 * - URL query-param pre-fill: doctorName, department, preferredDate
 */
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Stethoscope,
  UserCheck,
  CalendarDays,
  Clock,
  FileText,
  ArrowRight,
  Home,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { DepartmentSelect } from "./DepartmentSelect";
import { TimeSelect } from "./TimeSelect";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";
import { DEPARTMENTS } from "@/types/appointment";
import type { Department, TimeSlot } from "@/types/appointment";
import { AppointmentService } from "@/services/appointment.service";
import { branding } from "@/config/branding";
import { departments as departmentsData } from "@/data/departments";

// ── Zod Validation Schema ─────────────────────────────────────────────────────

const appointmentSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long")
    .trim(),
  mobileNumber: z
    .string()
    .min(7, "Please enter a valid mobile number")
    .max(20, "Mobile number is too long")
    .regex(
      /^[+\d\s\-().]+$/,
      "Please enter a valid mobile number"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .min(1, "Please select a department"),
  preferredDoctor: z.string().optional(),
  preferredDate: z
    .string()
    .min(1, "Please select a preferred date")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Preferred date cannot be in the past"),
  preferredTime: z
    .string()
    .min(1, "Please select a preferred time"),
  reasonForVisit: z.string().max(500, "Reason must be under 500 characters").optional(),
});

type FormValues = z.infer<typeof appointmentSchema>;

// ── Toast State Type ──────────────────────────────────────────────────────────

interface ToastState {
  id: string;
  open: boolean;
  variant: "success" | "error";
  title: string;
  description?: string;
}

// ── Helper: Field Error ───────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={message}
        initial={{ opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.2 }}
        role="alert"
        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500"
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {message}
      </motion.p>
    </AnimatePresence>
  );
}

// ── Helper: Section Header ────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

// ── Stagger Animation Variants ────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// ── Reference Number Generator ────────────────────────────────────────────────

function generateReferenceNumber(): string {
  const prefix = "NST";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ── Main Component ────────────────────────────────────────────────────────────

export function AppointmentForm() {
  const router = useRouter();
  const isReduced = useReducedMotion();

  // Double-submit guard
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  // Inline toast
  const [toastState, setToastState] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (variant: "success" | "error", title: string, description?: string) => {
      const id = Math.random().toString(36).slice(2);
      setToastState({ id, open: true, variant, title, description });
      // Auto-close after 6s
      setTimeout(() => {
        setToastState((prev) => (prev?.id === id ? null : prev));
      }, 6000);
    },
    []
  );

  // ── URL query-param resolution — must run before useForm ─────────────────────
  // useSearchParams() is read synchronously here so the resolved values can be
  // passed as defaultValues. This guarantees Radix Select receives the correct
  // value on its very first render (before any useEffect fires).
  const searchParams = useSearchParams();

  const qDoctorName = searchParams.get("doctorName") ?? "";
  const qDeptId     = searchParams.get("departmentId") ?? "";
  const qDate       = searchParams.get("preferredDate") ?? "";

  // Resolve departmentId → DEPARTMENTS display name (e.g. "neurology" → "Neurology")
  const resolvedDept: string = (() => {
    if (!qDeptId) return "";
    const deptRecord = departmentsData.find((d) => d.id === qDeptId);
    if (!deptRecord) return "";
    return DEPARTMENTS.find(
      (d) => d.toLowerCase() === deptRecord.name.toLowerCase()
    ) ?? "";
  })();

  // Lock flags — derived from whether a param was successfully resolved
  const [isDocLocked, setIsDocLocked]   = useState(!!qDoctorName);
  const [isDeptLocked, setIsDeptLocked] = useState(!!resolvedDept);
  // ─────────────────────────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName:        "",
      mobileNumber:    "",
      email:           "",
      department:      resolvedDept,   // pre-filled from URL param
      preferredDoctor: qDoctorName,    // pre-filled from URL param
      preferredDate:   qDate,          // pre-filled from URL param
      preferredTime:   "",
      reasonForVisit:  "",
    },
    mode: "onTouched",
  });

  const department    = watch("department");
  const preferredTime = watch("preferredTime");

  // ── Sync lock flags if searchParams change (e.g. client-side navigation) ─────
  useEffect(() => {
    const newDoctorName = searchParams.get("doctorName") ?? "";
    const newDeptId     = searchParams.get("departmentId") ?? "";
    const newDate       = searchParams.get("preferredDate") ?? "";

    if (newDoctorName) {
      setValue("preferredDoctor", newDoctorName, { shouldValidate: false });
      setIsDocLocked(true);
    }

    if (newDeptId) {
      const rec = departmentsData.find((d) => d.id === newDeptId);
      const matched = rec
        ? DEPARTMENTS.find((d) => d.toLowerCase() === rec.name.toLowerCase())
        : undefined;
      if (matched) {
        setValue("department", matched, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        setIsDeptLocked(true);
      }
    }

    if (newDate) {
      setValue("preferredDate", newDate, { shouldValidate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Today's date formatted as yyyy-mm-dd for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: FormValues) => {
    // Double-submit guard
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setIsSubmitting(true);

    // Generate reference number before submission
    const referenceNumber = generateReferenceNumber();

    // Build the Formspree payload — all fields + hidden metadata
    const submittedAt = new Date().toISOString();
    const formattedMessage = [
      "--------------------------------------------",
      "New Appointment Request",
      "",
      `Reference Number: ${referenceNumber}`,
      "",
      "Patient Information",
      `Name:  ${data.fullName}`,
      `Phone: ${data.mobileNumber}`,
      `Email: ${data.email ?? "(not provided)"}`,
      "",
      "Appointment Details",
      `Department:       ${data.department}`,
      `Doctor:           ${data.preferredDoctor ?? "(no preference)"}`,
      `Preferred Date:   ${data.preferredDate}`,
      `Preferred Time:   ${data.preferredTime}`,
      `Reason for Visit: ${data.reasonForVisit ?? "(not provided)"}`,
      "",
      `Submitted At: ${submittedAt}`,
      "--------------------------------------------",
    ].join("\n");

    const payload = {
      // User-entered fields
      fullName: data.fullName,
      phone: data.mobileNumber,
      email: data.email ?? "",
      department: data.department,
      doctor: data.preferredDoctor ?? "",
      appointmentDate: data.preferredDate,
      appointmentTime: data.preferredTime,
      symptoms: data.reasonForVisit ?? "",

      // Hidden metadata fields
      hospitalName: branding.name,
      website: "https://nestiva.hospital",
      source: "Appointment Request Form",
      submittedAt,
      pageUrl: typeof window !== "undefined" ? window.location.href : "/appointment",

      // Reference for tracking
      referenceNumber,

      // Pre-formatted email summary (Formspree "message" field)
      message: formattedMessage,
    };

    // ── Debug logging (task requirement) ────────────────────────────────────
    console.log("Submitting appointment", payload);

    try {
      const result = await AppointmentService.submitAppointment(payload);

      // ── Debug logging (task requirement) ──────────────────────────────────
      // Note: AppointmentService wraps the raw response; log the result shape
      console.log("Formspree response", result);

      if (result.ok) {
        // Success — show toast, reset form, redirect after 1.5s
        showToast(
          "success",
          "Appointment Request Submitted!",
          "Redirecting you to the confirmation page…"
        );

        reset();

        // Build success page query params with appointment summary
        const params = new URLSearchParams({
          fullName: data.fullName,
          department: data.department,
          doctor: data.preferredDoctor ?? "",
          appointmentDate: data.preferredDate,
          appointmentTime: data.preferredTime,
          referenceNumber,
        });

        // Wait for toast to show, THEN redirect
        setTimeout(() => {
          router.push(`/appointment/success?${params.toString()}`);
        }, 1500);
      } else {
        // Error — show error toast, keep form data, allow retry
        console.error("Formspree submission failed:", result.message);
        showToast("error", "Submission Failed", result.message);
        submitLockRef.current = false;
        setIsSubmitting(false);
      }
    } catch (unexpectedErr) {
      console.error("Unexpected error in onSubmit:", unexpectedErr);
      showToast("error", "Submission Failed", "An unexpected error occurred. Please try again.");
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ── Validation error handler (fires when RHF blocks submit) ───────────────
  const onValidationError = (fieldErrors: Record<string, unknown>) => {
    console.warn("[AppointmentForm] handleSubmit blocked by validation errors:", fieldErrors);
  };

  return (
    <ToastProvider>
      <form
        onSubmit={handleSubmit(onSubmit, onValidationError)}
        noValidate
        aria-label="Appointment request form"
      >
        <motion.div
          className="grid gap-6 lg:grid-cols-2"
          variants={isReduced ? undefined : containerVariants}
          initial={isReduced ? undefined : "hidden"}
          animate={isReduced ? undefined : "show"}
        >
          {/* ── Patient Information Card ─────────────────────────────────── */}
          <motion.div
            variants={isReduced ? undefined : itemVariants}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8"
          >
            <SectionHeader
              icon={User}
              title="Patient Information"
              subtitle="Tell us who the appointment is for"
            />

            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div>
                <Label
                  htmlFor="fullName"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Full Name
                  <span className="text-red-500" aria-hidden="true">*</span>
                </Label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="e.g. John Smith"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    className={cn(
                      "h-11 pl-10",
                      errors.fullName && "border-red-400 focus-visible:ring-red-400 bg-red-50/30"
                    )}
                    {...register("fullName")}
                  />
                </div>
                <span id="fullName-error">
                  <FieldError message={errors.fullName?.message} />
                </span>
              </div>

              {/* Mobile Number */}
              <div>
                <Label
                  htmlFor="mobileNumber"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Mobile Number
                  <span className="text-red-500" aria-hidden="true">*</span>
                </Label>
                <div className="relative">
                  <Phone
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="mobileNumber"
                    type="tel"
                    placeholder="e.g. +1 (800) 000-0000"
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.mobileNumber}
                    aria-describedby={errors.mobileNumber ? "mobileNumber-error" : undefined}
                    className={cn(
                      "h-11 pl-10",
                      errors.mobileNumber && "border-red-400 focus-visible:ring-red-400 bg-red-50/30"
                    )}
                    {...register("mobileNumber")}
                  />
                </div>
                <span id="mobileNumber-error">
                  <FieldError message={errors.mobileNumber?.message} />
                </span>
              </div>

              {/* Email — Optional */}
              <div>
                <Label
                  htmlFor="email"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Email Address
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-normal text-muted-foreground">
                    Optional
                  </span>
                </Label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "h-11 pl-10",
                      errors.email && "border-red-400 focus-visible:ring-red-400 bg-red-50/30"
                    )}
                    {...register("email")}
                  />
                </div>
                <span id="email-error">
                  <FieldError message={errors.email?.message} />
                </span>
              </div>
            </div>

            {/* Privacy note */}
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-primary/5 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your personal information is fully protected and will only be
                used to process your appointment request.
              </p>
            </div>
          </motion.div>

          {/* ── Medical Information Card ──────────────────────────────────── */}
          <motion.div
            variants={isReduced ? undefined : itemVariants}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8"
          >
            <SectionHeader
              icon={Stethoscope}
              title="Medical Information"
              subtitle="Help us prepare for your visit"
            />

            <div className="flex flex-col gap-5">
              {/* Department */}
              <div>
                <Label
                  htmlFor="department"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Department
                  <span className="text-red-500" aria-hidden="true">*</span>
                  {isDeptLocked && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-300">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Department Selected
                    </span>
                  )}
                </Label>
                <DepartmentSelect
                  value={department}
                  onValueChange={(val) => {
                    setValue("department", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  hasError={!!errors.department}
                  disabled={isDeptLocked}
                />
                <FieldError message={errors.department?.message} />
              </div>

              {/* Preferred Doctor — Optional when no URL param, read-only when pre-filled */}
              <div>
                <Label
                  htmlFor="preferredDoctor"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Preferred Doctor
                  {isDocLocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-300">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Selected Doctor
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-normal text-muted-foreground">
                      Optional
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <UserCheck
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="preferredDoctor"
                    type="text"
                    placeholder="e.g. Dr. Sarah Johnson"
                    readOnly={isDocLocked}
                    aria-readonly={isDocLocked}
                    className={cn(
                      "h-11 pl-10",
                      isDocLocked && "cursor-default select-none bg-muted/50 text-muted-foreground"
                    )}
                    {...register("preferredDoctor")}
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <Label
                  htmlFor="preferredDate"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  Preferred Date
                  <span className="text-red-500" aria-hidden="true">*</span>
                </Label>
                <div className="relative">
                  <CalendarDays
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="preferredDate"
                    type="date"
                    min={todayStr}
                    aria-required="true"
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                    className={cn(
                      "h-11 pl-10",
                      errors.preferredDate && "border-red-400 focus-visible:ring-red-400 bg-red-50/30"
                    )}
                    {...register("preferredDate")}
                  />
                </div>
                <span id="preferredDate-error">
                  <FieldError message={errors.preferredDate?.message} />
                </span>
              </div>

              {/* Preferred Time */}
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  Preferred Time
                  <span className="text-red-500" aria-hidden="true">*</span>
                </Label>
                <TimeSelect
                  value={preferredTime}
                  onChange={(val) => {
                    setValue("preferredTime", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  hasError={!!errors.preferredTime}
                />
                <FieldError message={errors.preferredTime?.message} />
              </div>

              {/* Reason for Visit */}
              <div>
                <Label
                  htmlFor="reasonForVisit"
                  className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  Reason for Visit
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs font-normal text-muted-foreground">
                    Optional
                  </span>
                </Label>
                <Textarea
                  id="reasonForVisit"
                  placeholder="Briefly describe your symptoms or reason for the visit…"
                  rows={3}
                  aria-invalid={!!errors.reasonForVisit}
                  className={cn(
                    errors.reasonForVisit && "border-red-400 focus-visible:ring-red-400 bg-red-50/30"
                  )}
                  {...register("reasonForVisit")}
                />
                <FieldError message={errors.reasonForVisit?.message} />
              </div>
            </div>
          </motion.div>

          {/* ── Action Buttons ────────────────────────────────────────────── */}
          <motion.div
            variants={isReduced ? undefined : itemVariants}
            className="lg:col-span-2"
          >
            {/* Required fields note */}
            <p className="mb-4 text-xs text-muted-foreground">
              <span className="text-red-500">*</span> Required fields
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Back to Home */}
              <Button
                type="button"
                variant="ghost"
                size="lg"
                asChild
                className="gap-2"
                disabled={isSubmitting}
              >
                <Link href="/">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Link>
              </Button>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={cn(
                  "gap-2 px-8 shadow-lg shadow-primary/25 transition-all",
                  "sm:min-w-[240px]",
                  isSubmitting && "cursor-not-allowed opacity-80"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Requesting Appointment…
                  </>
                ) : (
                  <>
                    Request Appointment
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </form>

      {/* ── Toast Notifications ─────────────────────────────────────────────── */}
      {toastState && (
        <Toast
          open={toastState.open}
          onOpenChange={(open) => {
            if (!open) setToastState(null);
          }}
          variant={toastState.variant}
          duration={6000}
        >
          <div className="flex items-start gap-3">
            {toastState.variant === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
            )}
            <div className="flex-1">
              <ToastTitle>{toastState.title}</ToastTitle>
              {toastState.description && (
                <ToastDescription>{toastState.description}</ToastDescription>
              )}
            </div>
          </div>
          <ToastClose />
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
