"use client";

/**
 * DoctorCard
 * Premium doctor profile card with image fallback (initials).
 * Client Component — manages image error state.
 */

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/common/RatingStars";
import { AvailabilityBadge } from "@/components/common/AvailabilityBadge";
import { cn } from "@/utils";
import type { Doctor } from "@/types";

/* ── Avatar gradient palette ─────────────────────────────────────────────── */
const AVATAR_GRADIENTS = [
  "from-blue-100   to-indigo-200",
  "from-violet-100 to-purple-200",
  "from-teal-100   to-cyan-200",
  "from-rose-100   to-pink-200",
];
const AVATAR_TEXT = [
  "text-blue-600", "text-violet-600", "text-teal-600", "text-rose-600",
];

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

export function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradient  = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const textColor = AVATAR_TEXT[index % AVATAR_TEXT.length];

  const initials = `${doctor.prefix[0]}${doctor.name.split(" ")[0][0]}`;

  // Build the Book Now URL with query params — always pass the stable id, never the display name
  const bookNowHref = useMemo(() => {
    const params = new URLSearchParams({
      doctorId:     doctor.id,
      doctorName:   `${doctor.prefix} ${doctor.name}`,
      departmentId: doctor.departmentId,      // stable slug, e.g. "cardiology"
    });
    return `/appointment?${params.toString()}`;
  }, [doctor.id, doctor.prefix, doctor.name, doctor.departmentId]);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-2xl hover:border-primary/20"
      )}
      aria-label={`${doctor.prefix} ${doctor.name}, ${doctor.designation}`}
    >
      {/* ── Photo area ───────────────────────────────────────── */}
      <div
        className={cn(
          "relative h-56 overflow-hidden bg-gradient-to-br",
          gradient
        )}
      >
        {!imgError ? (
          <Image
            src={doctor.image.src}
            alt={doctor.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Initials fallback */
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <span className={cn("font-display text-5xl font-black", textColor)}>
              {initials}
            </span>
            <span className={cn("text-xs font-semibold uppercase tracking-wider", textColor, "opacity-60")}>
              {doctor.specialization.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
        )}

        {/* Availability badge */}
        <div className="absolute right-3 top-3">
          <AvailabilityBadge status={doctor.availability} />
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Name & designation */}
        <div>
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {doctor.prefix} {doctor.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-primary">{doctor.designation}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{doctor.specialization}</p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 text-xs">
          <span
            className="flex items-center gap-1 text-muted-foreground"
            aria-label={`${doctor.experience} years experience`}
          >
            <Clock className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {doctor.experience}+ yrs
          </span>
          <span
            className="flex items-center gap-1 text-muted-foreground"
            aria-label={`${doctor.qualifications[0]}`}
          >
            <GraduationCap className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {doctor.qualifications[0]}
          </span>
          <span
            className="flex items-center gap-1 text-muted-foreground"
            aria-label={`${doctor.reviewCount} reviews`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-primary/60" aria-hidden="true" />
            {doctor.reviewCount} reviews
          </span>
        </div>

        {/* Rating */}
        <RatingStars rating={doctor.rating} showValue size="sm" />

        {/* Action button — single primary CTA */}
        <div className="mt-auto pt-2">
          <Button asChild size="sm" className="w-full text-xs">
            <Link
              href={bookNowHref}
              aria-label={`Book appointment with ${doctor.prefix} ${doctor.name}`}
            >
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
