"use client";

/**
 * GallerySection
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium editorial gallery grid — Apple/Vercel-inspired masonry composition.
 * 6 items across a 12-column grid with intentional spanning for visual weight.
 *
 * Desktop (3-col) layout:
 *   [  0 tall  ] [ 1 ] [ 4 tall ]
 *   [           ] [  2 wide  ] [       ]
 *   [  3  ] [    5    ] [      ]
 *
 * Tablet (2-col): simplified 2-column grid
 * Mobile (1-col): stacked single column
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryCard } from "@/components/common/GalleryCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Container } from "@/components/shared/Container";
import { galleryItems } from "@/data/gallery";
import { fadeUp, defaultViewport, lazyViewport, animationProps } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

/* ──────────────────────────────────────────────────────────────────────────
   Grid span configuration
   Each entry maps item index → { col span, row span } per breakpoint.
   Design goal: create visual hierarchy with tall left + wide middle + tall right.
   ────────────────────────────────────────────────────────────────────────── */
interface SpanConfig {
  colSpan?: string;
  rowSpan?: string;
}

const SPAN_MAP: Record<number, SpanConfig> = {
  0: { rowSpan: "lg:row-span-2" },          // Tall left — main anchor
  1: { colSpan: "", rowSpan: "" },           // Normal top-center
  2: { colSpan: "sm:col-span-2 lg:col-span-1", rowSpan: "" }, // Wide on tablet, normal on desktop
  3: { colSpan: "", rowSpan: "" },           // Normal bottom-left
  4: { rowSpan: "lg:row-span-2" },          // Tall right — counterbalance
  5: { colSpan: "sm:col-span-2 lg:col-span-1", rowSpan: "" }, // Wide on tablet, normal on desktop
};

const previewItems = galleryItems.slice(0, 6);

export function GallerySection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="gallery"
      className="bg-background py-16 md:py-24"
      aria-labelledby="gallery-heading"
    >
      <Container className="flex flex-col gap-10">
        {/* ── Section header — centered ─────────────────────── */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
        >
          <SectionHeader
            eyebrow="Our Facilities"
            title="A Glimpse Inside Nestiva"
            titleId="gallery-heading"
            subtitle="World-class infrastructure designed for comfort, safety, and healing — from advanced surgical suites to warm, welcoming patient rooms."
            align="center"
            action={
              <Button asChild variant="outline" className="gap-2">
                <Link href="/gallery">
                  <Images className="h-4 w-4" aria-hidden="true" />
                  View Full Gallery
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </motion.div>

        {/* ── Gallery grid ─────────────────────────────────────── */}
        <div
          className={cn(
            "grid gap-3 sm:gap-4",
            // Mobile: single column
            "grid-cols-1",
            // Tablet: 2-col, even rows
            "sm:grid-cols-2 sm:auto-rows-[220px]",
            // Desktop: 3-col masonry with tall rows
            "lg:grid-cols-3 lg:auto-rows-[240px]"
          )}
          role="list"
          aria-label="Hospital gallery images"
        >
          {previewItems.map((item, i) => {
            const span = SPAN_MAP[i] ?? {};
            return (
              <motion.div
                key={item.id}
                role="listitem"
                className={cn(
                  span.colSpan,
                  span.rowSpan
                )}
                initial={isReduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
                whileInView={isReduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={lazyViewport}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GalleryCard item={item} index={i} className="h-full w-full" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
