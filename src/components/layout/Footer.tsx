"use client";

import type React from "react";

/**
 * Footer
 * ─────────────────────────────────────────────────────────────────────────────
 * 4-column site footer:
 *   Col 1 — Brand / description / social
 *   Col 2 — Quick links
 *   Col 3 — Top departments
 *   Col 4 — Contact + emergency
 * Bottom bar — copyright / legal links / accreditations
 */

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Stethoscope,
  AlertCircle,
} from "lucide-react";
import { branding } from "@/config/branding";
import { cn } from "@/utils";

// ─── Static data (config-driven) ─────────────────────────────────────────────

const quickLinks = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Departments",      href: "/departments" },
  { label: "Find a Doctor",    href: "/doctors" },
  { label: "Book Appointment", href: "/appointment" },
  { label: "Patient Portal",   href: "/portal" },
  { label: "Blog",             href: "/blog" },
  { label: "Contact Us",       href: "/contact" },
];

const topDepartments = [
  { label: "Cardiology",       href: "/departments/cardiology" },
  { label: "Neurology",        href: "/departments/neurology" },
  { label: "Orthopaedics",     href: "/departments/orthopaedics" },
  { label: "Oncology",         href: "/departments/oncology" },
  { label: "Paediatrics",      href: "/departments/paediatrics" },
  { label: "Emergency & Trauma", href: "/departments/emergency" },
  { label: "Obstetrics & Gynaecology", href: "/departments/obgyn" },
  { label: "Ophthalmology",    href: "/departments/ophthalmology" },
];

const socialIcons: Record<string, React.ElementType> = {
  facebook:  Facebook,
  twitter:   Twitter,
  instagram: Instagram,
  linkedin:  Linkedin,
  youtube:   Youtube,
};

// ─── Sub-components ────────────────────────────────────────────────────────

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Footer ───────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      className="border-t border-border/50 bg-muted/30"
      aria-label="Site footer"
    >
      {/* Emergency banner */}
      <div className="bg-danger/5 border-b border-danger/20 px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-danger shrink-0" aria-hidden="true" />
            <span className="font-semibold text-danger">
              24/7 Emergency Helpline:
            </span>
            <span className="text-foreground">{branding.emergencyPhone}</span>
          </div>
          <a
            href={`tel:${branding.emergencyPhone.replace(/\D/g, "")}`}
            className="rounded-full bg-danger px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
          >
            Call Emergency
          </a>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
              aria-label={`${branding.name} homepage`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <Stethoscope className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-extrabold text-foreground">
                {branding.shortName}
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {branding.description}
            </p>

            {/* Accreditations */}
            <div className="flex flex-wrap gap-2">
              {branding.accreditations.map((acc) => (
                <span
                  key={acc}
                  className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-semibold text-muted-foreground"
                >
                  {acc}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {Object.entries(branding.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon || !url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`${branding.name} on ${platform}`}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      "border border-border/50 bg-background text-muted-foreground",
                      "transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <FooterLinkGroup title="Quick Links" links={quickLinks} />

          {/* Column 3 — Departments */}
          <FooterLinkGroup title="Departments" links={topDepartments} />

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${branding.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                  aria-label={`Call ${branding.name} at ${branding.phone}`}
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {branding.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${branding.email}`}
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                  aria-label={`Email ${branding.name}`}
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {branding.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branding.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-primary"
                  aria-label={`View ${branding.name} on Google Maps`}
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {branding.address.full}
                </a>
              </li>
            </ul>

            {/* Opening hours */}
            <div className="mt-1 rounded-xl border border-border/50 bg-background p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Opening Hours
              </p>
              <div className="space-y-1 text-xs text-foreground">
                <div className="flex justify-between gap-4">
                  <span>OPD (Mon–Sat)</span>
                  <span className="font-medium">8 AM – 8 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Sunday OPD</span>
                  <span className="font-medium">9 AM – 2 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-danger">Emergency</span>
                  <span className="font-semibold text-danger">24 / 7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 bg-muted/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>{branding.copyright}</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-4">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary focus-visible:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
