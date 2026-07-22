/**
 * AvailabilityBadge
 * Shows doctor availability status with a pulse indicator.
 * Server Component.
 */

import { cn } from "@/utils";
import type { DoctorAvailability } from "@/types";

interface AvailabilityBadgeProps {
  status: DoctorAvailability;
  className?: string;
}

const STATUS_CONFIG: Record<
  DoctorAvailability,
  { label: string; dotClass: string; badgeClass: string; pulse: boolean }
> = {
  available: {
    label: "Available",
    dotClass:  "bg-success",
    badgeClass: "bg-success/10 text-success border-success/20",
    pulse: true,
  },
  "on-leave": {
    label: "On Leave",
    dotClass:  "bg-warning",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
    pulse: false,
  },
  busy: {
    label: "Busy",
    dotClass:  "bg-danger",
    badgeClass: "bg-danger/10 text-danger border-danger/20",
    pulse: false,
  },
};

export function AvailabilityBadge({ status, className }: AvailabilityBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        cfg.badgeClass,
        className
      )}
      aria-label={`Doctor status: ${cfg.label}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {cfg.pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              cfg.dotClass
            )}
          />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", cfg.dotClass)} />
      </span>
      {cfg.label}
    </span>
  );
}
