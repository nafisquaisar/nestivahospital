"use client";

/**
 * GalleryGrid — filterable masonry gallery grid client component
 */

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryCard } from "@/components/common/GalleryCard";
import { GalleryFilters, type GalleryFilterState } from "./GalleryFilters";
import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { GalleryItem } from "@/types";

const PAGE_SIZE = 12;

/* Grid span config for masonry effect */
const SPAN_MAP: Record<number, { col?: string; row?: string }> = {
  0: { row: "sm:row-span-2" },
  2: { col: "sm:col-span-2" },
  5: { row: "sm:row-span-2" },
  8: { col: "sm:col-span-2" },
};

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const isReduced = useReducedMotion();
  const [filters, setFilters] = useState<GalleryFilterState>({ search: "", category: "all" });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = items;
    if (filters.category !== "all") {
      result = result.filter((g) => g.category === filters.category);
    }
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description?.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(0, page * PAGE_SIZE);

  const handleFiltersChange = useCallback((next: GalleryFilterState) => {
    setFilters(next);
    setPage(1);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <GalleryFilters onFiltersChange={handleFiltersChange} resultCount={filtered.length} />

      {paged.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <ImageOff className="h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
          <h3 className="text-base font-semibold text-foreground">No images found</h3>
          <p className="text-sm text-muted-foreground">Try a different search or category.</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${filters.category}-${filters.search}`}
            initial={isReduced ? undefined : { opacity: 0 }}
            animate={isReduced ? undefined : { opacity: 1 }}
            exit={isReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "grid gap-3 sm:gap-4",
              "grid-cols-1",
              "sm:grid-cols-2 sm:auto-rows-[220px]",
              "lg:grid-cols-3 lg:auto-rows-[240px]"
            )}
            role="list"
            aria-label="Gallery images"
          >
            {paged.map((item, i) => {
              const span = SPAN_MAP[i % 9] ?? {};
              return (
                <motion.div
                  key={item.id}
                  role="listitem"
                  initial={isReduced ? undefined : { opacity: 0, scale: 0.97 }}
                  animate={isReduced ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: (i % PAGE_SIZE) * 0.04 }}
                  className={cn(span.col, span.row)}
                >
                  <GalleryCard item={item} index={i} className="h-full w-full" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load more */}
      {page < totalPages && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setPage((p) => p + 1)} className="gap-2 px-8">
            Load More Images
          </Button>
        </div>
      )}
    </div>
  );
}
