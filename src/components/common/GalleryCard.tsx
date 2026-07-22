"use client";

/**
 * GalleryCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium gallery image card — Apple/healthcare editorial style.
 * Features:
 *   - next/image with fill + object-cover
 *   - Smooth scale-105 hover zoom (not aggressive 110)
 *   - Rich gradient overlay (stronger bottom fade for text legibility)
 *   - Subtle category badge (top-left pill)
 *   - Title + description reveal on hover (translate-y transition)
 *   - Rounded corners + shadow upgrade on hover
 *   - Graceful gradient fallback with no-image state
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";
import type { GalleryItem } from "@/types";


/* ── Fallback gradient palette ────────────────────────────────────────────── */
const GRADIENTS = [
  "from-blue-100   via-sky-50     to-indigo-100",
  "from-teal-100   via-emerald-50 to-cyan-100",
  "from-violet-100 via-purple-50  to-fuchsia-100",
  "from-amber-100  via-yellow-50  to-orange-100",
  "from-rose-100   via-pink-50    to-red-100",
  "from-green-100  via-emerald-50 to-teal-100",
  "from-sky-100    via-blue-50    to-indigo-100",
  "from-orange-100 via-amber-50   to-yellow-100",
];

/* ── Category label formatting ────────────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  facility:  "Facility",
  equipment: "Equipment",
  team:      "Our Team",
  patient:   "Patient Care",
  surgery:   "Surgery",
  emergency: "Emergency",
};

interface GalleryCardProps {
  item: GalleryItem;
  index?: number;
  /** Optional CSS class for grid spanning (tall / wide items) */
  className?: string;
}

export function GalleryCard({ item, index = 0, className }: GalleryCardProps) {
  const [imgError, setImgError] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;

  return (
    <Link
      href={`/gallery/${item.slug}`}
      aria-label={`View gallery: ${item.title}`}
    >
    <article
      className={cn(
        // Layout
        "group relative overflow-hidden rounded-2xl",
        // Shadow upgrade on hover
        "shadow-md transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-black/20",
        // Subtle ring on hover
        "ring-1 ring-transparent hover:ring-white/10",
        className
      )}
      aria-label={item.title}
    >
      {/* ── Image / gradient background ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        {!imgError ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover object-center",
              "transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              "group-hover:scale-105"
            )}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={cn(
              "h-full w-full bg-gradient-to-br",
              gradient,
              "flex items-center justify-center"
            )}
          >
            <span className="font-display text-5xl font-black text-foreground/10 select-none">
              {item.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* ── Gradient overlay — rich bottom fade ──────────────── */}
      {/* Base layer: always-visible dark vignette at bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        aria-hidden="true"
      />
      {/* Hover layer: slightly stronger overlay for text contrast */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5",
          "opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        )}
        aria-hidden="true"
      />

      {/* ── Category badge — top-left ────────────────────────── */}
      <div className="absolute left-3 top-3 z-10">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1",
            "bg-white/15 backdrop-blur-md border border-white/20",
            "text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90",
            "transition-colors duration-300 group-hover:bg-white/25"
          )}
        >
          {categoryLabel}
        </span>
      </div>

      {/* ── Content — bottom caption ─────────────────────────── */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-10 p-4",
          "translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "group-hover:translate-y-0"
        )}
      >
        <p className="text-sm font-bold leading-snug text-white drop-shadow-sm">
          {item.title}
        </p>
        {item.description && (
          <p
            className={cn(
              "mt-1 text-xs leading-relaxed text-white/70",
              "max-h-0 overflow-hidden opacity-0",
              "transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              "group-hover:max-h-10 group-hover:opacity-100"
            )}
          >
            {item.description}
          </p>
        )}
      </div>
    </article>
    </Link>
  );
}
