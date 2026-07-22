"use client";

/**
 * MobileDrawer
 * ─────────────────────────────────────────────────────────────────────────────
 * Slide-in navigation drawer for mobile viewports.
 * Uses Sheet (Radix Dialog) for accessibility.
 *
 * Features:
 *   - Accordion-style expand/collapse for parent items with children
 *   - Auto-closes on navigation
 *   - Active page + parent highlighting
 */

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";
import { branding } from "@/config/branding";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "@/config/navigation";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  ctaItem?: NavItem;
}

export function MobileDrawer({
  open,
  onClose,
  navItems,
  ctaItem,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const [expandedHref, setExpandedHref] = useState<string | null>(null);

  const toggleExpand = (href: string) =>
    setExpandedHref((prev) => (prev === href ? null : href));

  const handleNavigate = () => onClose();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="flex w-80 flex-col gap-0 p-0" id="mobile-drawer">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
          <SheetClose asChild>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetClose>
        </SheetHeader>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const isParentActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));
            const isExpanded = expandedHref === item.href;

            if (!item.children || item.children.length === 0) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  className={cn(
                    "flex items-center px-5 py-3",
                    "text-sm font-medium transition-colors",
                    isParentActive
                      ? "text-primary bg-primary/5"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href}>
                {/* Parent toggle button */}
                <button
                  onClick={() => toggleExpand(item.href)}
                  aria-expanded={isExpanded}
                  className={cn(
                    "flex w-full items-center justify-between px-5 py-3",
                    "text-sm font-medium transition-colors",
                    isParentActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-200",
                      isExpanded && "rotate-180 text-primary"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Accordion children */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-5 border-l-2 border-border pb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleNavigate}
                            className={cn(
                              "flex items-center px-4 py-2.5",
                              "text-sm transition-colors",
                              pathname === child.href
                                ? "text-primary font-semibold"
                                : "text-muted-foreground hover:text-primary"
                            )}
                            aria-current={
                              pathname === child.href ? "page" : undefined
                            }
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <Separator />

        {/* Footer actions */}
        <div className="p-5 space-y-3">
          {/* Emergency */}
          <a
            href={`tel:${branding.emergencyPhone.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-xl border border-danger/30 bg-danger/5 p-3 text-danger"
            onClick={handleNavigate}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide">Emergency</p>
              <p className="text-sm font-bold">{branding.emergencyPhone}</p>
            </div>
          </a>

          {/* CTA */}
          {ctaItem && (
            <Button asChild className="w-full" size="lg">
              <Link href={ctaItem.href} onClick={handleNavigate}>
                {ctaItem.label}
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
