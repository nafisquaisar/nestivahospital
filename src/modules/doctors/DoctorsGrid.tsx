"use client";

/**
 * DoctorsGrid
 * Client component — filtered + paginated doctor grid.
 */

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorCard } from "@/components/common/DoctorCard";
import { DoctorSearchFilters, type DoctorFilters } from "./DoctorSearchFilters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, UserX } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import type { Doctor } from "@/types";

const PAGE_SIZE = 8;

interface DoctorsGridProps {
  doctors: Doctor[];
}

function matchesFilters(doctor: Doctor, filters: DoctorFilters): boolean {
  const q = filters.search.toLowerCase().trim();
  if (q) {
    const matches =
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialization.toLowerCase().includes(q) ||
      doctor.designation.toLowerCase().includes(q) ||
      doctor.departmentId.toLowerCase().includes(q);
    if (!matches) return false;
  }

  if (filters.department !== "all" && doctor.departmentId !== filters.department) return false;

  if (filters.experience !== "all") {
    if (filters.experience === "0-10" && doctor.experience >= 10) return false;
    if (filters.experience === "10-15" && (doctor.experience < 10 || doctor.experience > 15)) return false;
    if (filters.experience === "15+" && doctor.experience < 15) return false;
  }

  if (filters.availability !== "all" && doctor.availability !== filters.availability) return false;

  return true;
}

export function DoctorsGrid({ doctors }: DoctorsGridProps) {
  const isReduced = useReducedMotion();
  const [filters, setFilters] = useState<DoctorFilters>({
    search: "",
    department: "all",
    experience: "all",
    availability: "all",
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => doctors.filter((d) => matchesFilters(d, filters)),
    [doctors, filters]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFiltersChange = useCallback((next: DoctorFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <DoctorSearchFilters onFiltersChange={handleFiltersChange} resultCount={filtered.length} />

      {paged.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <UserX className="h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
          <h3 className="text-base font-semibold text-foreground">No doctors found</h3>
          <p className="max-w-xs text-sm text-muted-foreground">
            Try adjusting your search or filters to find the right specialist.
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${page}-${filters.department}-${filters.experience}-${filters.availability}-${filters.search}`}
            initial={isReduced ? undefined : { opacity: 0, y: 8 }}
            animate={isReduced ? undefined : { opacity: 1, y: 0 }}
            exit={isReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {paged.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={isReduced ? undefined : { opacity: 0, y: 16 }}
                animate={isReduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <DoctorCard doctor={doctor} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-2"
          aria-label="Doctor list pagination"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </nav>
      )}
    </div>
  );
}
