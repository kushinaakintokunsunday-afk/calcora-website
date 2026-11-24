import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbListSchema, PersonSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "How Calcora Calculates - Our Methodology",
  description:
    "Learn how Calcora builds and tests its calculators, where our data comes from, and how we correct mistakes.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Methodology", url: "https://calcora.website/methodology" },
];

export default function MethodologyPage() {
  return (
    <>
      <BreadcrumbListSchema items={breadcrumbs} />
      <PersonSchema />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="transition-colors hover:text-text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-muted" aria-current="page">
              Methodology
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
            How Calcora Calculates
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Every calculator shows its working, its assumptions and its sources.
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Written and reviewed by{" "}
            <strong className="text-text-primary">Akintokun Sunday Kushina</strong>,
            former Customer Relationship Manager at NSIA Bank Benin (2012–2026) ·
            Last full review <time dateTime="2026-11-24">24 November 2026</time>
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              How we build our calculators
            </h2>
            <p className="leading-relaxed text-text-secondary">
              We use published formulas from IRS publications, FDIC guidance, CFPB
              guidance and standard amortization formulas. Each formula is shown on
              the calculator page so you can check it yourself. Calculations run in
              your browser — the numbers you enter never leave your device.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              How we test them
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Every calculator is checked against a worked example with a known
              answer. For example, a $250,000, 30-year mortgage at 6.5% returns
              $1,580.17 per month and $318,861 in total interest. We re-run this test
              whenever the code changes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Where our data comes from
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Rates, tax brackets and limits come from the official sources named on
              each page. Each page shows when the data was last checked. We never
              invent numbers, and results are estimates rather than financial advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              How we fix mistakes
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Corrections are published on the affected page with an updated
              &quot;Last reviewed&quot; date. Report an error to{" "}
              <a
                className="underline"
                href="mailto:kushinaakintokunsunday@gmail.com"
              >
                kushinaakintokunsunday@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Independence
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Calcora is independently owned. The views and calculations on this
              site are my own and do not represent NSIA Bank Benin. Any commercial
              relationships are clearly disclosed on the page where they appear and
              never affect a calculation result.
            </p>
          </section>
        </div>

        <p className="mt-12 border-t border-border pt-6 text-sm text-text-muted">
          <strong className="text-text-primary">Author:</strong> Akintokun Sunday Kushina<br />
          <strong className="text-text-primary">Last full review:</strong> 24 November 2026
        </p>
      </main>
    </>
  );
}
