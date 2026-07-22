/**
 * BlogService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/blogs.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { blogs } from "@/data/blogs";
import type { Blog } from "@/types";

export const BlogService = {
  /**
   * Returns all published blog posts.
   * FUTURE: GET /api/v1/blogs?status=published
   */
  async getAll(): Promise<Blog[]> {
    return blogs.filter((b) => b.status === "published");
  },

  /**
   * Returns featured posts for the homepage preview.
   * FUTURE: GET /api/v1/blogs?featured=true&limit={limit}
   */
  async getFeatured(limit = 3): Promise<Blog[]> {
    return blogs
      .filter((b) => b.featured && b.status === "published")
      .slice(0, limit);
  },

  /**
   * Returns a post by slug.
   * FUTURE: GET /api/v1/blogs/{slug}
   */
  async getBySlug(slug: string): Promise<Blog | undefined> {
    return blogs.find((b) => b.slug === slug && b.status === "published");
  },

  /**
   * Returns posts by category slug.
   * FUTURE: GET /api/v1/blogs?category={slug}
   */
  async getByCategory(categorySlug: string): Promise<Blog[]> {
    return blogs.filter(
      (b) => b.category.slug === categorySlug && b.status === "published"
    );
  },
};
