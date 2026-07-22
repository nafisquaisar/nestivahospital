/**
 * HomeService
 * ─────────────────────────────────────────────────────────────────────────────
 * Aggregates homepage data from multiple services.
 * CURRENT: Reads from local data stubs.
 * FUTURE:  Replace with TanStack Query parallel fetching.
 */

import { statistics }       from "@/data/statistics";
import { DoctorService }     from "./doctor.service";
import { DepartmentService } from "./department.service";
import { TestimonialService }from "./testimonial.service";
import { GalleryService }    from "./gallery.service";
import { FeatureService }    from "./feature.service";
import type { Statistic }    from "@/types";

export const HomeService = {
  /**
   * Returns homepage KPI statistics.
   * FUTURE: GET /api/v1/home/stats
   */
  async getStats(): Promise<Statistic[]> {
    return statistics;
  },

  /**
   * Returns all data needed to render the homepage in one call.
   * FUTURE: GET /api/v1/home  (aggregated BFF endpoint)
   */
  async getHomeData() {
    const [
      homeStats,
      departments,
      doctors,
      testimonials,
      galleryItems,
      features,
    ] = await Promise.all([
      HomeService.getStats(),
      DepartmentService.getFeatured(6),
      DoctorService.getFeatured(4),
      TestimonialService.getFeatured(),
      GalleryService.getFeatured(6),
      FeatureService.getAll(),
    ]);

    return { homeStats, departments, doctors, testimonials, galleryItems, features };
  },
};
