"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber, downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";

const FREQUENCIES = [
  { label: "Daily", value: 365 },
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Yearly", value: 1 },
];

const FAQS = [
  {
    question: "What is compound interest?",
    answer: "Compound interest is interest calculated on the initial principal and all accumulated interest from previous periods. It causes money to grow at an accelerating rate over time.",
  },
  {
    question: "How does compounding frequency affect returns?",
    answer: "More frequent compounding leads to higher returns. Daily compounding yields more than monthly, which yields more than yearly, because interest is calculated and added to the balance more often.",
  },
  {
 question: "What is the difference between simple and compound interest?",
    answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus all previously earned interest, leading to exponential growth.",
  },
  {
    question: "How much will $10,000 grow in 10 years at 7% compounded monthly?",
    answer: "Using the formula A = P(1+r/n)^(nt), with P=$10,000, r=0.07, n=12, t=10, the result is approximately $20,096.61, meaning you earn $10,096.61 in interest.",
  },
  {
    question: "Is compound interest always better than simple interest?",
    answer: "For savings and investments, compound interest earns you more over time. For loans, compound interest can cost you more. The longer the time period, the greater the difference.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a quick way to estimate how long it takes money to double. Divide 72 by the annual interest rate. For example, at 8% interest, money doubles in approximately 9 years (72 / 8 = 9).",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
  { href: "/inflation-calculator/", label: "Inflation Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
];

export default function CompoundInterestCalculator() {
  const { money } = useMoney("compound-interest-calculator");
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12);

  const results = useMemo(() => {
    const p = Math.max(0, principal);
    const r = rate / 100;
    const n = frequency;
    const t = Math.max(0, years);

    const finalAmount = p * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - p;

    const yearlyGrowth: { year: number; amount: number; interest: number }[] = [];
    for (let i = 1; i <= t; i++) {
      const amount = p * Math.pow(1 + r / n, n * i);
      yearlyGrowth.push({ year: i, amount, interest: amount - p });
    }

    return { finalAmount, totalInterest, yearlyGrowth };
  }, [principal, rate, years, frequency]);

  const handleDownload = () => {
    downloadCSV(
      "compound-interest-growth.csv",
      ["Year", "Balance", "Cumulative Interest"],
      results.yearlyGrowth.map((row) => [row.year, row.amount.toFixed(2), row.interest.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Compound Interest Calculator"
        url="https://calcora.website/compound-interest-calculator/"
        description="Calculate compound interest with year-by-year growth breakdown and CSV download."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Compound Interest Calculator", url: "https://calcora.website/compound-interest-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Compound Interest Calculator"
        description="See how your money grows over time with compound interest. Enter your details below for instant results."
        formula="A = P × (1 + r/n)^(n × t)"
        example="If you invest $10,000 at 7% annual interest compounded monthly for 10 years: A = 10,000 × (1 + 0.07/12)^(12 × 10) = $20,096.61. You earn $10,096.61 in interest."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Compound Interest Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="ci-principal" className="block text-sm font-medium text-text-primary mb-1">
              Principal Amount ($)
            </label>
            <input
              id="ci-principal"
              type="number"
              min={0}
              step={100}
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ci-rate" className="block text-sm font-medium text-text-primary mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              id="ci-rate"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ci-years" className="block text-sm font-medium text-text-primary mb-1">
              Time Period (years)
            </label>
            <input
              id="ci-years"
              type="number"
              min={0}
              max={50}
              step={1}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="ci-frequency" className="block text-sm font-medium text-text-primary mb-1">
              Compounding Frequency
            </label>
            <select
              id="ci-frequency"
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value))}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Final Amount</p>
              <p className="text-2xl font-bold text-navy">{money(results.finalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Interest Earned</p>
              <p className="text-2xl font-bold text-green">{money(results.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Growth Multiple</p>
              <p className="text-2xl font-bold text-navy">{formatNumber(results.finalAmount / Math.max(1, principal), 2)}x</p>
            </div>
          </div>
        </div>

        <AdSlot slotId="compound-interest-mid" className="my-8" />

        {results.yearlyGrowth.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Year-by-Year Growth</h2>
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
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Cumulative Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyGrowth.map((row) => (
                    <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.amount)}</td>
                      <td className="px-4 py-2.5 text-right text-green">{money(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CalculatorShell>
    </>
  );
}
