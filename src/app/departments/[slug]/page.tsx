import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { FAQPreview } from "@/components/shared/FAQPreview";
import { DepartmentDetailContent } from "@/modules/departments/DepartmentDetailContent";
import { departments } from "@/data/departments";
import { faqs } from "@/data/faqs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render all department slugs at build time */
export async function generateStaticParams() {
  return departments.map((dept) => ({ slug: dept.slug }));
}

/** Dynamic SEO metadata per department */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return {};

  return buildMetadata({
    title: dept.name,
    description:
      dept.seo?.description ??
      `${dept.description} — Nestiva Hospital's ${dept.name} department offers expert diagnosis and treatment.`,
    alternates: { canonical: `${siteUrl}/departments/${dept.slug}` },
    openGraph: {
      title: `${dept.name} Department | Nestiva Hospital`,
      description: dept.shortDescription,
      url: `${siteUrl}/departments/${dept.slug}`,
      images: [{ url: dept.image.src, alt: dept.image.alt }],
    },
  });
}

export default async function DepartmentPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);

  if (!dept) notFound();

  // Related departments (exclude self)
  const relatedDepts = departments
    .filter((d) => d.slug !== slug)
    .slice(0, 3);

  const deptFaqs = faqs
    .filter((f) => ["faq-appointment", "faq-second-opinion", "faq-insurance"].includes(f.id))
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow={dept.shortName ?? dept.name}
          title={dept.name}
          subtitle={dept.description}
          breadcrumbs={[
            { label: "Departments", href: "/departments" },
            { label: dept.name },
          ]}
          stats={[
            { value: `${dept.totalDoctors}+`,         label: "Specialists" },
            { value: `${dept.services.length}+`,      label: "Services" },
            { value: `${dept.conditions.length}+`,    label: "Conditions Treated" },
          ]}
        />

        <DepartmentDetailContent department={dept} />

        <FAQPreview
          faqs={deptFaqs}
          eyebrow="Have Questions?"
          title="Frequently Asked Questions"
        />

        <RelatedLinks
          eyebrow="Other Departments"
          title="Explore More Specialties"
          links={relatedDepts.map((d, i) => ({
            href: `/departments/${d.slug}`,
            icon: d.icon,
            title: d.name,
            description: d.shortDescription,
            color: (["primary", "secondary", "accent"] as const)[i % 3],
          }))}
        />

        <AppointmentBanner
          heading={`Book a ${dept.name} Consultation`}
          description={`Connect with one of our ${dept.totalDoctors} ${dept.name} specialists for an expert evaluation and personalised treatment plan.`}
        />
      </main>
      <Footer />
    </>
  );
}
