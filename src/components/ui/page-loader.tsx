"use client";
/**
 * Page Loader & Button Loading Components
 * ─────────────────────────────────────────────────────────────────────────────
 * PageLoader  — full-screen initial load overlay
 * ButtonSpinner — inline spinner for loading button states
 */

import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { branding } from "@/config/branding";

// ─── Page Loader ──────────────────────────────────────────────────────────

interface PageLoaderProps {
  visible: boolean;
}

export function PageLoader({ visible }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          aria-label="Loading page"
          aria-busy="true"
          role="progressbar"
        >
          {/* Logo icon */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Stethoscope className="h-8 w-8 text-primary" aria-hidden="true" />
          </motion.div>

          {/* Brand name */}
          <p className="mb-4 font-display text-xl font-bold text-foreground">
            {branding.shortName}
          </p>

          {/* Progress bar */}
          <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Button Spinner ───────────────────────────────────────────────────────

interface ButtonSpinnerProps {
  className?: string;
  size?: "xs" | "sm" | "md";
}

const SIZES = { xs: "h-3 w-3", sm: "h-4 w-4", md: "h-5 w-5" };

export function ButtonSpinner({ className, size = "sm" }: ButtonSpinnerProps) {
  return (
    <svg
      className={cn("animate-spin text-current", SIZES[size], className)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ─── Lazy Image Placeholder ───────────────────────────────────────────────

interface LazyImagePlaceholderProps {
  className?: string;
}

export function LazyImagePlaceholder({ className }: LazyImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted",
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-8 w-8 rounded-lg bg-muted-foreground/20"
      />
    </div>
  );
}
