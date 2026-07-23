/**
 * Logo
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the Nestiva logo image with transparent background.
 * Uses Next.js <Image> for automatic optimisation (WebP, lazy-load, etc.).
 * Values sourced from branding config — no hardcoding.
 */

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils";
import { branding } from "@/config/branding";

interface LogoProps {
  className?: string;
  /** Compact mode — slightly smaller on mobile */
  compact?: boolean;
  /** White/inverted variant for dark backgrounds */
  white?: boolean;
}

export function Logo({ className, compact = false, white = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center",
        "transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      aria-label={`${branding.name} — go to homepage`}
    >
      <Image
        src={branding.logo.full}
        alt={branding.name}
        width={compact ? 120 : 150}
        height={compact ? 40 : 50}
        priority
        quality={100}
        className={cn(
          "object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]",
          /* Invert to white on dark backgrounds */
          white && "brightness-0 invert"
        )}
        style={{ background: "transparent" }}
      />
    </Link>
  );
}
