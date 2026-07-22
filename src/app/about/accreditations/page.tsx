import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { AccreditationGrid } from "@/modules/about/AccreditationGrid";
import { Container } from "@/components/shared/Container";
import { accreditations } from "@/data/about";

export const metadata: Metadata = buildMetadata({
  title: "Accreditations & Certifications",
  description:
    "Nestiva Hospital is JCI Accredited, ISO 9001:2015 certified, NABH certified, and holds Magnet Status — independently verified quality benchmarks that guarantee your safety.",
  alternates: { canonical: `${siteUrl}/about/accreditations` },
  openGraph: {
    title: "Accreditations | Nestiva Hospital",
    url: `${siteUrl}/about/accreditations`,
  },
});

export default function AccreditationsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Quality & Safety"
          title="Independently Verified Excellence"
          subtitle="Our accreditations are not just badges — they are independently audited verifications that every system, process, and patient interaction at Nestiva meets or exceeds the most rigorous international standards."
          breadcrumbs={[
            { label: "About", href: "/about" },
            { label: "Accreditations" },
          ]}
          stats={[
            { value: "6",    label: "Accreditations" },
            { value: "2008", label: "First JCI Cert." },
            { value: "100%", label: "Audit Pass Rate" },
          ]}
        />

        <AccreditationGrid items={accreditations} />

        {/* Why it matters */}
        <section className="bg-muted/30 py-16 md:py-18" aria-labelledby="why-accred-heading">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="why-accred-heading"
                className="font-display text-2xl font-extrabold text-foreground sm:text-3xl mb-5"
              >
                Why Accreditation Matters to You
              </h2>
              <div className="grid gap-5 sm:grid-cols-3 mt-8">
                {[
                  {
                    title: "Patient Safety",
                    description:
                      "Every accreditation includes rigorous audits of infection control, medication safety, surgical protocols, and patient rights.",
                  },
                  {
                    title: "Consistent Quality",
                    description:
                      "Accredited hospitals maintain documented, standardised processes that ensure every patient receives consistent, high-quality care.",
                  },
                  {
                    title: "Continuous Improvement",
                    description:
                      "Accreditation is not a one-time achievement — it requires ongoing audits and continuous improvement to maintain certification.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <RelatedLinks
          eyebrow="Continue Exploring"
          title="More About Nestiva"
          links={[
            { href: "/about/our-story",     icon: "BookOpen", title: "Our Story",       description: "How we built a hospital of this standard.", color: "primary" },
            { href: "/about/mission-vision", icon: "Star",    title: "Mission & Vision", description: "The values behind our commitment to quality.", color: "secondary" },
            { href: "/about/leadership",    icon: "Users",    title: "Leadership",       description: "The people accountable for these standards.", color: "accent" },
          ]}
        />

        <AppointmentBanner
          heading="Safety-Certified Care Awaits You"
          description="Every appointment at Nestiva is backed by the highest international safety and quality standards."
        />
      </main>
      <Footer />
    </>
  );
}
