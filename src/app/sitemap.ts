import type { MetadataRoute } from "next";
import { DoctorService } from "@/services/DoctorService";
import { GalleryService } from "@/services/GalleryService";
import { BlogService } from "@/services/BlogService";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestiva.hospital";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                    lastModified: now, changeFrequency: "daily",   priority: 1 },
    { url: `${siteUrl}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about/our-story`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about/mission-vision`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about/leadership`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about/accreditations`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/departments`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${siteUrl}/doctors`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${siteUrl}/gallery`,       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/blog`,          lastModified: now, changeFrequency: "daily",   priority: 0.85 },
    { url: `${siteUrl}/services`,      lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${siteUrl}/services/emergency-care`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/diagnostics`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/telemedicine`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/surgery`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/appointment`,   lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${siteUrl}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic: doctors
  const doctorRoutes: MetadataRoute.Sitemap = DoctorService.getAll().map((d) => ({
    url: `${siteUrl}/doctors/${d.slug}`,
    lastModified: new Date(d.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: gallery
  const galleryRoutes: MetadataRoute.Sitemap = GalleryService.getAll().map((g) => ({
    url: `${siteUrl}/gallery/${g.slug}`,
    lastModified: new Date(g.createdAt),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Dynamic: blog
  const blogRoutes: MetadataRoute.Sitemap = BlogService.getAll().map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic: departments
  const deptSlugs = ["cardiology", "neurology", "orthopedics", "oncology", "pediatrics", "neurosurgery"];
  const deptRoutes: MetadataRoute.Sitemap = deptSlugs.map((slug) => ({
    url: `${siteUrl}/departments/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...deptRoutes, ...doctorRoutes, ...galleryRoutes, ...blogRoutes];
}
