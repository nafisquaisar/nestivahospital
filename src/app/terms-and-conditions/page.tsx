import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { LegalPageLayout } from "@/modules/legal/LegalPageLayout";
import { contact } from "@/config/contact";
import { branding } from "@/config/branding";
import type { LegalSection } from "@/modules/legal/LegalPageLayout";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Read Nestiva Hospital's Terms and Conditions covering appointments, payments, cancellations, medical disclaimers, website usage, and patient responsibilities.",
  alternates: { canonical: `${siteUrl}/terms-and-conditions` },
  openGraph: {
    title: "Terms & Conditions | Nestiva Hospital",
    description: "Nestiva Hospital's terms governing appointments, services, and website use.",
    url: `${siteUrl}/terms-and-conditions`,
  },
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing or using the {branding.name} website, patient portal, or any of our healthcare services,
        you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please
        discontinue use of our services immediately. These terms apply to all visitors, patients, and users
        of our digital and physical healthcare services.
      </p>
    ),
  },
  {
    id: "appointments",
    title: "2. Appointments",
    content: (
      <>
        <p>
          Appointments at {branding.name} may be booked online, by telephone, or in person at our reception.
          When booking an appointment, you agree to:
        </p>
        <ul>
          <li>Provide accurate personal and medical information</li>
          <li>Attend at the scheduled time or provide prior notice of cancellation</li>
          <li>Present valid identification and insurance documents at the time of visit</li>
          <li>Disclose any pre-existing conditions or medications to your physician</li>
        </ul>
        <p className="mt-3">
          {branding.name} reserves the right to reschedule appointments in cases of physician unavailability
          or emergency situations. You will be notified promptly in such cases.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "3. Payments & Billing",
    content: (
      <>
        <p>
          Payment for all services rendered at {branding.name} is due at the time of service or upon
          receipt of invoice. We accept:
        </p>
        <ul>
          <li>Cash and debit/credit cards (Visa, Mastercard, RuPay)</li>
          <li>UPI payments (GPay, PhonePe, Paytm)</li>
          <li>Net banking</li>
          <li>Cashless insurance claims (empanelled insurers only)</li>
        </ul>
        <p className="mt-3">
          For insurance patients, the outstanding balance after insurer settlement is payable by the patient.
          Disputed bills must be raised within 30 days of discharge.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "4. Cancellation & Refund Policy",
    content: (
      <>
        <h3>Cancellation</h3>
        <ul>
          <li>Appointments cancelled <strong>24 hours or more</strong> before the scheduled time — full refund</li>
          <li>Cancellations <strong>within 24 hours</strong> — consultation fee may be forfeited</li>
          <li>No-shows without notice — consultation fee is non-refundable</li>
        </ul>
        <h3>Refunds</h3>
        <ul>
          <li>Approved refunds are processed within 7–10 business days</li>
          <li>Refunds for online payments are credited to the original payment source</li>
          <li>Advance deposits for procedures are refundable up to 48 hours before the scheduled procedure</li>
        </ul>
        <p className="mt-3">
          To cancel or reschedule, contact us at <a href={`tel:${contact.phone.replace(/\D/g,"")}`}>{contact.phone}</a> or{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "medical-disclaimer",
    title: "5. Medical Disclaimer",
    content: (
      <>
        <p>
          The content on the {branding.name} website, including articles, blog posts, symptom guides, and
          health information, is for <strong>general informational purposes only</strong> and does not constitute
          medical advice. It should not be used as a substitute for professional medical diagnosis or treatment.
        </p>
        <p className="mt-3">
          Always seek the advice of your physician or other qualified health provider with any questions you
          may have regarding a medical condition. Never disregard professional medical advice or delay in seeking
          it because of something you have read on this website.
        </p>
        <p className="mt-3">
          In case of a medical emergency, call <strong>{contact.emergencyPhone}</strong> or your local emergency number immediately.
        </p>
      </>
    ),
  },
  {
    id: "website-usage",
    title: "6. Website Usage",
    content: (
      <>
        <p>By using the {branding.name} website, you agree not to:</p>
        <ul>
          <li>Use the site for any unlawful purpose</li>
          <li>Transmit spam, viruses, or malicious code</li>
          <li>Attempt to gain unauthorised access to any part of our systems</li>
          <li>Scrape, copy, or republish content without permission</li>
          <li>Impersonate any person or entity</li>
          <li>Collect personal information about other users without consent</li>
        </ul>
        <p className="mt-3">
          We reserve the right to suspend or terminate access to users who violate these terms.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content: (
      <>
        <p>
          {branding.name} shall not be liable for any indirect, incidental, special, consequential, or punitive
          damages arising from your use of, or inability to use, our website or services.
        </p>
        <p className="mt-3">
          Our total liability for any claim related to our services shall not exceed the amount you paid for
          the specific service giving rise to the claim, in the preceding 12 months.
        </p>
      </>
    ),
  },
  {
    id: "emergency-services",
    title: "8. Emergency Services",
    content: (
      <>
        <p>
          {branding.name} maintains a fully operational Emergency Department (ED) available 24 hours a day,
          7 days a week, 365 days a year. Emergency services are provided regardless of the patient&apos;s
          ability to pay or insurance status.
        </p>
        <p className="mt-3">
          Our emergency helpline is <strong>{contact.emergencyPhone}</strong>. In life-threatening situations,
          please call emergency services (112) and proceed to the nearest emergency department.
        </p>
      </>
    ),
  },
  {
    id: "patient-responsibilities",
    title: "9. Patient Responsibilities",
    content: (
      <>
        <p>As a patient, you are responsible for:</p>
        <ul>
          <li>Providing accurate, complete, and up-to-date medical and personal information</li>
          <li>Following the treatment plan and instructions provided by your healthcare team</li>
          <li>Treating hospital staff, other patients, and visitors with respect</li>
          <li>Respecting hospital policies regarding noise, smoking, and visitation</li>
          <li>Settling all financial obligations in a timely manner</li>
          <li>Informing us of any changes to your insurance coverage or contact information</li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Disputes",
    content: (
      <p>
        These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms
        or your use of our services shall be subject to the exclusive jurisdiction of the courts in New Delhi.
        Before initiating legal proceedings, parties agree to attempt resolution through good-faith mediation.
      </p>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: (
      <p>
        {branding.name} reserves the right to update these Terms and Conditions at any time. Significant
        changes will be communicated via email or a prominent notice on our website. Continued use of our
        services after changes constitutes acceptance of the revised terms. Please review this page periodically.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      subtitle="The terms that govern your use of Nestiva Hospital's website and healthcare services."
      lastUpdated="1 January 2025"
      breadcrumb="Terms & Conditions"
      sections={sections}
    />
  );
}
