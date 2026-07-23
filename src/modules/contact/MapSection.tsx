"use client";

/**
 * MapSection
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsive lazy-loaded Google Maps embed with skeleton placeholder,
 * card style, rounded corners, and a directions CTA.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/utils";

export function MapSection() {
  const isReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      className="bg-muted/20 py-16 md:py-20"
      aria-labelledby="map-section-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Find Us"
          title="Visit Nestiva Hospital"
          titleId="map-section-heading"
          subtitle={`We are located at ${branding.address.full}. Easily accessible by metro, bus, and private vehicles.`}
          align="center"
        />

        <motion.div
          initial={isReduced ? undefined : { opacity: 0, y: 24 }}
          whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/8"
        >
          {/* Top info bar */}
          <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Location</p>
                <p className="text-sm font-bold text-foreground">{branding.address.full}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="gap-2 text-xs"
              >
                <a
                  href={contact.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                  Get Directions
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* Map wrapper */}
          <div className="relative h-[380px] md:h-[460px]">
            {/* Skeleton loader */}
            {!loaded && (
              <div
                className={cn(
                  "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-muted/60 animate-pulse"
                )}
                aria-hidden="true"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-4 w-40 rounded-full bg-muted" />
                  <div className="h-3 w-24 rounded-full bg-muted" />
                </div>
              </div>
            )}

            <iframe
              title="Nestiva Hospital Location — Munirka, New Delhi"
              src={contact.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setLoaded(true)}
              className={cn(
                "w-full h-full transition-opacity duration-500",
                loaded ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
