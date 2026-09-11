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
    question: "What is CAGR?",
    answer:
      "CAGR — compound annual growth rate — is the average annual growth rate an investment would have needed to grow from its starting value to its ending value over a number of years, assuming steady compounding each year.",
  },
  {
    question: "Why use CAGR instead of simple return?",
    answer:
      "Simple return divides total gain by the start value, ignoring how long you held the investment. CAGR smooths returns into one yearly rate, so you can fairly compare investments held over different periods.",
  },
  {
    question: "Is CAGR the same as realized annual return?",
    answer:
      "Not necessarily. Real-world returns fluctuate year to year. CAGR is the implied constant rate that reproduces the same final value — it tells you the average pace, not the actual year-by-year path.",
  },
  {
    question: "Does CAGR account for dividends and withdrawals?",
    answer:
      "Only if you include them in the ending value. For accurate results, the ending value should reflect all reinvested dividends and you should avoid withdrawals or deposits during the holding period.",
  },
  {
    question: "How is CAGR different from APY?",
    answer:
      "APY measures the effective annual interest on a rate that compounds within a single year. CAGR measures the average yearly growth of a portfolio across multiple years. Both are annualized, but they answer different questions.",
  },
  {
    question: "What is a good CAGR for an investment?",
    answer:
      "Historically, the S&P 500 has returned roughly 7–10% per year including dividends. Real estate and bonds tend to be lower. A 10%+ long-run CAGR is considered strong performance.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/apy-calculator/", label: "APY Calculator" },
  { href: "/rule-of-72-calculator/", label: "Rule of 72 Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

export default function CAGRCalculator() {
  const { money } = useMoney("cagr-calculator");
  const [beginningValue, setBeginningValue] = useState(10000);
  const [endingValue, setEndingValue] = useState(20000);
  const [years, setYears] = useState(5);

  const results = useMemo(() => {
    const bv = Math.max(0, beginningValue);
    const ev = Math.max(0, endingValue);
    const y = Math.max(0.1, years);

    const cagr = bv > 0 && ev > 0 ? Math.pow(ev / bv, 1 / y) - 1 : 0;
    const totalReturn = bv > 0 ? (ev / bv - 1) * 100 : 0;
    const gain = ev - bv;

    const yearlyTable: { year: number; value: number; growth: number }[] = [];
    for (let yr = 1; yr <= y; yr++) {
      const value = bv * Math.pow(1 + cagr, yr);
      yearlyTable.push({ year: yr, value, growth: value - bv });
    }

    return { cagr, totalReturn, gain, yearlyTable };
  }, [beginningValue, endingValue, years]);

  const handleDownload = () => {
    downloadCSV(
      "cagr-growth-by-year.csv",
      ["Year", "Value", "Total Growth"],
      results.yearlyTable.map((row) => [row.year, row.value.toFixed(2), row.growth.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="CAGR Calculator"
        url="https://calcora.website/cagr-calculator/"
        description="Calculate the compound annual growth rate of an investment."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "CAGR Calculator", url: "https://calcora.website/cagr-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Compound Annual Growth Rate (CAGR) Calculator"
        description="Work out the average yearly growth rate of an investment from the start and end values, then see the value at every year of the period."
        formula="CAGR = (Ending Value ÷ Beginning Value)^(1 / Years) − 1"
        example="$10,000 grows to $20,000 in 5 years: CAGR = (20,000 ÷ 10,000)^(1/5) − 1 = 14.87% per year."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "CAGR Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="cagr-begin"
            label="Beginning Value ($)"
            value={beginningValue}
            onChange={setBeginningValue}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="cagr-end"
            label="Ending Value ($)"
            value={endingValue}
            onChange={setEndingValue}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="cagr-years"
            label="Number of Years"
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
            <ResultCard label="CAGR" value={`${formatNumber(results.cagr * 100, 2)}%`} accent="green" />
            <ResultCard label="Total Return" value={`${formatNumber(results.totalReturn, 1)}%`} />
            <ResultCard label="Total Gain" value={money(results.gain)} accent="navy" />
          </div>
        </div>

        <AdSlot slotId="cagr-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Value Year by Year</h2>
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
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Value</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Total Growth</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyTable.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.value)}</td>
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