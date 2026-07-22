/**
 * Shared Components — Barrel Export
 * ─────────────────────────────────────────────────────────────────────────────
 * Import all shared components from "@/components/shared".
 */

export { Container } from "./Container";
export { Section } from "./Section";
export { SectionHeading } from "./SectionHeading";
export { ButtonWrapper, buttonVariants } from "./ButtonWrapper";
export { PageHeader } from "./PageHeader";
export type { BreadcrumbItem } from "./PageHeader";

// ── Inner-page layout components ──────────────────────────────────────────────
export { PageHero } from "./PageHero";
export type { BreadcrumbItem as PageHeroBreadcrumb, PageHeroStat } from "./PageHero";
export { AppointmentBanner } from "./AppointmentBanner";
export { FAQPreview } from "./FAQPreview";
export { RelatedLinks } from "./RelatedLinks";
export type { RelatedLink } from "./RelatedLinks";
