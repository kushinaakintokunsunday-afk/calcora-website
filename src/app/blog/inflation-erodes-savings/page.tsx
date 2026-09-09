import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "How Inflation Erodes Your Savings (and What to Do)",
  description:
    "See how inflation quietly reduces your purchasing power over time and learn practical strategies to protect and grow your money.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "How Inflation Erodes Your Savings",
    url: "https://calcora.website/blog/inflation-erodes-savings",
  },
];

const faqs = [
  {
    question: "What is inflation?",
    answer:
      "Inflation is the rate at which the general price level of goods and services rises over time. As prices increase, each dollar you hold buys less than it did before. Moderate inflation (around 2%) is normal in a healthy economy.",
  },
  {
    question: "How much does inflation erode savings per year?",
    answer:
      "At 3% annual inflation, $100 today has the purchasing power of about $97 next year, $74 in 10 years, and $41 in 30 years. The erosion is slow but relentless, and it compounds just like interest does.",
  },
  {
    question: "Is keeping money in a savings account bad?",
    answer:
      "Not necessarily, but if your savings account interest rate is lower than inflation, you are losing purchasing power in real terms. A savings account earning 0.5% with 3% inflation means you lose about 2.5% of real value each year.",
  },
  {
    question: "What is the best hedge against inflation?",
    answer:
      "There is no single best hedge, but a diversified approach typically works: stocks (historically outpace inflation), inflation-indexed bonds (like TIPS), real estate, and investing in yourself to grow your income. Avoiding excessive cash holdings is a key principle.",
  },
];

export default function InflationErodesSavingsPost() {
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
              Inflation Erodes Savings
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              How Inflation Erodes Your Savings (and What to Do)
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-03-01">March 1, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>6 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              You check your bank account and see $10,000. It is the same number
              it was last year, but it buys less than it did a year ago. That is
              inflation at work — a silent force that erodes the value of every
              dollar you hold. Understanding how it works is the first step to
              protecting your wealth.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                What Is Inflation
              </h2>
              <p>
                Inflation is the rate at which the general level of prices for
                goods and services rises over time. When inflation goes up, each
                unit of currency buys fewer goods and services. Your dollar does
                not physically shrink — but its purchasing power does.
              </p>
              <p className="mt-3">
                Central banks target a moderate inflation rate (typically around
                2% per year) as a sign of a healthy, growing economy. The
                problem is that even moderate inflation compounds over time. A
                consistent 3% inflation rate cuts the value of your money in
                half roughly every 24 years.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How Inflation Affects Purchasing Power
              </h2>
              <p>
                Consider this: if inflation averages 3% per year, here is what
                $10,000 in savings is worth in real (inflation-adjusted) terms:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>After 5 years: ~$8,626 in purchasing power</li>
                <li>After 10 years: ~$7,441 in purchasing power</li>
                <li>After 20 years: ~$5,537 in purchasing power</li>
                <li>After 30 years: ~$4,120 in purchasing power</li>
              </ul>
              <p className="mt-3">
                Your bank still shows $10,000, but it can only buy what $4,120
                could buy 30 years ago. If that money was sitting in a standard
                savings account earning 0.5% interest, you lost over $5,800 in
                real value.
              </p>
              <p className="mt-3">
                This is why simply &quot;saving&quot; money is not always
                enough. You need your money to grow faster than inflation to
                maintain its purchasing power.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Historical Inflation Examples
              </h2>
              <p>
                Inflation is not a theoretical concern — it has reshaped
                economies repeatedly:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>1970s stagflation.</strong> U.S. inflation averaged over
                  7% per year, peaking near 14% in 1980. Savings accounts
                  could not keep up, and retirees on fixed incomes saw their
                  standard of living decline rapidly.
                </li>
                <li>
                  <strong>2021–2023 post-pandemic surge.</strong> Inflation
                  reached 9.1% in June 2022, the highest in 40 years. Groceries,
                  housing, and energy costs spiked, squeezing household budgets
                  across the country.
                </li>
                <li>
                  <strong>Japan&apos;s lost decades.</strong> From the 1990s
                  through the 2010s, Japan experienced near-zero inflation and
                  sometimes deflation. While low prices sound appealing, they
                  discouraged investment and economic growth for an entire
                  generation.
                </li>
              </ul>
              <p className="mt-3">
                These examples show that inflation is unpredictable in the short
                term but inevitable over long periods. Planning for it is not
                optional.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Strategies to Beat Inflation
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Invest in the stock market.</strong> Historically,
                  broad stock market indices have returned 8–10% annually over
                  long periods, comfortably outpacing average inflation. Even
                  index fund investing in your retirement account can make a
                  significant difference.
                </li>
                <li>
                  <strong>Consider inflation-protected securities.</strong>{" "}
                  Treasury Inflation-Protected Securities (TIPS) and I Bonds are
                  designed to adjust with inflation, preserving your purchasing
                  power.
                </li>
                <li>
                  <strong>Invest in real estate or REITs.</strong> Property
                  values and rents tend to rise with inflation, making real
                  estate a natural hedge.
                </li>
                <li>
                  <strong>Diversify broadly.</strong> A mix of stocks, bonds,
                  real assets, and other investments reduces the risk that any
                  single inflation scenario devastates your portfolio.
                </li>
                <li>
                  <strong>Minimize cash holdings.</strong> Keep enough for an
                  emergency fund (3–6 months of expenses) and invest the rest.
                  Excess cash sitting in a checking account is guaranteed to
                  lose value.
                </li>
                <li>
                  <strong>Grow your income.</strong> Invest in skills,
                  credentials, and career development so your income keeps pace
                  with or exceeds inflation.
                </li>
              </ul>
              <p className="mt-4">
                Our{" "}
                <Link
                  href="/inflation-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Inflation Calculator
                </Link>{" "}
                lets you see exactly how inflation affects a specific amount
                over time. Pair it with the{" "}
                <Link
                  href="/compound-interest-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Compound Interest Calculator
                </Link>{" "}
                to compare your investment growth against inflation, or use the{" "}
                <Link
                  href="/retirement-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Retirement Calculator
                </Link>{" "}
                to model retirement scenarios that account for rising prices.
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
                  href="/inflation-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Inflation Calculator
                </Link>{" "}
                — See how inflation erodes the value of your money over time.
              </li>
              <li>
                <Link
                  href="/retirement-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Retirement Calculator
                </Link>{" "}
                — Plan your retirement savings with inflation in mind.
              </li>
              <li>
                <Link
                  href="/compound-interest-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Compound Interest Calculator
                </Link>{" "}
                — Model investment growth that outpaces inflation.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
