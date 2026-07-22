/**
 * /blog/[slug] — Blog article detail page
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, siteUrl } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppointmentBanner } from "@/components/shared/AppointmentBanner";
import { Container } from "@/components/shared/Container";
import { ArticleContent } from "@/modules/blog/ArticleContent";
import { TableOfContents } from "@/modules/blog/TableOfContents";
import { ShareButtons } from "@/modules/blog/ShareButtons";
import { BlogCard } from "@/modules/blog/BlogCard";
import { FAQPreview } from "@/components/shared/FAQPreview";
import { BlogService } from "@/services/BlogService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, ArrowLeft, ArrowRight } from "lucide-react";
import { branding } from "@/config/branding";
import { faqs } from "@/data/faqs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BlogService.getAll().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BlogService.getBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${branding.shortName}`,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt, width: 1200, height: 630 }],
      type: "article",
    },
    other: {
      "article:published_time": post.publishedAt,
      "article:modified_time":  post.updatedAt,
      "article:author":         post.author.name,
      "article:section":        post.category.name,
      "article:tag":            post.tags.map((t) => t.name).join(","),
    },
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BlogService.getBySlug(slug);
  if (!post) notFound();

  const related  = BlogService.getRelated(slug, 3);
  const all      = BlogService.getAll();
  const idx      = all.findIndex((b) => b.slug === slug);
  const prevPost = idx > 0 ? all[idx - 1] : null;
  const nextPost = idx < all.length - 1 ? all[idx + 1] : null;

  const articleFaqs = faqs.slice(0, 3);
  const pageUrl    = `${siteUrl}/blog/${post.slug}`;

  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── JSON-LD Article Schema ─────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage.src,
              author: {
                "@type": "Person",
                name: post.author.name,
                jobTitle: post.author.designation,
              },
              publisher: {
                "@type": "Organization",
                name: branding.name,
                url: siteUrl,
              },
              datePublished: post.publishedAt,
              dateModified:  post.updatedAt,
              mainEntityOfPage: pageUrl,
              articleSection: post.category.name,
              keywords: post.tags.map((t) => t.name).join(", "),
            }),
          }}
        />

        {/* ── Breadcrumb ────────────────────────────────────── */}
        <nav className="border-b border-border bg-muted/30 py-3" aria-label="Breadcrumb">
          <Container>
            <ol
              className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.category.name },
                { label: post.title },
              ].map((crumb, i, arr) => (
                <li
                  key={crumb.label}
                  className="flex items-center gap-2"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {crumb.href ? (
                    <Link href={crumb.href} itemProp="item" className="hover:text-foreground transition-colors max-w-[120px] truncate">
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium max-w-[160px] truncate" itemProp="name">
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

        {/* ── Cover image hero ──────────────────────────────── */}
        <div className="relative h-64 w-full overflow-hidden md:h-80 lg:h-96">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" aria-hidden="true" />
        </div>

        {/* ── Article header card ───────────────────────────── */}
        <Container className="relative -mt-16 z-10">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
            {/* Category + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                style={{ backgroundColor: post.category.color ?? "hsl(var(--primary))" }}
                className="text-white text-xs font-semibold"
              >
                {post.category.name}
              </Badge>
              {post.tags.map((tag) => (
                <span key={tag.id} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  #{tag.slug}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl font-extrabold leading-snug text-foreground sm:text-3xl lg:text-4xl mb-4">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" aria-hidden="true" />
                {post.views.toLocaleString()} views
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary/10">
                <Image
                  src={post.author.avatar.src}
                  alt={post.author.avatar.alt}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.designation}</p>
              </div>
            </div>
          </div>
        </Container>

        {/* ── Article body + sidebar ────────────────────────── */}
        <section className="py-10 md:py-14" aria-label="Article body">
          <Container>
            <div className="grid gap-10 lg:grid-cols-4 lg:items-start">

              {/* Content — 3/4 */}
              <div className="lg:col-span-3">
                {/* Lead paragraph */}
                <p className="mb-6 text-base font-medium leading-relaxed text-muted-foreground border-l-4 border-primary pl-4">
                  {post.excerpt}
                </p>

                <ArticleContent content={post.content} />

                {/* Share */}
                <div className="mt-10 border-t border-border pt-6">
                  <ShareButtons url={pageUrl} title={post.title} />
                </div>

                {/* Prev / Next */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                    >
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ArrowLeft className="h-3.5 w-3.5" /> Previous
                      </span>
                      <p className="text-xs font-semibold text-foreground line-clamp-2">{prevPost.title}</p>
                    </Link>
                  ) : <div />}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-sm transition-all text-right"
                    >
                      <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        Next <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-xs font-semibold text-foreground line-clamp-2">{nextPost.title}</p>
                    </Link>
                  ) : <div />}
                </div>
              </div>

              {/* Sidebar — 1/4 */}
              <aside className="lg:sticky lg:top-24 flex flex-col gap-4" aria-label="Article sidebar">
                <TableOfContents content={post.content} />

                {/* Author card */}
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-3">About the Author</h3>
                  <div className="flex items-start gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-primary/10">
                      <Image
                        src={post.author.avatar.src}
                        alt={post.author.avatar.alt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-foreground">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.designation}</p>
                      {post.author.bio && (
                        <p className="text-xs leading-relaxed text-muted-foreground mt-1">{post.author.bio}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar CTA */}
                <div className="rounded-2xl bg-primary/5 border border-primary/15 p-5">
                  <h3 className="text-sm font-bold text-foreground mb-1.5">Have a health concern?</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Speak directly with one of our specialists — same-day appointments often available.
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/appointment">Book Appointment</Link>
                  </Button>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <FAQPreview
          faqs={articleFaqs}
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="Questions our patients commonly ask about appointments, insurance, and care at Nestiva."
        />

        {/* ── Related Articles ─────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-muted/30 py-12 md:py-16" aria-labelledby="related-articles-heading">
            <Container>
              <div className="flex items-center justify-between mb-8">
                <h2 id="related-articles-heading" className="font-display text-xl font-extrabold text-foreground">
                  Related Articles
                </h2>
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link href="/blog">
                    All Articles <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relPost, i) => (
                  <BlogCard key={relPost.id} post={relPost} index={i} />
                ))}
              </div>
            </Container>
          </section>
        )}

        <AppointmentBanner
          heading="Book a Consultation with Our Specialists"
          description="Our expert physicians are available for in-person and video consultations. Book your appointment today."
        />
      </main>
      <Footer />
    </>
  );
}
