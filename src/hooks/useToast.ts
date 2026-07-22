/**
 * useToast hook
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight toast state manager. No external library needed.
 * Used by: AppointmentForm (and any future client component).
 *
 * Usage:
 *   const { toasts, toast, dismiss } = useToast();
 *   toast({ variant: "success", title: "Done!", description: "..." });
 */
"use client";

import { useState, useCallback } from "react";
import type { ToastProps } from "@/components/ui/toast";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ToastData extends Omit<ToastProps, "open" | "onOpenChange"> {
  id: string;
  title?: string;
  description?: string;
  /** Auto-dismiss duration in ms. Default: 5000 */
  duration?: number;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...data, id }]);

    // Auto-dismiss
    const duration = data.duration ?? 5000;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}
