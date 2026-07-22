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

const svc = services.find((s) => s.slug === "telemedicine")!;

export const metadata: Metadata = buildMetadata({
  title: svc.name,
  description: svc.description.slice(0, 160),
  alternates: { canonical: `${siteUrl}/services/telemedicine` },
  openGraph: {
    title: `${svc.name} | Nestiva Hospital`,
    description: svc.tagline,
    url: `${siteUrl}/services/telemedicine`,
  },
});

export default function TelemedcinePage() {
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
          eyebrow="Virtual Care"
          title={svc.name}
          subtitle={svc.tagline}
          breadcrumbs={[
            { label: "Services", href: "/services" },
            { label: svc.name },
          ]}
          stats={svc.stats.map((s) => ({ value: s.value, label: s.label }))}
        />

        <section className="bg-background py-14" aria-labelledby="tm-overview-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <SectionHeader
                eyebrow="About This Service"
                title="Healthcare Without Boundaries"
                titleId="tm-overview-heading"
                subtitle={svc.description}
                align="center"
              />
            </div>
          </Container>
        </section>

        <ServiceFeatureList
          features={svc.features}
          eyebrow="Platform Features"
          title="Everything You Need, Digitally"
          subtitle="HD video, digital prescriptions, chronic disease management — all from the comfort of your home."
        />

        <ServiceProcessSteps
          steps={svc.processSteps}
          eyebrow="How It Works"
          title="Your Virtual Consultation in 5 Steps"
        />

        <FAQPreview
          faqs={svc.faqs}
          eyebrow="Telemedicine FAQs"
          title="Common Questions About Virtual Consultations"
        />

        <RelatedLinks eyebrow="Explore More Services" title="Related Services" links={related} />

        <AppointmentBanner
          heading="Book a Virtual Consultation Today"
          description="Choose your specialist, pick a time, and consult from anywhere. Slots often available within 24 hours."
        />
      </main>
      <Footer />
    </>
  );
}
