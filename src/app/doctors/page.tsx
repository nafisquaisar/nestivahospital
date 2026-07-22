/**
 * /doctors — Doctor listing page with search, filters, and paginated grid
 */

import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { Container } from "@/components/shared/Container";
import { DoctorsGrid } from "@/modules/doctors/DoctorsGrid";
import { DoctorService } from "@/services/DoctorService";

export const metadata: Metadata = buildMetadata({
  title: "Our Doctors",
  description:
    "Meet Nestiva's 500+ specialist physicians across 28 departments. Search by name, specialization, department, or availability and book your appointment online.",
  alternates: { canonical: `${siteUrl}/doctors` },
  openGraph: {
    title: "Our Doctors | Nestiva Hospital",
    description: "Find the right specialist for your needs.",
    url: `${siteUrl}/doctors`,
  },
});

export default function DoctorsPage() {
  const doctors = DoctorService.getAll();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Our Specialists"
          title="Expert Doctors, Genuine Care"
          subtitle="Our team of 500+ fellowship-trained specialists combines clinical mastery with genuine compassion — ensuring you receive the right diagnosis and treatment every time."
          breadcrumbs={[{ label: "Doctors" }]}
          stats={[
            { value: "500+", label: "Specialist Doctors" },
            { value: "28",   label: "Specialties" },
            { value: "4.8★", label: "Avg. Rating" },
            { value: "24/7", label: "Available" },
          ]}
        />

        <section className="bg-background py-12 md:py-16" aria-label="Doctor search and listing">
          <Container>
            <DoctorsGrid doctors={doctors} />
          </Container>
        </section>

        <AppointmentBanner
          heading="Can't Find the Right Doctor?"
          description="Our care coordinators can match you with the right specialist for your condition — just give us a call or chat online."
        />
      </main>
      <Footer />
    </>
  );
}
