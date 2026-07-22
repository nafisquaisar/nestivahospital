import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { RelatedLinks } from "@/components/shared/RelatedLinks";
import { DepartmentListGrid } from "@/modules/departments/DepartmentListGrid";
import { FAQPreview } from "@/components/shared/FAQPreview";
import { departments } from "@/data/departments";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Departments",
  description:
    "Nestiva Hospital houses 28 specialty departments — from Cardiology and Neurology to Pediatrics and Oncology — each staffed by fellowship-trained specialists.",
  alternates: { canonical: `${siteUrl}/departments` },
  openGraph: {
    title: "Our Departments | Nestiva Hospital",
    url: `${siteUrl}/departments`,
  },
});

export default function DepartmentsPage() {
  const deptFaqs = faqs.filter((f) =>
    ["faq-appointment", "faq-second-opinion", "faq-teleconsult"].includes(f.id)
  );

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Medical Excellence"
          title="World-Class Departments"
          subtitle="Every specialty under one roof — staffed by fellowship-trained physicians, equipped with the latest technology, and designed around patient comfort and outcomes."
          breadcrumbs={[{ label: "Departments" }]}
          stats={[
            { value: "28",   label: "Departments" },
            { value: "500+", label: "Specialists" },
            { value: "24/7", label: "Emergency Coverage" },
          ]}
        />

        <DepartmentListGrid departments={departments} />

        <FAQPreview
          faqs={deptFaqs}
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Answers to the most common questions about our departments and booking."
        />

        <RelatedLinks
          eyebrow="Our Services"
          title="What We Offer"
          links={[
            { href: "/services/emergency-care", icon: "Siren",      title: "Emergency Care",   description: "24/7 Level I Trauma Center response.", color: "primary" },
            { href: "/services/diagnostics",    icon: "Microscope", title: "Diagnostics",      description: "Precision imaging and laboratory services.", color: "secondary" },
            { href: "/services/surgery",        icon: "Scissors",   title: "Surgery",          description: "Advanced robotic and minimally invasive surgery.", color: "accent" },
            { href: "/services/telemedicine",   icon: "Monitor",    title: "Telemedicine",     description: "Expert consultations from anywhere.", color: "success" },
          ]}
        />

        <AppointmentBanner
          heading="Find the Right Specialist"
          description="Our care coordinators can help match you with the right department and doctor for your condition."
        />
      </main>
      <Footer />
    </>
  );
}
