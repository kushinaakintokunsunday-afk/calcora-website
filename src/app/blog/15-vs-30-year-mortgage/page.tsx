import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "15-Year vs 30-Year Mortgage: The Real Math",
  description:
    "Compare 15-year and 30-year mortgages with real numbers. See monthly payments, total interest, and decide which term fits your budget.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "15-Year vs 30-Year Mortgage",
    url: "https://calcora.website/blog/15-vs-30-year-mortgage",
  },
];

const faqs = [
  {
    question: "What is the difference between a 15-year and 30-year mortgage?",
    answer:
      "The main difference is the loan term. A 15-year mortgage is repaid in 15 years with higher monthly payments but lower total interest. A 30-year mortgage spreads payments over 30 years, resulting in lower monthly payments but significantly more total interest paid.",
  },
  {
    question: "How much more interest do you pay on a 30-year mortgage?",
    answer:
      "It depends on the interest rate and loan amount. On a $300,000 loan at 6.5%, a 15-year term costs about $167,000 in total interest while a 30-year term costs about $383,000 — over $215,000 more.",
  },
  {
    question: "Can I pay off a 30-year mortgage in 15 years?",
    answer:
      "Yes. You can make extra payments toward the principal each month to accelerate payoff. However, you will not get the lower interest rate that comes with an official 15-year loan, and the discipline of extra payments is not guaranteed.",
  },
  {
    question: "Which mortgage is better for first-time buyers?",
    answer:
      "A 30-year mortgage often makes sense for first-time buyers because the lower monthly payment leaves room for other expenses like maintenance, furnishing, and emergency savings. You can always refinance or make extra payments later.",
  },
];

export default function FifteenVsThirtyYearMortgagePost() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbListSchema items={breadcrumbs} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog/" className="hover:text-text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-muted" aria-current="page">
              15-Year vs 30-Year Mortgage
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              15-Year vs 30-Year Mortgage: The Real Math
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-01-22">January 22, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              Choosing between a 15-year and a 30-year mortgage is one of the
              biggest financial decisions homebuyers face. The monthly payment
              difference can be dramatic, but so can the long-term cost. Let
              through the real numbers.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The Key Difference
              </h2>
              <p>
                A 15-year mortgage pays off your home loan in half the time of a
                30-year mortgage. In exchange for higher monthly payments, you
                get a lower interest rate (typically 0.5 to 0.75 percentage
                points less) and pay dramatically less interest over the life
                of the loan.
              </p>
              <p className="mt-3">
                A 30-year mortgage gives you the lowest possible monthly payment
                by spreading the principal over 360 months instead of 180. This
                frees up cash flow each month but results in a much higher total
                cost.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Monthly Payment Comparison
              </h2>
              <p>
                Let&apos;s compare a <strong>$300,000</strong> loan at current
                typical rates:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>15-year at 6.0%</strong> &mdash; approximately{" "}
                  <strong>$2,531/month</strong>
                </li>
                <li>
                  <strong>30-year at 6.5%</strong> &mdash; approximately{" "}
                  <strong>$1,896/month</strong>
                </li>
              </ul>
              <p className="mt-3">
                The 15-year mortgage costs about <strong>$635 more</strong> each
                month. That is a significant difference, and it is the main
                reason many buyers opt for the longer term.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Total Interest Comparison
              </h2>
              <p>
                Here is where the math gets eye-opening. Using the same
                $300,000 loan:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>15-year at 6.0%</strong> &mdash; total interest paid:{" "}
                  <strong>~$155,673</strong>
                </li>
                <li>
                  <strong>30-year at 6.5%</strong> &mdash; total interest paid:{" "}
                  <strong>~$382,633</strong>
                </li>
              </ul>
              <p className="mt-3">
                The 30-year mortgage costs you <strong>~$226,960 more</strong> in
                interest. That is enough to fund a college education, purchase a
                second property, or dramatically boost a retirement portfolio.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                When a 15-Year Makes Sense
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>You have stable, sufficient income.</strong> If your
                  household can comfortably handle the higher payment without
                  stretching your budget, the savings are enormous.
                </li>
                <li>
                  <strong>You want to be debt-free sooner.</strong> Many people
                  value the peace of mind of owning their home outright before
                  retirement.
                </li>
                <li>
                  <strong>You want to build equity faster.</strong> A larger
                  portion of each payment goes to principal from day one.
                </li>
                <li>
                  <strong>You are close to retirement.</strong> Eliminating your
                  mortgage before you stop working reduces your fixed expenses
                  in retirement.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                When a 30-Year Makes Sense
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>You need lower monthly payments.</strong> If the
                  15-year payment pushes your housing costs above a comfortable
                  percentage of income, the 30-year keeps things affordable.
                </li>
                <li>
                  <strong>You are early in your career.</strong> Lower payments
                  now leave room for investing, saving, and career flexibility.
                  You can always make extra payments later.
                </li>
                <li>
                  <strong>You plan to invest the difference.</strong> If you take
                  the monthly savings (~$635) and invest them at a return higher
                  than your mortgage rate, you could come out ahead financially.
                </li>
                <li>
                  <strong>You want an emergency buffer.</strong> Lower fixed
                  costs mean more breathing room if your income drops
                  unexpectedly.
                </li>
              </ul>
            </section>

            <p>
              Use our{" "}
              <Link
                href="/mortgage-calculator/"
                className="font-medium text-[#1E3A5F] hover:underline"
              >
                Mortgage Calculator
              </Link>{" "}
              to compare specific scenarios, or check how much home you can
              afford with the{" "}
              <Link
                href="/loan-affordability-calculator/"
                className="font-medium text-[#1E3A5F] hover:underline"
              >
                Loan Affordability Calculator
              </Link>
              .
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-[#1E3A5F]">
                      {faq.question}
                    </h3>
                    <p className="mt-1 text-text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-12 rounded-xl border border-border bg-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-[#1E3A5F]">
              Related Calculators
            </h2>
            <ul className="space-y-2 text-text-secondary">
              <li>
                <Link
                  href="/mortgage-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Mortgage Calculator
                </Link>{" "}
                — Compare monthly payments and total interest side by side.
              </li>
              <li>
                <Link
                  href="/loan-affordability-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Affordability Calculator
                </Link>{" "}
                — Determine how much home you can comfortably afford.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
