import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { LeadershipGrid } from "@/modules/about/LeadershipGrid";
import { leadershipTeam } from "@/data/about";

export const metadata: Metadata = buildMetadata({
  title: "Leadership Team",
  description:
    "Meet the experienced executives and clinical leaders who guide Nestiva Hospital — a team united by a shared vision of exceptional, compassionate care.",
  alternates: { canonical: `${siteUrl}/about/leadership` },
  openGraph: {
    title: "Leadership Team | Nestiva Hospital",
    url: `${siteUrl}/about/leadership`,
  },
});

export default function LeadershipPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Our People"
          title="The Team Behind Nestiva"
          subtitle="Our leadership team brings together decades of clinical expertise, operational excellence, and a shared passion for transforming healthcare. Meet the individuals who guide our mission every day."
          breadcrumbs={[
            { label: "About", href: "/about" },
            { label: "Leadership" },
          ]}
          stats={[
            { value: "6", label: "Executive Leaders" },
            { value: "27+", label: "Avg. Experience (yrs)" },
            { value: "15+", label: "Publications" },
          ]}
        />

        <LeadershipGrid
          members={leadershipTeam}
          eyebrow="Executive Team"
          title="Leadership & Governance"
          subtitle="A multidisciplinary leadership team combining clinical mastery with strategic vision — driving Nestiva toward its next chapter of excellence."
        />

        <RelatedLinks
          eyebrow="Continue Exploring"
          title="More About Nestiva"
          links={[
            { href: "/about/our-story",      icon: "BookOpen", title: "Our Story",       description: "The journey that shaped who we are today.",               color: "primary" },
            { href: "/about/mission-vision",  icon: "Star",     title: "Mission & Vision", description: "The purpose and values that guide our leaders.",         color: "secondary" },
            { href: "/about/accreditations", icon: "Shield",   title: "Accreditations",  description: "International certifications validating our standards.",  color: "accent" },
          ]}
        />

        <AppointmentBanner
          heading="Led by Experts, Focused on You"
          description="Our leadership team has built a hospital where every patient receives expert, compassionate care. Come experience it."
        />
      </main>
      <Footer />
    </>
  );
}
