/**
 * Logo
 * Server Component — renders hospital logo + name.
 * Values sourced from branding config.
 */

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { cn } from "@/utils";
import { branding } from "@/config/branding";

interface LogoProps {
  className?: string;
  /** Compact mode hides the "Hospital" sub-label */
  compact?: boolean;
  /** White variant for dark backgrounds */
  white?: boolean;
}

export function Logo({ className, compact = false, white = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${branding.name} — go to homepage`}
    >
      {/* Icon mark */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-105",
          white ? "bg-white/20 border border-white/30" : "bg-primary"
        )}
      >
        <Stethoscope
          className={cn("h-5 w-5", white ? "text-white" : "text-primary-foreground")}
          aria-hidden="true"
        />
      </div>

      {/* Word mark */}
      <div className={cn("leading-none", compact && "hidden sm:block")}>
        <span
          className={cn(
            "block font-display text-[15px] font-bold tracking-tight",
            white ? "text-white" : "text-foreground"
          )}
        >
          {branding.shortName}
        </span>
        {!compact && (
          <span
            className={cn(
              "block text-[10px] font-medium tracking-widest uppercase mt-0.5",
              white ? "text-white/70" : "text-muted-foreground"
            )}
          >
            Hospital
          </span>
        )}
      </div>
    </Link>
  );
}
