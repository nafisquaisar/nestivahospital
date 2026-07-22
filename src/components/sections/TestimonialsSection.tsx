"use client";

/**
 * TestimonialsSection
 * Patient testimonial carousel — centralized animation system.
 * Auto-scrolls every 5s, pauses on interaction.
 */

import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TestimonialCard } from "@/components/common/TestimonialCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { testimonials } from "@/data/testimonials";
import { fadeUp, scaleIn, defaultViewport, lazyViewport, animationProps } from "@/lib/animations";
import { useReducedMotion } from "@/hooks";

export function TestimonialsSection() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="bg-muted/30 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          {...animationProps(isReduced, {
            variants: fadeUp,
            viewport: defaultViewport,
          })}
          className="text-center"
        >
          <SectionHeader
            eyebrow="Patient Stories"
            title="What Our Patients Say"
            titleId="testimonials-heading"
            subtitle="Real experiences from real patients. Their trust and recovery stories are our greatest achievement."
            align="center"
          />
        </motion.div>

        {/* Carousel */}
        <motion.div
          {...animationProps(isReduced, {
            variants: scaleIn,
            viewport: lazyViewport,
          })}
        >
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            aria-label="Patient testimonials carousel"
            aria-roledescription="carousel"
          >
            <CarouselContent className="-ml-4 sm:-ml-5">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 sm:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                  aria-roledescription="slide"
                  aria-label={`Testimonial from ${testimonial.patientName}`}
                >
                  <TestimonialCard testimonial={testimonial} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselDots />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </Container>
    </section>
  );
}
