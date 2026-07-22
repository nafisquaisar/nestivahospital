"use client";

/**
 * DoctorSearchFilters
 * Client component — search bar, department filter, experience filter, availability filter.
 */

import { useState, useCallback } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export type DoctorFilters = {
  search: string;
  department: string;
  experience: string;
  availability: string;
};

const DEPARTMENTS = [
  { value: "all", label: "All Departments" },
  { value: "cardiology", label: "Cardiology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopaedics" },
  { value: "oncology", label: "Oncology" },
  { value: "pediatrics", label: "Paediatrics" },
];

const EXPERIENCE_RANGES = [
  { value: "all", label: "All Experience" },
  { value: "0-10", label: "Up to 10 years" },
  { value: "10-15", label: "10–15 years" },
  { value: "15+", label: "15+ years" },
];

const AVAILABILITY = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "busy", label: "Busy" },
];

interface DoctorSearchFiltersProps {
  onFiltersChange: (filters: DoctorFilters) => void;
  resultCount: number;
}

export function DoctorSearchFilters({ onFiltersChange, resultCount }: DoctorSearchFiltersProps) {
  const [filters, setFilters] = useState<DoctorFilters>({
    search: "",
    department: "all",
    experience: "all",
    availability: "all",
  });

  const updateFilters = useCallback(
    (updates: Partial<DoctorFilters>) => {
      const next = { ...filters, ...updates };
      setFilters(next);
      onFiltersChange(next);
    },
    [filters, onFiltersChange]
  );

  const hasActiveFilters =
    filters.search ||
    filters.department !== "all" ||
    filters.experience !== "all" ||
    filters.availability !== "all";

  const clearAll = () => {
    const reset: DoctorFilters = { search: "", department: "all", experience: "all", availability: "all" };
    setFilters(reset);
    onFiltersChange(reset);
  };

  return (
    <div className="flex flex-col gap-4" role="search" aria-label="Filter doctors">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          id="doctor-search"
          type="search"
          placeholder="Search by name, specialization, or department…"
          className="pl-10 h-11"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          aria-label="Search doctors"
        />
      </div>

      {/* Filter pills row */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />

        {/* Department */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Department filter">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.value}
              onClick={() => updateFilters({ department: dept.value })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                filters.department === dept.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
              aria-pressed={filters.department === dept.value}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-border" aria-hidden="true" />

        {/* Experience */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Experience filter">
          {EXPERIENCE_RANGES.map((exp) => (
            <button
              key={exp.value}
              onClick={() => updateFilters({ experience: exp.value })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                filters.experience === exp.value
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-secondary/50 hover:text-foreground"
              )}
              aria-pressed={filters.experience === exp.value}
            >
              {exp.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-border" aria-hidden="true" />

        {/* Availability */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Availability filter">
          {AVAILABILITY.map((av) => (
            <button
              key={av.value}
              onClick={() => updateFilters({ availability: av.value })}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                filters.availability === av.value
                  ? "border-success bg-success/10 text-success"
                  : "border-border bg-background text-muted-foreground hover:border-success/50 hover:text-foreground"
              )}
              aria-pressed={filters.availability === av.value}
            >
              {av.label}
            </button>
          ))}
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-7 gap-1 px-2 text-xs text-destructive hover:text-destructive"
            aria-label="Clear all filters"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}

        <span className="ml-auto text-xs text-muted-foreground shrink-0" aria-live="polite">
          {resultCount} doctor{resultCount !== 1 ? "s" : ""} found
        </span>
      </div>
    </div>
  );
}
