/**
 * FAQService
 * ─────────────────────────────────────────────────────────────────────────────
 * CURRENT: Returns local stub data from data/faqs.ts
 * FUTURE:  Replace with TanStack Query → NestJS REST API calls.
 */

import { faqs } from "@/data/faqs";
import type { FAQ } from "@/types";

export const FAQService = {
  /**
   * Returns all FAQs sorted by order.
   * FUTURE: GET /api/v1/faqs
   */
  async getAll(): Promise<FAQ[]> {
    return [...faqs].sort((a, b) => a.order - b.order);
  },

  /**
   * Returns FAQs filtered by category.
   * FUTURE: GET /api/v1/faqs?category={category}
   */
  async getByCategory(category: string): Promise<FAQ[]> {
    return faqs
      .filter((f) => f.category === category)
      .sort((a, b) => a.order - b.order);
  },
};
