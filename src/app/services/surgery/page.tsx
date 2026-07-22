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

const svc = services.find((s) => s.slug === "surgery")!;

export const metadata: Metadata = buildMetadata({
  title: svc.name,
  description: svc.description.slice(0, 160),
  alternates: { canonical: `${siteUrl}/services/surgery` },
  openGraph: {
    title: `${svc.name} | Nestiva Hospital`,
    description: svc.tagline,
    url: `${siteUrl}/services/surgery`,
  },
});

export default function SurgeryPage() {
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
          eyebrow="Surgical Excellence"
          title={svc.name}
          subtitle={svc.tagline}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: svc.name },
          ]}
          stats={svc.stats.map((s) => ({ value: s.value, label: s.label }))}
        />

        <section className="bg-background py-14" aria-labelledby="sx-overview-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeader
                eyebrow="About This Service"
                title="Precision Surgery, Better Outcomes"
                titleId="sx-overview-heading"
                subtitle={svc.description}
                align="center"
              />
            </div>
          </Container>
        </section>

        <ServiceFeatureList
          features={svc.features}
          eyebrow="Surgical Capabilities"
          title="Advanced Surgical Technology & Expertise"
          subtitle="80+ fellowship-trained surgeons, 4 da Vinci robotic systems, and an Enhanced Recovery program for faster, safer healing."
        />

        <ServiceProcessSteps
          steps={svc.processSteps}
          eyebrow="Your Surgical Journey"
          title="From Consultation to Recovery in 5 Steps"
        />

        <FAQPreview
          faqs={svc.faqs}
          eyebrow="Surgery FAQs"
          title="Common Questions About Surgical Care"
        />

        <RelatedLinks eyebrow="Explore More Services" title="Related Services" links={related} />

        <AppointmentBanner
          heading="Schedule Your Surgical Consultation"
          description="Our fellowship-trained surgeons are available for consultations 6 days a week. Book your assessment today."
        />
      </main>
      <Footer />
    </>
  );
}
