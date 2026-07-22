import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { AboutStatsRow } from "@/modules/about/AboutStatsRow";
import { TimelineSection } from "@/modules/about/TimelineSection";
import { Container } from "@/components/shared/Container";
import { hospitalStory, aboutStats, milestones } from "@/data/about";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "How Nestiva Hospital grew from a 60-bed community clinic in 1998 to a 1,200-bed multi-specialty medical centre — a story of vision, perseverance, and compassion.",
  alternates: { canonical: `${siteUrl}/about/our-story` },
  openGraph: {
    title: "Our Story | Nestiva Hospital",
    url: `${siteUrl}/about/our-story`,
  },
});

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Our History"
          title="A Story Built on Healing"
          subtitle="From a humble 60-bed clinic founded by Dr. Eleanor Hartfield in 1998 to one of the most advanced hospitals in North America — every chapter of our story is a testament to the power of a clear purpose."
          breadcrumbs={[
            { label: "About", href: "/about" },
            { label: "Our Story" },
          ]}
        />

        {/* Full story content */}
        <section className="bg-background py-16 md:py-20" aria-labelledby="story-full-heading">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 id="story-full-heading" className="font-display text-2xl font-extrabold text-foreground mb-8 sm:text-3xl">
                {hospitalStory.headline}
              </h2>
              <div className="flex flex-col gap-6">
                {hospitalStory.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <AboutStatsRow stats={aboutStats} variant="primary" />

        {/* Timeline */}
        <TimelineSection milestones={milestones} />

        {/* Related */}
        <RelatedLinks
          eyebrow="Continue Exploring"
          title="More About Nestiva"
          links={[
            { href: "/about/mission-vision", icon: "Star",   title: "Mission & Vision", description: "The values and direction that define us.",           color: "primary" },
            { href: "/about/leadership",     icon: "Users",  title: "Leadership",       description: "The team driving our vision forward.",               color: "secondary" },
            { href: "/about/accreditations", icon: "Shield", title: "Accreditations",   description: "International certifications validating our care.",  color: "accent" },
          ]}
        />

        <AppointmentBanner />
      </main>
      <Footer />
    </>
  );
}
