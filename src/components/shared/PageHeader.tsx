/**
 * PageHeader
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable page header / hero strip shown at the top of inner pages.
 * Provides breadcrumbs, page title, and optional subtitle.
 *
 * Usage:
 *   <PageHeader
 *     title="Our Doctors"
 *     subtitle="Meet the team of specialists"
 *     breadcrumbs={[{ label: "Home", href: "/" }, { label: "Doctors" }]}
 *   />
 */

import { Container } from "@/components/shared/Container";
import { cn } from "@/utils";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Background style variant */
  variant?: "gradient" | "solid" | "minimal";
  className?: string;
}

const variantMap = {
  gradient:
    "bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent border-b border-border",
  solid: "bg-primary text-primary-foreground",
  minimal: "bg-muted/40 border-b border-border",
};

const titleColorMap = {
  gradient: "text-foreground",
  solid: "text-primary-foreground",
  minimal: "text-foreground",
};

const subtitleColorMap = {
  gradient: "text-muted-foreground",
  solid: "text-primary-foreground/80",
  minimal: "text-muted-foreground",
};

const breadcrumbColorMap = {
  gradient: "text-muted-foreground hover:text-primary",
  solid: "text-primary-foreground/70 hover:text-primary-foreground",
  minimal: "text-muted-foreground hover:text-primary",
};

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  variant = "gradient",
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("py-12 md:py-16", variantMap[variant], className)}>
      <Container>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1 text-sm"
          >
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1 transition-colors",
                breadcrumbColorMap[variant]
              )}
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-1">
                <ChevronRight
                  className="h-3.5 w-3.5 text-muted-foreground/60"
                  aria-hidden="true"
                />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      "transition-colors",
                      breadcrumbColorMap[variant]
                    )}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-medium",
                      variant === "solid"
                        ? "text-primary-foreground"
                        : "text-foreground"
                    )}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title */}
        <h1
          className={cn(
            "font-display text-3xl font-bold md:text-4xl lg:text-5xl",
            titleColorMap[variant]
          )}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={cn(
              "mt-3 max-w-2xl text-base leading-relaxed md:text-lg",
              subtitleColorMap[variant]
            )}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
