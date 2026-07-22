/**
 * About Page Data
 * ─────────────────────────────────────────────────────────────────────────────
 * All content for the About section pages.
 * Backend-ready: replace with API calls when NestJS backend is connected.
 */

import type {
  LeadershipMember,
  Milestone,
  CoreValue,
  AccreditationItem,
} from "@/types";

// ── Hospital Story ────────────────────────────────────────────────────────────

export const hospitalStory = {
  headline: "From a Vision to a World-Class Hospital",
  paragraphs: [
    "Nestiva Hospital was founded in 1998 by Dr. Eleanor Hartfield and a group of visionary physicians who believed that every patient deserves access to the highest standard of care — regardless of background or circumstance. What began as a 60-bed community clinic in New York has grown into a 1,200-bed multi-specialty medical center serving over 150,000 patients annually.",
    "Through two decades of relentless innovation, compassionate care, and community partnership, Nestiva has earned its place among the top-ranked hospitals in North America. We have performed over 85,000 surgeries, delivered more than 22,000 babies, and trained thousands of medical professionals who now serve communities around the world.",
    "Today, Nestiva stands as more than a hospital — it is a living promise that advanced medicine and genuine human touch are not mutually exclusive. Every department, every specialist, and every staff member is united by a single purpose: your health, your dignity, your life.",
  ],
};

// ── Mission & Vision ──────────────────────────────────────────────────────────

export const mission = {
  statement:
    "To deliver exceptional, patient-centred healthcare through compassionate people, pioneering technology, and evidence-based medicine — making world-class care accessible to every individual we serve.",
  shortStatement: "Exceptional care for every patient, every time.",
};

export const vision = {
  statement:
    "To be the most trusted name in healthcare — a hospital where patients feel genuinely cared for, families feel at peace, and the medical community looks for inspiration in clinical excellence and innovation.",
  shortStatement: "The most trusted name in healthcare.",
};

// ── Core Values ───────────────────────────────────────────────────────────────

export const coreValues: CoreValue[] = [
  {
    id: "compassion",
    icon: "HeartHandshake",
    title: "Compassion",
    description:
      "We treat every patient as a member of our own family — with warmth, dignity, and genuine empathy at every step of their journey.",
    color: "primary",
  },
  {
    id: "excellence",
    icon: "Award",
    title: "Clinical Excellence",
    description:
      "We hold ourselves to the highest medical standards, continuously pursuing evidence-based practices, research, and innovation.",
    color: "secondary",
  },
  {
    id: "integrity",
    icon: "ShieldCheck",
    title: "Integrity",
    description:
      "We are transparent, ethical, and accountable — earning and keeping the trust of every patient, family, and partner.",
    color: "accent",
  },
  {
    id: "innovation",
    icon: "Zap",
    title: "Innovation",
    description:
      "We embrace cutting-edge technology and forward-thinking approaches to deliver tomorrow's medicine today.",
    color: "success",
  },
  {
    id: "inclusivity",
    icon: "Users",
    title: "Inclusivity",
    description:
      "We believe quality healthcare is a universal right. Our doors are open to everyone, with care tailored to each unique individual.",
    color: "primary",
  },
  {
    id: "teamwork",
    icon: "Handshake",
    title: "Teamwork",
    description:
      "Our multidisciplinary teams collaborate across specialties, disciplines, and roles — because the best outcomes come from working together.",
    color: "secondary",
  },
];

// ── Milestones / Timeline ─────────────────────────────────────────────────────

export const milestones: Milestone[] = [
  {
    year: "1998",
    title: "Foundation",
    description:
      "Nestiva Hospital opens its doors as a 60-bed community clinic, founded by Dr. Eleanor Hartfield and six specialist physicians committed to accessible, high-quality care.",
    icon: "Building2",
  },
  {
    year: "2003",
    title: "First Major Expansion",
    description:
      "Construction of the North Wing doubles capacity to 180 beds. The Cardiology and Orthopedics departments receive state-of-the-art equipment upgrades.",
    icon: "TrendingUp",
  },
  {
    year: "2008",
    title: "JCI Accreditation",
    description:
      "Nestiva becomes the first hospital in the region to earn Joint Commission International accreditation — a landmark recognition of our commitment to global patient safety standards.",
    icon: "Award",
  },
  {
    year: "2012",
    title: "Center of Excellence — Oncology",
    description:
      "The Nestiva Cancer Center opens, housing a dedicated oncology wing with robotic-assisted surgery, advanced radiation therapy, and a comprehensive multidisciplinary tumor board.",
    icon: "Ribbon",
  },
  {
    year: "2016",
    title: "Digital Health Initiative",
    description:
      "Launch of Nestiva Digital — our patient portal, telemedicine platform, and AI-assisted diagnostic tools, placing us among the top 10 most digitally advanced hospitals in the US.",
    icon: "Monitor",
  },
  {
    year: "2019",
    title: "1,200-Bed Medical Center",
    description:
      "Completion of the main tower expansion brings total capacity to 1,200 beds across 28 specialty departments, with a new trauma centre and helipad.",
    icon: "Hospital",
  },
  {
    year: "2022",
    title: "Research Institute Launch",
    description:
      "The Nestiva Institute for Medical Research is established, partnering with three major universities to advance clinical trials in oncology, cardiology, and neuroscience.",
    icon: "Microscope",
  },
  {
    year: "2025",
    title: "Smart Hospital Transformation",
    description:
      "Full integration of AI-powered diagnostics, robotic surgery systems, predictive health analytics, and a fully paperless patient record system.",
    icon: "Cpu",
  },
];

// ── About Statistics ─────────────────────────────────────────────────────────

export const aboutStats = [
  { value: "27+", label: "Years of Service", icon: "Calendar" },
  { value: "1,200", label: "Hospital Beds", icon: "Building2" },
  { value: "500+", label: "Specialist Doctors", icon: "UserCheck" },
  { value: "28", label: "Departments", icon: "Activity" },
  { value: "150K+", label: "Patients Annually", icon: "Heart" },
  { value: "98%", label: "Patient Satisfaction", icon: "Star" },
];

// ── Leadership Team ───────────────────────────────────────────────────────────

export const leadershipTeam: LeadershipMember[] = [
  {
    id: "ceo",
    name: "Dr. Eleanor Hartfield",
    title: "Founder & Chief Executive Officer",
    designation: "MD, PhD — Internal Medicine",
    department: "Executive Leadership",
    bio: "Dr. Eleanor Hartfield founded Nestiva Hospital in 1998 with a vision of making world-class healthcare accessible to all. A graduate of Johns Hopkins School of Medicine, she holds a PhD in Health Systems Management and has led Nestiva through five major expansions. She serves on the board of the American Hospital Association and the World Health Assembly Advisory Council.",
    image: {
      src: "/assets/images/leadership/dr-eleanor-hartfield.jpg",
      alt: "Dr. Eleanor Hartfield — Founder & CEO",
    },
    qualifications: ["MD — Johns Hopkins School of Medicine", "PhD — Health Systems Management, Harvard"],
    order: 1,
  },
  {
    id: "cmo",
    name: "Dr. Marcus Chen",
    title: "Chief Medical Officer",
    designation: "MD, FACC — Cardiology",
    department: "Medical Affairs",
    bio: "Dr. Marcus Chen leads Nestiva's clinical strategy and quality assurance programs. A board-certified cardiologist with over 22 years of clinical experience, he oversees all medical departments, physician credentialing, and the hospital's Centre of Excellence programs. Dr. Chen is a published researcher with over 60 peer-reviewed articles in cardiovascular medicine.",
    image: {
      src: "/assets/images/leadership/dr-marcus-chen.jpg",
      alt: "Dr. Marcus Chen — Chief Medical Officer",
    },
    qualifications: ["MD — Yale School of Medicine", "Fellowship — Mayo Clinic Cardiology"],
    order: 2,
  },
  {
    id: "coo",
    name: "Sarah Mitchell, MBA",
    title: "Chief Operating Officer",
    designation: "MBA — Healthcare Management",
    department: "Operations",
    bio: "Sarah Mitchell brings 18 years of healthcare operations expertise to Nestiva. Before joining as COO, she led operations for a 500-bed multi-specialty network in California. She spearheaded Nestiva's digital transformation initiative and our award-winning patient experience program, reducing average wait times by 40% over three years.",
    image: {
      src: "/assets/images/leadership/sarah-mitchell.jpg",
      alt: "Sarah Mitchell — Chief Operating Officer",
    },
    qualifications: ["MBA — Wharton School of Business", "BSc — Health Information Management"],
    order: 3,
  },
  {
    id: "cnio",
    name: "Dr. Priya Sharma",
    title: "Chief Nursing & Innovation Officer",
    designation: "PhD, RN — Nursing Leadership",
    department: "Nursing & Patient Care",
    bio: "Dr. Priya Sharma leads a team of 2,400 nursing and allied health professionals. With a PhD in Nursing Innovation from Stanford, she has transformed Nestiva's nursing protocols, introduced evidence-based care bundles, and established the Nestiva Nursing Academy — which has trained over 800 nurses since 2019.",
    image: {
      src: "/assets/images/leadership/dr-priya-sharma.jpg",
      alt: "Dr. Priya Sharma — CNIO",
    },
    qualifications: ["PhD — Nursing Innovation, Stanford", "RN — Critical Care Certification"],
    order: 4,
  },
  {
    id: "cfo",
    name: "James Harrington, CPA",
    title: "Chief Financial Officer",
    designation: "CPA, MBA — Finance",
    department: "Finance",
    bio: "James Harrington oversees all financial operations, strategic planning, and capital allocation at Nestiva. His disciplined financial leadership has maintained consistent operating margins while enabling three major capital expansion projects. He is a Certified Public Accountant and holds an MBA from Columbia Business School.",
    image: {
      src: "/assets/images/leadership/james-harrington.jpg",
      alt: "James Harrington — Chief Financial Officer",
    },
    qualifications: ["CPA — American Institute of CPAs", "MBA — Columbia Business School"],
    order: 5,
  },
  {
    id: "cto",
    name: "Dr. Aisha Osei",
    title: "Chief Technology Officer",
    designation: "PhD — Biomedical Informatics",
    department: "Digital Health & Technology",
    bio: "Dr. Aisha Osei leads Nestiva's technology vision — from AI-powered diagnostics to robotic surgery integration and smart hospital infrastructure. She holds a PhD in Biomedical Informatics from MIT and previously led digital health initiatives at Google Health. She was named one of Forbes' 30 Most Influential Women in Healthcare Technology.",
    image: {
      src: "/assets/images/leadership/dr-aisha-osei.jpg",
      alt: "Dr. Aisha Osei — Chief Technology Officer",
    },
    qualifications: ["PhD — Biomedical Informatics, MIT", "BS — Computer Science, Caltech"],
    order: 6,
  },
];

// ── Accreditations ────────────────────────────────────────────────────────────

export const accreditations: AccreditationItem[] = [
  {
    id: "jci",
    name: "JCI Accredited",
    fullName: "Joint Commission International Accreditation",
    description:
      "The gold standard of global healthcare accreditation. JCI certification confirms Nestiva meets rigorous international standards for patient safety, quality of care, and operational excellence across all 1,200 beds and 28 departments.",
    year: "2008",
    validUntil: "2027",
    category: "International Quality",
    color: "primary",
  },
  {
    id: "iso",
    name: "ISO 9001:2015",
    fullName: "International Organization for Standardization — Quality Management",
    description:
      "ISO 9001:2015 certification recognises Nestiva's consistent quality management systems, continuous improvement culture, and commitment to delivering measurable patient outcomes.",
    year: "2011",
    validUntil: "2026",
    category: "Quality Management",
    color: "secondary",
  },
  {
    id: "nabh",
    name: "NABH Certified",
    fullName: "National Accreditation Board for Hospitals & Healthcare Providers",
    description:
      "NABH certification validates Nestiva's compliance with national standards for hospital infrastructure, clinical protocols, patient rights, and infection control.",
    year: "2014",
    validUntil: "2026",
    category: "National Quality",
    color: "accent",
  },
  {
    id: "magnet",
    name: "Magnet Status",
    fullName: "ANCC Magnet Recognition Program",
    description:
      "Magnet Status is the highest honour a hospital can achieve for nursing excellence. It recognises Nestiva's nursing leadership, professional practice environment, and exceptional patient outcomes.",
    year: "2018",
    validUntil: "2026",
    category: "Nursing Excellence",
    color: "success",
  },
  {
    id: "cap",
    name: "CAP Accredited",
    fullName: "College of American Pathologists Laboratory Accreditation",
    description:
      "Our pathology and laboratory services are CAP accredited — confirming the highest standards of diagnostic accuracy, quality control, and laboratory safety.",
    year: "2010",
    validUntil: "2025",
    category: "Laboratory",
    color: "primary",
  },
  {
    id: "acs",
    name: "ACS Verified",
    fullName: "American College of Surgeons Trauma Center Verification",
    description:
      "Nestiva is an ACS-verified Level I Trauma Center, equipped and staffed to handle the most complex trauma cases 24 hours a day, 365 days a year.",
    year: "2015",
    validUntil: "2027",
    category: "Trauma Care",
    color: "secondary",
  },
];
