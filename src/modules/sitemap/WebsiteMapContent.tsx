"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home, Info, Building2, UserRound, Stethoscope, CalendarCheck,
  BookOpen, Mail, Shield, FileText, Cookie, Eye, Map, Search,
  Phone, Heart, AlertTriangle, BookMarked, Camera, Settings,
  Lock, ServerCrash, Wrench, Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";

interface SitemapLink { label: string; href: string }

interface SitemapSection {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  links: SitemapLink[];
}

const sections: SitemapSection[] = [
  {
    id: "main",
    title: "Main Pages",
    icon: Home,
    color: "text-primary",
    bg: "bg-primary/10",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    id: "about",
    title: "About",
    icon: Info,
    color: "text-secondary",
    bg: "bg-secondary/10",
    links: [
      { label: "Our Story", href: "/about/our-story" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Accreditations", href: "/about/accreditations" },
    ],
  },
  {
    id: "departments",
    title: "Departments",
    icon: Building2,
    color: "text-primary",
    bg: "bg-primary/10",
    links: [
      { label: "All Departments", href: "/departments" },
      { label: "Cardiology", href: "/departments/cardiology" },
      { label: "Neurology", href: "/departments/neurology" },
      { label: "Oncology", href: "/departments/oncology" },
      { label: "Orthopedics", href: "/departments/orthopedics" },
      { label: "Pediatrics", href: "/departments/pediatrics" },
    ],
  },
  {
    id: "doctors",
    title: "Doctors",
    icon: UserRound,
    color: "text-secondary",
    bg: "bg-secondary/10",
    links: [
      { label: "Find a Doctor", href: "/doctors" },
    ],
  },
  {
    id: "services",
    title: "Services",
    icon: Stethoscope,
    color: "text-primary",
    bg: "bg-primary/10",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Emergency Care", href: "/services/emergency-care" },
      { label: "Diagnostics", href: "/services/diagnostics" },
      { label: "Telemedicine", href: "/services/telemedicine" },
      { label: "Surgery", href: "/services/surgery" },
    ],
  },
  {
    id: "appointments",
    title: "Appointments",
    icon: CalendarCheck,
    color: "text-secondary",
    bg: "bg-secondary/10",
    links: [
      { label: "Book Appointment", href: "/appointment" },
      { label: "Appointment Confirmed", href: "/appointment/success" },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    links: [
      { label: "Health Blog", href: "/blog" },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    color: "text-secondary",
    bg: "bg-secondary/10",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Message Sent", href: "/contact/success" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    icon: Shield,
    color: "text-muted-foreground",
    bg: "bg-muted",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    id: "system",
    title: "System Pages",
    icon: Settings,
    color: "text-muted-foreground",
    bg: "bg-muted",
    links: [
      { label: "Website Map", href: "/website-map" },
      { label: "Maintenance", href: "/maintenance" },
      { label: "Coming Soon", href: "/coming-soon" },
      { label: "404 Not Found", href: "/404-demo" },
      { label: "401 Unauthorised", href: "/401" },
      { label: "403 Forbidden", href: "/403" },
      { label: "500 Server Error", href: "/500" },
    ],
  },
  {
    id: "emergency",
    title: "Emergency",
    icon: AlertTriangle,
    color: "text-danger",
    bg: "bg-danger/10",
    links: [
      { label: "Emergency Helpline", href: "tel:01142422000" },
      { label: "Emergency Services", href: "/services/emergency-care" },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function WebsiteMapContent() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Navigation"
          title="Website Map"
          subtitle="A complete overview of all pages and sections on the Nestiva Hospital website."
          breadcrumbs={[{ label: "Website Map" }]}
        />

        <section className="bg-background py-14 md:py-18" aria-labelledby="sitemap-heading">
          <Container>
            <h2 id="sitemap-heading" className="sr-only">All Pages</h2>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    variants={item}
                    whileHover={{ y: -3 }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3 border-b border-border/60 p-4">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${section.bg}`}>
                        <Icon className={`h-4.5 w-4.5 ${section.color}`} aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-sm font-bold text-foreground">{section.title}</h3>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-col gap-1 p-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:bg-muted/60 hover:text-primary"
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-40" aria-hidden="true" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
