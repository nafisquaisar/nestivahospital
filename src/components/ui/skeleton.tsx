/**
 * Skeleton Loading Components
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable animated skeletons for every card type in the application.
 * Used as Suspense fallbacks and loading states.
 */

import { cn } from "@/lib/utils";

// ─── Base Skeleton Pulse ──────────────────────────────────────────────────

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

// ─── Card Skeletons ────────────────────────────────────────────────────────

function DoctorCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border/50 bg-card"
      aria-hidden="true"
    >
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3.5 w-1/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function DepartmentCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border/50 bg-card"
      aria-hidden="true"
    >
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4 mt-1" />
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border/50 bg-card p-6"
      aria-hidden="true"
    >
      <Skeleton className="mb-4 h-12 w-12 rounded-xl" />
      <Skeleton className="mb-2 h-8 w-1/2" />
      <Skeleton className="mb-1 h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

function TestimonialCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border/40 bg-card p-6 sm:p-8"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-start justify-between">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="mb-4 h-4 w-3/4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="h-px bg-border mb-4" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </div>
  );
}

function GalleryCardSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("rounded-2xl", className)}
      aria-hidden="true"
    />
  );
}

function FeatureCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-border/50 bg-card p-6"
      aria-hidden="true"
    >
      <Skeleton className="mb-5 h-14 w-14 rounded-2xl" />
      <Skeleton className="mb-2 h-5 w-2/3" />
      <Skeleton className="mb-1 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />
      <Skeleton className="h-6 w-36 rounded-full" />
    </div>
  );
}

// ─── Section Skeleton ─────────────────────────────────────────────────────

interface SectionSkeletonProps {
  count?: number;
  /** Tailwind grid-cols class override */
  gridClass?: string;
  CardSkeleton?: React.ComponentType;
}

function SectionSkeleton({
  count = 3,
  gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  CardSkeleton: Card = DepartmentCardSkeleton,
}: SectionSkeletonProps) {
  return (
    <div className={cn("grid gap-5", gridClass)} aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}

export {
  Skeleton,
  DoctorCardSkeleton,
  DepartmentCardSkeleton,
  StatCardSkeleton,
  TestimonialCardSkeleton,
  GalleryCardSkeleton,
  FeatureCardSkeleton,
  SectionSkeleton,
};
