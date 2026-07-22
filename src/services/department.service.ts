/**
 * DepartmentService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/departments.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { departments } from "@/data/departments";
import type { Department } from "@/types";

export const DepartmentService = {
  /**
   * Returns all departments.
   * FUTURE: GET /api/v1/departments
   */
  async getAll(): Promise<Department[]> {
    return departments;
  },

  /**
   * Returns featured/highlighted departments.
   * FUTURE: GET /api/v1/departments?featured=true
   */
  async getFeatured(limit = 6): Promise<Department[]> {
    return departments
      .filter((d) => d.featured)
      .sort((a, b) => a.order - b.order)
      .slice(0, limit);
  },

  /**
   * Returns a single department by slug.
   * FUTURE: GET /api/v1/departments/{slug}
   */
  async getBySlug(slug: string): Promise<Department | undefined> {
    return departments.find((d) => d.slug === slug);
  },

  /**
   * Returns a department by its ID.
   * FUTURE: GET /api/v1/departments/{id}
   */
  async getById(id: string): Promise<Department | undefined> {
    return departments.find((d) => d.id === id);
  },
};
