import type { Metadata } from "next";
import Link from "next/link";
import { FAQSchema, BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "How Much Should You Keep in an Emergency Fund?",
  description:
    "Learn how to calculate your ideal emergency fund size, whether 3 to 6 months is right for you, and practical tips for building one fast.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
  {
    name: "Emergency Fund",
    url: "https://calcora.website/blog/emergency-fund",
  },
];

const faqs = [
  {
    question: "How much should I keep in my emergency fund?",
    answer:
      "A common guideline is three to six months of essential living expenses, but your ideal amount depends on job stability, dependents, and health. A freelancer with variable income may want nine to twelve months, while a dual-income household with steady jobs might be comfortable with three.",
  },
  {
    question: "Should I keep my emergency fund in a savings account or invest it?",
    answer:
      "Your emergency fund should stay liquid and low-risk. A high-yield savings account or money market account is ideal because the money is accessible within a day or two and not subject to market swings. Investing emergency funds in stocks or bonds defeats the purpose of having a safety net.",
  },
  {
    question: "What counts as an emergency expense?",
    answer:
      "True emergencies are unexpected, necessary, and urgent. Examples include job loss, unexpected medical bills, urgent car repairs needed for commuting, or emergency home repairs like a burst pipe. A vacation sale or new gadget does not qualify.",
  },
  {
    question: "How long does it realistically take to build a full emergency fund?",
    answer:
      "If you save $500 per month toward a $15,000 goal, it takes about 30 months. Starting with a smaller starter fund of $1,000 to $2,000 takes just a few months and already provides a meaningful buffer while you continue building.",
  },
];

export default function EmergencyFundPost() {
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
              Emergency Fund
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
              How Much Should You Keep in an Emergency Fund?
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
              <time dateTime="2026-09-11">September 11, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="space-y-8 text-text-primary leading-relaxed">
            <p className="text-lg">
              An emergency fund is the financial cushion that keeps a surprise
              expense from becoming a crisis. But the question everyone asks
              &mdash; &quot;How much is enough?&quot; &mdash; does not have a
              single right answer. The popular &quot;three to six months&quot;
              rule of thumb is a solid starting point, but your personal number
              depends on factors unique to your life. Let us break down how to
              find yours.
            </p>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Why Three to Six Months Is a Rule of Thumb, Not Gospel
              </h2>
              <p>
                The three-to-six-month guideline has been repeated so often it
                feels like law. It originated from basic risk assessment: most
                job searches take one to three months, most medical billing
                disputes resolve within a billing cycle, and most home or car
                repairs do not exceed a few thousand dollars.
              </p>
              <p className="mt-3">
                But this range is deliberately broad because people&apos;s
                circumstances differ wildly. A tenured government employee with
                excellent health insurance and no dependents faces far less
                financial risk than a self-employed consultant supporting a
                family of four. The right number is the one that matches{" "}
                <em>your</em> exposure to financial disruption.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                How to Calculate Your Personal Emergency Fund
              </h2>
              <p>
                The formula is straightforward:
              </p>
              <div className="my-4 rounded-lg bg-muted px-6 py-4 font-mono text-lg font-semibold text-[#1E3A5F]">
                Emergency Fund = Monthly Essential Expenses &times; Number of
                Months
              </div>
              <p>
                Start by listing only the expenses you{" "}
                <em>must</em> pay to keep your household running: rent or
                mortgage, utilities, groceries, insurance premiums, minimum debt
                payments, transportation costs, and childcare. Do not include
                discretionary spending like dining out, subscriptions, or
                entertainment. Those are the first things you would cut in a
                genuine emergency.
              </p>
              <p className="mt-3">
                Once you have your monthly essential total, multiply it by the
                number of months that reflects your risk level:
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>3 months</strong> &mdash; Dual-income household, stable
                  industry, low health risks
                </li>
                <li>
                  <strong>6 months</strong> &mdash; Single income, family
                  dependents, or variable income
                </li>
                <li>
                  <strong>9&ndash;12 months</strong> &mdash; Freelancers,
                  business owners, or those in volatile industries
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Worked Example: A $5,000-per-Month Household
              </h2>
              <p>
                Let us walk through a real scenario. Suppose your household
                spends $5,000 per month on essentials: $1,800 mortgage, $400
                utilities, $800 groceries, $350 car payment &amp; insurance,
                $250 health insurance, $200 minimum debt payments, and $400
                for childcare and transportation.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-text-secondary">
                <li>
                  <strong>Conservative (3 months):</strong> $5,000 &times; 3 =
                  $15,000
                </li>
                <li>
                  <strong>Moderate (6 months):</strong> $5,000 &times; 6 =
                  $30,000
                </li>
                <li>
                  <strong>Aggressive (9 months):</strong> $5,000 &times; 9 =
                  $45,000
                </li>
              </ul>
              <p className="mt-3">
                If you are a single earner with two kids, $30,000 is a
                reasonable target. If both partners work in stable fields and
                you have employer-provided health insurance, $15,000 may give
                you enough breathing room while you invest the rest.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Where to Keep Your Emergency Fund
              </h2>
              <p>
                Liquidity and safety matter more than earning the highest
                possible return. Your emergency fund needs to be accessible
                within one to two business days, and it should not lose value
                when markets dip.
              </p>
              <p className="mt-3">
                A <strong>high-yield savings account (HYSA)</strong> is the most
                popular choice. As of mid-2026, many online banks offer annual
                percentage yields between 4% and 5% &mdash; far above the
                national average for traditional savings accounts. Your money
                stays FDIC-insured up to $250,000 and remains fully accessible.
              </p>
              <p className="mt-3">
                A <strong>money market account</strong> is another solid option.
                These often come with check-writing privileges or a linked debit
                card, which can be useful if you need quick access. Rates are
                comparable to HYSAs, though some accounts require a higher
                minimum balance.
              </p>
              <p className="mt-3">
                What you should avoid: certificates of deposit (CDs) with
                early-withdrawal penalties, stocks, cryptocurrency, or tying up
                funds in long-term bonds. The goal is protection and access, not
                growth.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                The Tiered Approach: Build in Stages
              </h2>
              <p>
                staring at a $30,000 target when your savings account holds $200
                is paralyzing. The tiered approach lets you build momentum with
                small, meaningful milestones.
              </p>
              <p className="mt-3">
                <strong>Tier 1 &mdash; Starter Fund ($1,000&ndash;$2,000):</strong>{" "}
                This covers minor emergencies like a flat tire or an unexpected
                copay. It breaks the paycheck-to-paycheck cycle and stops you
                from reaching for a credit card.
              </p>
              <p className="mt-3">
                <strong>Tier 2 &mdash; Half Fund (one to three months):</strong>{" "}
                At this stage you can handle a job loss lasting a month or two.
                This is where most financial advisors say you get the biggest
                safety improvement per dollar saved.
              </p>
              <p className="mt-3">
                <strong>Tier 3 &mdash; Full Fund (three to six months):</strong>{" "}
                This is your complete safety net. With a full fund, you can
                navigate almost any financial disruption without taking on debt
                or making panic-driven decisions.
              </p>
              <p className="mt-3">
                Each tier buys you more time and more options. Even if you never
                reach your ideal number, every dollar saved is a dollar of
                freedom.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                Tips for Building Your Emergency Fund Fast
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-text-secondary">
                <li>
                  <strong>Automate transfers.</strong> Set up an automatic
                  monthly or biweekly transfer to your HYSA the day after
                  payday. Removing the decision eliminates procrastination.
                </li>
                <li>
                  <strong>Direct-deposit a portion of your paycheck.</strong>{" "}
                  Many employers let you split deposits across multiple accounts.
                  Send even $50 per paycheck straight to savings.
                </li>
                <li>
                  <strong>Sell unused items.</strong> Old electronics, clothes,
                  and furniture sitting in closets can generate hundreds of
                  dollars quickly through local marketplaces.
                </li>
                <li>
                  <strong>Redirect windfalls.</strong> Tax refunds, work bonuses,
                  cash gifts, and rebates go straight into the fund until it is
                  fully funded.
                </li>
                <li>
                  <strong>Temporarily cut one discretionary expense.</strong>{" "}
                  Pausing a streaming service, dining out less, or canceling a
                  gym membership for six months can free up $50 to $200 monthly.
                </li>
                <li>
                  <strong>Use round-up apps.</strong> Several banking apps round
                  purchases to the nearest dollar and sweep the difference into
                  savings. It adds up faster than you think.
                </li>
                <li>
                  <strong>Pick up a temporary side gig.</strong> Freelancing,
                  tutoring, or gig work for even a few hours a week can
                  accelerate your timeline significantly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-[#1E3A5F]">
                When to Revisit Your Target
              </h2>
              <p>
                Your emergency fund is not a &quot;set it and forget it&quot;
                number. Revisit it whenever your life changes: a new child, a
                job switch, a move to a higher-cost area, paying off a major
                debt, or a change in health status. Inflation also matters
                &mdash; a fund that was enough three years ago may fall short
                today if your expenses have climbed.
              </p>
              <p className="mt-3">
                A good practice is to review your emergency fund annually and
                adjust your target whenever your monthly essential expenses
                change by more than 10%.
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
                  href="/emergency-fund-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Emergency Fund Calculator
                </Link>{" "}
                — Calculate exactly how much you need based on your expenses.
              </li>
              <li>
                <Link
                  href="/savings-goal-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Savings Goal Calculator
                </Link>{" "}
                — Figure out how long it will take to reach your target.
              </li>
              <li>
                <Link
                  href="/compound-savings-calculator/"
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  Compound Savings Calculator
                </Link>{" "}
                — See how interest helps your emergency fund grow over time.
              </li>
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
