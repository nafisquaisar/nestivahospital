/**
 * /gallery — Gallery listing page
 */

import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { Container } from "@/components/shared/Container";
import { GalleryGrid } from "@/modules/gallery/GalleryGrid";
import { GalleryService } from "@/services/GalleryService";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Take a visual tour of Nestiva Hospital — our facilities, technology, operating theatres, patient rooms, and the world-class environment where healing happens.",
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: "Gallery | Nestiva Hospital",
    description: "A glimpse inside Nestiva — world-class infrastructure for healing.",
    url: `${siteUrl}/gallery`,
  },
});

export default function GalleryPage() {
  const items = GalleryService.getAll();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Our Facilities"
          title="A Glimpse Inside Nestiva"
          subtitle="World-class infrastructure designed for healing — from advanced surgical suites to warm, welcoming patient rooms. Every space at Nestiva is designed with your safety and comfort in mind."
          breadcrumbs={[{ label: "Gallery" }]}
          stats={[
            { value: "12+", label: "Departments Pictured" },
            { value: "50+", label: "Photos" },
            { value: "1,200", label: "Beds" },
          ]}
        />

        <section className="bg-background py-12 md:py-16" aria-label="Hospital gallery">
          <Container>
            <GalleryGrid items={items} />
          </Container>
        </section>

        <AppointmentBanner
          heading="Ready to Experience Nestiva?"
          description="Book an appointment and let our specialist team take care of you in these world-class facilities."
        />
      </main>
      <Footer />
    </>
  );
}
