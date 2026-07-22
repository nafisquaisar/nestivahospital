/**
 * AppointmentBreadcrumb
 * ─────────────────────────────────────────────────────────────────────────────
 * Standalone lightweight breadcrumb component for appointment pages.
 * Matches the project's existing PageHeader breadcrumb design language.
 */
"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppointmentBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function AppointmentBreadcrumb({
  items,
  className,
}: AppointmentBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-sm", className)}
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight
            className="h-3.5 w-3.5 text-muted-foreground/50"
            aria-hidden="true"
          />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="font-medium text-foreground"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
