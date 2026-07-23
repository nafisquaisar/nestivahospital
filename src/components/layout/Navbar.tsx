"use client";

/**
 * Navbar
 * ─────────────────────────────────────────────────────────────────────────────
 * Sticky transparent→white navbar with:
 *   • Scroll-triggered background + shadow
 *   • Desktop nav with dropdown items
 *   • Emergency pulse badge
 *   • Book Appointment CTA
 *   • Mobile hamburger → Sheet drawer
 *
 * Reads all values from config — zero hardcoding.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/utils";
import { branding } from "@/config/branding";
import { navigation } from "@/config/navigation";
import { Logo } from "@/components/layout/Logo";
import { NavItem } from "@/components/layout/NavItem";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* Separate CTA item from standard nav links */
const navItems = navigation.filter((item) => !item.isCta);
const ctaItem = navigation.find((item) => item.isCta);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_24px_0_hsl(220_14%_10%/0.08)] border-b border-border"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-6">

            {/* ── Logo ─────────────────────────────────────────── */}
            <Logo />

            {/* ── Desktop Navigation ────────────────────────────── */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-0.5"
              aria-label="Primary navigation"
            >
              {navItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>

            {/* ── Right Actions ──────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">

              {/* Emergency badge */}
              <a
                href={`tel:${branding.emergencyPhone.replace(/[\s()+-]/g, "")}`}
                aria-label={`Emergency line: ${branding.emergencyPhone}`}
                className={cn(
                  "group flex items-center gap-2 rounded-full border px-3 py-1.5",
                  "border-danger/30 bg-danger/5 text-danger text-sm font-medium",
                  "hover:bg-danger/10 transition-colors duration-200"
                )}
              >
                {/* Ping indicator */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
                </span>
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden xl:inline font-semibold">
                  {branding.emergencyPhone}
                </span>
                <span className="xl:hidden font-semibold">Emergency</span>
              </a>

              {/* CTA */}
              {ctaItem && (
                <Button asChild size="sm">
                  <Link href={ctaItem.href}>{ctaItem.label}</Link>
                </Button>
              )}
            </div>

            {/* ── Mobile Hamburger ──────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "lg:hidden flex h-10 w-10 items-center justify-center rounded-lg",
                "text-foreground hover:bg-muted transition-colors"
              )}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              <Menu className="h-5 w-5" />
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
        ctaItem={ctaItem}
      />
    </>
  );
}
