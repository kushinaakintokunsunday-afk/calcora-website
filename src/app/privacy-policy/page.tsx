import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Calcora handles your data. We respect your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.com" },
          { name: "Privacy Policy", url: "https://calcora.com/privacy-policy" },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: September 2025
        </p>

        <div className="prose prose-gray dark:prose-invert mt-8 max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Welcome to Calcora. Your privacy is important to us. This Privacy Policy explains how we collect, use,
              and protect information when you visit our website and use our calculator tools. By accessing or using
              Calcora, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Information We Collect</h2>
            <div className="mt-3 space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Calculator Inputs (Client-Side Only)</h3>
                <p>
                  All values you enter into our calculators are processed entirely within your web browser.
                  This data is never transmitted to our servers or any third party. Your calculations remain
                  private and exist only on your device for the duration of your session.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Analytics Data</h3>
                <p>
                  We use Google Analytics to understand how visitors interact with our site. This includes
                  information such as browser type, pages visited, time spent on pages, referral sources,
                  and general geographic region. This data is aggregated and does not personally identify you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Cookies</h3>
                <p>
                  We use cookies and similar technologies to maintain site functionality, analyze traffic,
                  and serve advertisements. For full details, see the Cookies and Tracking section below.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. How We Use Information</h2>
            <div className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
              <p>We use the limited information we collect for the following purposes:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Improving the design, accuracy, and performance of our calculators and website.</li>
                <li>Analyzing aggregate usage patterns to prioritize new features and content.</li>
                <li>Serving relevant advertisements through Google AdSense, which may use cookies to personalize ad content.</li>
                <li>Detecting and preventing misuse or abuse of our services.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Cookies and Tracking</h2>
            <div className="mt-3 space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Essential Cookies</h3>
                <p>
                  Some cookies are required for basic site operation, such as maintaining your preferences
                  (e.g., dark mode) between visits. These cannot be disabled without affecting site functionality.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Analytics Cookies</h3>
                <p>
                  Google Analytics uses cookies to collect anonymized usage data. These help us understand which
                  pages are most popular and how users navigate the site. You can opt out by installing the
                  Google Analytics Opt-Out Browser Add-on.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Advertising Cookies</h3>
                <p>
                  Google AdSense uses cookies to serve ads based on your prior visits to our site and other
                  websites. These cookies allow Google and its partners to serve ads based on your browsing
                  history. You can manage ad personalization through{" "}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
                  >
                    Google Ad Settings
                  </a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Third-Party Services</h2>
            <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-300">
              <p>Calcora uses the following third-party services:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Google AdSense</strong> &mdash; Serves advertisements on our site. Google may collect
                  data about your ad views and interactions in accordance with{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
                  >
                    Google&apos;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Google Analytics</strong> &mdash; Provides anonymized traffic and usage data. Governed
                  by Google&apos;s privacy policy linked above.
                </li>
                <li>
                  <strong>Vercel</strong> &mdash; Provides hosting and content delivery for our website. Vercel
                  processes HTTP requests and may log standard access information (IP addresses, user agents)
                  for operational and security purposes.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Data Storage</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              All calculator inputs and results are stored exclusively in your browser. We do not maintain
              any database of user calculations, and no calculator data is ever sent to a server. Once you
              close your browser tab, all data is gone. Our servers store no personal information related to
              calculator usage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Your Rights</h2>
            <div className="mt-3 space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">GDPR Rights (European Union)</h3>
                <p>
                  If you are in the EU, you have the right to access, correct, delete, or restrict processing
                  of your personal data. You may also object to data processing and request data portability.
                  To exercise these rights, contact us using the information below.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">CCPA Rights (California)</h3>
                <p>
                  If you are a California resident, you have the right to know what personal information we
                  collect, the right to request deletion, and the right to opt out of the sale of your personal
                  information. Calcora does not sell personal information.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Opting Out</h3>
                <p>
                  You can opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://adssettings.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
                  >
                    Google Ad Settings
                  </a>{" "}
                  or by disabling cookies in your browser settings.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Children&apos;s Privacy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Calcora does not knowingly collect personal information from children under the age of 13.
              Our services are intended for a general audience and are not directed to children. If you
              believe a child has provided us with personal information, please contact us and we will
              promptly remove it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">9. Changes to This Policy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy from time to time to reflect changes in our practices or
              applicable laws. Any updates will be posted on this page with a revised &quot;Last updated&quot; date.
              We encourage you to review this policy periodically. Continued use of the site after changes
              are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">10. Contact Information</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              If you have questions or concerns about this Privacy Policy, please reach out to us at{" "}
              <a
                href="mailto:privacy@calcora.com"
                className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
              >
                privacy@calcora.com
              </a>.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
