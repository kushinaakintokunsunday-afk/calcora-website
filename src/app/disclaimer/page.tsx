import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/Schema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimers about using Calcora calculators and tools.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Disclaimer", url: "https://calcora.website/disclaimer" },
];

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbListSchema items={breadcrumbs} />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-muted" aria-current="page">
              Disclaimer
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
            Disclaimer
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Please read this disclaimer carefully before using any Calcora
            calculator or tool.
          </p>
        </header>

        <div className="space-y-10 text-text-secondary">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              General Disclaimer
            </h2>
            <p className="leading-relaxed">
              The calculators and tools provided on Calcora are designed to offer
              general estimates and educational information. While we make every
              effort to ensure the accuracy and reliability of our tools, the
              results they produce are approximations based on the data you
              supply and the assumptions built into each formula. Actual outcomes
              may differ due to variables that a standard calculator cannot
              fully account for.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Financial Advice Disclaimer
            </h2>
            <p className="leading-relaxed">
              Calcora does not provide financial advice. Nothing on this website
              should be interpreted as a recommendation, endorsement, or
              solicitation to buy, sell, or hold any financial product, security,
              or investment. Our calculators are intended as educational tools to
              help you understand financial concepts and perform basic
              computations. For personalised financial guidance, you should
              consult a qualified financial advisor, certified financial planner,
              or other licensed professional who can take your full financial
              situation into account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Medical &amp; Health Disclaimer
            </h2>
            <p className="leading-relaxed">
              Certain Calcora tools, such as BMI calculators and calorie
              estimators, provide general health-related figures for informational
              purposes only. These results are not a substitute for professional
              medical advice, diagnosis, or treatment. Always seek the guidance
              of a qualified healthcare provider with any questions you may have
              regarding a medical condition or health goal. Never disregard
              professional medical advice or delay seeking it because of
              information you read or calculated on this site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Accuracy &amp; Limitations
            </h2>
            <p className="leading-relaxed">
              We strive to maintain the highest level of accuracy across all of
              our calculators. Our formulas are derived from widely accepted
              financial, mathematical, and scientific sources and are
              independently verified. However, we cannot and do not guarantee
              that the results are free from error, nor that they are suitable
              for any particular purpose. Factors such as rounding, regional
              tax variations, and individual circumstances may influence actual
              results. You are responsible for verifying any calculation before
              relying on it for decisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              External Links Disclaimer
            </h2>
            <p className="leading-relaxed">
              Calcora may contain links to third-party websites for your
              convenience. These external sites are not maintained or controlled
              by us, and we assume no responsibility for their content, privacy
              practices, or accuracy. Inclusion of any link does not imply
              endorsement or recommendation. When you leave Calcora through an
              external link, we encourage you to review the terms and privacy
              policy of the destination site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by applicable law, Calcora and its
              operators shall not be held liable for any direct, indirect,
              incidental, consequential, or special damages arising out of or in
              connection with the use of our tools, including but not limited to
              loss of data, financial losses, or any other damages resulting from
              reliance on the information provided by our calculators.
            </p>
          </section>
        </div>

        <footer className="mt-16 border-t border-gray-200 pt-6">
          <p className="text-sm text-text-muted">
            <strong>Last updated:</strong> September 1, 2026
          </p>
          <p className="mt-2 text-sm text-text-muted">
            If you have any questions about this disclaimer, please{" "}
            <Link href="/contact/" className="underline transition-colors hover:text-[#1E3A5F]">
              contact us
            </Link>
            .
          </p>
        </footer>
      </main>
    </>
  );
}
