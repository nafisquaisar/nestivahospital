"use client";

/**
 * HospitalInfo
 * ─────────────────────────────────────────────────────────────────────────────
 * Hospital contact information panel with copy buttons, click-to-call,
 * and mailto links.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Globe, Hospital, Copy, Check,
  PhoneCall, Clock,
} from "lucide-react";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  iconColor?: string;
}

function InfoRow({ icon: Icon, label, value, href, copyable = false, iconColor = "text-primary" }: InfoRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-muted/40">
      {/* Icon */}
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60">
        <Icon className={cn("h-4.5 w-4.5", iconColor)} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className={cn("break-all text-sm font-semibold text-foreground transition-colors hover:text-primary")}
          >
            {value}
          </a>
        ) : (
          <span className="break-all text-sm font-semibold text-foreground">{value}</span>
        )}
      </div>

      {/* Copy button */}
      {copyable && (
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : `Copy ${label}`}
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200",
            copied
              ? "border-success/30 bg-success/10 text-success"
              : "border-border bg-background text-muted-foreground opacity-0 group-hover:opacity-100 hover:border-primary/30 hover:text-primary"
          )}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  );
}

export function HospitalInfo() {
  const isReduced = useReducedMotion();

  return (
    <motion.div
      initial={isReduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col gap-6"
    >
      {/* Hospital name card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white shadow-xl shadow-primary/20">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <Hospital className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-lg font-extrabold">{branding.name}</h3>
            <p className="text-sm text-white/75">{branding.tagline}</p>
          </div>
        </div>

        {/* Accreditations */}
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {branding.accreditations.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        <InfoRow
          icon={MapPin}
          label="Address"
          value={branding.address.full}
          href={contact.mapsLink}
          copyable
          iconColor="text-secondary"
        />
        <InfoRow
          icon={PhoneCall}
          label="Emergency / General"
          value={contact.phone}
          href={`tel:${contact.phone.replace(/\D/g, "")}`}
          copyable
          iconColor="text-danger"
        />
        <InfoRow
          icon={Phone}
          label="OPD / Appointments"
          value={contact.opdPhone}
          href={`tel:${contact.opdPhone.replace(/\D/g, "")}`}
          copyable
          iconColor="text-primary"
        />
        <InfoRow
          icon={Mail}
          label="Email"
          value={contact.email}
          href={`mailto:${contact.email}`}
          copyable
          iconColor="text-secondary"
        />
        <InfoRow
          icon={Globe}
          label="Website"
          value="www.nestivahospital.com"
          href="https://www.nestivahospital.com"
          iconColor="text-accent-dark"
        />
      </div>

      {/* Working hours */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-bold text-foreground">Working Hours</h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {contact.workingHours.map((hour) => (
            <div
              key={hour.days}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2",
                hour.isEmergency
                  ? "bg-danger/5 border border-danger/20"
                  : "bg-muted/40"
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold",
                  hour.isEmergency ? "text-danger" : "text-muted-foreground"
                )}
              >
                {hour.days}
              </span>
              <span
                className={cn(
                  "text-xs font-bold",
                  hour.isEmergency ? "text-danger" : "text-foreground"
                )}
              >
                {hour.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
