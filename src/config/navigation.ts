/**
 * Navigation Configuration — Updated
 * Routes aligned to spec: /about/our-story, /about/mission-vision,
 * /services/emergency-care etc.
 */

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
  external?: boolean;
  children?: Omit<NavItem, "children" | "isCta">[];
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story",         href: "/about/our-story" },
      { label: "Mission & Vision",  href: "/about/mission-vision" },
      { label: "Leadership",        href: "/about/leadership" },
      { label: "Accreditations",    href: "/about/accreditations" },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    children: [
      { label: "All Departments", href: "/departments" },
      { label: "Cardiology",      href: "/departments/cardiology" },
      { label: "Neurology",       href: "/departments/neurology" },
      { label: "Oncology",        href: "/departments/oncology" },
      { label: "Orthopedics",     href: "/departments/orthopedics" },
      { label: "Pediatrics",      href: "/departments/pediatrics" },
    ],
  },
  {
    label: "Doctors",
    href: "/doctors",
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services",   href: "/services" },
      { label: "Emergency Care", href: "/services/emergency-care" },
      { label: "Diagnostics",    href: "/services/diagnostics" },
      { label: "Telemedicine",   href: "/services/telemedicine" },
      { label: "Surgery",        href: "/services/surgery" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Book Appointment",
    href: "/appointment",
    isCta: true,
  },
];

/** Footer navigation columns */
export const footerNavigation = {
  quickLinks: [
    { label: "Home",         href: "/" },
    { label: "About Us",     href: "/about" },
    { label: "Our Doctors",  href: "/doctors" },
    { label: "Departments",  href: "/departments" },
    { label: "Blog",         href: "/blog" },
    { label: "Contact",      href: "/contact" },
  ],
  services: [
    { label: "Emergency Care", href: "/services/emergency-care" },
    { label: "Diagnostics",    href: "/services/diagnostics" },
    { label: "Telemedicine",   href: "/services/telemedicine" },
    { label: "Surgery",        href: "/services/surgery" },
    { label: "Book Appointment", href: "/appointment" },
  ],
  legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/cookies" },
    { label: "Sitemap",          href: "/sitemap.xml" },
  ],
};
