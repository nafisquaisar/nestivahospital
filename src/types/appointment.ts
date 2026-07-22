/**
 * Appointment Types
 * ─────────────────────────────────────────────────────────────────────────────
 * Type definitions for the appointment request flow.
 * Import from "@/types/appointment".
 */

// ── Departments ───────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "ENT",
  "Gynecology",
  "General Medicine",
  "Radiology",
  "Emergency",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

// ── Time Slots ────────────────────────────────────────────────────────────────

export const TIME_SLOTS = ["Morning", "Afternoon", "Evening"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];

// ── Form Data ─────────────────────────────────────────────────────────────────

export interface AppointmentFormData {
  /** Patient full name — required */
  fullName: string;

  /** Patient mobile number — required */
  mobileNumber: string;

  /** Patient email — optional */
  email?: string;

  /** Selected department — required */
  department: Department | "";

  /** Preferred doctor name — optional */
  preferredDoctor?: string;

  /** Preferred date (ISO string from date input) — required */
  preferredDate: string;

  /** Preferred time slot — required */
  preferredTime: TimeSlot | "";

  /** Reason for visit — optional textarea */
  reasonForVisit?: string;
}

// ── Formspree Payload ─────────────────────────────────────────────────────────
// All fields that are POSTed to Formspree (user data + hidden metadata fields).

export interface AppointmentPayload {
  // ── User-entered fields ──────────────────────────────────────────────────
  fullName: string;
  phone: string;
  email: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;

  // ── Hidden metadata fields ───────────────────────────────────────────────
  hospitalName: string;
  website: string;
  source: string;
  submittedAt: string;
  pageUrl: string;

  // ── Tracking ─────────────────────────────────────────────────────────────
  referenceNumber: string;

  // ── Formatted email body ──────────────────────────────────────────────────
  /** Pre-formatted text block sent as the Formspree "message" field */
  message?: string;
}

// ── Service Return Type ───────────────────────────────────────────────────────

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

// ── Success Page Summary (passed via query params) ────────────────────────────

export interface AppointmentSummary {
  fullName: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  appointmentTime: string;
  referenceNumber: string;
}
