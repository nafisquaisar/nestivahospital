"use client";

/**
 * ThemeProvider
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps next-themes to provide dark/light/system theme switching.
 * Must be a Client Component — wraps the entire app in the root layout.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
