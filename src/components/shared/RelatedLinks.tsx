/**
 * RelatedLinks
 * ─────────────────────────────────────────────────────────────────────────────
 * "Explore More" section — shows 3–4 related page cards with icon, title,
 * description, and a directional arrow link. Server Component.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Heart,
  Brain,
  Siren,
  Microscope,
  Monitor,
  Scissors,
  Baby,
  Bone,
  Ribbon,
  Activity,
  Stethoscope,
  Shield,
  Users,
  Building2,
  Star,
  FlaskConical,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";

/* ── Icon registry (extend as needed) ─────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Heart, Brain, Siren, Microscope, Monitor, Scissors,
  Baby, Bone, Ribbon, Activity, Stethoscope, Shield,
  Users, Building2, Star, FlaskConical,
};

export interface RelatedLink {
  href: string;
  icon: string;
  title: string;
  description: string;
  color?: "primary" | "secondary" | "accent" | "success";
}

interface RelatedLinksProps {
  links: RelatedLink[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const colorMap = {
  primary:   { bg: "bg-primary/10",   icon: "text-primary",   border: "group-hover:border-primary/30" },
  secondary: { bg: "bg-secondary/10", icon: "text-secondary", border: "group-hover:border-secondary/30" },
  accent:    { bg: "bg-amber-100/60", icon: "text-amber-600", border: "group-hover:border-amber-300/50" },
  success:   { bg: "bg-success/10",   icon: "text-success",   border: "group-hover:border-success/30" },
};

export function RelatedLinks({
  links,
  eyebrow = "Explore More",
  title = "Related Services",
  subtitle,
}: RelatedLinksProps) {
  return (
    <section
      className="bg-background py-16 md:py-20"
      aria-labelledby="related-links-heading"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="related-links-heading"
          subtitle={subtitle}
          align="center"
        />

        <div
          className={cn(
            "grid gap-4",
            links.length === 2 && "sm:grid-cols-2",
            links.length === 3 && "sm:grid-cols-3",
            links.length >= 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {links.map((link) => {
            const Icon = ICON_MAP[link.icon] ?? Activity;
            const color = colorMap[link.color ?? "primary"];

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6",
                  "shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-lg",
                  color.border
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                    color.bg
                  )}
                  aria-hidden="true"
                >
                  <Icon className={cn("h-6 w-6", color.icon)} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {link.description}
                  </p>
                </div>

                <span
                  className={cn(
                    "mt-auto flex items-center gap-1.5 text-sm font-semibold",
                    "text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2"
                  )}
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
