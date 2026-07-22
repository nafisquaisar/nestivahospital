import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DoctorService } from "@/services/DoctorService";
import { DoctorProfileContent } from "@/modules/doctors/DoctorProfileContent";
import { branding } from "@/config/branding";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DoctorService.getAll().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = DoctorService.getBySlug(slug);
  if (!doctor) return {};

  const title = `${doctor.prefix} ${doctor.name} — ${doctor.specialization}`;
  const description = doctor.bio.slice(0, 160);

  return buildMetadata({
    title,
    description,
    alternates: { canonical: `${siteUrl}/doctors/${doctor.slug}` },
    openGraph: {
      title: `${title} | ${branding.shortName}`,
      description,
      url: `${siteUrl}/doctors/${doctor.slug}`,
      images: [{ url: doctor.image.src, alt: doctor.image.alt }],
    },
    other: {
      "schema:type": "Physician",
      "schema:name": `${doctor.prefix} ${doctor.name}`,
      "schema:medicalSpecialty": doctor.specialization,
    },
  });
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = DoctorService.getBySlug(slug);

  if (!doctor) notFound();

  const related = DoctorService.getRelated(doctor.id, 3);

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Breadcrumb — rendered server-side for SEO */}
        <nav
          className="border-b border-border bg-muted/30 py-3"
          aria-label="Breadcrumb"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/" itemProp="item" className="hover:text-foreground transition-colors">
                  <span itemProp="name">Home</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <a href="/doctors" itemProp="item" className="hover:text-foreground transition-colors">
                  <span itemProp="name">Doctors</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li aria-hidden="true">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-foreground font-medium">
                  {doctor.prefix} {doctor.name}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* JSON-LD Physician Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Physician",
              name: `${doctor.prefix} ${doctor.name}`,
              description: doctor.bio,
              medicalSpecialty: doctor.specialization,
              hasCredential: doctor.qualifications.map((q) => ({
                "@type": "EducationalOccupationalCredential",
                credentialCategory: q,
              })),
              worksFor: {
                "@type": "Hospital",
                name: branding.name,
                url: siteUrl,
              },
              knowsLanguage: doctor.languages,
              url: `${siteUrl}/doctors/${doctor.slug}`,
            }),
          }}
        />

        <DoctorProfileContent doctor={doctor} related={related} />
      </main>
      <Footer />
    </>
  );
}
