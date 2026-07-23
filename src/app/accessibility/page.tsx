import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { LegalPageLayout } from "@/modules/legal/LegalPageLayout";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import type { LegalSection } from "@/modules/legal/LegalPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility Statement",
  description:
    "Nestiva Hospital is committed to digital accessibility. Learn about our WCAG 2.1 compliance, assistive technology support, and how to report accessibility issues.",
  alternates: { canonical: `${siteUrl}/accessibility` },
  openGraph: {
    title: "Accessibility Statement | Nestiva Hospital",
    description: "Our commitment to making healthcare information accessible to all.",
    url: `${siteUrl}/accessibility`,
  },
});

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "1. Our Commitment",
    content: (
      <>
        <p>
          {branding.name} is committed to ensuring digital accessibility for all people, regardless of disability,
          age, or technical ability. We believe that everyone deserves equal access to healthcare information and
          services online.
        </p>
        <p className="mt-3">
          We are actively working to improve the accessibility of our website in accordance with the{" "}
          <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>, targeting Level AA compliance.
          Our goal is to make our digital presence as inclusive as our physical healthcare services.
        </p>
      </>
    ),
  },
  {
    id: "wcag",
    title: "2. WCAG 2.1 Compliance",
    content: (
      <>
        <p>
          Our website strives to meet the four WCAG 2.1 principles — <strong>Perceivable, Operable,
          Understandable, and Robust</strong>. Key measures we have implemented:
        </p>
        <ul>
          <li>Colour contrast ratios meeting or exceeding 4.5:1 for normal text</li>
          <li>Text alternatives (alt text) for all meaningful images</li>
          <li>Descriptive link text and button labels throughout</li>
          <li>Semantic HTML5 markup with proper heading hierarchy</li>
          <li>ARIA roles, labels, and landmarks for screen reader users</li>
          <li>Focus indicators visible for keyboard navigation</li>
          <li>Form inputs with associated labels and error descriptions</li>
          <li>No content that flashes more than 3 times per second</li>
        </ul>
      </>
    ),
  },
  {
    id: "keyboard",
    title: "3. Keyboard Navigation",
    content: (
      <>
        <p>
          Our website is fully navigable using a keyboard alone. Key shortcuts available:
        </p>
        <ul>
          <li><strong>Tab</strong> — Move forward through interactive elements</li>
          <li><strong>Shift + Tab</strong> — Move backward through interactive elements</li>
          <li><strong>Enter / Space</strong> — Activate buttons and links</li>
          <li><strong>Escape</strong> — Close modals, dropdowns, and overlays</li>
          <li><strong>Arrow Keys</strong> — Navigate within menus and carousels</li>
        </ul>
        <p className="mt-3">
          A visible <strong>Skip to Main Content</strong> link is available at the top of every page,
          allowing keyboard users to bypass navigation and jump directly to the primary content.
        </p>
      </>
    ),
  },
  {
    id: "screen-readers",
    title: "4. Screen Reader Support",
    content: (
      <>
        <p>
          Our website has been tested with the following screen readers and is expected to work well:
        </p>
        <ul>
          <li><strong>NVDA</strong> with Chrome on Windows</li>
          <li><strong>JAWS</strong> with Chrome and Firefox on Windows</li>
          <li><strong>VoiceOver</strong> with Safari on macOS and iOS</li>
          <li><strong>TalkBack</strong> with Chrome on Android</li>
        </ul>
        <p className="mt-3">
          All interactive components, form fields, and dynamic content are announced appropriately.
          Live regions are used to communicate status updates without requiring page refreshes.
        </p>
      </>
    ),
  },
  {
    id: "visual",
    title: "5. Visual Accessibility",
    content: (
      <>
        <h3>High Contrast Mode</h3>
        <p>
          Our website respects the system-level high contrast settings on Windows and macOS.
          Users who have enabled high contrast mode in their operating system will experience
          appropriate colour adjustments on our website.
        </p>
        <h3>Text Resize</h3>
        <p className="mt-3">
          All text on our website can be resized up to 200% using browser zoom without loss
          of content or functionality. We use relative font units (rem) throughout to respect
          user-defined browser font sizes.
        </p>
        <h3>Reduced Motion</h3>
        <p className="mt-3">
          Users who prefer reduced motion can enable the "Reduce Motion" setting in their
          operating system. Our website fully respects the{" "}
          <code>prefers-reduced-motion</code> CSS media query — all animations are disabled
          or minimised for these users.
        </p>
      </>
    ),
  },
  {
    id: "images",
    title: "6. Images & Media",
    content: (
      <>
        <p>
          All informational images include descriptive alt text. Decorative images are marked with an
          empty alt attribute (<code>alt=""</code>) so screen readers skip them. Videos on our website
          include captions where available.
        </p>
        <p className="mt-3">
          Medical illustrations and infographics are accompanied by text descriptions in the surrounding
          content to ensure the information is available to all users.
        </p>
      </>
    ),
  },
  {
    id: "known-issues",
    title: "7. Known Limitations",
    content: (
      <>
        <p>
          While we strive for full accessibility, some third-party content may not be fully accessible:
        </p>
        <ul>
          <li>Embedded Google Maps — we provide a text-based address alternative</li>
          <li>Third-party payment gateways — these are provided by external vendors</li>
          <li>Some older PDF documents — we are progressively updating these</li>
        </ul>
        <p className="mt-3">
          We are continuously working to address these limitations and welcome your feedback.
        </p>
      </>
    ),
  },
  {
    id: "contact-accessibility",
    title: "8. Contact & Feedback",
    content: (
      <>
        <p>
          If you experience any accessibility barriers on our website, or if you require healthcare
          information in an alternative format (large print, audio, Braille), please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><strong>Phone:</strong> <a href={`tel:${contact.phone.replace(/\D/g,"")}`}>{contact.phone}</a></li>
          <li><strong>Address:</strong> {branding.address.full}</li>
        </ul>
        <p className="mt-3">
          We aim to respond to all accessibility enquiries within 5 working days.
          Your feedback directly informs our ongoing accessibility improvements.
        </p>
      </>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      eyebrow="Accessibility"
      title="Accessibility Statement"
      subtitle="Nestiva Hospital's commitment to making digital healthcare information accessible to everyone."
      lastUpdated="1 January 2025"
      breadcrumb="Accessibility"
      sections={sections}
    />
  );
}
