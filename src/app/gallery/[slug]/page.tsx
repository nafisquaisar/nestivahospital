/**
 * /gallery/[slug] — Gallery item detail page
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { Container } from "@/components/shared/Container";
import { GalleryCard } from "@/components/common/GalleryCard";
import { GalleryDetailImage } from "@/modules/gallery/GalleryDetailImage";
import { GalleryService } from "@/services/GalleryService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Images, MapPin, Tag } from "lucide-react";
import { branding } from "@/config/branding";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GalleryService.getAll().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = GalleryService.getBySlug(slug);
  if (!item) return {};

  return buildMetadata({
    title: item.title,
    description: item.description ?? `${item.title} — ${branding.name} facility gallery.`,
    alternates: { canonical: `${siteUrl}/gallery/${item.slug}` },
    openGraph: {
      title: `${item.title} | ${branding.shortName} Gallery`,
      description: item.description,
      url: `${siteUrl}/gallery/${item.slug}`,
      images: [{ url: item.image.src, alt: item.image.alt }],
      type: "article",
    },
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  facility:  "Facility",
  equipment: "Medical Equipment",
  team:      "Our Team",
  events:    "Events",
  patients:  "Patient Care",
  other:     "Other",
};

const FACILITY_INFO: Record<string, { area: string; floor: string; capacity: string }> = {
  facility:  { area: "Clinical Zones",    floor: "Various Floors", capacity: "Multi-bed wards & private rooms" },
  equipment: { area: "Diagnostic Centre", floor: "Floors 2–4",     capacity: "24/7 service" },
  team:      { area: "Administrative",    floor: "Ground Floor",   capacity: "500+ staff" },
  events:    { area: "Conference Centre", floor: "Floor 15",       capacity: "Up to 500 guests" },
  patients:  { area: "Patient Services",  floor: "Floors 5–14",    capacity: "1,200 beds" },
  other:     { area: "Nestiva Campus",    floor: "Various",        capacity: "Varies" },
};

export default async function GalleryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = GalleryService.getBySlug(slug);
  if (!item) notFound();

  const related = GalleryService.getRelated(slug, 4);
  const allItems = GalleryService.getAll();
  const currentIndex = allItems.findIndex((g) => g.slug === slug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;
  const facility = FACILITY_INFO[item.category] ?? FACILITY_INFO.other;

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Breadcrumb ───────────────────────────────────────── */}
        <nav className="border-b border-border bg-muted/30 py-3" aria-label="Breadcrumb">
          <Container>
            <ol
              className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              {[
                { label: "Home",    href: "/" },
                { label: "Gallery", href: "/gallery" },
                { label: item.title },
              ].map((crumb, i, arr) => (
                <li
                  key={crumb.label}
                  className="flex items-center gap-2"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {crumb.href ? (
                    <Link href={crumb.href} itemProp="item" className="hover:text-foreground transition-colors">
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium" itemProp="name">
                      {crumb.label}
                    </span>
                  )}
                  {i < arr.length - 1 && <span aria-hidden="true">/</span>}
                  <meta itemProp="position" content={String(i + 1)} />
                </li>
              ))}
            </ol>
          </Container>
        </nav>

        {/* ── Main image + info ────────────────────────────────── */}
        <section className="bg-foreground/[0.02] py-10 md:py-14" aria-label={item.title}>
          <Container>
            <div className="grid gap-8 lg:grid-cols-5 lg:items-start">

              {/* Large image — 3/5 */}
              <div className="lg:col-span-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-2xl">
                  <GalleryDetailImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fallbackText={item.title}
                  />
                </div>

                {/* Prev / Next */}
                <div className="mt-4 flex items-center justify-between">
                  {prevItem ? (
                    <Button asChild variant="ghost" size="sm" className="gap-2 text-xs">
                      <Link href={`/gallery/${prevItem.slug}`} aria-label={`Previous: ${prevItem.title}`}>
                        <ArrowLeft className="h-4 w-4" /> Previous
                      </Link>
                    </Button>
                  ) : <div />}
                  <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
                    <Link href="/gallery">
                      <Images className="h-4 w-4" /> All Gallery
                    </Link>
                  </Button>
                  {nextItem ? (
                    <Button asChild variant="ghost" size="sm" className="gap-2 text-xs">
                      <Link href={`/gallery/${nextItem.slug}`} aria-label={`Next: ${nextItem.title}`}>
                        Next <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : <div />}
                </div>
              </div>

              {/* Info panel — 2/5 */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Category */}
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>

                {/* Title */}
                <h1 className="font-display text-2xl font-extrabold leading-snug text-foreground sm:text-3xl">
                  {item.title}
                </h1>

                {/* Description */}
                {item.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}

                {/* Facility info card */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-primary">
                    Facility Information
                  </h2>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: MapPin, label: "Location", value: facility.area },
                      { icon: MapPin, label: "Floor",    value: facility.floor },
                      { icon: Tag,    label: "Capacity", value: facility.capacity },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="text-sm font-medium text-foreground">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointment CTA */}
                <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-5 text-white">
                  <h2 className="text-base font-bold mb-1">Experience This in Person</h2>
                  <p className="text-xs text-white/80 mb-4">
                    Book an appointment and see our world-class facilities first-hand.
                  </p>
                  <Button asChild variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                    <Link href="/appointment">Book an Appointment</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Related images ───────────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-muted/30 py-12 md:py-16" aria-labelledby="related-gallery-heading">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 id="related-gallery-heading" className="font-display text-xl font-extrabold text-foreground">
                  More from Our Gallery
                </h2>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link href="/gallery">
                    View All <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div
                className="grid gap-3 sm:gap-4 grid-cols-2 sm:auto-rows-[200px] lg:grid-cols-4"
                role="list"
                aria-label="Related gallery images"
              >
                {related.map((rel, i) => (
                  <div key={rel.id} role="listitem">
                    <GalleryCard item={rel} index={i} className="h-full w-full" />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        <AppointmentBanner
          heading="Ready to Visit Nestiva?"
          description="Our world-class facilities are here to serve you. Book an appointment with a specialist today."
        />
      </main>
      <Footer />
    </>
  );
}
