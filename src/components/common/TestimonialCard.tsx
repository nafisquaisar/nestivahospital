/**
 * TestimonialCard
 * Patient testimonial card with quote, rating, and verified badge.
 * Server Component.
 */

import { Quote, BadgeCheck } from "lucide-react";
import { RatingStars } from "@/components/common/RatingStars";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

/** Generate a consistent color from the patient name */
function getAvatarColor(name: string) {
  const COLORS = [
    "bg-blue-100   text-blue-700",
    "bg-violet-100 text-violet-700",
    "bg-teal-100   text-teal-700",
    "bg-rose-100   text-rose-700",
    "bg-amber-100  text-amber-700",
    "bg-green-100  text-green-700",
  ];
  const idx = name.charCodeAt(0) % COLORS.length;
  return COLORS[idx];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const avatarColor = getAvatarColor(testimonial.patientName);
  const initials    = getInitials(testimonial.patientName);

  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-2xl border border-border/40 bg-card p-6 sm:p-8",
        "shadow-sm",
        className
      )}
      aria-label={`Testimonial from ${testimonial.patientName}`}
    >
      {/* Quote icon + rating row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <RatingStars rating={testimonial.rating} size="sm" />
      </div>

      {/* Review text */}
      <blockquote className="flex-1 text-base leading-relaxed text-foreground/80 italic">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Treatment pill */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/8 px-3 py-0.5 text-xs font-semibold text-primary">
          {testimonial.treatmentType}
        </span>
        {testimonial.departmentName && (
          <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
            {testimonial.departmentName}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" role="separator" />

      {/* Patient info */}
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11 border border-border">
          <AvatarFallback className={cn("text-sm font-bold", avatarColor)}>
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-foreground">
              {testimonial.patientName}
            </span>
            {testimonial.verified && (
              <BadgeCheck
                className="h-4 w-4 shrink-0 text-primary"
                aria-label="Verified patient"
              />
            )}
          </div>
          {testimonial.patientLocation && (
            <p className="truncate text-xs text-muted-foreground">
              {testimonial.patientLocation}
            </p>
          )}
        </div>

        {testimonial.doctorName && (
          <p className="hidden shrink-0 text-right text-xs text-muted-foreground sm:block">
            via {testimonial.doctorName}
          </p>
        )}
      </div>
    </article>
  );
}
