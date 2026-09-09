import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "What Is a Good Debt-to-Income Ratio?",
  description:
    "Learn how lenders use DTI, what ranges mean for your loan approval, and practical steps to lower your debt-to-income ratio.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "What Is a Good Debt-to-Income Ratio",
    url: "https://calcora.website/blog/debt-to-income-ratio",
  },
];

const faqs = [
  {
    question: "What is a good debt-to-income ratio?",
    answer:
      "A DTI of 36% or lower is generally considered good. Most lenders prefer a front-end DTI (housing only) under 28% and a back-end DTI (all debts) under 36%. For conventional mortgages, the maximum is typically 45–50%.",
  },
  {
    question: "Does DTI include utilities or insurance?",
    answer:
      "DTI calculations typically include recurring debt payments such as rent or mortgage, car loans, student loans, credit card minimums, and personal loans. Utilities and insurance premiums are generally not included unless they appear as separate loan obligations.",
  },
  {
    question: "How can I lower my DTI quickly?",
    answer:
      "The two fastest ways are paying off debts (especially smaller ones) and increasing your income. Consolidating debts into a single lower-payment loan can also reduce your DTI temporarily. Avoid taking on new debt while trying to improve your ratio.",
  },
  {
    question: "Is DTI the same as credit utilization?",
    answer:
      "No. DTI measures your debt payments relative to your income. Credit utilization measures how much of your available credit you are using. Both affect your ability to borrow, but they measure different things.",
  },
];

export default function DebtToIncomeRatioPost() {
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
              Debt-to-Income Ratio
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              What Is a Good Debt-to-Income Ratio?
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-02-18">February 18, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              Your debt-to-income ratio (DTI) is one of the first numbers a
              lender looks at when you apply for a mortgage, car loan, or line
              of credit. It tells them how much of your income is already
              committed to existing debt payments — and whether you can handle
              more.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                What Is DTI
              </h2>
              <p>
                Debt-to-income ratio is the percentage of your gross monthly
                income that goes toward paying your monthly debt obligations. It
                includes mortgage or rent payments, car loans, student loans,
                credit card minimum payments, and any other recurring debt
                payments.
              </p>
              <p className="mt-3">
                There are two types of DTI that lenders look at:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>Front-end DTI</strong> — housing costs only (mortgage,
                  property tax, insurance, HOA fees) divided by gross monthly
                  income.
                </li>
                <li>
                  <strong>Back-end DTI</strong> — all monthly debt payments
                  divided by gross monthly income.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How to Calculate Your DTI
              </h2>
              <p>The formula is straightforward:</p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                DTI = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100
              </div>
              <p>
                For example, if you earn $5,000/month gross and your total debt
                payments (mortgage, car, student loans, credit cards) equal
                $1,500/month, your DTI is:
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                ($1,500 ÷ $5,000) × 100 = 30%
              </div>
              <p>
                A 30% DTI is solid — it means you have 70% of your income
                available for non-debt expenses, savings, and investing.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                DTI Ranges Explained
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Under 20%.</strong> Excellent. You have very low
                  relative debt and maximum financial flexibility.
                </li>
                <li>
                  <strong>20–35%.</strong> Good to manageable. Most lenders view
                  this range favorably. You have room in your budget.
                </li>
                <li>
                  <strong>36–43%.</strong> Fair but tight. Some lenders will
                  approve loans, but options narrow. This is the upper limit for
                  qualified mortgages.
                </li>
                <li>
                  <strong>44–49%.</strong> Concerning. You may struggle to get
                  approved for new credit. Consider prioritizing debt reduction.
                </li>
                <li>
                  <strong>50%+.</strong> Too high. Most lenders will not approve
                  new loans. A significant portion of your income goes to debt
                  servicing.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How Lenders Use DTI
              </h2>
              <p>
                DTI is a key factor in underwriting. For example:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>Conventional mortgages</strong> typically require a
                  back-end DTI of 45% or lower, though some allow up to 50%.
                </li>
                <li>
                  <strong>FHA loans</strong> allow DTI up to 43% with compensating
                  factors, and up to 50% in some cases.
                </li>
                <li>
                  <strong>Auto loans</strong> generally prefer DTI under 50%,
                  though requirements vary by lender.
                </li>
                <li>
                  <strong>Personal loans and credit cards</strong> factor DTI
                  alongside credit score, employment, and other criteria.
                </li>
              </ul>
              <p className="mt-3">
                A lower DTI also gives you negotiating power. Lenders compete
                for low-risk borrowers, and a DTI under 30% signals that you are
                a strong candidate.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How to Improve Your DTI
              </h2>
              <ol className="list-decimal space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Pay off smaller debts.</strong> Eliminating a $200/month
                  car payment immediately drops your DTI.
                </li>
                <li>
                  <strong>Avoid taking on new debt.</strong> Every new payment
                  increases your DTI.
                </li>
                <li>
                  <strong>Refinance for lower payments.</strong> Extending a loan
                  term or securing a lower rate reduces monthly obligations.
                </li>
                <li>
                  <strong>Increase your income.</strong> A raise, side income, or
                  additional job boosts the denominator in the DTI formula.
                </li>
                <li>
                  <strong>Consolidate debts.</strong> Combining multiple payments
                  into one lower monthly payment can help, though be cautious of
                  fees and total interest.
                </li>
              </ol>
              <p className="mt-4">
                Our{" "}
                <Link
                  href="/loan-affordability-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Affordability Calculator
                </Link>{" "}
                can help you understand what a given DTI means for the mortgage
                amount you can qualify for. You can also use the{" "}
                <Link
                  href="/mortgage-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Mortgage Calculator
                </Link>{" "}
                to see how different home prices affect your front-end and
                back-end ratios.
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
                  href="/loan-affordability-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Affordability Calculator
                </Link>{" "}
                — See how much you can borrow based on your DTI.
              </li>
              <li>
                <Link
                  href="/mortgage-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Mortgage Calculator
                </Link>{" "}
                — Calculate monthly payments and total interest on a mortgage.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
