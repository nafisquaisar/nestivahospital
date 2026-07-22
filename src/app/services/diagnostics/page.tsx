import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { FAQPreview } from "@/components/shared/FAQPreview";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { ServiceFeatureList } from "@/modules/services/ServiceFeatureList";
import { ServiceProcessSteps } from "@/modules/services/ServiceProcessSteps";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { services } from "@/data/services";

const svc = services.find((s) => s.slug === "diagnostics")!;

export const metadata: Metadata = buildMetadata({
  title: svc.name,
  description: svc.description.slice(0, 160),
  alternates: { canonical: `${siteUrl}/services/diagnostics` },
  openGraph: {
    title: `${svc.name} | Nestiva Hospital`,
    description: svc.tagline,
    url: `${siteUrl}/services/diagnostics`,
  },
});

export default function DiagnosticsPage() {
  const related = services
    .filter((s) => svc.relatedServiceIds?.includes(s.id))
    .map((s, i) => ({
      href: `/services/${s.slug}`,
      icon: s.icon,
      title: s.name,
      description: s.shortDescription,
      color: (["primary", "secondary"] as const)[i % 2],
    }));

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Precision Diagnostics"
          title={svc.name}
          subtitle={svc.tagline}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: svc.name },
          ]}
          stats={svc.stats.map((s) => ({ value: s.value, label: s.label }))}
        />

        <section className="bg-background py-14" aria-labelledby="dx-overview-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeader
                eyebrow="About This Service"
                title="ISO-Certified Diagnostics"
                titleId="dx-overview-heading"
                subtitle={svc.description}
                align="center"
              />
            </div>
          </Container>
        </section>

        <ServiceFeatureList
          features={svc.features}
          eyebrow="Our Capabilities"
          title="State-of-the-Art Diagnostic Technology"
          subtitle="Over 120 diagnostic modalities — from 3T MRI and 256-slice CT to next-generation genomic sequencing."
        />

        <ServiceProcessSteps
          steps={svc.processSteps}
          eyebrow="What to Expect"
          title="From Referral to Report in 5 Steps"
        />

        <FAQPreview
          faqs={svc.faqs}
          eyebrow="Diagnostics FAQs"
          title="Common Questions About Our Diagnostics"
        />

        <RelatedLinks eyebrow="Explore More Services" title="Related Services" links={related} />

        <AppointmentBanner
          heading="Book Your Diagnostic Test"
          description="Schedule online or walk in Monday–Saturday, 7 AM–5 PM. Many tests available same day."
        />
      </main>
      <Footer />
    </>
  );
}
