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

const svc = services.find((s) => s.slug === "emergency-care")!;

export const metadata: Metadata = buildMetadata({
  title: svc.name,
  description: svc.description.slice(0, 160),
  alternates: { canonical: `${siteUrl}/services/emergency-care` },
  openGraph: {
    title: `${svc.name} | Nestiva Hospital`,
    description: svc.tagline,
    url: `${siteUrl}/services/emergency-care`,
  },
});

export default function EmergencyCarePage() {
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
          eyebrow="24/7 Emergency"
          title={svc.name}
          subtitle={svc.tagline}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: svc.name },
          ]}
          stats={svc.stats.map((s) => ({ value: s.value, label: s.label }))}
          variant="primary"
        />

        {/* Service overview */}
        <section className="bg-background py-14" aria-labelledby="em-overview-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeader
                eyebrow="About This Service"
                title={svc.name}
                titleId="em-overview-heading"
                subtitle={svc.description}
                align="center"
              />
            </div>
          </Container>
        </section>

        <ServiceFeatureList
          features={svc.features}
          eyebrow="What We Provide"
          title="Our Emergency Capabilities"
          subtitle="A fully equipped Level I Trauma Center staffed 24/7 by emergency physicians, trauma surgeons, and specialist teams."
        />

        <ServiceProcessSteps
          steps={svc.processSteps}
          eyebrow="What to Expect"
          title="Your Emergency Visit, Step by Step"
        />

        <FAQPreview
          faqs={svc.faqs}
          eyebrow="Emergency FAQs"
          title="Common Questions About Emergency Care"
        />

        <RelatedLinks
          eyebrow="Explore More Services"
          title="Related Services"
          links={related}
        />

        <AppointmentBanner
          heading="Non-Emergency? Book a Consultation"
          description="For non-emergency situations, book an outpatient appointment with our specialist teams — available 6 days a week."
        />
      </main>
      <Footer />
    </>
  );
}
