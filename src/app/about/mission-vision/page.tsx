import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { ValuesGrid } from "@/modules/about/ValuesGrid";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { mission, vision, coreValues } from "@/data/about";

export const metadata: Metadata = buildMetadata({
  title: "Mission & Vision",
  description:
    "Our mission is to deliver exceptional, patient-centred healthcare. Our vision is to be the most trusted name in healthcare. Discover the values that guide Nestiva.",
  alternates: { canonical: `${siteUrl}/about/mission-vision` },
  openGraph: {
    title: "Mission & Vision | Nestiva Hospital",
    url: `${siteUrl}/about/mission-vision`,
  },
});

export default function MissionVisionPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Purpose & Direction"
          title="Mission, Vision & Values"
          subtitle="Everything we do at Nestiva is guided by a clear purpose, a bold vision, and a set of core values that we hold ourselves accountable to — every day."
          breadcrumbs={[
            { label: "About", href: "/about" },
            { label: "Mission & Vision" },
          ]}
        />

        {/* Mission */}
        <section className="bg-background py-16 md:py-20" aria-labelledby="mission-full-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <SectionHeader
                  eyebrow="Our Mission"
                  title="Why We Exist"
                  titleId="mission-full-heading"
                  align="left"
                />
                <blockquote className="border-l-4 border-primary pl-6 text-lg font-semibold leading-relaxed text-foreground">
                  &ldquo;{mission.statement}&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our mission drives every clinical decision, every investment in technology, and every interaction between our staff and the patients who trust us with their health. It is not a statement on a wall — it is a commitment we renew every day.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <SectionHeader
                  eyebrow="Our Vision"
                  title="Where We Are Going"
                  align="left"
                />
                <blockquote className="border-l-4 border-secondary pl-6 text-lg font-semibold leading-relaxed text-foreground">
                  &ldquo;{vision.statement}&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our vision sets the standard we hold ourselves to — not just in clinical outcomes, but in the experience of care, the trust we earn from families, and the influence we have on the broader healthcare community through research, education, and leadership.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* All 6 core values */}
        <ValuesGrid
          values={coreValues}
          eyebrow="What We Stand For"
          title="Our Six Core Values"
          subtitle="These values are the foundation of our culture — they shape how we treat patients, how we support our teams, and how we make decisions."
        />

        {/* Related */}
        <RelatedLinks
          eyebrow="Continue Exploring"
          title="More About Nestiva"
          links={[
            { href: "/about/our-story",      icon: "BookOpen", title: "Our Story",       description: "The journey from a 60-bed clinic to a world-class hospital.", color: "primary" },
            { href: "/about/leadership",     icon: "Users",    title: "Leadership",      description: "The people who live these values every day.",                color: "secondary" },
            { href: "/about/accreditations", icon: "Shield",   title: "Accreditations",  description: "External validation of our commitment to excellence.",       color: "accent" },
          ]}
        />

        <AppointmentBanner
          heading="Care Guided by These Values"
          description="Every appointment, every procedure, every interaction is shaped by our core values. Experience the difference."
        />
      </main>
      <Footer />
    </>
  );
}
