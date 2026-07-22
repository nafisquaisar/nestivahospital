import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { FAQPreview } from "@/components/shared/FAQPreview";
import { ServiceListGrid } from "@/modules/services/ServiceListGrid";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Nestiva Hospital offers emergency care, advanced diagnostics, telemedicine consultations, and complex surgical services — all delivered by specialist teams.",
  alternates: { canonical: `${siteUrl}/services` },
  openGraph: {
    title: "Medical Services | Nestiva Hospital",
    url: `${siteUrl}/services`,
  },
});

export default function ServicesPage() {
  const serviceFaqs = faqs.filter((f) =>
    ["faq-appointment", "faq-emergency", "faq-teleconsult", "faq-insurance"].includes(f.id)
  );

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="What We Offer"
          title="Comprehensive Medical Services"
          subtitle="From round-the-clock emergency response to precision surgical care and virtual consultations — every service at Nestiva is delivered with specialist expertise and genuine compassion."
          breadcrumbs={[{ label: "Services" }]}
          stats={[
            { value: "4",    label: "Core Service Lines" },
            { value: "24/7", label: "Emergency Coverage" },
            { value: "300+", label: "Specialists" },
          ]}
        />

        <ServiceListGrid services={services} />

        <FAQPreview
          faqs={serviceFaqs}
          eyebrow="Have Questions?"
          title="Service FAQs"
          subtitle="Common questions about booking, coverage, and what to expect."
        />

        <AppointmentBanner
          heading="Not Sure Which Service You Need?"
          description="Our care coordinators will help you find the right service and specialist for your condition — just give us a call."
        />
      </main>
      <Footer />
    </>
  );
}
