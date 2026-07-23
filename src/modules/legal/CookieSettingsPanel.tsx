"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface CookieCategory {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

const CATEGORIES: CookieCategory[] = [
  {
    id: "necessary",
    title: "Necessary Cookies",
    description:
      "Essential for the website to function correctly. They enable core functionality such as session management, security, and accessibility. These cannot be disabled.",
    required: true,
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting anonymised information. Used to improve page performance and user experience.",
    required: false,
  },
  {
    id: "performance",
    title: "Performance Cookies",
    description:
      "Allow us to count visits and traffic sources so we can measure and improve website performance. All information is aggregated and anonymous.",
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description:
      "Used to track visitors across websites and display personalised health-related advertisements relevant to your interests.",
    required: false,
  },
  {
    id: "preferences",
    title: "Preference Cookies",
    description:
      "Remember your settings and preferences (e.g. language, region, font size) to provide a personalised experience on return visits.",
    required: false,
  },
];

export function CookieSettingsPanel() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    necessary: true,
    analytics: false,
    performance: false,
    marketing: false,
    preferences: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => {
    if (id === "necessary") return;
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const acceptAll = () => {
    setEnabled({ necessary: true, analytics: true, performance: true, marketing: true, preferences: true });
    setSaved(true);
  };

  const rejectAll = () => {
    setEnabled({ necessary: true, analytics: false, performance: false, marketing: false, preferences: false });
    setSaved(true);
  };

  const savePrefs = () => setSaved(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
      aria-label="Cookie preferences panel"
    >
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <h2 className="font-display text-lg font-extrabold text-foreground">Cookie Preferences</h2>
        <p className="mt-1 text-sm text-muted-foreground">Customise which cookies you allow on this website.</p>
      </div>

      <div className="divide-y divide-border">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-start gap-4 px-6 py-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{cat.title}</span>
                {cat.required && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Always Active
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
            </div>
            {/* Toggle */}
            <button
              role="switch"
              aria-checked={enabled[cat.id]}
              aria-label={`${cat.title}: ${enabled[cat.id] ? "enabled" : "disabled"}`}
              disabled={cat.required}
              onClick={() => toggle(cat.id)}
              className={cn(
                "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
                enabled[cat.id] ? "bg-primary" : "bg-muted",
                cat.required && "cursor-not-allowed opacity-60"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                  enabled[cat.id] ? "left-[22px]" : "left-0.5"
                )}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/20 px-6 py-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={acceptAll} className="gap-1.5 text-xs" id="cookie-accept-all">
            Accept All
          </Button>
          <Button size="sm" variant="outline" onClick={rejectAll} className="gap-1.5 text-xs" id="cookie-reject-all">
            Reject All
          </Button>
          <Button size="sm" variant="ghost" onClick={savePrefs} className="gap-1.5 text-xs" id="cookie-save-prefs">
            Save Preferences
          </Button>
        </div>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 text-xs font-semibold text-success"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Preferences saved
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
