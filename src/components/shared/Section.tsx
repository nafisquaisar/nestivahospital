/**
 * Section
 * ─────────────────────────────────────────────────────────────────────────────
 * Semantic page section with consistent vertical spacing.
 * Spacing sourced from theme — never hardcoded.
 */

import { cn } from "@/utils";
import type { ElementType, ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Vertical padding variant */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  /** Background variant */
  background?: "default" | "muted" | "primary" | "dark";
  /** Override the default <section> tag */
  as?: ElementType;
  id?: string;
}

const spacingMap = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

const backgroundMap = {
  default: "bg-background",
  muted: "bg-muted/40",
  primary: "bg-primary/5",
  dark: "bg-foreground text-background",
};

export function Section({
  children,
  className,
  spacing = "lg",
  background = "default",
  as: Tag = "section",
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        spacingMap[spacing],
        backgroundMap[background],
        className
      )}
    >
      {children}
    </Tag>
  );
}
