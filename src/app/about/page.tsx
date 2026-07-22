import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { AboutStatsRow } from "@/modules/about/AboutStatsRow";
import { ValuesGrid } from "@/modules/about/ValuesGrid";
import { LeadershipGrid } from "@/modules/about/LeadershipGrid";
import { AccreditationGrid } from "@/modules/about/AccreditationGrid";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  hospitalStory, aboutStats, coreValues, leadershipTeam, accreditations,
  mission, vision,
} from "@/data/about";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Nestiva Hospital — our story, mission, values, and the leadership team driving exceptional patient care since 1998.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About Nestiva Hospital",
    description: "27 years of compassionate, world-class healthcare.",
    url: `${siteUrl}/about`,
  },
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <PageHero
          eyebrow="About Us"
          title="Advanced Care, Human Touch"
          subtitle="Since 1998, Nestiva Hospital has been redefining what it means to deliver world-class healthcare — with compassion, precision, and an unwavering commitment to every patient."
          breadcrumbs={[{ label: "About" }]}
          stats={[
            { value: "27+", label: "Years of Service" },
            { value: "500+", label: "Specialist Doctors" },
            { value: "1,200", label: "Hospital Beds" },
            { value: "150K+", label: "Patients / Year" },
          ]}
        />

        {/* ── Stats strip ──────────────────────────────────────── */}
        <AboutStatsRow stats={aboutStats} />

        {/* ── Our Story excerpt ─────────────────────────────────── */}
        <section className="bg-background py-16 md:py-20" aria-labelledby="story-heading">
          <Container>
            <div className="mx-auto max-w-4xl">
              <SectionHeader
                eyebrow="Our Story"
                title={hospitalStory.headline}
                titleId="story-heading"
                align="center"
              />
              <div className="mt-8 flex flex-col gap-5">
                {hospitalStory.paragraphs.slice(0, 2).map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/about/our-story">
                    <BookOpen className="h-4 w-4" />
                    Read the Full Story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <section className="bg-muted/30 py-16 md:py-20" aria-labelledby="mission-heading">
          <Container>
            <SectionHeader
              eyebrow="Purpose & Direction"
              title="Mission & Vision"
              titleId="mission-heading"
              align="center"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Our Mission</span>
                <blockquote className="text-lg font-semibold leading-relaxed text-foreground">
                  &ldquo;{mission.statement}&rdquo;
                </blockquote>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-secondary/20 bg-secondary/5 p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">Our Vision</span>
                <blockquote className="text-lg font-semibold leading-relaxed text-foreground">
                  &ldquo;{vision.statement}&rdquo;
                </blockquote>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/about/mission-vision">
                  Explore Our Values
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* ── Core values preview ───────────────────────────────── */}
        <ValuesGrid values={coreValues.slice(0, 3)} subtitle="Three of the six core values that guide every decision we make." />

        {/* ── Leadership teaser ─────────────────────────────────── */}
        <LeadershipGrid
          members={leadershipTeam.slice(0, 3)}
          eyebrow="Who Leads Us"
          title="Meet Our Leadership"
          subtitle="Visionary leaders with deep clinical expertise and a shared commitment to transforming healthcare."
        />
        <div className="flex justify-center pb-16 -mt-6">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/about/leadership">
              <Users className="h-4 w-4" />
              View Full Leadership Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* ── Accreditations strip ────────────────────────────────── */}
        <section className="bg-muted/30 py-12 md:py-14" aria-label="Accreditations overview">
          <Container>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Internationally Certified</p>
                <h2 className="text-xl font-extrabold text-foreground">Trusted by Global Standards</h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  JCI Accredited · ISO 9001:2015 · NABH Certified · Magnet Status · CAP Accredited
                </p>
              </div>
              <Button asChild variant="outline" className="shrink-0 gap-2">
                <Link href="/about/accreditations">
                  <Award className="h-4 w-4" />
                  View Accreditations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* ── Related links ────────────────────────────────────────── */}
        <RelatedLinks
          eyebrow="Explore"
          title="Learn More About Nestiva"
          links={[
            { href: "/about/our-story",       icon: "BookOpen",    title: "Our Story",          description: "From a 60-bed clinic to a 1,200-bed medical centre.", color: "primary" },
            { href: "/about/mission-vision",  icon: "Star",        title: "Mission & Vision",   description: "The purpose, values, and direction that guide us.", color: "secondary" },
            { href: "/about/leadership",      icon: "Users",       title: "Leadership Team",    description: "Meet the experienced leaders behind Nestiva.", color: "accent" },
            { href: "/about/accreditations",  icon: "Shield",      title: "Accreditations",     description: "International certifications that validate our quality.", color: "success" },
          ]}
        />

        {/* ── Appointment CTA ──────────────────────────────────────── */}
        <AppointmentBanner
          heading="Experience the Nestiva Difference"
          description="Book an appointment with one of our 500+ specialists — online, by phone, or in person."
        />
      </main>
      <Footer />
    </>
  );
}
