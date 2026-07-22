/**
 * GalleryService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/gallery.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { galleryItems } from "@/data/gallery";
import type { GalleryItem } from "@/types";

export type GalleryCategory = GalleryItem["category"] | "all";

export const GalleryService = {
  /**
   * Returns all gallery items.
   * FUTURE: GET /api/v1/gallery
   */
  async getAll(): Promise<GalleryItem[]> {
    return galleryItems;
  },

  /**
   * Returns featured gallery items for the homepage preview.
   * FUTURE: GET /api/v1/gallery?featured=true&limit={limit}
   */
  async getFeatured(limit = 6): Promise<GalleryItem[]> {
    return galleryItems
      .sort((a, b) => a.order - b.order)
      .slice(0, limit);
  },

  /**
   * Returns gallery items filtered by category.
   * FUTURE: GET /api/v1/gallery?category={category}
   */
  async getByCategory(category: GalleryCategory): Promise<GalleryItem[]> {
    if (category === "all") return galleryItems;
    return galleryItems.filter((g) => g.category === category);
  },
};
