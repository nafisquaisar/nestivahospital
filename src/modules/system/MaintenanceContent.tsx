"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench, Phone, Bell, CheckCircle2, Heart, Activity,
  Stethoscope, Shield, Clock, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { contact } from "@/config/contact";
import { cn } from "@/utils";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const statusItems = [
  { label: "Emergency Services",    status: "operational", color: "bg-success" },
  { label: "Patient Portal",        status: "maintenance", color: "bg-warning" },
  { label: "Appointment Booking",   status: "maintenance", color: "bg-warning" },
  { label: "Telemedicine",          status: "operational", color: "bg-success" },
  { label: "Medical Records",       status: "offline",     color: "bg-danger"  },
];

export function MaintenanceContent() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setNotified(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/6 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-secondary/6 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center"
        >
          {/* Illustration */}
          <motion.div variants={item} className="relative">
            <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-primary/8 blur-3xl" />
            <div className="relative flex h-36 w-36 items-center justify-center rounded-3xl border border-white/70 bg-gradient-to-br from-primary/15 to-primary/5 shadow-2xl shadow-primary/15 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wrench className="h-16 w-16 text-primary" strokeWidth={1.4} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={item} className="flex flex-col gap-3">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
              Scheduled Maintenance
              <span className="h-px w-8 rounded-full bg-gradient-to-l from-primary to-secondary" />
            </span>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
              We&apos;ll Be Back{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Very Soon
              </span>
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground">
              Nestiva Hospital&apos;s website is currently undergoing scheduled maintenance to improve your experience.
              Our clinical services and emergency care remain fully operational.
            </p>
          </motion.div>

          {/* ETA card */}
          <motion.div
            variants={item}
            className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Estimated Completion</p>
              <p className="font-display text-lg font-extrabold text-primary">Today, 6:00 PM IST</p>
            </div>
          </motion.div>

          {/* System status */}
          <motion.div variants={item} className="w-full max-w-md">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              System Status
            </p>
            <div className="flex flex-col gap-2">
              {statusItems.map(({ label, status, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-card/80 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <span className="flex items-center gap-2 text-xs font-semibold text-muted-foreground capitalize">
                    <span className={cn("h-2 w-2 rounded-full", color, status === "operational" && "animate-pulse")} />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notify Me */}
          <motion.div variants={item} className="w-full max-w-md">
            {notified ? (
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-success/20 bg-success/5 p-5 text-success">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <p className="text-sm font-semibold">
                  Great! We&apos;ll notify you at <strong>{email}</strong> when we&apos;re back.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address for maintenance notification"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Button type="submit" className="gap-2 shrink-0">
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  Notify Me
                </Button>
              </form>
            )}
          </motion.div>

          {/* Emergency CTA */}
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-3 rounded-2xl border border-danger/20 bg-danger/5 p-6 sm:flex-row sm:justify-between w-full max-w-md"
          >
            <div className="flex items-center gap-3 text-left">
              <AlertCircle className="h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-danger">Medical Emergency?</p>
                <p className="text-xs text-muted-foreground">Our ER is fully operational 24/7</p>
              </div>
            </div>
            <a
              href={`tel:${contact.emergencyPhone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 rounded-xl bg-danger px-4 py-2 text-sm font-bold text-white shadow-md shadow-danger/30 transition hover:bg-danger/90"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contact.emergencyPhone}
            </a>
          </motion.div>

          <motion.p variants={item} className="text-xs text-muted-foreground">
            {branding.name} · {branding.address.full}
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
