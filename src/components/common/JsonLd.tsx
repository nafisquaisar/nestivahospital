/**
 * JsonLd
 * ─────────────────────────────────────────────────────────────────────────────
 * Injects JSON-LD structured data into the page <head>.
 * Server Component — renders a <script> tag, zero client JS.
 *
 * Schemas:
 *   - "hospital"   → Hospital + MedicalOrganization + LocalBusiness
 *   - "breadcrumb" → BreadcrumbList
 *   - "faq"        → FAQPage
 *   - "website"    → WebSite with sitelinks searchbox
 */

import { branding } from "@/config/branding";
import { siteUrl }  from "@/config/seo";

type JsonLdType = "hospital" | "breadcrumb" | "faq" | "website";

interface BreadcrumbItem {
  name: string;
  url:  string;
}

interface FAQItem {
  question: string;
  answer:   string;
}

interface JsonLdProps {
  type: JsonLdType;
  /** For "breadcrumb" */
  breadcrumbs?: BreadcrumbItem[];
  /** For "faq" */
  faqs?: FAQItem[];
}

function buildHospitalSchema() {
  return {
    "@context":   "https://schema.org",
    "@type":      ["Hospital", "MedicalOrganization", "LocalBusiness"],
    name:          branding.name,
    alternateName: branding.shortName,
    description:   branding.description,
    url:           siteUrl,
    logo: {
      "@type":      "ImageObject",
      url:          `${siteUrl}${branding.logo.full}`,
    },
    image: `${siteUrl}/og-image.jpg`,
    telephone:     branding.phone,
    email:         branding.email,
    address: {
      "@type":          "PostalAddress",
      streetAddress:     branding.address.street,
      addressLocality:   branding.address.city,
      addressRegion:     branding.address.state,
      postalCode:        branding.address.zip,
      addressCountry:    "IN",
    },
    geo: {
      "@type":    "GeoCoordinates",
      latitude:   "28.5519",
      longitude: "77.1809",
    },
    openingHoursSpecification: {
      "@type":       "OpeningHoursSpecification",
      dayOfWeek:     ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens:         "00:00",
      closes:        "23:59",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type":       "AggregateRating",
      ratingValue:   "4.9",
      reviewCount:   "1247",
      bestRating:    "5",
      worstRating:   "1",
    },
    medicalSpecialty: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Oncology",
      "Pediatrics",
      "Emergency Medicine",
    ],
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(branding.address.full)}`,
    sameAs: Object.values(branding.social).filter(Boolean),
  };
}

function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type":   "ListItem",
      position:  i + 1,
      name:      item.name,
      item:      item.url,
    })),
  };
}

function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type":         "Question",
      name:            faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    faq.answer,
      },
    })),
  };
}

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type":    "WebSite",
    name:        branding.name,
    url:         siteUrl,
    potentialAction: {
      "@type":       "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function JsonLd({ type, breadcrumbs = [], faqs = [] }: JsonLdProps) {
  let schema: Record<string, unknown>;

  switch (type) {
    case "hospital":   schema = buildHospitalSchema();           break;
    case "breadcrumb": schema = buildBreadcrumbSchema(breadcrumbs); break;
    case "faq":        schema = buildFAQSchema(faqs);            break;
    case "website":    schema = buildWebsiteSchema();            break;
    default:           return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
