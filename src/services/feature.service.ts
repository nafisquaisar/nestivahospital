/**
 * FeatureService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/features.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { features } from "@/data/features";
import type { Feature } from "@/types";

export const FeatureService = {
  /**
   * Returns all "Why Choose Us" features.
   * FUTURE: GET /api/v1/features
   */
  async getAll(): Promise<Feature[]> {
    return features;
  },
};
