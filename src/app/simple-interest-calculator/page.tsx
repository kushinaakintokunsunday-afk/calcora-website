"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, downloadCSV } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is simple interest?",
    answer:
      "Simple interest is calculated only on the original principal amount. It's computed as principal × rate × time, so the same interest charge repeats each period without compounding.",
  },
  {
    question: "Simple vs compound interest: what's the difference?",
    answer:
      "Simple interest is charged on the original principal only. Compound interest is charged on the principal plus previously earned interest, so it grows faster over time.",
  },
  {
    question: "Where is simple interest used?",
    answer:
      "Simple interest is common on short-term loans, some auto loans, personal loans, and money market products. Most credit cards and long-term mortgages use compound interest.",
  },
  {
    question: "Are most car loans simple interest?",
    answer:
      "Yes. Most auto loans use simple (precomputed) interest, meaning every payment reduces the balance and the interest is based only on the outstanding principal. Paying early saves interest.",
  },
  {
    question: "How do I calculate simple interest?",
    answer:
      "Multiply the principal by the annual rate (as a decimal) and the time in years. For example, $10,000 at 5% for 3 years is $10,000 × 0.05 × 3 = $1,500.",
  },
  {
    question: "Is simple interest good or bad for a borrower?",
    answer:
      "Simple interest is generally better for a borrower than compound interest because the total cost is lower over the same term, provided you stick to the repayment schedule.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/apy-calculator/", label: "APY Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
];

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(3);

  const results = useMemo(() => {
    const p = Math.max(0, principal);
    const r = rate / 100;
    const t = Math.max(0, years);

    const interest = p * r * t;
    const total = p + interest;
    const annualInterest = p * r;

    const yearlyTable: { year: number; annualInterest: number; cumulative: number }[] = [];
    for (let y = 1; y <= t; y++) {
      yearlyTable.push({ year: y, annualInterest, cumulative: annualInterest * y });
    }

    return { interest, total, annualInterest, yearlyTable };
  }, [principal, rate, years]);

  const handleDownload = () => {
    downloadCSV(
      "simple-interest-breakdown.csv",
      ["Year", "Annual Interest", "Cumulative Interest"],
      results.yearlyTable.map((row) => [row.year, row.annualInterest.toFixed(2), row.cumulative.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Simple Interest Calculator"
        url="https://calcora.website/simple-interest-calculator/"
        description="Calculate simple interest on any loan or investment."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Simple Interest Calculator", url: "https://calcora.website/simple-interest-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Simple Interest Calculator"
        description="Calculate the interest and total cost using simple interest — interest on the original principal only, never on accumulated interest."
        formula="I = P × r × t    |    Total = P + I"
        example="$10,000 at 5% simple interest for 3 years: I = 10,000 × 0.05 × 3 = $1,500. The total amount is $11,500."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Simple Interest Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="si-principal"
            label="Principal Amount ($)"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={100}
            prefix="$"
          />
          <NumberInput
            id="si-rate"
            label="Annual Interest Rate (%)"
            value={rate}
            onChange={setRate}
            min={0}
            max={50}
            step={0.1}
            suffix="%"
          />
          <NumberInput
            id="si-years"
            label="Time Period (years)"
            value={years}
            onChange={setYears}
            min={0}
            max={50}
            step={0.5}
            suffix="yrs"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="Interest Amount" value={formatCurrency(results.interest)} accent="green" />
            <ResultCard label="Total Amount (Principal + Interest)" value={formatCurrency(results.total)} accent="navy" />
            <ResultCard label="Annual Interest" value={formatCurrency(results.annualInterest)} sub="per year" />
          </div>
        </div>

        <AdSlot slotId="simple-interest-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Year-by-Year Breakdown</h2>
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
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Interest That Year</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Cumulative Interest</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyTable.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.annualInterest)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{formatCurrency(row.cumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Simple interest repeats the same annual amount each year — it never compounds on earlier interest.
          </p>
        </div>
      </CalculatorShell>
    </>
  );
}