"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber, downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "How do monthly contributions grow differently than a single deposit?",
    answer:
      "A single deposit grows only from compounding. When you add regular monthly contributions, each new deposit also starts earning interest — so your balance grows from three sources: your deposits, interest on deposits, and interest on interest.",
  },
  {
    question: "What's the difference between this and the compound interest calculator?",
    answer:
      "The compound interest calculator projects a single lump sum. This compound savings calculator adds recurring monthly deposits, making it the right tool for automatic monthly investing or saving.",
  },
  {
    question: "What return should I assume?",
    answer:
      "For cash savings, use the current high-yield savings rate (often 3–5%). For long-term stock investing, a historical average near 7–10% per year is common, but actual returns vary and are never guaranteed.",
  },
  {
    question: "Is monthly compounding better than annual for savers?",
    answer:
      "Yes. Compounding monthly versus annually at the same nominal rate earns slightly more because interest is credited and starts earning interest more frequently. The gap is small but grows over longer terms.",
  },
  {
    question: "How much do I need to save monthly for retirement?",
    answer:
      "A widely used guideline is 15% of gross income. Your exact amount depends on your lifestyle, age, and expected return. This calculator lets you model your specific monthly deposits.",
  },
  {
    question: "Does this account for inflation?",
    answer:
      "No. The results are in today's dollars. To model real purchasing power you would need to subtract expected inflation (for example 2–3%) from the nominal return.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/savings-goal-calculator/", label: "Savings Goal Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

export default function CompoundSavingsCalculator() {
  const { money } = useMoney("compound-savings-calculator");
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const results = useMemo(() => {
    const p = Math.max(0, initial);
    const pmt = Math.max(0, monthly);
    const i = Math.max(0, rate) / 100 / 12;
    const n = Math.max(0, Math.round(years)) * 12;

    let futureValue: number;
    if (n === 0) {
      futureValue = p;
    } else if (i === 0) {
      futureValue = p + pmt * n;
    } else {
      futureValue = p * Math.pow(1 + i, n) + pmt * ((Math.pow(1 + i, n) - 1) / i);
    }

    const totalContributions = p + pmt * n;
    const interestEarned = futureValue - totalContributions;

    const yearlyTable: { year: number; value: number; contributions: number }[] = [];
    for (let yr = 1; yr <= n / 12; yr++) {
      const m = yr * 12;
      const value = i === 0 ? p + pmt * m : p * Math.pow(1 + i, m) + pmt * ((Math.pow(1 + i, m) - 1) / i);
      yearlyTable.push({ year: yr, value, contributions: p + pmt * m });
    }

    return { futureValue, totalContributions, interestEarned, yearlyTable };
  }, [initial, monthly, rate, years]);

  const handleDownload = () => {
    downloadCSV(
      "compound-savings-growth.csv",
      ["Year", "Total Contributions", "Balance", "Interest Earned"],
      results.yearlyTable.map((row) => [
        row.year,
        row.contributions.toFixed(2),
        row.value.toFixed(2),
        (row.value - row.contributions).toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Compound Savings Calculator"
        url="https://calcora.website/compound-savings-calculator/"
        description="Project savings growth with monthly contributions and compound interest."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Compound Savings Calculator", url: "https://calcora.website/compound-savings-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Compound Savings Calculator"
        description="See how a starting balance plus regular monthly deposits grows over time with monthly compounding interest."
        formula="FV = P(1+i)^n + PMT × ((1+i)^n − 1)/i"
        example="$1,000 now plus $300/month at 7% annual interest for 20 years: total contributions $73,000 grow to about $155,600, with roughly $82,600 earned in interest."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Compound Savings Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NumberInput
            id="cs-initial"
            label="Starting Balance ($)"
            value={initial}
            onChange={setInitial}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="cs-monthly"
            label="Monthly Contribution ($)"
            value={monthly}
            onChange={setMonthly}
            min={0}
            step={50}
            prefix="$"
          />
          <NumberInput
            id="cs-rate"
            label="Annual Interest Rate (%)"
            value={rate}
            onChange={setRate}
            min={0}
            max={20}
            step={0.25}
            suffix="%"
          />
          <NumberInput
            id="cs-years"
            label="Time Period (years)"
            value={years}
            onChange={setYears}
            min={1}
            max={60}
            step={1}
            suffix="yrs"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="Future Value" value={money(results.futureValue)} accent="navy" />
            <ResultCard label="Total Contributions" value={money(results.totalContributions)} />
            <ResultCard label="Interest Earned" value={money(results.interestEarned)} accent="green" />
          </div>
        </div>

        <AdSlot slotId="compound-savings-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Growth by Year</h2>
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
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Contributions</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Interest Earned</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyTable.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-text-secondary">{money(row.contributions)}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.value)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{money(row.value - row.contributions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Compounding monthly at {formatNumber(rate, 2)}% per year. Results are estimates, not financial advice.
          </p>
        </div>
      </CalculatorShell>
    </>
  );
}