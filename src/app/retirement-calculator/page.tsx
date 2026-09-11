"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber, downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "How much should I save for retirement?",
    answer: "A common guideline is to save 15% of your gross income annually, including any employer match. The exact amount depends on your desired retirement lifestyle, expected expenses, and how long you expect to live in retirement.",
  },
  {
    question: "What is the 4% rule?",
    answer: "The 4% rule suggests you can safely withdraw 4% of your retirement savings each year without running out of money over a 30-year retirement. For example, with $1,000,000 saved, you could withdraw $40,000 per year.",
  },
  {
    question: "When should I start saving for retirement?",
    answer: "The earlier the better. Starting at 25 gives your money decades to compound. Even small contributions in your 20s can outpace much larger contributions started in your 40s due to the power of compound growth.",
  },
  {
    question: "How does employer matching work?",
    answer: "An employer match is free money added to your 401(k) or similar retirement account. For example, if your employer matches 50% of contributions up to 6% of your salary, and you earn $60,000, contributing $3,600 (6%) gets you an additional $1,800 from your employer.",
  },
  {
    question: "What is the difference between a 401(k) and an IRA?",
    answer: "A 401(k) is an employer-sponsored plan with higher contribution limits ($23,500 in 2025) and possible employer matching. An IRA (Individual Retirement Account) is opened independently with lower limits ($7,000 in 2025) but more investment options.",
  },
  {
    question: "What rate of return should I expect?",
    answer: "Historically, a diversified stock portfolio has returned about 7–10% annually before inflation. For planning, many advisors use 6–7% as a conservative long-term average to account for market fluctuations and inflation.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
  { href: "/inflation-calculator/", label: "Inflation Calculator" },
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
];

interface YearRow {
  age: number;
  year: number;
  balance: number;
  totalContributions: number;
  totalGrowth: number;
}

export default function RetirementCalculator() {
  const { money } = useMoney("retirement-calculator");
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [employerMatch, setEmployerMatch] = useState(0);

  const results = useMemo(() => {
    const startAge = Math.max(0, currentAge);
    const endAge = Math.max(startAge + 1, retirementAge);
    const yearsToRetirement = endAge - startAge;
    const monthlyRate = annualReturn / 100 / 12;
    const monthlyContrib = Math.max(0, monthlyContribution);
    const employerMonthly = monthlyContrib * (Math.max(0, employerMatch) / 100);
    const totalMonthly = monthlyContrib + employerMonthly;

    const table: YearRow[] = [];
    let balance = Math.max(0, currentSavings);
    let cumulativeContributions = Math.max(0, currentSavings);

    for (let year = 0; year <= yearsToRetirement; year++) {
      if (year % 5 === 0 || year === yearsToRetirement) {
        const growth = balance - cumulativeContributions;
        table.push({
          age: startAge + year,
          year,
          balance,
          totalContributions: cumulativeContributions,
          totalGrowth: growth,
        });
      }

      if (year < yearsToRetirement) {
        for (let month = 0; month < 12; month++) {
          balance = balance * (1 + monthlyRate) + totalMonthly;
          cumulativeContributions += totalMonthly;
        }
      }
    }

    const finalBalance = table.length > 0 ? table[table.length - 1].balance : currentSavings;
    const totalContributions = table.length > 0 ? table[table.length - 1].totalContributions : currentSavings;
    const totalGrowth = finalBalance - totalContributions;

    return { yearsToRetirement, finalBalance, totalContributions, totalGrowth, table };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, employerMatch]);

  const handleDownload = () => {
    downloadCSV(
      "retirement-projection.csv",
      ["Age", "Year", "Balance", "Total Contributions", "Total Growth"],
      results.table.map((row) => [row.age, row.year, row.balance.toFixed(2), row.totalContributions.toFixed(2), row.totalGrowth.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Retirement / 401(k) Calculator"
        url="https://calcora.website/retirement-calculator/"
        description="Project your retirement savings and see how contributions grow over time with compound returns."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Retirement Calculator", url: "https://calcora.website/retirement-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Retirement / 401(k) Calculator"
        description="Project your retirement nest egg and see how your savings, contributions, and investment growth compound over time."
        formula="FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r]"
        example="Starting at age 30 with $50,000 saved, contributing $500/month at 7% annual return until age 65: The future value is approximately $909,496. You contribute $210,000 of your own money plus $0 employer match, and investment growth accounts for $699,496."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Retirement Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="ret-current-age" className="block text-sm font-medium text-text-primary mb-1">
              Current Age
            </label>
            <input
              id="ret-current-age"
              type="number"
              min={0}
              max={100}
              step={1}
              value={currentAge}
              onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ret-retirement-age" className="block text-sm font-medium text-text-primary mb-1">
              Retirement Age
            </label>
            <input
              id="ret-retirement-age"
              type="number"
              min={1}
              max={100}
              step={1}
              value={retirementAge}
              onChange={(e) => setRetirementAge(parseInt(e.target.value) || 1)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ret-savings" className="block text-sm font-medium text-text-primary mb-1">
              Current Savings ($)
            </label>
            <input
              id="ret-savings"
              type="number"
              min={0}
              step={1000}
              value={currentSavings}
              onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ret-contribution" className="block text-sm font-medium text-text-primary mb-1">
              Monthly Contribution ($)
            </label>
            <input
              id="ret-contribution"
              type="number"
              min={0}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ret-return" className="block text-sm font-medium text-text-primary mb-1">
              Annual Return (%)
            </label>
            <input
              id="ret-return"
              type="number"
              min={0}
              max={50}
              step={0.1}
              value={annualReturn}
              onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ret-employer" className="block text-sm font-medium text-text-primary mb-1">
              Employer Match (%)
            </label>
            <input
              id="ret-employer"
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={employerMatch}
              onChange={(e) => setEmployerMatch(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <p className="text-xs text-text-muted mt-1">Percentage of your contribution matched by employer</p>
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Years to Retirement</p>
              <p className="text-2xl font-bold text-navy">{results.yearsToRetirement}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Projected Nest Egg</p>
              <p className="text-2xl font-bold text-navy">{money(results.finalBalance)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Contributions</p>
              <p className="text-2xl font-bold text-green">{money(results.totalContributions)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Growth</p>
              <p className="text-2xl font-bold text-green">{money(results.totalGrowth)}</p>
            </div>
          </div>
        </div>

        <AdSlot slotId="retirement-mid" />

        {results.table.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Projection Table</h2>
              <button
                type="button"
                onClick={handleDownload}
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Download CSV
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-text-primary">Age</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Contributions</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {results.table.map((row) => {
                    const contribPct = row.balance > 0 ? (row.totalContributions / row.balance) * 100 : 100;
                    const growthPct = 100 - contribPct;
                    return (
                      <tr key={row.age} className="border-b border-border last:border-0 hover:bg-surface/50">
                        <td className="px-4 py-2.5 text-text-primary font-medium">{row.age}</td>
                        <td className="px-4 py-2.5 text-right text-text-secondary">{row.year}</td>
                        <td className="px-4 py-2.5 text-right text-text-primary font-medium">{money(row.balance)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="text-green">{money(row.totalContributions)}</span>
                          <span className="text-text-muted text-xs ml-1">({formatNumber(contribPct, 0)}%)</span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <span className="text-navy">{money(row.totalGrowth)}</span>
                          <span className="text-text-muted text-xs ml-1">({formatNumber(growthPct, 0)}%)</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CalculatorShell>
    </>
  );
}
