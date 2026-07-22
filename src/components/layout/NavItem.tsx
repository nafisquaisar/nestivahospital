"use client";

/**
 * NavItem
 * ─────────────────────────────────────────────────────────────────────────────
 * Desktop navigation item with full dropdown support.
 *
 * Features:
 *   - Hover + keyboard (Enter/Space) to open dropdown
 *   - Escape to close
 *   - ArrowUp / ArrowDown to navigate child items
 *   - Click child → auto-closes dropdown
 *   - Active page highlight via pathname matching
 */

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import type { NavItem as NavItemType } from "@/config/navigation";

interface NavItemProps {
  item: NavItemType;
}

export function NavItem({ item }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/"));

  const close = useCallback(() => setOpen(false), []);

  /* ── Base classes ──────────────────────────────────────────────────────── */
  const baseClasses = cn(
    "relative flex items-center gap-1 rounded-md px-3 py-2",
    "text-sm font-medium transition-colors duration-150",
    "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    isActive ? "text-primary" : "text-foreground/80"
  );

  /* ── Active indicator ──────────────────────────────────────────────────── */
  const indicator = isActive ? (
    <motion.span
      layoutId="nav-indicator"
      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
    />
  ) : null;

  /* ── Simple link (no children) ─────────────────────────────────────────── */
  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={baseClasses}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
        {indicator}
      </Link>
    );
  }

  /* ── Keyboard handlers ─────────────────────────────────────────────────── */
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => childRefs.current[0]?.focus(), 60);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const handleChildKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    idx: number
  ) => {
    if (e.key === "Escape") {
      close();
      containerRef.current?.querySelector("button")?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      childRefs.current[idx + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx === 0) {
        close();
        containerRef.current?.querySelector("button")?.focus();
      } else {
        childRefs.current[idx - 1]?.focus();
      }
    }
  };

  /* ── Navigate and close ────────────────────────────────────────────────── */
  const handleChildClick = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onBlur={(e) => {
        // Close if focus leaves the entire dropdown container
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          close();
        }
      }}
    >
      <button
        className={baseClasses}
        aria-haspopup="true"
        aria-expanded={open}
        onKeyDown={handleTriggerKeyDown}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
        {indicator}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[210px] overflow-hidden rounded-xl border border-border bg-popover shadow-xl shadow-black/10"
            role="menu"
            aria-label={`${item.label} submenu`}
          >
            <div className="py-1.5">
              {item.children.map((child, idx) => (
                <a
                  key={child.href}
                  ref={(el) => { childRefs.current[idx] = el; }}
                  href={child.href}
                  role="menuitem"
                  tabIndex={0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleChildClick(child.href);
                  }}
                  onKeyDown={(e) => handleChildKeyDown(e, idx)}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm",
                    "text-foreground/80 hover:text-primary hover:bg-muted",
                    "transition-colors duration-100 focus:outline-none focus:bg-muted focus:text-primary",
                    pathname === child.href && "text-primary bg-primary/5 font-medium"
                  )}
                  aria-current={pathname === child.href ? "page" : undefined}
                >
                  {child.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
