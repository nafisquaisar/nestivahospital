/**
 * Type Definitions — Hospital ERP Platform
 * ─────────────────────────────────────────────────────────────────────────────
 * All domain interfaces live here. No implementation — interfaces only.
 * Import from "@/types" throughout the codebase.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Statistic
// ─────────────────────────────────────────────────────────────────────────────

export interface Statistic {
  id: string;
  value: number;
  /** Appended after the number, e.g. "+", "K+", "%" */
  suffix: string;
  label: string;
  description: string;
  /** Lucide icon name, e.g. "Award", "UserCheck" */
  icon: string;
  /** One of: primary | secondary | accent | success */
  color?: "primary" | "secondary" | "accent" | "success";
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared / Primitives
// ─────────────────────────────────────────────────────────────────────────────

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hospital
// ─────────────────────────────────────────────────────────────────────────────

export interface Hospital {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: {
    full: string;
    icon: string;
    dark?: string;
  };
  email: string;
  phone: string;
  emergencyPhone: string;
  address: Address;
  social: SocialLinks;
  accreditations: string[];
  foundedYear: number;
  totalBeds: number;
  totalDoctors: number;
  totalDepartments: number;
  yearsOfExperience: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Doctor
// ─────────────────────────────────────────────────────────────────────────────

export type DoctorAvailability = "available" | "on-leave" | "busy";

export interface DoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  prefix: string;        // e.g. "Dr."
  designation: string;   // e.g. "Senior Cardiologist"
  specialization: string;
  departmentId: string;
  bio: string;
  shortBio: string;
  image: ImageAsset;
  qualifications: string[];
  experience: number;    // years
  languages: string[];
  schedule: DoctorSchedule[];
  availability: DoctorAvailability;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  email?: string;
  phone?: string;
  social?: SocialLinks;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  seo?: SEOMeta;
}

// ─────────────────────────────────────────────────────────────────────────────
// Department
// ─────────────────────────────────────────────────────────────────────────────

export interface Department {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  shortDescription: string;
  icon: string;          // Lucide icon name
  image: ImageAsset;
  color?: string;        // HSL color string
  services: string[];
  conditions: string[];
  headDoctorId?: string;
  totalDoctors: number;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  seo?: SEOMeta;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog
// ─────────────────────────────────────────────────────────────────────────────

export type BlogStatus = "draft" | "published" | "archived";

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  color?: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  designation: string;
  avatar: ImageAsset;
  bio?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;       // MDX / rich text
  coverImage: ImageAsset;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  status: BlogStatus;
  featured: boolean;
  readingTime: number;   // minutes
  views: number;
  publishedAt: string;
  updatedAt: string;
  seo?: SEOMeta;
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryCategory =
  | "facility"
  | "equipment"
  | "team"
  | "events"
  | "patients"
  | "other";

export interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image: ImageAsset;
  category: GalleryCategory;
  featured: boolean;
  order: number;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial
// ─────────────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  patientName: string;
  patientAge?: number;
  patientLocation?: string;
  avatar?: ImageAsset;
  rating: number;        // 1–5
  review: string;
  shortReview?: string;
  treatmentType: string;
  doctorName?: string;
  departmentName?: string;
  date: string;
  verified: boolean;
  featured: boolean;
  order: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Appointment
// ─────────────────────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no-show";

export type AppointmentType = "in-person" | "telemedicine" | "home-visit";

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: number;
  patientGender: "male" | "female" | "other" | "prefer-not-to-say";
  doctorId: string;
  departmentId: string;
  appointmentType: AppointmentType;
  scheduledDate: string;
  scheduledTime: string;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  consultationFee: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature  (Why Choose Us)
// ─────────────────────────────────────────────────────────────────────────────

export interface Feature {
  id: string;
  /** Lucide icon name */
  icon: string;
  title: string;
  description: string;
  /** Highlight stat shown below description, e.g. "500+ Specialists" */
  stat?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "danger";
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Service
// ───────────────────────────────────────────────────────────────────────────────

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceStat {
  value: string;
  label: string;
  description?: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: ImageAsset;
  features: ServiceFeature[];
  processSteps: ProcessStep[];
  stats: ServiceStat[];
  faqs: FAQ[];
  conditions?: string[];
  relatedServiceIds?: string[];
  featured: boolean;
  order: number;
  seo?: SEOMeta;
}

// ───────────────────────────────────────────────────────────────────────────────
// About  (Leadership, Milestones, Values, Accreditations)
// ───────────────────────────────────────────────────────────────────────────────

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  designation: string;
  department?: string;
  bio: string;
  image: ImageAsset;
  qualifications?: string[];
  email?: string;
  social?: SocialLinks;
  order: number;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface CoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  color?: "primary" | "secondary" | "accent" | "success";
}

export interface AccreditationItem {
  id: string;
  name: string;
  fullName: string;
  description: string;
  logo?: ImageAsset;
  year: string;
  validUntil?: string;
  category: string;
  color?: string;
}

// Navigation utility
export interface BreadcrumbItem {
  label: string;
  href?: string;
}
