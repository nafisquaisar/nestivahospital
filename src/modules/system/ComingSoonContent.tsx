"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Mail, CheckCircle2, Heart, Activity,
  HeartPulse, Stethoscope, Shield, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { cn } from "@/utils";

const TARGET_DATE = new Date("2026-09-01T00:00:00");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const upcomingFeatures = [
  { icon: HeartPulse, label: "AI Diagnostics",        desc: "Smart health analysis" },
  { icon: Stethoscope, label: "Virtual Specialist Consult", desc: "Video appointments" },
  { icon: Shield,      label: "Health Passport",       desc: "Unified medical record" },
  { icon: Star,        label: "Wellness Programs",     desc: "Preventive care plans" },
];

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/60 bg-white/70 shadow-lg backdrop-blur-sm sm:h-24 sm:w-24">
        <motion.span
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-display text-3xl font-extrabold text-primary sm:text-4xl"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

export function ComingSoonContent() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.05]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-secondary/8 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Floating icons */}
      {[Heart, Activity, Sparkles, Stethoscope].map((Icon, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-primary/10"
          style={{ left: `${[8, 84, 65, 18][i]}%`, top: `${[20, 15, 75, 70][i]}%` }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95], delay: i * 0.8 }}
          aria-hidden="true"
        >
          <Icon size={28 + i * 4} strokeWidth={1.2} />
        </motion.div>
      ))}

      <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center"
        >
          {/* Logo badge */}
          <motion.div variants={item}>
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold text-primary">{branding.name}</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={item} className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Something{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Amazing
              </span>{" "}
              is Coming
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We&apos;re preparing to launch new healthcare services that will transform how you manage your health.
              Be the first to experience it.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={item}>
            <div className="flex gap-4 sm:gap-6" role="timer" aria-label="Countdown to launch">
              <CountUnit value={days}    label="Days"    />
              <CountUnit value={hours}   label="Hours"   />
              <CountUnit value={minutes} label="Minutes" />
              <CountUnit value={seconds} label="Seconds" />
            </div>
          </motion.div>

          {/* Features */}
          <motion.div variants={item} className="grid grid-cols-2 gap-3 w-full max-w-lg sm:grid-cols-4">
            {upcomingFeatures.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card/80 p-4 backdrop-blur-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-foreground">{label}</span>
                <span className="text-[10px] text-muted-foreground">{desc}</span>
              </div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item} className="w-full max-w-md">
            {subscribed ? (
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-success/20 bg-success/5 p-5 text-success">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <p className="text-sm font-semibold">
                  You&apos;re on the list! We&apos;ll notify you at <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email for launch notification"
                    className="w-full rounded-xl border border-border bg-background/80 py-3 pl-10 pr-4 text-sm outline-none backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button type="submit" className="gap-2 shrink-0 shadow-lg shadow-primary/20 font-semibold">
                  Notify Me
                </Button>
              </form>
            )}
            <p className="mt-2 text-center text-xs text-muted-foreground">
              No spam. Unsubscribe at any time.
            </p>
          </motion.div>

          <motion.p variants={item} className="text-xs text-muted-foreground">
            {branding.name} · {branding.address.full}
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}
