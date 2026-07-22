/**
 * Utility Functions
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared utilities used throughout the platform.
 * Import from "@/utils" — never duplicate these.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ─────────────────────────────────────────────────────────────────────────────
// Styling
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * @example cn("px-4 py-2", condition && "bg-primary", "px-6") → "py-2 bg-primary px-6"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────────────────────────────────────
// Formatting
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formats a phone number into a consistent display format.
 * @example formatPhone("+18006378482") → "+1 (800) 637-8482"
 * @example formatPhone("8006378482") → "(800) 637-8482"
 */
export function formatPhone(phone: string): string {
  // Strip all non-numeric characters except leading +
  const hasPlus = phone.startsWith("+");
  const digits = phone.replace(/\D/g, "");

  if (hasPlus) {
    // International format
    if (digits.length === 11 && digits.startsWith("1")) {
      // US/Canada +1
      const cc = digits.slice(0, 1);
      const area = digits.slice(1, 4);
      const prefix = digits.slice(4, 7);
      const line = digits.slice(7, 11);
      return `+${cc} (${area}) ${prefix}-${line}`;
    }
    // Generic international
    return `+${digits}`;
  }

  // 10-digit US format
  if (digits.length === 10) {
    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6, 10);
    return `(${area}) ${prefix}-${line}`;
  }

  // Return as-is if unrecognised
  return phone;
}

/**
 * Formats a date string or Date object into a human-readable format.
 * @example formatDate("2024-03-15") → "March 15, 2024"
 * @example formatDate("2024-03-15", { short: true }) → "Mar 15, 2024"
 */
export function formatDate(
  date: string | Date,
  options: {
    short?: boolean;
    includeTime?: boolean;
    locale?: string;
  } = {}
): string {
  const { short = false, includeTime = false, locale = "en-US" } = options;
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    console.warn(`formatDate: invalid date "${date}"`);
    return String(date);
  }

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: short ? "short" : "long",
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return d.toLocaleDateString(locale, dateFormatOptions);
}

/**
 * Formats a date as a relative time string.
 * @example formatRelativeDate("2024-03-10") → "5 days ago"
 */
export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
}

// ─────────────────────────────────────────────────────────────────────────────
// String helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Truncates a string to the specified length, appending "..." if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Converts a string to a URL-friendly slug.
 * @example slugify("Advanced Cardiology Care") → "advanced-cardiology-care"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Capitalises the first letter of each word.
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Number helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Formats a number with compact notation.
 * @example formatNumber(1200) → "1.2K"
 * @example formatNumber(1500000) → "1.5M"
 */
export function formatNumber(num: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Formats a currency value.
 * @example formatCurrency(250) → "$250.00"
 */
export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
