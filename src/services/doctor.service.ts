/**
 * DoctorService
 * ─────────────────────────────────────────────────────────────────────────────
 * Abstracts doctor data access from UI components.
 *
 * CURRENT: Returns local stub data from data/doctors.ts
 *
 * FUTURE (NestJS + TanStack Query):
 *   Replace implementation bodies with:
 *     return apiClient.get<Doctor[]>("/api/v1/doctors");
 *   Components remain UNCHANGED — only service bodies update.
 */

import { doctors } from "@/data/doctors";
import type { Doctor } from "@/types";

export const DoctorService = {
  /**
   * Returns all doctors.
   * FUTURE: GET /api/v1/doctors
   */
  async getAll(): Promise<Doctor[]> {
    return doctors;
  },

  /**
   * Returns featured doctors for the homepage showcase.
   * FUTURE: GET /api/v1/doctors?featured=true&limit={limit}
   */
  async getFeatured(limit = 4): Promise<Doctor[]> {
    return doctors
      .filter((d) => d.featured)
      .sort((a, b) => a.order - b.order)
      .slice(0, limit);
  },

  /**
   * Returns a single doctor by slug.
   * FUTURE: GET /api/v1/doctors/{slug}
   */
  async getBySlug(slug: string): Promise<Doctor | undefined> {
    return doctors.find((d) => d.slug === slug);
  },

  /**
   * Returns doctors in a given department.
   * FUTURE: GET /api/v1/doctors?departmentId={id}
   */
  async getByDepartment(departmentId: string): Promise<Doctor[]> {
    return doctors.filter((d) => d.departmentId === departmentId);
  },

  /**
   * Searches doctors by name or specialization.
   * FUTURE: GET /api/v1/doctors?search={query}
   */
  async search(query: string): Promise<Doctor[]> {
    const q = query.toLowerCase();
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
    );
  },
};
