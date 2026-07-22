"use client";

/**
 * GalleryDetailImage — client wrapper for gallery hero image with error fallback
 */

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils";

interface GalleryDetailImageProps {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
}

export function GalleryDetailImage({ src, alt, fallbackText = "Gallery", className }: GalleryDetailImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl", className)}>
        <span className="font-display text-5xl font-black text-primary/20 select-none">
          {fallbackText.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 60vw"
      className="object-cover"
      onError={() => setError(true)}
    />
  );
}
