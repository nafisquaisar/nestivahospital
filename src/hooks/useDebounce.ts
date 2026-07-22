"use client";
/**
 * useDebounce
 * ─────────────────────────────────────────────────────────────────────────────
 * Debounces a value by the specified delay (ms).
 * Useful for search inputs, resize handlers, etc.
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
