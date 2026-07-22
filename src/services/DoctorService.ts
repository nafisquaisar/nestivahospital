/**
 * DoctorService
 * ─────────────────────────────────────────────────────────────────────────────
 * Service layer for doctor data access.
 * Backend-ready: replace import with NestJS REST API calls via TanStack Query.
 *
 * Future integration:
 *   const doctors = await fetch(`${API_URL}/doctors`).then(r => r.json());
 */

import { doctors } from "@/data/doctors";
import type { Doctor } from "@/types";

export const DoctorService = {
  /** Return all doctors, sorted by order */
  getAll(): Doctor[] {
    return [...doctors].sort((a, b) => a.order - b.order);
  },

  /** Return featured doctors only */
  getFeatured(limit?: number): Doctor[] {
    const featured = doctors.filter((d) => d.featured).sort((a, b) => a.order - b.order);
    return limit ? featured.slice(0, limit) : featured;
  },

  /** Find a single doctor by slug */
  getBySlug(slug: string): Doctor | undefined {
    return doctors.find((d) => d.slug === slug);
  },

  /** Find doctors by department */
  getByDepartment(departmentId: string): Doctor[] {
    return doctors
      .filter((d) => d.departmentId === departmentId)
      .sort((a, b) => a.order - b.order);
  },

  /** Search doctors by name, specialization, or department */
  search(query: string): Doctor[] {
    const q = query.toLowerCase().trim();
    if (!q) return DoctorService.getAll();
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.designation.toLowerCase().includes(q) ||
        d.departmentId.toLowerCase().includes(q)
    );
  },

  /** Get doctors related to a given doctor (same department, exclude self) */
  getRelated(doctorId: string, limit = 3): Doctor[] {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return [];
    return doctors
      .filter((d) => d.departmentId === doctor.departmentId && d.id !== doctorId)
      .slice(0, limit);
  },

  /** Return all unique department IDs */
  getDepartmentIds(): string[] {
    return [...new Set(doctors.map((d) => d.departmentId))];
  },
};
