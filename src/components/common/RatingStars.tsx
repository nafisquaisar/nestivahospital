/**
 * RatingStars
 * Renders a row of filled/empty stars for a numeric rating.
 * Server Component — no client state needed.
 */

import { Star } from "lucide-react";
import { cn } from "@/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "xs" | "sm" | "md";
  showValue?: boolean;
  className?: string;
}

const SIZE_MAP = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
};

export function RatingStars({
  rating,
  max = 5,
  size = "sm",
  showValue = false,
  className,
}: RatingStarsProps) {
  const filled   = Math.floor(rating);
  const hasHalf  = rating - filled >= 0.5;
  const iconSize = SIZE_MAP[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              iconSize,
              "shrink-0",
              i < filled
                ? "fill-amber-400 text-amber-400"
                : i === filled && hasHalf
                  ? "fill-amber-200 text-amber-400"
                  : "fill-muted-foreground/20 text-muted-foreground/40"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
