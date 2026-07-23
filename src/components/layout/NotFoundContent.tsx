"use client";

/**
 * NotFoundContent
 * ─────────────────────────────────────────────────────────────────────────────
 * Client component containing all animated content for the 404 page.
 * Separated from not-found.tsx (server) to satisfy Next.js App Router rules.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home, CalendarCheck, ArrowLeft, Search, PhoneCall,
  Heart, Stethoscope, Activity, Shield, Users,
  Building2, UserRound, Syringe, BookOpen, Mail,
  AlertTriangle, Sparkles, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { cn } from "@/utils";

/* ── Quick link data ─────────────────────────────────────────────────── */
const quickLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Departments", href: "/departments", icon: Building2 },
  { label: "Doctors", href: "/doctors", icon: UserRound },
  { label: "Services", href: "/services", icon: Syringe },
  { label: "Appointments", href: "/appointment", icon: CalendarCheck },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "About Us", href: "/about", icon: Users },
];

/* ── Floating medical icons ─────────────────────────────────────────── */
const floatingIcons = [
  { Icon: Heart, x: "8%", y: "15%", size: 28, delay: 0, color: "text-danger/20" },
  { Icon: Stethoscope, x: "88%", y: "12%", size: 36, delay: 0.5, color: "text-primary/20" },
  { Icon: Activity, x: "75%", y: "72%", size: 24, delay: 1, color: "text-secondary/20" },
  { Icon: Shield, x: "12%", y: "75%", size: 32, delay: 1.5, color: "text-primary/15" },
  { Icon: Heart, x: "55%", y: "8%", size: 20, delay: 2, color: "text-danger/15" },
  { Icon: Syringe, x: "92%", y: "45%", size: 22, delay: 0.8, color: "text-secondary/15" },
  { Icon: Activity, x: "5%", y: "45%", size: 18, delay: 1.8, color: "text-accent/20" },
  { Icon: Sparkles, x: "42%", y: "88%", size: 20, delay: 2.2, color: "text-primary/20" },
];

/* ── Animation variants ─────────────────────────────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ── Main Component ─────────────────────────────────────────────────── */
export function NotFoundContent() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showEmergency, setShowEmergency] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/doctors?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">

      {/* ── Animated background ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-secondary/10 to-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/6 to-accent/5 blur-3xl"
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Floating medical icons ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {floatingIcons.map(({ Icon, x, y, size, delay, color }, i) => (
          <motion.div
            key={i}
            className={cn("absolute", color)}
            style={{ left: x, top: y }}
            animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
            transition={{
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: [0.45, 0.05, 0.55, 0.95],
              delay,
            }}
          >
            <Icon size={size} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      {/* ── Emergency sticky card (dismissible) ────────────────────── */}
      {showEmergency && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="sticky top-0 z-50 border-b border-danger/20 bg-danger/5 backdrop-blur-sm"
          role="alert"
          aria-label="Emergency contact information"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger" />
              </span>
              <p className="text-sm font-semibold text-danger">
                Need Immediate Medical Help?{" "}
                <span className="font-normal text-foreground/70 hidden sm:inline">
                  Our emergency team is available 24/7.
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${contact.emergencyPhone.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 rounded-full bg-danger px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-danger/30 transition hover:bg-danger/90"
                aria-label={`Call emergency line: ${contact.emergencyPhone}`}
              >
                <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
                {contact.emergencyPhone}
              </a>
              <button
                onClick={() => setShowEmergency(false)}
                aria-label="Dismiss emergency banner"
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Main Content ────────────────────────────────────────────── */}
      <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center"
        >

          {/* ── Medical illustration / 404 visual ──────────────────── */}
          <motion.div variants={item} className="relative">
            {/* Glassmorphism card behind illustration */}
            <div className="relative flex items-center justify-center">
              {/* Outer glow ring */}
              <div className="absolute h-[220px] w-[220px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/10 blur-2xl" />

              {/* Illustration card */}
              <div className="relative flex h-44 w-44 items-center justify-center rounded-3xl border border-white/80 bg-white/60 shadow-2xl shadow-primary/10 backdrop-blur-md sm:h-52 sm:w-52">
                {/* Inner decoration */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5" />

                {/* Stethoscope icon as illustration */}
                <div className="relative flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ rotate: [-8, 8, -8], y: [-4, 4, -4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
                  >
                    <Stethoscope className="h-10 w-10 text-white" strokeWidth={1.5} aria-hidden="true" />
                  </motion.div>

                  {/* Search overlay badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-danger shadow-md"
                    aria-hidden="true"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 404 number */}
            <motion.div
              variants={item}
              className="mt-6 font-display text-[6rem] font-extrabold leading-none tracking-tight sm:text-[8rem]"
              style={{
                background: "linear-gradient(135deg, hsl(210 100% 40%) 0%, hsl(174 62% 42%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              aria-label="Error 404"
            >
              404
            </motion.div>
          </motion.div>

          {/* ── Heading & Description ───────────────────────────────── */}
          <motion.div variants={item} className="flex flex-col gap-3">
            <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Oops! Page Not Found
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground">
              The page you are looking for may have been moved, deleted, or the URL is incorrect.
            </p>
            <p className="text-sm font-medium text-primary/80">
              Don&apos;t worry — our healthcare team will help you get back on track.
            </p>
          </motion.div>

          {/* ── Search Bar ─────────────────────────────────────────── */}
          <motion.div variants={item} className="w-full max-w-md">
            <form onSubmit={handleSearch} role="search" aria-label="Search the hospital website">
              <div className="relative flex items-center">
                <Search
                  className="absolute left-4 h-4.5 w-4.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search doctors, departments, services…"
                  aria-label="Search"
                  className={cn(
                    "w-full rounded-2xl border border-border/80 bg-white/80 py-3.5 pl-11 pr-28 text-sm",
                    "text-foreground placeholder:text-muted-foreground",
                    "shadow-lg shadow-black/5 backdrop-blur-sm",
                    "outline-none transition-all duration-200",
                    "focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "absolute right-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white",
                    "transition-all duration-200 hover:bg-primary/90 active:scale-95",
                    "shadow-md shadow-primary/20"
                  )}
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          {/* ── Primary Action Buttons ──────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="gap-2 font-semibold shadow-lg shadow-primary/20 min-w-[160px]"
              id="not-found-home-btn"
            >
              <Link href="/">
                <Home className="h-5 w-5" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 min-w-[160px] border-primary/30 text-primary hover:bg-primary/5"
              id="not-found-appt-btn"
            >
              <Link href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => router.back()}
              id="not-found-back-btn"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go Back
            </Button>
          </motion.div>

          {/* ── Quick Links Grid ────────────────────────────────────── */}
          <motion.div variants={item} className="w-full">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {quickLinks.map(({ label, href, icon: Icon }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.04, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={href}
                    className={cn(
                      "group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/80",
                      "px-3 py-4 text-center shadow-sm backdrop-blur-sm",
                      "transition-all duration-200",
                      "hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/8"
                    )}
                    aria-label={`Navigate to ${label}`}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-110">
                      <Icon className="h-4.5 w-4.5 text-muted-foreground transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200">
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Hospital branding footer ────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-1 border-t border-border/50 pt-6"
          >
            <p className="text-xs font-semibold text-foreground/60">
              {branding.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {branding.address.full}
            </p>
            <a
              href={`tel:${contact.phone.replace(/\D/g, "")}`}
              className="text-xs font-medium text-primary hover:underline"
            >
              {contact.phone}
            </a>
          </motion.div>

        </motion.div>
      </main>

      {/* ── Emergency floating card ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-6 right-6 z-50 hidden sm:block"
        aria-label="Emergency contact card"
      >
        <div className="relative overflow-hidden rounded-2xl border border-danger/20 bg-white/90 shadow-2xl shadow-danger/15 backdrop-blur-md">
          {/* Red accent top */}
          <div className="h-1 w-full bg-gradient-to-r from-danger to-danger/60" />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
              </span>
              <span className="text-xs font-bold text-danger uppercase tracking-wide">
                Emergency Available 24/7
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
              <span className="text-xs font-semibold text-foreground">
                Need Immediate Medical Help?
              </span>
            </div>
            <a
              href={`tel:${contact.emergencyPhone.replace(/\D/g, "")}`}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl bg-danger py-2.5 px-4",
                "text-sm font-bold text-white shadow-lg shadow-danger/30",
                "transition-all duration-200 hover:bg-danger/90 active:scale-95"
              )}
              aria-label={`Call emergency number: ${contact.emergencyPhone}`}
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Call Now: {contact.emergencyPhone}
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
