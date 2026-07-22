"use client";

/**
 * Root Providers
 * ─────────────────────────────────────────────────────────────────────────────
 * Composes all React context providers in one place.
 * Add future providers here — never scatter them across the tree.
 *
 * Order matters: outermost providers wrap everything inside them.
 */

import { ThemeProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {/* Add future providers here, e.g.:
          <QueryClientProvider client={queryClient}>
          <AuthProvider>
          <ToastProvider>
      */}
      {children}
    </ThemeProvider>
  );
}
