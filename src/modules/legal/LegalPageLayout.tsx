"use client";

/**
 * LegalPageLayout
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared layout for all legal pages (Privacy Policy, Terms, Cookies, Accessibility).
 * Renders an animated hero header + scrollable sticky-nav + sectioned content.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { cn } from "@/utils";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  breadcrumb: string;
  sections: LegalSection[];
  /** Optional extra content rendered below sections (e.g. cookie panel) */
  extra?: React.ReactNode;
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function LegalPageLayout({
  eyebrow, title, subtitle, lastUpdated, breadcrumb, sections, extra,
}: LegalPageLayoutProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16"
          style={{ background: "linear-gradient(135deg, hsl(210 100% 40% / 0.06) 0%, hsl(220 20% 97%) 60%, hsl(174 62% 42% / 0.04) 100%)" }}
          aria-labelledby="legal-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/5 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.022]"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(210 100% 40%) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>
          <Container>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-4"
            >
              {/* Breadcrumb */}
              <motion.nav variants={item} aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
                <Link href="/" className="flex items-center text-muted-foreground transition-colors hover:text-primary" aria-label="Home">
                  <Home className="h-3.5 w-3.5" />
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
                <span className="font-medium text-foreground" aria-current="page">{breadcrumb}</span>
              </motion.nav>

              {/* Eyebrow */}
              <motion.span variants={item} className="inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                <span className="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary" />
                {eyebrow}
              </motion.span>

              <motion.h1
                id="legal-hero-heading"
                variants={item}
                className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                {title}
              </motion.h1>

              <motion.p variants={item} className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {subtitle}
              </motion.p>

              <motion.p variants={item} className="text-xs text-muted-foreground">
                Last updated: <strong className="text-foreground">{lastUpdated}</strong>
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* ── Body: sticky nav + content ─────────────────────────── */}
        <section className="bg-background py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">

              {/* Sticky section nav */}
              <aside className="hidden lg:block" aria-label="Page sections">
                <div className="sticky top-24 flex flex-col gap-1">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    On This Page
                  </p>
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActive(sec.id)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                        active === sec.id
                          ? "bg-primary/8 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {sec.title}
                    </a>
                  ))}
                </div>
              </aside>

              {/* Sections */}
              <article className="flex flex-col gap-10 min-w-0">
                {sections.map((sec, i) => (
                  <motion.div
                    key={sec.id}
                    id={sec.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="scroll-mt-24"
                    onViewportEnter={() => setActive(sec.id)}
                  >
                    <h2 className="mb-4 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                      {sec.title}
                    </h2>
                    <div className="prose prose-sm prose-slate max-w-none text-muted-foreground leading-relaxed [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:text-base [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline-offset-2 [&_a:hover]:underline">
                      {sec.content}
                    </div>
                  </motion.div>
                ))}

                {extra}
              </article>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
