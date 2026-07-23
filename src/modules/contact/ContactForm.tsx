"use client";

/**
 * ContactForm
 * ─────────────────────────────────────────────────────────────────────────────
 * Professional enquiry form with Formspree integration.
 * Features: loading state, success/error toasts, privacy checkbox,
 * department select, and redirect to /contact/success.
 */

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User, Phone, Mail, MessageSquare, Building2,
  Send, Loader2, CheckCircle2, AlertCircle, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

const FORMSPREE_URL = "https://formspree.io/f/xdaqledg";

const DEPARTMENTS = [
  { value: "", label: "Select Department" },
  { value: "general", label: "General Enquiry" },
  { value: "appointments", label: "Appointments" },
  { value: "billing", label: "Billing & Insurance" },
  { value: "emergency", label: "Emergency" },
  { value: "insurance", label: "Insurance" },
  { value: "feedback", label: "Feedback" },
] as const;

interface FormState {
  name: string;
  phone: string;
  email: string;
  subject: string;
  department: string;
  message: string;
  privacyAgreed: boolean;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  department: "",
  message: "",
  privacyAgreed: false,
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ── Shared field styles ───────────────────────────────────────────── */
const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground " +
  "outline-none ring-0 transition-all duration-200 " +
  "focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function ContactForm() {
  const isReduced = useReducedMotion();
  const router = useRouter();
  const uid = useId();

  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isLoading = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.privacyAgreed) {
      setErrorMsg("Please agree to the privacy policy before submitting.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: form.subject,
          department: form.department,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(initialState);
        setTimeout(() => {
          router.push("/contact/success");
        }, 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.errors?.[0]?.message ?? "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={isReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl shadow-black/5 md:p-10"
    >
      {/* Decorative corner */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <span className="h-px w-6 rounded-full bg-gradient-to-r from-primary to-secondary" />
            Send a Message
          </span>
          <h2 className="font-display text-2xl font-extrabold text-foreground">
            How Can We Help You?
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill out the form and our team will get back to you within 2 business hours.
          </p>
        </div>

        {/* Status messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-success/20 bg-success/5 p-4 text-success"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">
              Message sent! Redirecting you to confirmation page…
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4 text-danger"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">{errorMsg}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Row 1: Name + Phone */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-name`} className={labelCls}>
                Full Name <span className="text-danger" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(inputCls, "pl-10")}
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-phone`} className={labelCls}>
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  placeholder="+91 98XXXX XXXX"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(inputCls, "pl-10")}
                  autoComplete="tel"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Email + Subject */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-email`} className={labelCls}>
                Email Address <span className="text-danger" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(inputCls, "pl-10")}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${uid}-subject`} className={labelCls}>
                Subject <span className="text-danger" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id={`${uid}-subject`}
                  name="subject"
                  type="text"
                  required
                  placeholder="Brief subject of your enquiry"
                  value={form.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={cn(inputCls, "pl-10")}
                />
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <label htmlFor={`${uid}-department`} className={labelCls}>
              Department
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <select
                id={`${uid}-department`}
                name="department"
                value={form.department}
                onChange={handleChange}
                disabled={isLoading}
                className={cn(inputCls, "cursor-pointer pl-10 appearance-none")}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value} disabled={d.value === ""}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor={`${uid}-message`} className={labelCls}>
              Message <span className="text-danger" aria-hidden="true">*</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              required
              rows={5}
              placeholder="Please describe how we can help you…"
              value={form.message}
              onChange={handleChange}
              disabled={isLoading}
              className={cn(inputCls, "resize-none")}
            />
          </div>

          {/* Privacy checkbox */}
          <label
            htmlFor={`${uid}-privacy`}
            className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground"
          >
            <input
              id={`${uid}-privacy`}
              name="privacyAgreed"
              type="checkbox"
              checked={form.privacyAgreed}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
            />
            <span>
              I agree to the{" "}
              <a
                href="/privacy-policy"
                className="font-semibold text-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy policy
              </a>{" "}
              and consent to Nestiva Hospital contacting me about my enquiry.
            </span>
          </label>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={isLoading || status === "success"}
            className="group mt-1 gap-2 font-semibold shadow-lg shadow-primary/20"
            id="contact-form-submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending…
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Sent!
              </>
            ) : (
              <>
                <Send className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                Send Message
              </>
            )}
          </Button>

          {/* Privacy note */}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Your information is encrypted and never shared with third parties.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
