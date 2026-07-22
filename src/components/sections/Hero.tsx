/**
 * Hero
 * Full-screen hero section — composes HeroContent + HeroImage.
 * Server Component (no client-side code here).
 */

import { HeroContent } from "@/components/sections/HeroContent";
import { HeroImage } from "@/components/sections/HeroImage";
import { Container } from "@/components/shared/Container";

export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/[0.04]"
      aria-label="Welcome to Nestiva Hospital"
    >
      {/* ── Background decoration ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Blob top-right */}
        <div className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-primary/8 blur-3xl" />
        {/* Blob bottom-left */}
        <div className="absolute -bottom-32 -left-48 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="flex min-h-screen flex-col items-center gap-10 pt-24 pb-16 lg:flex-row lg:gap-16 lg:pt-28 lg:pb-24">
          {/* Left: Content */}
          <div className="w-full lg:flex-1 lg:max-w-[54%]">
            <HeroContent />
          </div>

          {/* Right: Image */}
          <div className="flex w-full justify-center lg:flex-1 lg:justify-end lg:max-w-[46%]">
            <HeroImage />
          </div>
        </div>
      </Container>
    </section>
  );
}
