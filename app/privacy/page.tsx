import type { Metadata } from "next";
import { pageMeta, SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How BlockMosaic handles your data: images are processed in your browser and never uploaded. Details on analytics, cookies, and advertising.",
  path: "/privacy/",
});

const UPDATED = "June 27, 2026";

export default function PrivacyPage() {
  return (
    <main className="container-page py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy/" }]} />

      <article className="prose-content max-w-3xl mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight !mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--color-muted)]">Last updated: {UPDATED}</p>

        <p>
          This Privacy Policy explains how {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          information when you use this website and its tools. By using the site, you agree to this policy.
        </p>

        <h2>Your images stay on your device</h2>
        <p>
          All image conversion happens locally in your browser. The pictures you upload are{" "}
          <strong>never sent to our servers</strong> — they are read, processed and previewed entirely on
          your own device, and discarded when you close or refresh the page. We have no access to them and
          do not store them anywhere.
        </p>

        <h2>Information we collect</h2>
        <p>We do not ask you to create an account and we do not collect personal information directly. We do use the following third-party services:</p>
        <ul>
          <li>
            <strong>Analytics.</strong> We may use Google Analytics 4 to understand aggregate, anonymous
            usage (pages viewed, approximate region, device type). This helps us improve the tools. Analytics
            data is aggregated and not used to identify you.
          </li>
          <li>
            <strong>Advertising.</strong> We may display ads through Google AdSense. Google and its partners
            may use cookies or device identifiers to serve and measure ads.
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Cookies are small files stored by your browser. We and our service providers (Google Analytics,
          Google AdSense) may use cookies for analytics and advertising. You can disable cookies in your
          browser settings; the tools on this site will continue to work without them.
        </p>

        <h2>Google AdSense &amp; the DoubleClick cookie</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this
          and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve
          ads to you based on your visits. You can opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          For more on how Google uses data, see{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            Google&apos;s policy
          </a>.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          This site is general-audience and not directed at children under 13. We do not knowingly collect
          personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with a new
          &ldquo;last updated&rdquo; date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach us via the details on our{" "}
          <a href="/about/">About page</a>.
        </p>
      </article>
    </main>
  );
}
