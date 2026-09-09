import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "How Much of My Salary Should Go to Rent?",
  description:
    "The 30% rule explained, how to calculate your rent budget, and what to do when rent exceeds the recommended guideline.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "Salary to Rent Ratio",
    url: "https://calcora.website/blog/salary-to-rent-ratio",
  },
];

const faqs = [
  {
    question: "What percentage of salary should go to rent?",
    answer:
      "The widely accepted guideline is no more than 30% of your gross monthly income. However, this varies based on your location, income level, debts, and financial goals. Some financial experts suggest even lower targets like 25%.",
  },
  {
    question: "Is the 30% rule based on gross or net income?",
    answer:
      "Traditionally the 30% rule is based on gross (pre-tax) income. Some advisors prefer using net (after-tax) income for a more realistic picture of what you can actually afford each month.",
  },
  {
    question: "What if I live in a high-cost city where 30% is unrealistic?",
    answer:
      "In expensive markets like San Francisco or New York, the 30% guideline often does not hold. In these cases, aim to keep housing costs as low as possible and compensate by reducing spending in other categories or increasing your income.",
  },
  {
    question: "Should I include utilities in my rent percentage?",
    answer:
      "Ideally yes. If utilities are not included in your rent, factor them in when calculating your housing cost ratio. A $1,400 rent with $200 in utilities is really a $1,600 housing cost.",
  },
];

export default function SalaryToRentRatioPost() {
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
              Salary to Rent Ratio
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              How Much of My Salary Should Go to Rent?
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-02-01">February 1, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              Rent is likely your single largest monthly expense. Spend too much
              on it and every other part of your budget suffers. Spend too
              little and you may end up in an unsafe or impractical living
              situation. So how do you find the right number?
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The 30% Rule
              </h2>
              <p>
                The most widely cited guideline is the <strong>30% rule</strong>:
                your monthly rent should not exceed 30% of your gross monthly
                income. This guideline has roots in U.S. housing policy dating
                back to the 1980s and remains a useful starting point.
              </p>
              <p className="mt-3">
                For example, if you earn $60,000 per year, your gross monthly
                income is $5,000. According to the 30% rule, your rent should
                be no more than <strong>$1,500 per month</strong>.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Why 30% Is a Guideline Not a Rule
              </h2>
              <p>
                The 30% figure was designed as a ceiling, not a target. Just
                because you <em>can</em> spend 30% on rent does not mean you
                <em> should</em>. Your ideal ratio depends on several factors:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>Other debts.</strong> If you carry student loans, a car
                  payment, or credit card balances, your housing budget should
                  be lower.
                </li>
                <li>
                  <strong>Savings goals.</strong> If you are aggressively saving
                  for a down payment, retirement, or an emergency fund, a lower
                  rent frees up cash.
                </li>
                <li>
                  <strong>Location.</strong> A 30% ratio may be unrealistic in
                  high-cost cities and overly conservative in low-cost areas.
                </li>
                <li>
                  <strong>Household size.</strong> A single person may spend 25%
                  and live comfortably. A family may need to allocate more for
                  space.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How to Calculate Your Rent Budget
              </h2>
              <p>Follow these steps:</p>
              <ol className="mt-3 list-decimal space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Determine your gross monthly income.</strong> Divide
                  your annual salary by 12. For dual-income households, add
                  both salaries.
                </li>
                <li>
                  <strong>Multiply by 0.30 (or your target percentage).</strong>{" "}
                  This gives your maximum rent.
                </li>
                <li>
                  <strong>Subtract fixed debt payments.</strong> If you have
                  significant debt obligations, consider reducing your target to
                  25% or even 20%.
                </li>
                <li>
                  <strong>Factor in utilities.</strong> If utilities are not
                  included in rent, subtract an estimate (typically $100–$300
                  per month) before setting your ceiling.
                </li>
              </ol>
              <p className="mt-4">
                Use our{" "}
                <Link
                  href="/paycheck-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Paycheck Calculator
                </Link>{" "}
                to see your actual take-home pay, which gives a more accurate
                picture than gross income alone.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                What If Rent Exceeds 30%?
              </h2>
              <p>
                If you live in a high-cost area where staying under 30% feels
                impossible, you are not alone. In many major U.S. cities, the
                median renter spends well above 30% of income on housing. Here
                are ways to manage:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Get a roommate.</strong> Splitting rent is the most
                  effective way to bring your ratio down.
                </li>
                <li>
                  <strong>Look slightly outside prime areas.</strong> Moving even
                  15–20 minutes farther from downtown can cut rent significantly.
                </li>
                <li>
                  <strong>Increase your income.</strong> A side gig, raise, or
                  job change can shift the math in your favor.
                </li>
                <li>
                  <strong>Reduce other expenses.</strong> If housing must be
                  higher, compensate by cutting discretionary spending.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Regional Variations
              </h2>
              <p>
                Housing costs vary dramatically by region. Here is a rough
                guideline:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>High-cost metros</strong> (NYC, SF, LA): 35–45% is
                  common; aim to keep it under 40% if possible.
                </li>
                <li>
                  <strong>Mid-cost cities</strong> (Austin, Denver, Atlanta):
                  The 30% rule is realistic and achievable.
                </li>
                <li>
                  <strong>Low-cost areas</strong> (rural Midwest, South): You
                  may be able to stay under 25%, freeing up money for savings.
                </li>
              </ul>
              <p className="mt-4">
                Use our{" "}
                <Link
                  href="/loan-affordability-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Affordability Calculator
                </Link>{" "}
                to see how your rent budget translates into home-buying power if
                you are considering purchasing instead.
              </p>
            </section>

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
                  href="/paycheck-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Paycheck Calculator
                </Link>{" "}
                — See your actual take-home pay after taxes and deductions.
              </li>
              <li>
                <Link
                  href="/loan-affordability-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Affordability Calculator
                </Link>{" "}
                — Calculate how much you can afford to borrow.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
