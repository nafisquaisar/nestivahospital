/**
 * GalleryService
 * ─────────────────────────────────────────────────────────────────────────────
 * Service layer for gallery data access.
 * Backend-ready: replace import with NestJS REST API calls.
 */

import { galleryItems } from "@/data/gallery";
import type { GalleryItem, GalleryCategory } from "@/types";

export const GalleryService = {
  /** Return all gallery items sorted by order */
  getAll(): GalleryItem[] {
    return [...galleryItems].sort((a, b) => a.order - b.order);
  },

  /** Return featured gallery items */
  getFeatured(limit?: number): GalleryItem[] {
    const featured = galleryItems.filter((g) => g.featured).sort((a, b) => a.order - b.order);
    return limit ? featured.slice(0, limit) : featured;
  },

  /** Find by slug */
  getBySlug(slug: string): GalleryItem | undefined {
    return galleryItems.find((g) => g.slug === slug);
  },

  /** Find by category */
  getByCategory(category: GalleryCategory): GalleryItem[] {
    return galleryItems
      .filter((g) => g.category === category)
      .sort((a, b) => a.order - b.order);
  },

  /** Get related images (same category, exclude self) */
  getRelated(slug: string, limit = 4): GalleryItem[] {
    const item = galleryItems.find((g) => g.slug === slug);
    if (!item) return [];
    return galleryItems
      .filter((g) => g.category === item.category && g.slug !== slug)
      .slice(0, limit);
  },

  /** Return all unique categories */
  getCategories(): GalleryCategory[] {
    return [...new Set(galleryItems.map((g) => g.category))];
  },
};
