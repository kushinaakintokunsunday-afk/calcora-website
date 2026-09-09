import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/Schema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Calcora - our mission to provide free, accurate online calculators.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "About", url: "https://calcora.website/about" },
];

export default function AboutPage() {
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
              About
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
            About Calcora
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Empowering you to make informed financial decisions — one calculation
            at a time.
          </p>
        </header>

        <section className="space-y-10">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Our Mission
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Financial literacy shouldn&apos;t be locked behind expensive software or
              paywalled tools. Calcora exists to put powerful, accurate
              calculators in the hands of everyone — whether you&apos;re planning a
              mortgage, evaluating an investment, or simply trying to understand
              your monthly budget. We believe that when people have access to
              reliable numbers, they make better decisions about their money and
              their future.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              How It Works
            </h2>
            <p className="mb-4 leading-relaxed text-text-secondary">
              Every calculation you run on Calcora happens directly in your
              browser. Your inputs never leave your device, and we never store
              the numbers you enter. This privacy-first approach means you can
              use our tools with complete confidence — even when working with
              sensitive financial figures.
            </p>
            <p className="leading-relaxed text-text-secondary">
              Our calculators are built using well-established financial and
              mathematical formulas, implemented in modern JavaScript so they run
              instantly without waiting for a server response.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Why Trust Us
            </h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1E3A5F]" />
                <span>
                  <strong className="text-text-primary">Verified formulas</strong>{" "}
                  — Every calculator is built on industry-standard formulas
                  sourced from reputable financial and scientific references.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1E3A5F]" />
                <span>
                  <strong className="text-text-primary">
                    Transparent calculations
                  </strong>{" "}
                  — We show you exactly how results are derived, including
                  intermediate values and the formulas applied at each step.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1E3A5F]" />
                <span>
                  <strong className="text-text-primary">Worked examples</strong>{" "}
                  — Each tool includes real-world examples so you can verify
                  results and understand the calculation process before using your
                  own data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#1E3A5F]" />
                <span>
                  <strong className="text-text-primary">
                    Completely free
                  </strong>{" "}
                  — No sign-ups, no hidden fees, no data collection. Calcora
                  stays free because we believe useful tools should be accessible
                  to everyone.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
              Our Team
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Calcora is built by a small team of finance and technology
              enthusiasts who share a common goal: making complex calculations
              simple and accessible. We combine backgrounds in financial planning,
              software engineering, and data analysis to create tools that are
              both accurate and easy to use. We&apos;re passionate about the
              intersection of technology and personal finance, and we&apos;re
              constantly working to add new calculators and improve existing ones
              based on user feedback.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
            Get In Touch
          </h2>
          <p className="mb-6 text-text-secondary">
            Have a question, suggestion, or want to collaborate? We&apos;d love
            to hear from you.
          </p>
          <Link
            href="/contact/"
            className="inline-block rounded-lg bg-[#1E3A5F] px-6 py-3 font-medium text-white transition-colors hover:bg-[#162d4a]"
          >
            Contact Us
          </Link>
        </section>
      </main>
    </>
  );
}
