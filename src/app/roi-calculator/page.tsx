"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is ROI and why does it matter?",
    answer: "Return on Investment (ROI) measures the profit from an investment as a percentage of its cost. A higher ROI means a more efficient investment. It helps compare the performance of different investments on an equal footing.",
  },
  {
    question: "What is the difference between simple ROI and annualized ROI?",
    answer: "Simple ROI is the total return over the entire period: (final value − initial value) / initial value × 100. Annualized ROI (or CAGR) converts that into an average yearly rate, which is more meaningful for investments of different durations.",
  },
  {
    question: "How do I calculate annualized ROI (CAGR)?",
    answer: "CAGR = ((final value / initial value)^(1/years) − 1) × 100. For example, growing $10,000 to $16,000 in 5 years: (1.6)^(0.2) − 1 = 9.86% per year.",
  },
  {
    question: "Should I factor in fees and taxes?",
    answer: "The true return on your investment is net of fees and taxes. Brokerage fees, fund expense ratios, and capital gains taxes all reduce your actual returns. This calculator shows a gross figure — always account for costs separately.",
  },
];

const RELATED_TOOLS = [
  { href: "/cagr-calculator/", label: "CAGR" },
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
  { href: "/rule-of-72-calculator/", label: "Rule of 72" },
  { href: "/net-worth-calculator/", label: "Net Worth" },
];

export default function RoiCalculator() {
  const { money } = useMoney("roi-calculator");
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(16000);
  const [years, setYears] = useState(5);

  const results = useMemo(() => {
    const iv = Math.max(0, initialInvestment);
    const fv = Math.max(0, finalValue);
    const t = Math.max(0.01, years);

    const profit = fv - iv;
    const simpleRoi = iv > 0 ? ((fv - iv) / iv) * 100 : 0;
    const annualizedRoi = iv > 0 && fv > 0 ? (Math.pow(fv / iv, 1 / t) - 1) * 100 : 0;

    return { profit, simpleRoi, annualizedRoi };
  }, [initialInvestment, finalValue, years]);

  return (
    <>
      <WebApplicationSchema
        name="ROI Calculator"
        url="https://calcora.website/roi-calculator/"
        description="Calculate your return on investment (ROI) and annualized return for any stock, property, or other investment."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "ROI Calculator", url: "https://calcora.website/roi-calculator/" },
        ]}
      />
      <CalculatorShell
        title="ROI Calculator"
        description="Calculate your investment return — both simple ROI and annualized rate (CAGR)."
        formula="ROI = (FV − IV) / IV × 100, annualized = ((FV / IV)^(1/years) − 1) × 100"
        example="Invest $10,000, sell for $16,000 after 5 years: profit = $6,000, ROI = 60%, annualized ≈ 9.86%."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "ROI Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="roi-initial"
            label="Initial Investment"
            prefix="$"
            value={initialInvestment}
            onChange={setInitialInvestment}
            min={0}
            step={1000}
          />
          <NumberInput
            id="roi-final"
            label="Final Value"
            prefix="$"
            value={finalValue}
            onChange={setFinalValue}
            min={0}
            step={1000}
          />
          <NumberInput
            id="roi-years"
            label="Years Held"
            value={years}
            onChange={setYears}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <ResultCard label="Total Profit" value={money(results.profit)} accent="green" />
          <ResultCard label="ROI" value={`${results.simpleRoi.toFixed(2)}%`} accent="navy" sub="Simple return" />
          <ResultCard label="Annualized ROI" value={`${results.annualizedRoi.toFixed(2)}%`} accent="navy" sub="CAGR" />
        </div>

        <AdSlot slotId="roi-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}