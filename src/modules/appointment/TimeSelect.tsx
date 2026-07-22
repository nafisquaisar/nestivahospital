/**
 * TimeSelect
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium radio-card time slot picker.
 * Three large clickable cards: Morning / Afternoon / Evening.
 * Much more visually impactful than a plain dropdown.
 */
"use client";

import { motion } from "framer-motion";
import { Sunrise, Sun, Sunset } from "lucide-react";
import { cn } from "@/utils";
import { type TimeSlot } from "@/types/appointment";
import { useReducedMotion } from "@/hooks";

interface TimeOption {
  value: TimeSlot;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  gradient: string;
  activeGradient: string;
  activeBg: string;
  iconColor: string;
}

const TIME_OPTIONS: TimeOption[] = [
  {
    value: "Morning",
    label: "Morning",
    subLabel: "8 AM – 12 PM",
    icon: Sunrise,
    gradient: "from-amber-50 to-orange-50",
    activeGradient: "from-amber-500 to-orange-400",
    activeBg: "bg-gradient-to-br from-amber-500 to-orange-400",
    iconColor: "text-amber-500",
  },
  {
    value: "Afternoon",
    label: "Afternoon",
    subLabel: "12 PM – 5 PM",
    icon: Sun,
    gradient: "from-sky-50 to-blue-50",
    activeGradient: "from-blue-500 to-sky-400",
    activeBg: "bg-gradient-to-br from-blue-500 to-sky-400",
    iconColor: "text-blue-500",
  },
  {
    value: "Evening",
    label: "Evening",
    subLabel: "5 PM – 8 PM",
    icon: Sunset,
    gradient: "from-violet-50 to-purple-50",
    activeGradient: "from-violet-500 to-purple-400",
    activeBg: "bg-gradient-to-br from-violet-500 to-purple-400",
    iconColor: "text-violet-500",
  },
];

interface TimeSelectProps {
  value: string;
  onChange: (value: TimeSlot) => void;
  hasError?: boolean;
}

export function TimeSelect({ value, onChange, hasError = false }: TimeSelectProps) {
  const isReduced = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Preferred time of day"
      className={cn(
        "grid grid-cols-3 gap-3",
        hasError && "ring-2 ring-red-400 ring-offset-2 rounded-xl"
      )}
    >
      {TIME_OPTIONS.map((option, i) => {
        const Icon = option.icon;
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            id={`time-${option.value.toLowerCase()}`}
            onClick={() => onChange(option.value)}
            initial={isReduced ? undefined : { opacity: 0, y: 8 }}
            animate={isReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={isReduced ? undefined : { scale: 1.02 }}
            whileTap={isReduced ? undefined : { scale: 0.98 }}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center",
              "transition-all duration-200 cursor-pointer select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isSelected
                ? "border-primary shadow-md shadow-primary/20"
                : "border-border hover:border-primary/40 hover:shadow-sm"
            )}
          >
            {/* Background fill */}
            <div
              className={cn(
                "absolute inset-0 rounded-[10px] transition-opacity duration-200",
                isSelected
                  ? `${option.activeBg} opacity-100`
                  : `bg-gradient-to-br ${option.gradient} opacity-60`
              )}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200",
                  isSelected ? "bg-white/25" : "bg-white shadow-sm"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isSelected ? "text-white" : option.iconColor
                  )}
                  aria-hidden="true"
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold leading-tight transition-colors duration-200",
                  isSelected ? "text-white" : "text-foreground"
                )}
              >
                {option.label}
              </span>
              <span
                className={cn(
                  "text-xs leading-tight transition-colors duration-200",
                  isSelected ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {option.subLabel}
              </span>
            </div>

            {/* Selected checkmark */}
            {isSelected && (
              <motion.div
                initial={isReduced ? undefined : { scale: 0 }}
                animate={isReduced ? undefined : { scale: 1 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-md"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 10 10"
                  className="h-3 w-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <polyline points="1.5,5 4,7.5 8.5,2.5" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
