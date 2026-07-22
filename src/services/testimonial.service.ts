/**
 * TestimonialService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/testimonials.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types";

export const TestimonialService = {
  /**
   * Returns all testimonials.
   * FUTURE: GET /api/v1/testimonials
   */
  async getAll(): Promise<Testimonial[]> {
    return testimonials;
  },

  /**
   * Returns featured testimonials for the homepage carousel.
   * FUTURE: GET /api/v1/testimonials?featured=true
   */
  async getFeatured(): Promise<Testimonial[]> {
    return testimonials
      .filter((t) => t.featured)
      .sort((a, b) => a.order - b.order);
  },

  /**
   * Returns testimonials for a specific doctor.
   * FUTURE: GET /api/v1/testimonials?doctorName={name}
   */
  async getByDoctor(doctorName: string): Promise<Testimonial[]> {
    return testimonials.filter((t) => t.doctorName === doctorName);
  },

  /**
   * Returns testimonials for a specific department.
   * FUTURE: GET /api/v1/testimonials?departmentName={name}
   */
  async getByDepartment(departmentName: string): Promise<Testimonial[]> {
    return testimonials.filter((t) => t.departmentName === departmentName);
  },
};
