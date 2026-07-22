/**
 * BlogService
 * ─────────────────────────────────────────────────────────────────────────────
 * Service layer for blog post data access.
 * Backend-ready: replace import with NestJS REST API calls.
 */

import { blogs } from "@/data/blogs";
import type { Blog } from "@/types";

export const BlogService = {
  /** Return all published blogs sorted by publish date (newest first) */
  getAll(): Blog[] {
    return blogs
      .filter((b) => b.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  /** Return featured posts */
  getFeatured(limit?: number): Blog[] {
    const featured = blogs
      .filter((b) => b.featured && b.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return limit ? featured.slice(0, limit) : featured;
  },

  /** Find by slug */
  getBySlug(slug: string): Blog | undefined {
    return blogs.find((b) => b.slug === slug && b.status === "published");
  },

  /** Filter by category slug */
  getByCategory(categorySlug: string): Blog[] {
    return blogs
      .filter((b) => b.category.slug === categorySlug && b.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  /** Search by title, excerpt, or author name */
  search(query: string): Blog[] {
    const q = query.toLowerCase().trim();
    if (!q) return BlogService.getAll();
    return blogs.filter(
      (b) =>
        b.status === "published" &&
        (b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.author.name.toLowerCase().includes(q) ||
          b.category.name.toLowerCase().includes(q) ||
          b.tags.some((t) => t.name.toLowerCase().includes(q)))
    );
  },

  /** Get related articles (same category, exclude self) */
  getRelated(slug: string, limit = 3): Blog[] {
    const post = blogs.find((b) => b.slug === slug);
    if (!post) return [];
    return blogs
      .filter((b) => b.category.id === post.category.id && b.slug !== slug && b.status === "published")
      .concat(blogs.filter((b) => b.slug !== slug && b.category.id !== post.category.id && b.status === "published"))
      .slice(0, limit);
  },

  /** Get all unique categories */
  getCategories() {
    const map = new Map<string, { id: string; slug: string; name: string; color?: string; count: number }>();
    blogs
      .filter((b) => b.status === "published")
      .forEach((b) => {
        const existing = map.get(b.category.id);
        if (existing) {
          existing.count++;
        } else {
          map.set(b.category.id, { ...b.category, count: 1 });
        }
      });
    return [...map.values()].sort((a, b) => b.count - a.count);
  },
};
