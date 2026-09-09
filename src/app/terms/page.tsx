import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Calcora calculators and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.com" },
          { name: "Terms of Service", url: "https://calcora.com/terms" },
        ]}
      />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last updated: September 2025
        </p>

        <div className="prose prose-gray dark:prose-invert mt-8 max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              By accessing or using Calcora (&quot;the Site&quot;), you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use the Site. We reserve the
              right to update these terms at any time, and your continued use of the Site constitutes
              acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Description of Service</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Calcora provides free, online calculator tools for general informational and educational
              purposes. Our calculators cover areas such as finance, math, health, and unit conversions.
              All calculations are performed in your browser, and no data is stored on our servers.
              The Site is provided free of charge and is supported by advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. User Responsibilities</h2>
            <div className="mt-3 space-y-3 text-gray-600 dark:text-gray-300">
              <p>When using Calcora, you agree to:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Provide accurate inputs to obtain meaningful results.</li>
                <li>Use the calculators only for lawful purposes.</li>
                <li>
                  Not rely solely on calculator results for critical decisions. Our tools provide estimates
                  and informational outputs only. Always consult a qualified professional for financial,
                  medical, legal, or other expert advice.
                </li>
                <li>
                  Not attempt to disrupt, overload, or circumvent the security measures of the Site.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Intellectual Property</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              All content on Calcora, including but not limited to text, graphics, logos, calculator
              formulas, code, and design, is the intellectual property of Calcora or its content suppliers
              and is protected by applicable copyright and trademark laws. You may view and use the site
              for personal, non-commercial purposes. You may not reproduce, distribute, modify, or create
              derivative works from any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Disclaimer of Warranties</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Calcora is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind,
              either express or implied. We do not warrant that the calculators will be error-free,
              uninterrupted, or that results will be accurate or suitable for any particular purpose. While
              we strive for accuracy, mathematical models and formulas may have inherent limitations.
              You use the Site and its results at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Limitation of Liability</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              To the fullest extent permitted by law, Calcora and its owners, operators, and affiliates
              shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of or inability to use the Site. This includes, but is not
              limited to, losses or decisions made based on calculator results, financial losses, or
              any other damages. In no event shall our total liability exceed the amount you paid to use
              the Site, which is zero, since the service is free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Third-Party Links</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Calcora may contain links to third-party websites or services that are not operated or
              controlled by us. We are not responsible for the content, privacy practices, or policies
              of any third-party sites. Inclusion of a link does not imply endorsement. We encourage
              you to review the terms and privacy policies of any third-party site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Modifications to Service</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              We reserve the right to modify, suspend, or discontinue any part of the Site or any
              calculator at any time without prior notice. We may also update formulas, features, or
              the overall design to improve accuracy and user experience. We are not liable for any
              modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">9. Governing Law</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              These Terms of Service are governed by and construed in accordance with applicable laws.
              Any disputes arising from these terms or your use of the Site shall be resolved through
              good-faith negotiation first. If a resolution cannot be reached, disputes shall be subject
              to the exclusive jurisdiction of the courts in the applicable governing jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">10. Contact</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a
                href="mailto:contact@calcora.com"
                className="text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
              >
                contact@calcora.com
              </a>.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
