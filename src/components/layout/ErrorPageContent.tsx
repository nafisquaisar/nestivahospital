"use client";

/**
 * ErrorPageContent
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared client component for 401 / 403 / 500 error pages.
 * Accepts config props — zero duplication across error routes.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home, CalendarCheck, Phone, Mail, ArrowLeft,
  LockKeyhole, ShieldX, ServerCrash, HeartPulse,
  Activity, Heart, Stethoscope, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { cn } from "@/utils";

export type ErrorVariant = "401" | "403" | "500";

const CONFIG: Record<ErrorVariant, {
  code: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  orbColor: string;
  title: string;
  subtitle: string;
  description: string;
}> = {
  "401": {
    code: "401",
    icon: LockKeyhole,
    iconBg: "from-warning/20 to-warning/10",
    iconColor: "text-warning",
    gradientFrom: "hsl(38 92% 55% / 0.08)",
    gradientTo: "hsl(210 100% 40% / 0.04)",
    orbColor: "bg-warning/10",
    title: "Authentication Required",
    subtitle: "Oops! You Need to Sign In",
    description:
      "You are not authenticated to view this page. This section of the Nestiva Hospital portal requires a valid login. Please sign in with your patient or staff credentials to continue.",
  },
  "403": {
    code: "403",
    icon: ShieldX,
    iconBg: "from-danger/20 to-danger/10",
    iconColor: "text-danger",
    gradientFrom: "hsl(0 84% 60% / 0.06)",
    gradientTo: "hsl(210 100% 40% / 0.04)",
    orbColor: "bg-danger/10",
    title: "Access Denied",
    subtitle: "Access Denied",
    description:
      "You do not have permission to access this page. This area is restricted to authorised Nestiva Hospital personnel. If you believe this is an error, please contact our support team.",
  },
  "500": {
    code: "500",
    icon: ServerCrash,
    iconBg: "from-secondary/20 to-secondary/10",
    iconColor: "text-secondary",
    gradientFrom: "hsl(174 62% 42% / 0.07)",
    gradientTo: "hsl(210 100% 40% / 0.04)",
    orbColor: "bg-secondary/10",
    title: "Internal Server Error",
    subtitle: "Something Went Wrong",
    description:
      "We encountered an unexpected error on our server. Our technical team has been notified and is working to resolve the issue. Please try again in a few minutes.",
  },
};

const floatingIcons = [
  { Icon: Heart,       x: "5%",  y: "18%", size: 26, delay: 0    },
  { Icon: Stethoscope, x: "90%", y: "10%", size: 32, delay: 0.6  },
  { Icon: Activity,    x: "80%", y: "70%", size: 22, delay: 1.2  },
  { Icon: Shield,      x: "8%",  y: "72%", size: 28, delay: 1.8  },
  { Icon: HeartPulse,  x: "50%", y: "6%",  size: 18, delay: 2.4  },
];

const containerVar = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

interface ErrorPageContentProps {
  variant: ErrorVariant;
}

export function ErrorPageContent({ variant }: ErrorPageContentProps) {
  const router = useRouter();
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className={cn("absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full blur-3xl", cfg.orbColor)}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-primary/6 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating medical icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {floatingIcons.map(({ Icon: FIcon, x, y, size, delay }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/12"
            style={{ left: x, top: y }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay }}
          >
            <FIcon size={size} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      <main
        id="main-content"
        className="flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6"
      >
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center"
        >
          {/* Illustration */}
          <motion.div variants={itemVar} className="relative">
            <div className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
            <div
              className={cn(
                "relative flex h-36 w-36 items-center justify-center rounded-3xl border border-white/70",
                "bg-gradient-to-br shadow-2xl shadow-black/10 backdrop-blur-md",
                cfg.iconBg
              )}
            >
              <motion.div
                animate={{ rotate: [-6, 6, -6], y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }}
              >
                <Icon className={cn("h-16 w-16", cfg.iconColor)} strokeWidth={1.4} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Code */}
          <motion.div
            variants={itemVar}
            className="font-display text-[7rem] font-extrabold leading-none tracking-tight sm:text-[9rem]"
            style={{
              background: "linear-gradient(135deg, hsl(210 100% 40%) 0%, hsl(174 62% 42%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            aria-label={`Error ${cfg.code}`}
          >
            {cfg.code}
          </motion.div>

          {/* Text */}
          <motion.div variants={itemVar} className="flex flex-col gap-3">
            <h1 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
              {cfg.subtitle}
            </h1>
            <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
              {cfg.description}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div variants={itemVar} className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/20 font-semibold" id={`error-${cfg.code}-home`}>
              <Link href="/">
                <Home className="h-5 w-5" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/5" id={`error-${cfg.code}-appt`}>
              <Link href="/appointment">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2" id={`error-${cfg.code}-contact`}>
              <Link href="/contact">
                <Mail className="h-5 w-5" aria-hidden="true" />
                Contact Us
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-danger/30 text-danger hover:bg-danger/5" id={`error-${cfg.code}-emergency`}>
              <a href={`tel:${contact.emergencyPhone.replace(/\D/g, "")}`}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                {contact.emergencyPhone}
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-muted-foreground"
              onClick={() => router.back()}
              id={`error-${cfg.code}-back`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go Back
            </Button>
          </motion.div>

          {/* Footer note */}
          <motion.p variants={itemVar} className="text-xs text-muted-foreground pt-4 border-t border-border/40 w-full">
            {branding.name} · {branding.address.city}, {branding.address.country} · {contact.phone}
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
