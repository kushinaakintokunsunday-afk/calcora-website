import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "How to Calculate Compound Interest (With Examples)",
  description:
    "Learn the compound interest formula, see worked examples, and discover how compounding frequency affects your returns.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "How to Calculate Compound Interest",
    url: "https://calcora.website/blog/calculate-compound-interest",
  },
];

const faqs = [
  {
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on the initial principal and the accumulated interest from previous periods. Unlike simple interest, which is only calculated on the principal, compound interest grows your money at an accelerating rate.",
  },
  {
    question: "How often is compound interest calculated?",
    answer:
      "It depends on the account or investment. Common compounding frequencies include annually, semi-annually, quarterly, monthly, and daily. The more frequently interest compounds, the more total interest you earn.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick mental shortcut to estimate how long it takes your money to double. Divide 72 by the annual interest rate. For example, at 8% annual interest, 72 ÷ 8 = 9 years to double.",
  },
  {
    question: "Is compound interest good or bad?",
    answer:
      "It depends on which side you are on. For savers and investors, compound interest works in your favor by growing wealth over time. For borrowers, compound interest can make debt grow quickly if you carry a balance.",
  },
];

export default function CalculateCompoundInterestPost() {
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
              Compound Interest
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              How to Calculate Compound Interest (With Examples)
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-01-15">January 15, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              Whether you are saving for retirement or evaluating an investment,
              understanding compound interest is one of the most important
              financial skills you can develop. It is the mechanism that turns
              modest, regular contributions into significant wealth over time.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                What Is Compound Interest
              </h2>
              <p>
                Compound interest is interest earned on both the original
                principal and the interest that has already been added to it.
                Each time the interest is calculated and added to your balance,
                the next period&apos;s interest is computed on a larger amount.
                This creates a snowball effect — your money earns money, and then
                that money earns more money.
              </p>
              <p className="mt-3">
                Compare this to simple interest, which is calculated only on the
                initial principal. On a $10,000 investment at 5% simple interest,
                you would earn exactly $500 every year. With compound interest,
                the amount you earn each year increases because you are earning
                interest on your prior interest as well.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The Compound Interest Formula
              </h2>
              <p>The standard compound interest formula is:</p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                A = P(1 + r/n)^(nt)
              </div>
              <p>Where:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-text-secondary">
                <li><strong>A</strong> = the future value of the investment</li>
                <li><strong>P</strong> = the principal (initial investment)</li>
                <li><strong>r</strong> = the annual interest rate (as a decimal)</li>
                <li><strong>n</strong> = the number of times interest compounds per year</li>
                <li><strong>t</strong> = the number of years</li>
              </ul>
              <p className="mt-3">
                To find just the interest earned, subtract the principal from
                the future value: Interest = A &minus; P.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How Compounding Frequency Matters
              </h2>
              <p>
                The compounding frequency — how often interest is added to the
                balance — has a noticeable impact on your total returns. More
                frequent compounding means interest starts earning interest
                sooner.
              </p>
              <p className="mt-3">
                Common frequencies include annual (1x), semi-annual (2x),
                quarterly (4x), monthly (12x), and daily (365x). On a $10,000
                deposit at 5% over 10 years, annual compounding yields $16,289
                while daily compounding yields $16,487 — a difference of nearly
                $200 without any extra effort on your part.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Worked Examples
              </h2>

              <h3 className="mb-2 text-xl font-semibold text-[#1E3A5F]">
                Example 1: Monthly Compounding
              </h3>
              <p>
                You invest <strong>$5,000</strong> at an annual rate of{" "}
                <strong>6%</strong> compounded{" "}
                <strong>monthly</strong> for <strong>5 years</strong>.
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                A = 5000(1 + 0.06/12)^(12×5) = 5000(1.005)^60 = $6,744.25
              </div>
              <p>
                You earn <strong>$1,744.25</strong> in interest on a $5,000
                investment — a 34.9% total return.
              </p>

              <h3 className="mb-2 mt-6 text-xl font-semibold text-[#1E3A5F]">
                Example 2: Quarterly Compounding
              </h3>
              <p>
                You invest <strong>$10,000</strong> at <strong>8%</strong>{" "}
                compounded <strong>quarterly</strong> for{" "}
                <strong>10 years</strong>.
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                A = 10000(1 + 0.08/4)^(4×10) = 10000(1.02)^40 = $22,080.40
              </div>
              <p>
                That is <strong>$12,080.40</strong> in interest — your money more
                than doubled.
              </p>

              <h3 className="mb-2 mt-6 text-xl font-semibold text-[#1E3A5F]">
                Example 3: Long-Term Retirement Savings
              </h3>
              <p>
                You invest <strong>$20,000</strong> at <strong>7%</strong>{" "}
                compounded <strong>monthly</strong> for{" "}
                <strong>30 years</strong>.
              </p>
              <div className="my-4 rounded-lg bg-surface p-4 font-mono text-sm text-text-primary">
                A = 20000(1 + 0.07/12)^(12×30) = 20000(1.00583)^360 = $161,617.91
              </div>
              <p>
                Over three decades, your $20,000 investment grows to over
                $161,000 — earning more than $141,000 in interest alone. This
                illustrates why starting early is so powerful.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Tips for Maximizing Compound Interest
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Start early.</strong> Time is the most important
                  variable. Even small amounts invested in your twenties can
                  outpace larger investments started a decade later.
                </li>
                <li>
                  <strong>Contribute regularly.</strong> Setting up automatic
                  monthly contributions means you take advantage of dollar-cost
                  averaging and keep the compounding engine running.
                </li>
                <li>
                  <strong>Choose higher compounding frequencies.</strong> When
                  comparing accounts, all else being equal, prefer more frequent
                  compounding.
                </li>
                <li>
                  <strong>Reinvest dividends and interest.</strong> Instead of
                  withdrawing earnings, reinvest them to keep compounding.
                </li>
                <li>
                  <strong>Minimize fees.</strong> High management fees or account
                  costs directly reduce the amount that compounds.
                </li>
              </ul>
              <p className="mt-4">
                Use our{" "}
                <Link
                  href="/compound-interest-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Compound Interest Calculator
                </Link>{" "}
                to run your own scenarios, or try the{" "}
                <Link
                  href="/retirement-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Retirement Calculator
                </Link>{" "}
                to see how compound growth affects long-term savings goals.
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
                  href="/compound-interest-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Compound Interest Calculator
                </Link>{" "}
                — Run your own compound interest scenarios.
              </li>
              <li>
                <Link
                  href="/retirement-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Retirement Calculator
                </Link>{" "}
                — See how compounding affects your retirement savings.
              </li>
              <li>
                <Link
                  href="/inflation-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Inflation Calculator
                </Link>{" "}
                — Adjust for inflation to see real purchasing power.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
