/**
 * Container
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsive, max-width constrained wrapper.
 * Width and padding sourced from theme — never hardcoded.
 */

import { cn } from "@/utils";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  /** Override the default max-width variant */
  size?: "narrow" | "default" | "wide" | "full";
  className?: string;
  as?: ElementType;
}

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
};

export function Container({
  children,
  size = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
