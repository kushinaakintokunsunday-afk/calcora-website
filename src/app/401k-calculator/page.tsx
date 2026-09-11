"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is a 401(k)?",
    answer:
      "A 401(k) is an employer-sponsored retirement savings plan that lets you contribute a portion of your paycheck on a pre-tax (or after-tax, for Roth 401(k)) basis. Investment earnings grow tax-deferred until withdrawal in retirement.",
  },
  {
    question: "Why is an employer match considered free money?",
    answer:
      "When your employer matches a percentage of your contributions, that match is additional money added to your account at no cost to you. For example, a 4% match on a $75,000 salary means $3,000 per year deposited by your employer. Many plans also have a vesting schedule, meaning the match becomes fully yours after a certain number of years.",
  },
  {
    question: "Is 7% annual return realistic?",
    answer:
      "A 7% annual return is a commonly used long-term average for a diversified stock portfolio after adjusting for inflation. The historical nominal return of the S&P 500 is closer to 10%. Your actual returns will vary depending on asset allocation, market conditions, and fees.",
  },
  {
    question: "What are the 401(k) contribution limits for 2025?",
    answer:
      "For 2025, the employee elective deferral limit is $23,500. If you are aged 50 or older, you can contribute an additional $7,500 in catch-up contributions, bringing the total to $31,000. The total combined contribution (employee + employer) is capped at $70,000.",
  },
  {
    question: "What happens if I withdraw early from a 401(k)?",
    answer:
      "Withdrawals before age 59½ are generally subject to a 10% early withdrawal penalty plus ordinary income tax. There are some exceptions, including the Rule of 55 (separation from service at 55+), substantially equal periodic payments (SEPP), and hardship withdrawals — though each has specific rules.",
  },
  {
    question: "What is the difference between a Roth and traditional 401(k)?",
    answer:
      "With a traditional 401(k), contributions are pre-tax, reducing your taxable income now, but withdrawals in retirement are taxed as income. With a Roth 401(k), contributions are after-tax (no upfront deduction), but qualified withdrawals in retirement are completely tax-free.",
  },
];

const RELATED_TOOLS = [
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
  { href: "/compound-savings-calculator/", label: "Compound Savings Calculator" },
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
];

export default function FourZeroOneKCalculator() {
  const { money } = useMoney("401k-calculator");
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [balance, setBalance] = useState(25000);
  const [salary, setSalary] = useState(75000);
  const [contributionRate, setContributionRate] = useState(7);
  const [employerMatch, setEmployerMatch] = useState(4);
  const [annualReturn, setAnnualReturn] = useState(7);

  const results = useMemo(() => {
    const ca = Math.max(0, currentAge);
    const ra = Math.max(ca + 1, retirementAge);
    const b = Math.max(0, balance);
    const s = Math.max(0, salary);
    const cr = Math.max(0, contributionRate);
    const em = Math.max(0, employerMatch);
    const ar = Math.max(0, annualReturn);

    const yearsToRetire = Math.max(1, ra - ca);
    const i = ar / 12 / 100;
    const n = yearsToRetire * 12;

    const monthlyOwn = (s * cr) / 12 / 100;
    const monthlyEmployer = (s * em) / 12 / 100;
    const monthlyTotal = monthlyOwn + monthlyEmployer;

    let projectedBalance: number;
    if (i === 0) {
      projectedBalance = b + monthlyTotal * n;
    } else {
      projectedBalance = b * Math.pow(1 + i, n) + monthlyTotal * ((Math.pow(1 + i, n) - 1) / i);
    }

    const totalOwnContributions = monthlyOwn * n;
    const totalEmployerMatch = monthlyEmployer * n;
    const totalContributions = totalOwnContributions + totalEmployerMatch;
    const totalInterest = projectedBalance - b - totalContributions;

    const yearlyTable: { year: number; cumulativeContributions: number; balance: number; growth: number }[] = [];
    for (let yr = 1; yr <= yearsToRetire; yr++) {
      const monthsSoFar = yr * 12;
      let yearBalance: number;
      if (i === 0) {
        yearBalance = b + monthlyTotal * monthsSoFar;
      } else {
        yearBalance =
          b * Math.pow(1 + i, monthsSoFar) + monthlyTotal * ((Math.pow(1 + i, monthsSoFar) - 1) / i);
      }
      const cumulative = monthlyTotal * monthsSoFar;
      yearlyTable.push({
        year: yr,
        cumulativeContributions: cumulative,
        balance: yearBalance,
        growth: yearBalance - b - cumulative,
      });
    }

    return {
      projectedBalance,
      totalOwnContributions,
      totalEmployerMatch,
      totalInterest,
      yearlyTable,
    };
  }, [currentAge, retirementAge, balance, salary, contributionRate, employerMatch, annualReturn]);

  const handleDownload = () => {
    downloadCSV(
      "401k-projection.csv",
      ["Year", "Cumulative Contributions", "Balance", "Growth"],
      results.yearlyTable.map((row) => [
        row.year,
        row.cumulativeContributions.toFixed(2),
        row.balance.toFixed(2),
        row.growth.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="401(k) Calculator"
        url="https://calcora.website/401k-calculator/"
        description="Project your 401(k) balance at retirement with employer match and compound growth."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "401(k) Calculator", url: "https://calcora.website/401k-calculator/" },
        ]}
      />
      <CalculatorShell
        title="401(k) Calculator"
        description="Project how much your 401(k) will be worth at retirement, factoring in your contributions, employer match, and compound growth."
        formula="FV = Balance × (1 + i)^n + Monthly Contribution × ((1 + i)^n − 1) / i"
        example="A 30-year-old with $25,000, earning $75,000, contributing 7% with a 4% employer match at 7% return would have roughly $665,000 by age 65."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "401(k) Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="401k-current-age"
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={80}
            step={1}
          />
          <NumberInput
            id="401k-retirement-age"
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={19}
            max={100}
            step={1}
          />
          <NumberInput
            id="401k-balance"
            label="Current 401(k) Balance"
            value={balance}
            onChange={setBalance}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="401k-salary"
            label="Annual Salary"
            value={salary}
            onChange={setSalary}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="401k-contribution-rate"
            label="Your Contribution Rate"
            value={contributionRate}
            onChange={setContributionRate}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <NumberInput
            id="401k-employer-match"
            label="Employer Match"
            value={employerMatch}
            onChange={setEmployerMatch}
            min={0}
            max={100}
            step={0.5}
            suffix="%"
          />
          <NumberInput
            id="401k-annual-return"
            label="Annual Return"
            value={annualReturn}
            onChange={setAnnualReturn}
            min={0}
            max={50}
            step={0.5}
            suffix="%"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Projected Balance at Retirement" value={money(results.projectedBalance)} accent="navy" />
            <ResultCard label="Total Own Contributions" value={money(results.totalOwnContributions)} />
            <ResultCard label="Total Employer Match" value={money(results.totalEmployerMatch)} accent="green" />
            <ResultCard label="Total Interest / Growth" value={money(results.totalInterest)} />
          </div>
        </div>

        <AdSlot slotId="401k-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Yearly Growth</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Year</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Cumulative Contributions</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Growth</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyTable.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.cumulativeContributions)}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.balance)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{money(row.growth)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CalculatorShell>
    </>
  );
}
