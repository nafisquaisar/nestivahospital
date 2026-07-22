"use client";

/**
 * GalleryFilters — category filter + search for the gallery page
 */

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export type GalleryFilterState = {
  search: string;
  category: string;
};

const CATEGORIES = [
  { value: "all",       label: "All" },
  { value: "facility",  label: "Facility" },
  { value: "equipment", label: "Equipment" },
  { value: "team",      label: "Team" },
  { value: "events",    label: "Events" },
];

interface GalleryFiltersProps {
  onFiltersChange: (filters: GalleryFilterState) => void;
  resultCount: number;
}

export function GalleryFilters({ onFiltersChange, resultCount }: GalleryFiltersProps) {
  const [filters, setFilters] = useState<GalleryFilterState>({ search: "", category: "all" });

  const update = useCallback((updates: Partial<GalleryFilterState>) => {
    const next = { ...filters, ...updates };
    setFilters(next);
    onFiltersChange(next);
  }, [filters, onFiltersChange]);

  const hasActive = filters.search || filters.category !== "all";
  const clear = () => {
    const reset = { search: "", category: "all" };
    setFilters(reset);
    onFiltersChange(reset);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search gallery…"
          className="pl-10 h-10"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          aria-label="Search gallery images"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => update({ category: cat.value })}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                filters.category === cat.value
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
              aria-pressed={filters.category === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {hasActive && (
          <Button variant="ghost" size="sm" onClick={clear} className="h-7 gap-1 px-2 text-xs text-destructive hover:text-destructive">
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}

        <span className="ml-auto text-xs text-muted-foreground" aria-live="polite">
          {resultCount} image{resultCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
