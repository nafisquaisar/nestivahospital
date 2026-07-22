/**
 * /blog — Blog listing page
 */

import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { Container } from "@/components/shared/Container";
import { BlogListContent } from "@/modules/blog/BlogListContent";
import { BlogService } from "@/services/BlogService";

export const metadata: Metadata = buildMetadata({
  title: "Health Blog",
  description:
    "Evidence-based health articles, clinical guides, and wellness advice from Nestiva's specialist physicians. Stay informed, stay healthy.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Health Blog | Nestiva Hospital",
    description: "Expert health insights from our specialist physicians.",
    url: `${siteUrl}/blog`,
  },
});

export default function BlogPage() {
  const posts = BlogService.getAll();
  const featured = BlogService.getFeatured(2);
  const categories = BlogService.getCategories();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Health Insights"
          title="From Our Experts to You"
          subtitle="Evidence-based health articles written by our specialist physicians — to help you make informed decisions about your health, understand your conditions, and live well."
          breadcrumbs={[{ label: "Blog" }]}
          stats={[
            { value: `${posts.length}+`, label: "Articles" },
            { value: `${categories.length}`,  label: "Categories" },
            { value: "10K+", label: "Monthly Readers" },
          ]}
        />

        <section className="bg-background py-12 md:py-16" aria-label="Blog articles">
          <Container>
            <BlogListContent posts={posts} featured={featured} categories={categories} />
          </Container>
        </section>

        <AppointmentBanner
          heading="Have a Health Concern?"
          description="Don't just read about it — speak to one of our specialists. Book an appointment online in minutes."
        />
      </main>
      <Footer />
    </>
  );
}
