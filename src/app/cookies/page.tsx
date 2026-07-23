import type { Metadata } from "next";
import { buildMetadata, siteUrl } from "@/config/seo";
import { LegalPageLayout } from "@/modules/legal/LegalPageLayout";
import { CookieSettingsPanel } from "@/modules/legal/CookieSettingsPanel";
import type { LegalSection } from "@/modules/legal/LegalPageLayout";
import { branding } from "@/config/branding";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Learn how Nestiva Hospital uses cookies on its website, what data they collect, and how you can manage your cookie preferences.",
  alternates: { canonical: `${siteUrl}/cookies` },
  openGraph: {
    title: "Cookie Policy | Nestiva Hospital",
    description: "Understand how Nestiva Hospital uses cookies and manage your preferences.",
    url: `${siteUrl}/cookies`,
  },
});

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    content: (
      <p>
        Cookies are small text files placed on your device when you visit a website. They are widely used to make
        websites work more efficiently, improve user experience, and provide anonymised reporting to website owners.
        Cookies do not contain personally identifiable information on their own, but combined with other data they
        can help identify you.
      </p>
    ),
  },
  {
    id: "necessary",
    title: "2. Necessary Cookies",
    content: (
      <>
        <p>
          These cookies are essential for the {branding.name} website to function. They cannot be disabled.
          They are usually only set in response to actions you take, such as:
        </p>
        <ul>
          <li>Logging into the Patient Portal</li>
          <li>Filling out online appointment forms</li>
          <li>Maintaining your session security</li>
          <li>Remembering your cookie consent choice</li>
        </ul>
      </>
    ),
  },
  {
    id: "analytics",
    title: "3. Analytics Cookies",
    content: (
      <>
        <p>
          Analytics cookies help us understand how visitors interact with our website. All data is anonymised
          and aggregated. We use these cookies to:
        </p>
        <ul>
          <li>Count the number of visitors and page views</li>
          <li>Identify which pages are most popular</li>
          <li>Understand how users navigate the site</li>
          <li>Detect and fix technical problems</li>
        </ul>
        <p className="mt-3">
          We use Google Analytics 4 for this purpose. Google's privacy policy applies to data collected.
        </p>
      </>
    ),
  },
  {
    id: "performance",
    title: "4. Performance Cookies",
    content: (
      <p>
        Performance cookies allow us to measure website loading speeds, response times, and identify any technical
        bottlenecks. This data helps us deliver a faster, more reliable experience to all visitors. Information
        collected is entirely anonymised and never linked to individual users.
      </p>
    ),
  },
  {
    id: "marketing",
    title: "5. Marketing Cookies",
    content: (
      <>
        <p>
          Marketing cookies track your visits across our website and potentially across other websites. They are
          used to:
        </p>
        <ul>
          <li>Display healthcare advertisements relevant to your interests</li>
          <li>Measure the effectiveness of our marketing campaigns</li>
          <li>Limit the number of times you see the same advertisement</li>
        </ul>
        <p className="mt-3">
          These cookies are set by our advertising partners, including Google Ads and Meta Ads. You can
          opt out of personalised advertising through your browser settings or via industry opt-out tools.
        </p>
      </>
    ),
  },
  {
    id: "preferences",
    title: "6. Preference Cookies",
    content: (
      <p>
        Preference cookies allow the website to remember your choices — such as your preferred language,
        region, text size, or whether you have dismissed certain notices — so you do not have to re-enter
        them each time you visit.
      </p>
    ),
  },
  {
    id: "manage",
    title: "7. Managing Cookies",
    content: (
      <>
        <p>
          You can manage or delete cookies at any time through your browser settings. Note that disabling
          certain cookies may affect website functionality. You can also use the Cookie Settings panel
          below to granularly control your preferences for this website.
        </p>
        <ul>
          <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
          <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
        </ul>
      </>
    ),
  },
  {
    id: "updates",
    title: "8. Updates to This Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology, legislation,
        or our service offerings. We will notify you of significant changes by posting a notice on our
        website or sending you an email. Please check this page periodically for the latest information.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle="How Nestiva Hospital uses cookies to improve your experience and what choices you have."
      lastUpdated="1 January 2025"
      breadcrumb="Cookie Policy"
      sections={sections}
      extra={<CookieSettingsPanel />}
    />
  );
}
