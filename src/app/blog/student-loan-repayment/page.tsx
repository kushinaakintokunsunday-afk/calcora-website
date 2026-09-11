import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Student Loan Repayment Strategies That Actually Work",
  description:
    "Compare standard 10-year and income-driven repayment, learn when refinancing makes sense, and see a worked example that shows how much extra payments save.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "Student Loan Repayment",
    url: "https://calcora.website/blog/student-loan-repayment",
  },
];

const faqs = [
  {
    question: "Should I refinance my student loans?",
    answer:
      "Refinancing makes the most sense when you have a stable income, strong credit, and a fixed-rate offer meaningfully below your current rate. The trade-off is that refinancing federal loans privately removes access to income-driven plans, deferment, forbearance, and loan forgiveness programs, so weigh those protections before you refinance.",
  },
  {
    question: "What is the difference between deferment and forbearance?",
    answer:
      "Deferment lets you pause payments and, for subsidized federal loans, interest does not accrue during the period. Forbearance also pauses payments, but interest accrues on every loan type and is added to your balance. Use forbearance only as a short-term last resort because capitalized interest can make your debt grow.",
  },
  {
    question: "Does paying off student loans early hurt my credit?",
    answer:
      "Paying off a loan can cause a small, temporary dip in your credit score because your credit mix narrows and the average age of your accounts may shorten. The effect is typically modest and fades quickly, and it is almost always worth paying far less interest than protecting a single credit score point.",
  },
  {
    question: "Are income-driven repayment plans worth it?",
    answer:
      "Income-driven plans are worth it if your payments would be unaffordable on the standard plan or if you qualify for Public Service Loan Forgiveness. Because payments are capped at a percentage of your discretionary income, they can free up cash — but lower payments mean more interest accumulates, so compare the total cost over time.",
  },
];

export default function StudentLoanRepaymentPost() {
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
              Student Loan Repayment
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              Student Loan Repayment Strategies That Actually Work
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-09-11">September 11, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              Student loans are one of the few types of debt that can follow you
              for decades. The average borrower owes tens of thousands of
              dollars, and the repayment plan you pick can mean the difference
              between paying a few thousand in interest and paying tens of
              thousands. The good news is that with a clear strategy, most
              borrowers can cut years off their repayment timeline without
              making their budget miserable.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Standard 10-Year Plans vs. Income-Driven Plans
              </h2>
              <p>
                The standard repayment plan spreads your balance across 10 years
                of fixed payments, which keeps total interest low and guarantees
                you are debt-free by the decade mark. A $30,000 loan at 6%
                interest costs about $333 per month on this plan. It is the
                default option for a reason: it is the cheapest way to repay if
                the payment fits your budget.
              </p>
              <p className="mt-3">
                Income-driven repayment (IDR) plans cap your payment at a
                percentage of discretionary income, and any remaining balance is
                forgiven after 20 or 25 years of qualifying payments. They are
                genuinely helpful if your payment would otherwise be
                unaffordable, or if you work in public service and expect
                forgiveness after 120 payments. But lower monthly payments mean
                interest compounds longer, so the total cost is often much
                higher. Pick an IDR plan because it is necessary, not because it
                feels easier.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Refinancing Considerations
              </h2>
              <p>
                Refinancing replaces your existing loans with a new private loan,
                usually at a lower rate if your credit and income are strong.
                That can dramatically cut interest — a 2 percentage point rate
                drop on a 10-year loan can save thousands. It also lets you
                shorten or lengthen your term to control your monthly payment.
              </p>
              <p className="mt-3">
                The catch is that refinancing federal loans permanently removes
                federal protections: income-driven repayment, deferment,
                forbearance, and all forgiveness programs. If you think you
                might ever need those safety nets, refinancing a federal loan
                is a one-way door. A common middle path is to refinance only
                private loans or only the highest-rate federal loans you are
                confident you can retire early. Compare offers from multiple
                lenders and run the numbers before committing.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The Avalanche Method for Multiple Loans
              </h2>
              <p>
                If you carry several loans with different rates — a common
                situation when you borrowed across multiple years — the{" "}
                <strong>avalanche method</strong> is the mathematically optimal
                way to pay them off. You make the minimum payment on every loan,
                then direct every extra dollar toward the loan with the highest
                interest rate. Once that loan is gone, roll its full payment into
                the next-highest-rate loan, and repeat.
              </p>
              <p className="mt-3">
                The avalanche method minimizes total interest because it attacks
                the most expensive debt first. It does require a little
                discipline, since the highest-rate loan is not always the
                largest. But the math is clear: on identical balances, a 7% loan
                costs roughly 16% more interest than a 6% loan over ten years.
                Tap the minimum on each loan, aim extra cash at the top rate,
                and watch the procrastinating balances shrink fast.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Worked Example: $30,000 at 6%
              </h2>
              <p>
                Consider a typical scenario: a <strong>$30,000</strong> balance
                at <strong>6%</strong> annual interest, repaid with monthly
                payments. On the standard 10-year plan, your payment is about{" "}
                <strong>$333 per month</strong>. Over 120 payments you send a
                total of <strong>$39,968</strong> to the lender, meaning you pay{" "}
                <strong>$9,968</strong> in interest on a $30,000 loan.
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                Payments = $333/month &times; 120 months = $39,968 total &minus; $30,000 = $9,968 interest
              </div>
              <p>
                Now accelerate: instead of $333, pay a flat{" "}
                <strong>$500 per month</strong>. Because the extra $167 goes
                straight against the principal, the loan disappears in about{" "}
                <strong>71.5 months</strong> — roughly 6 years instead of 10.
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                Payment = 71 &times; $500 + $264 final = $35,764 total &minus; $30,000 = $5,764 interest
              </div>
              <p>
                That smaller, more diligent payment saves about{" "}
                <strong>$4,200</strong> in interest and frees you from the loan
                nearly four years earlier. Then the $500 per month becomes yours
                to invest or save. Spreading the extra across a 5-year term at a
                7% return would grow the difference even further, but the loan
                itself gives you a guaranteed 6% return just by paying it early.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Tips That Actually Work
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Automate extra payments.</strong> Set your payment to
                  the accelerated amount and round up each month so the extra
                  never hits your spending account. Out of sight, out of wallet.
                </li>
                <li>
                  <strong>Target the highest rate first.</strong> The avalanche
                  method beats the snowball in total interest almost every time,
                  though either is better than coasting.
                </li>
                <li>
                  <strong>Attack interest during grace periods.</strong> Make
                  voluntary payments while interest capitalizes; every dollar
                  now is worth more than a dollar later.
                </li>
                <li>
                  <strong>Keep the emergency fund funded.</strong> Invest at the
                  margin: build 3&ndash;6 months of expenses before sending every
                  dollar to the lender.
                </li>
                <li>
                  <strong>Limit the standard 10-year plan.</strong> If the
                  payment feels easy, shorten the term or add a small amount on
                  top; the interest savings are real.
                </li>
                <li>
                  <strong>Revisit your servicer&apos;s options.</strong> Once a
                  year, re-read the repayment choices — a raise or a new job may
                  tip the balance between IDR and accelerated payoff.
                </li>
              </ul>
              <p className="mt-4">
                Run your own numbers with our{" "}
                <Link
                  href="/student-loan-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Student Loan Calculator
                </Link>{" "}
                to see exactly how much an extra payment saves.
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
                  href="/student-loan-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Student Loan Calculator
                </Link>{" "}
                — Estimate your payment and lifetime interest.
              </li>
              <li>
                <Link
                  href="/loan-comparison-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Loan Comparison Calculator
                </Link>{" "}
                — Compare terms, rates, and monthly payments side by side.
              </li>
              <li>
                <Link
                  href="/amortization-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Amortization Calculator
                </Link>{" "}
                — See how each payment splits between principal and interest.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}