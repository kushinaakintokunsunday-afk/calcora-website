import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Understanding ROI: How to Evaluate Any Investment",
  description:
    "Learn the simple ROI formula, why time horizon matters, how CAGR improves multi-year comparisons, and avoid the common mistakes investors make.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "Understanding ROI",
    url: "https://calcora.website/blog/roi-basics",
  },
];

const faqs = [
  {
    question: "What is the formula for ROI?",
    answer:
      "ROI = (Current Value of Investment &amp;minus; Cost of Investment) &divide; Cost of Investment, expressed as a percentage. For example, if you invest $5,000 and the investment is later worth $6,000, your ROI is ($6,000 &amp;minus; $5,000) &divide; $5,000 = 20%.",
  },
  {
    question: "What is a good ROI percentage?",
    answer:
      "The S&amp;P 500 has historically returned about 8&ndash;10% per year over long periods. For a quick one-off trade, returns above that are exceptional, and a 10% total return on a single transaction can be excellent if it happened in a few months. The key is comparing the return against the time it took and the risk you accepted, not just the raw number.",
  },
  {
    question: "What is the difference between total return and CAGR?",
    answer:
      "Total return measures the cumulative percentage gain over the entire holding period, without considering time. CAGR (Compound Annual Growth Rate) smooths the total return into the average yearly growth rate the investment would have produced if it grew at a constant pace. Because it is annualized, CAGR lets you fairly compare investments held for different lengths of time.",
  },
  {
    question: "Why can ROI be misleading?",
    answer:
      "ROI becomes misleading when it ignores time, fees, taxes, inflation, and risk. A 50% return is impressive over one year but underwhelming over ten. Omitting fees and inflation inflates the true gain, and cherry-picking a favorable start or end date can make a losing strategy look profitable. For multi-year holdings, never rely on total return alone &mdash; use CAGR.",
  },
];

export default function RoiBasicsPost() {
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
              Understanding ROI
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              Understanding ROI: How to Evaluate Any Investment
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-09-11">September 11, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              From a $500 stock purchase to a $500,000 rental property, every
              investment ultimately gets judged by one question: did it make
              money? Return on Investment (ROI) is the tool most people reach
              for to answer it. It is simple, familiar, and instantly
              comparable &mdash; which is precisely why it is also easy to use
              wrong. A number on its own tells you little. You need to know what
              it is measured against, how long the money was tied up, and what
              costs and risks came with it. Get those details right and ROI
              becomes a genuinely powerful way to evaluate any opportunity that
              comes across your desk.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The Simple ROI Formula
              </h2>
              <p>
                The basic ROI formula is refreshingly straightforward:
              </p>
              <p className="mt-3 rounded-lg border border-border bg-card p-4 font-mono text-sm">
                ROI = (Current Value &amp;minus; Cost of Investment) &divide;
                Cost of Investment
              </p>
              <p className="mt-3">
                The result is usually expressed as a percentage. If you invest
                $10,000 in a small business and later sell your stake for
                $13,000, your ROI is ($13,000 &amp;minus; $10,000) &divide;
                $10,000 = 30%. Every dollar you put in came back with a 30% gain
                attached. You can also count any income received along the way
                (dividends, rent, interest) in the current value, so that
                $13,000 might represent the sale proceeds plus all the income
                you collected while holding the investment. That version is
                sometimes called total ROI, and it gives the most honest picture
                of an investment&apos;s full financial benefit.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Why Time Horizon Matters
              </h2>
              <p>
                Here is the catch that trips up most beginners: ROI says nothing
                about time. A 30% return sounds great, but it looks very
                different depending on whether you earned it in six months or
                six years. In six months, 30% is exceptional. In six years, it
                is roughly 4.5% per year &mdash; barely better than a savings
                account and below the historical stock market average.
              </p>
              <p className="mt-3">
                This is the difference between total return and annualized
                return. Total return is the cumulative percentage gain over the
                whole holding period. Annualized return is the average yearly
                gain, the pace you would have had to earn every single year to
                end up with the same total. The annualized number is the only
                one that allows honest comparisons, because it puts every
                holding period on the same clock.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                CAGR: The Better Metric for Multi-Year Investments
              </h2>
              <p>
                For any investment held longer than a year, the standard is the
                Compound Annual Growth Rate, or CAGR. CAGR converts a total
                gain into the average annual growth rate you would have needed
                to compound to that result, assuming steady growth along the
                way.
              </p>
              <p className="mt-3">
                The formula is CAGR = (Ending Value &divide; Beginning
                Value)^(1 &divide; Number of Years) &amp;minus; 1. Plug in a
                $10,000 investment that grew to $16,105 over five years and you
                get (16,105 &divide; 10,000)^(1/5) &amp;minus; 1, which works
                out to exactly 10%. That single figure tells you the
                investment&apos;s true annual pace, and it is what financial
                professionals quote whenever they talk about long-term
                performance. Total return tells you how much money you made;
                CAGR tells you how well the investment actually performed year
                after year.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Worked Example: Comparing Two Investments
              </h2>
              <p>
                Now let us see why this matters with two concrete investments.
              </p>
              <p className="mt-3">
                <strong>Investment A:</strong> you put $10,000 into a speculative
                startup and it doubles to $20,000 in three years. Total return:
                100%.
              </p>
              <p className="mt-3">
                <strong>Investment B:</strong> you put $10,000 into an index fund
                and it grows to $17,700 in eight years. Total return: 77%.
              </p>
              <p className="mt-3">
                By total return, Investment A clearly wins: 100% beats 77%. But
                when you annualize both with CAGR, a different picture emerges.
                Investment A&apos;s CAGR is (20,000 &divide; 10,000)^(1/3)
                &amp;minus; 1 &asymp; 26%, while Investment B&apos;s CAGR is
                (17,700 &divide; 10,000)^(1/8) &amp;minus; 1 &asymp; 7.4%. On an
                annual basis, A is the far superior performer. In fact, if
                Investment A only matched B&apos;s 7.4% after three years it
                would be worth about $12,400 &mdash; a sobering reminder of how
                dramatically compounding changes results depending on your
                starting point. The message is simple: never compare total
                returns across investments held for different lengths of time.
                Annualize first, then judge.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Common Mistakes That Corrupt ROI
              </h2>
              <p>
                Even experienced investors trip over the same handful of traps.
                Watch for these four:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Ignoring fees.</strong> Mutual fund expense ratios,
                  trading commissions, management fees, and taxes all eat into
                  your real return. A fund that posts a 9% gross return but
                  charges 1.5% per year in fees quietly delivers closer to 7.5%
                  &mdash; a difference measured in thousands of dollars
                  &amp;mdash; over a decade.
                </li>
                <li>
                  <strong>Forgetting inflation.</strong> A 6% nominal return
                  with 4% inflation is only a 2% real gain. Measuring in dollars
                  without adjusting for rising prices makes every investment look
                  better than it actually was.
                </li>
                <li>
                  <strong>Cherry-picking time periods.</strong> Starting your
                  measurement right after a crash, or ending it right before
                  one, flatters the result. Pick a date range for a reason, not
                  to make the number look good.
                </li>
                <li>
                  <strong>Ignoring risk.</strong> A 25% annualized return from a
                  penny stock is not automatically better than a 9% return from
                  an index fund if the first has a serious chance of going to
                  zero. Return and risk must be evaluated together.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Tips for Evaluating Any Investment
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Always annualize before you compare.</strong> Convert
                  total return to CAGR for anything held longer than a year.
                </li>
                <li>
                  <strong>Work in real terms.</strong> Subtract inflation to
                  understand your true purchasing-power gain.
                </li>
                <li>
                  <strong>Count every cost.</strong> Fees, taxes, and transaction
                  expenses belong in your calculation from day one.
                </li>
                <li>
                  <strong>Use realistic time frames.</strong> Judge a long-term
                  investment over 5, 10, or 20 years, not twelve lucky months.
                </li>
                <li>
                  <strong>Pair return with risk.</strong> Ask what you gave up in
                  certainty and liquidity to earn that return.
                </li>
                <li>
                  <strong>Revisit your numbers.</strong> ROI is a snapshot, not a
                  verdict. Recalculate annually as values, contributions, and
                  income change.
                </li>
              </ul>
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
                  href="/roi-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  ROI Calculator
                </Link>{" "}
                — Measure the total return on any single investment.
              </li>
              <li>
                <Link
                  href="/cagr-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  CAGR Calculator
                </Link>{" "}
                — Annualize multi-year returns for fair comparisons.
              </li>
              <li>
                <Link
                  href="/rule-of-72-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Rule of 72 Calculator
                </Link>{" "}
                — See how quickly your money doubles at any growth rate.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}