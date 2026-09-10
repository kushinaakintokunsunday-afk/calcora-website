"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a shortcut: divide 72 by your annual return percentage to estimate how many years it takes your money to double. At 7% per year, money doubles in about 72 ÷ 7 ≈ 10.3 years.",
  },
  {
    question: "How accurate is the Rule of 72?",
    answer:
      "It is very accurate for rates between 6% and 10%, which is where most investors operate. At very high or very low rates the estimate drifts slightly, but it remains a useful mental shortcut.",
  },
  {
    question: "Where does the 72 come from?",
    answer:
      "The rule comes from the mathematics of logarithms: ln(2) ÷ ln(1 + r) gives the exact doubling time, and 72 is the round number that makes r × years ≈ 72 a close approximation across common rates.",
  },
  {
    question: "What rate do I need to double my money in a specific time?",
    answer:
      "Divide 72 by the number of years. To double in 8 years you need about 72 ÷ 8 = 9% per year. Higher expected returns usually mean more risk, which the rule doesn't capture.",
  },
  {
    question: "Does the Rule of 72 work for debt too?",
    answer:
      "Yes. The same math applies whenever something grows at a compound rate — including the balance on a debt with compounding interest. A 24% APR credit card doubles a balance in about 3 years.",
  },
  {
    question: "Does the Rule of 72 include contributions or withdrawals?",
    answer:
      "No. It assumes a single lump sum compounding with no additions or withdrawals. For regular contributions, use a compound savings or savings goal calculator instead.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/cagr-calculator/", label: "CAGR Calculator" },
  { href: "/compound-savings-calculator/", label: "Compound Savings Calculator" },
];

export default function RuleOf72Calculator() {
  const [rate, setRate] = useState(7);
  const [targetYears, setTargetYears] = useState(10);

  const results = useMemo(() => {
    const r = Math.max(0.01, rate);
    const yearsRule = 72 / r;
    const yearsExact = r > 0 ? Math.log(2) / Math.log(1 + r / 100) : 0;
    const requiredRate = targetYears > 0 ? 72 / targetYears : 0;

    const table = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((rr) => ({
      rate: rr,
      rule: 72 / rr,
      exact: Math.log(2) / Math.log(1 + rr / 100),
    }));

    return { yearsRule, yearsExact, requiredRate, table };
  }, [rate, targetYears]);

  return (
    <>
      <WebApplicationSchema
        name="Rule of 72 Calculator"
        url="https://calcora.website/rule-of-72-calculator/"
        description="Estimate how long it takes your money to double using the Rule of 72."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Rule of 72 Calculator", url: "https://calcora.website/rule-of-72-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Rule of 72 Calculator"
        description="Estimate how long it takes an investment to double at a given return, or the rate you need to double your money by a target date."
        formula="Years to double ≈ 72 ÷ Annual Return %"
        example="At 7% annual return: 72 ÷ 7 ≈ 10.3 years to double. With the exact formula, doubling at 7% takes about 10.2 years — the rule is remarkably close."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Rule of 72 Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <NumberInput
            id="r72-rate"
            label="Annual Return (%)"
            value={rate}
            onChange={setRate}
            min={0.1}
            max={30}
            step={0.5}
            suffix="%"
          />
          <NumberInput
            id="r72-years"
            label="Years to Double By"
            value={targetYears}
            onChange={setTargetYears}
            min={1}
            max={40}
            step={1}
            suffix="yrs"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="Years to Double (Rule of 72)" value={`${formatNumber(results.yearsRule, 1)} yrs`} accent="navy" />
            <ResultCard label="Years to Double (Exact)" value={`${formatNumber(results.yearsExact, 1)} yrs`} sub={`difference ${formatNumber(Math.abs(results.yearsRule - results.yearsExact), 2)}`} />
            <ResultCard label="Rate Needed to Double in Specified Time" value={`${formatNumber(results.requiredRate, 1)}%`} accent="green" />
          </div>
        </div>

        <AdSlot slotId="rule-of-72-mid" className="my-8" />

        <div>
          <h2 className="text-lg font-semibold text-navy mb-3">Doubling Time by Return Rate</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Rate</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Rule of 72 (years)</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Exact (years)</th>
                </tr>
              </thead>
              <tbody>
                {results.table.map((row) => (
                  <tr key={row.rate} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{formatNumber(row.rate, 0)}%</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatNumber(row.rule, 1)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{formatNumber(row.exact, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            The Rule of 72 stays within a few months of the exact doubling time for rates between 6% and 10%.
          </p>
        </div>
      </CalculatorShell>
    </>
  );
}