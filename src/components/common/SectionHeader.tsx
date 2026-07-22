/**
 * SectionHeader
 * ─────────────────────────────────────────────────────────────────────────────
 * Single canonical section heading component.
 * All homepage sections import this — no other heading component needed.
 * Server Component.
 *
 * Features:
 *   - Pill eyebrow label with gradient accent line
 *   - Consistent title sizing across all breakpoints
 *   - Centered subtitle with max-w-2xl constraint
 *   - Consistent bottom margin (mb-10)
 *   - Optional right-side action slot (e.g. "View All" button)
 *   - align prop for left / center / right layouts
 *
 * Accessibility:
 *   Pass `titleId` + `aria-labelledby={titleId}` on the parent <section>.
 */

import { cn } from "@/utils";

interface SectionHeaderProps {
  /** Small label shown above the title (e.g. "Our Specialties") */
  eyebrow?: string;
  /** Main heading text — required */
  title: string;
  /**
   * HTML id applied to the <h2>. Set the parent <section> to
   * aria-labelledby={titleId} for proper accessibility.
   */
  titleId?: string;
  /** Optional descriptive text shown below the title */
  subtitle?: string;
  /** Text alignment — defaults to "center" for all homepage sections */
  align?: "left" | "center" | "right";
  /** Optional right-side / below-title action element (e.g. "View All" button) */
  action?: React.ReactNode;
  /** Override bottom margin (default mb-10) */
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = "center",
  action,
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isRight  = align === "right";

  return (
    <div
      className={cn(
        "mb-10",
        /* For left-align with action — keep the row layout */
        !isCenter && action && "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      {/* ── Text block ─────────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-col gap-3",
          isCenter && "items-center text-center",
          isRight  && "items-end text-right"
        )}
      >
        {/* Eyebrow label */}
        {eyebrow && (
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
            )}
            aria-hidden="true"
          >
            {/* Gradient accent line */}
            <span
              className="h-px w-8 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ display: isRight ? "none" : undefined }}
            />
            {eyebrow}
            {isRight && (
              <span className="h-px w-8 shrink-0 rounded-full bg-gradient-to-l from-primary to-secondary" />
            )}
          </span>
        )}

        {/* Title */}
        <h2
          id={titleId}
          className="font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p
            className={cn(
              "mt-1 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]",
              isCenter && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        )}

        {/* Action below subtitle when center-aligned */}
        {action && isCenter && (
          <div className="mt-2">{action}</div>
        )}
      </div>

      {/* Action to the right when left-aligned */}
      {action && !isCenter && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  );
}
