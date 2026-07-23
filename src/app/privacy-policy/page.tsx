import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { LegalPageLayout } from "@/modules/legal/LegalPageLayout";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import type { LegalSection } from "@/modules/legal/LegalPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Nestiva Hospital's Privacy Policy — how we collect, use, protect, and share your personal and medical information in compliance with Indian healthcare regulations.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: {
    title: "Privacy Policy | Nestiva Hospital",
    description: "Learn how Nestiva Hospital protects your personal and medical data.",
    url: `${siteUrl}/privacy-policy`,
  },
});

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          {branding.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy and
          the confidentiality of your personal and medical information. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our website or use our healthcare services.
        </p>
        <p className="mt-3">
          By accessing our services, you agree to the collection and use of information in accordance with this policy.
          If you do not agree, please do not use our services.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    content: (
      <>
        <h3>Personal Information</h3>
        <ul>
          <li>Full name, date of birth, gender, and contact details</li>
          <li>Aadhaar number or government-issued ID (for patient registration)</li>
          <li>Insurance policy numbers and billing information</li>
          <li>Emergency contact details</li>
        </ul>
        <h3>Medical Information</h3>
        <ul>
          <li>Medical history, diagnoses, medications, and treatment plans</li>
          <li>Lab results, imaging reports, and clinical notes</li>
          <li>Appointment records and visit summaries</li>
          <li>Vaccination and immunisation records</li>
        </ul>
        <h3>Technical Information</h3>
        <ul>
          <li>IP address, browser type, and device identifiers</li>
          <li>Pages visited, time spent, and clickstream data</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information collected for the following purposes:</p>
        <ul>
          <li><strong>Providing Healthcare Services</strong> — to schedule appointments, deliver treatment, and manage your care</li>
          <li><strong>Patient Communication</strong> — appointment reminders, test results, and health advisories</li>
          <li><strong>Billing & Insurance</strong> — to process payments and liaise with your insurer</li>
          <li><strong>Legal Compliance</strong> — to fulfil obligations under Indian medical laws and regulations</li>
          <li><strong>Quality Improvement</strong> — to improve our clinical standards, services, and website</li>
          <li><strong>Research</strong> — anonymised data may be used for medical research with your consent</li>
        </ul>
      </>
    ),
  },
  {
    id: "medical-records",
    title: "4. Medical Records & Confidentiality",
    content: (
      <>
        <p>
          Your medical records are maintained with the highest level of confidentiality. Access is strictly
          limited to your treating physicians, nursing staff, and authorised administrative personnel.
        </p>
        <p className="mt-3">
          We will never share your identifiable medical information with third parties without your explicit
          written consent, except as required by law — for example, for public health reporting, court orders,
          or emergency situations where disclosure is necessary to prevent harm.
        </p>
        <p className="mt-3">
          Medical records are retained for a minimum of 7 years in accordance with the Indian Medical Council
          guidelines, or longer if clinically warranted.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing & Third Parties",
    content: (
      <>
        <p>We may share your information with:</p>
        <ul>
          <li><strong>Referral Specialists</strong> — doctors and hospitals to whom we refer you for treatment</li>
          <li><strong>Diagnostic Labs</strong> — for processing test orders and returning results</li>
          <li><strong>Insurance Providers</strong> — for cashless treatment and reimbursement</li>
          <li><strong>IT & Software Vendors</strong> — operating our HMS, EHR, and website under data processing agreements</li>
          <li><strong>Regulatory Authorities</strong> — as required by law</li>
        </ul>
        <p className="mt-3">
          All third-party vendors are contractually obligated to maintain data confidentiality and security standards
          equivalent to our own.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: (
      <>
        <p>
          Our website uses cookies to enhance your browsing experience, analyse site traffic, and personalise content.
          You can control cookie preferences through your browser settings or our{" "}
          <a href="/cookies">Cookie Policy</a> page.
        </p>
        <ul>
          <li><strong>Essential cookies</strong> — required for site functionality</li>
          <li><strong>Analytics cookies</strong> — help us understand how visitors use our site</li>
          <li><strong>Marketing cookies</strong> — used to serve relevant advertisements</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "7. Data Security",
    content: (
      <>
        <p>
          We implement robust technical and organisational security measures to protect your data against
          unauthorised access, alteration, disclosure, or destruction:
        </p>
        <ul>
          <li>SSL/TLS encryption for all data in transit</li>
          <li>AES-256 encryption for medical data at rest</li>
          <li>Role-based access controls and multi-factor authentication</li>
          <li>Regular security audits and penetration testing</li>
          <li>24/7 network monitoring and intrusion detection</li>
          <li>Staff training on data privacy and security protocols</li>
        </ul>
      </>
    ),
  },
  {
    id: "patient-rights",
    title: "8. Your Rights",
    content: (
      <>
        <p>As a patient, you have the following rights regarding your personal information:</p>
        <ul>
          <li><strong>Right of Access</strong> — request a copy of your personal and medical records</li>
          <li><strong>Right to Rectification</strong> — correct inaccurate or incomplete information</li>
          <li><strong>Right to Erasure</strong> — request deletion where legally permissible</li>
          <li><strong>Right to Portability</strong> — receive your data in a portable format</li>
          <li><strong>Right to Object</strong> — object to processing for marketing or research</li>
          <li><strong>Right to Withdraw Consent</strong> — at any time, without affecting prior lawful processing</li>
        </ul>
        <p className="mt-3">
          To exercise these rights, contact our Data Protection Officer at{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: (
      <p>
        We provide healthcare services to patients of all ages, including minors. Personal information about
        patients under 18 years of age is processed only with the explicit consent of a parent or legal guardian.
        Parental consent is obtained and documented during the registration process.
      </p>
    ),
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: (
      <>
        <p>For privacy-related enquiries, data requests, or complaints:</p>
        <ul>
          <li><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          <li><strong>Phone:</strong> <a href={`tel:${contact.phone.replace(/\D/g,"")}`}>{contact.phone}</a></li>
          <li><strong>Address:</strong> {branding.address.full}</li>
        </ul>
        <p className="mt-3">
          We aim to respond to all privacy requests within 30 days. If you are dissatisfied with our response,
          you may lodge a complaint with the relevant data protection authority.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="How Nestiva Hospital collects, uses, and protects your personal and medical information."
      lastUpdated="1 January 2025"
      breadcrumb="Privacy Policy"
      sections={sections}
    />
  );
}
