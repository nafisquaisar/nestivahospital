/**
 * AppointmentService
 * ─────────────────────────────────────────────────────────────────────────────
 * Abstracts appointment submission from UI components.
 *
 * CURRENT:  submitAppointment() → POST → https://formspree.io/f/xdaqledg
 *
 * FUTURE (NestJS + PostgreSQL):
 *   Replace implementation body with:
 *     return apiClient.post<void>("/api/v1/appointments", payload);
 *   All UI components remain UNCHANGED — only this service body updates.
 *
 * Usage:
 *   import { AppointmentService } from "@/services/appointment.service";
 *   const result = await AppointmentService.submitAppointment(payload);
 *   if (result.ok) { ... } else { showError(result.message); }
 */

import type { AppointmentPayload, SubmitResult } from "@/types/appointment";

// ── Constants ─────────────────────────────────────────────────────────────────

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaqledg";

/** Network timeout in milliseconds — prevents hanging requests */
const REQUEST_TIMEOUT_MS = 12_000;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Wraps fetch() with an AbortController-based timeout.
 * Rejects with a timeout error if the request takes longer than `ms`.
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  ms: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Derives a human-readable error message from a Formspree error response.
 * Formspree returns { error: string } or { errors: [{ message }] }.
 */
async function parseFormspreeError(response: Response): Promise<string> {
  try {
    const body = await response.json();

    // Formspree field-level validation errors
    if (Array.isArray(body.errors) && body.errors.length > 0) {
      return body.errors.map((e: { message?: string }) => e.message).filter(Boolean).join(". ");
    }

    // Top-level error string
    if (typeof body.error === "string") return body.error;
  } catch {
    // JSON parse failed — fall through to generic message
  }

  switch (response.status) {
    case 422:
      return "Some fields are invalid. Please review your details and try again.";
    case 429:
      return "Too many requests. Please wait a moment before submitting again.";
    case 503:
      return "The submission service is temporarily unavailable. Please try again shortly.";
    default:
      return `Submission failed (HTTP ${response.status}). Please try again.`;
  }
}

// ── Service Object ────────────────────────────────────────────────────────────

export const AppointmentService = {
  /**
   * Submits an appointment request to Formspree via AJAX.
   *
   * - No page refresh.
   * - Returns { ok: true } on success.
   * - Returns { ok: false, message } on any failure (network, validation, server).
   * - Handles timeout gracefully.
   *
   * FUTURE: Replace body with: return apiClient.post("/api/v1/appointments", payload);
   */
  async submitAppointment(payload: AppointmentPayload): Promise<SubmitResult> {
    try {
      const response = await fetchWithTimeout(
        FORMSPREE_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
        REQUEST_TIMEOUT_MS
      );

      // ── Debug log (audit requirement) ──────────────────────────────────────
      // eslint-disable-next-line no-console
      console.log("Formspree response", response.status);

      if (response.ok) {
        return { ok: true };
      }

      const message = await parseFormspreeError(response);
      return { ok: false, message };
    } catch (err: unknown) {
      // AbortController timeout
      if (err instanceof DOMException && err.name === "AbortError") {
        return {
          ok: false,
          message:
            "Request timed out. Please check your internet connection and try again.",
        };
      }

      // Offline / network failure
      if (err instanceof TypeError && err.message.toLowerCase().includes("fetch")) {
        return {
          ok: false,
          message:
            "Unable to reach the server. Please check your internet connection.",
        };
      }

      // Unexpected error
      return {
        ok: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  },
};
