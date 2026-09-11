"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, formatNumber, downloadCSV } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is the difference between marginal and effective tax rate?",
    answer:
      "Your marginal tax rate is the percentage of tax applied to your next dollar of income — it is the rate of the bracket your income falls into. Your effective tax rate is the average rate across all brackets, calculated as total tax divided by taxable income. The effective rate is always lower than the marginal rate in a progressive tax system.",
  },
  {
    question: "What income counts for federal income tax?",
    answer:
      "Federal income tax applies to most forms of earned and unearned income, including wages, salaries, tips, freelance income, interest, dividends, rental income, and capital gains. Some income — like municipal bond interest — may be exempt. This calculator treats the input as taxable income already, after deductions.",
  },
  {
    question: "What is the standard deduction for 2025?",
    answer:
      "For the 2025 tax year, the standard deduction is approximately $15,000 for single filers, $30,000 for married filing jointly, and $22,500 for head of household. These amounts are adjusted annually for inflation. If your itemized deductions exceed the standard deduction, you would use itemized instead.",
  },
  {
    question: "Are capital gains taxed at the same rate as ordinary income?",
    answer:
      "No. Long-term capital gains (assets held over one year) are taxed at preferential rates of 0%, 15%, or 20% depending on your income level. Short-term capital gains (assets held one year or less) are taxed as ordinary income. This calculator only covers ordinary income brackets.",
  },
  {
    question: "Do federal tax brackets change every year?",
    answer:
      "Yes. The IRS adjusts tax bracket thresholds annually to account for inflation. The brackets used in this calculator are for the 2025 tax year. Always verify current-year brackets before filing.",
  },
  {
    question: "Does this calculator include state taxes?",
    answer:
      "No. This calculator only estimates federal income tax using the 2025 federal brackets. State and local taxes vary widely — some states have no income tax (e.g., Texas, Florida), while others have rates up to 13%+ (e.g., California). You would need a separate calculation for state taxes.",
  },
];

const RELATED_TOOLS = [
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
  { href: "/dti-ratio-calculator/", label: "DTI Ratio Calculator" },
];

interface Bracket {
  max: number;
  rate: number;
}

const SINGLE_BRACKETS: Bracket[] = [
  { max: 11925, rate: 10 },
  { max: 48475, rate: 12 },
  { max: 103350, rate: 22 },
  { max: 197300, rate: 24 },
  { max: 250525, rate: 32 },
  { max: 626350, rate: 35 },
  { max: Infinity, rate: 37 },
];

const MFJ_BRACKETS: Bracket[] = [
  { max: 23850, rate: 10 },
  { max: 96950, rate: 12 },
  { max: 206700, rate: 22 },
  { max: 394600, rate: 24 },
  { max: 501050, rate: 32 },
  { max: 751600, rate: 35 },
  { max: Infinity, rate: 37 },
];

const HOH_BRACKETS: Bracket[] = [
  { max: 17000, rate: 10 },
  { max: 64850, rate: 12 },
  { max: 103350, rate: 22 },
  { max: 197300, rate: 24 },
  { max: 250525, rate: 32 },
  { max: 626350, rate: 35 },
  { max: Infinity, rate: 37 },
];

function getBrackets(filingStatus: string): Bracket[] {
  switch (filingStatus) {
    case "married":
      return MFJ_BRACKETS;
    case "head":
      return HOH_BRACKETS;
    default:
      return SINGLE_BRACKETS;
  }
}

interface BracketRow {
  lower: number;
  upper: number;
  rate: number;
  taxInBracket: number;
  cumulative: number;
}

export default function TaxBracketCalculator() {
  const [filingStatus, setFilingStatus] = useState("single");
  const [income, setIncome] = useState(80000);

  const results = useMemo(() => {
    const inc = Math.max(0, income);
    const brackets = getBrackets(filingStatus);

    let totalTax = 0;
    let marginalRate = 0;
    const table: BracketRow[] = [];
    let prevMax = 0;

    for (const bracket of brackets) {
      const lower = prevMax;
      const upper = bracket.max;
      const taxableInBracket = Math.min(inc, upper) - lower;

      if (taxableInBracket > 0) {
        const taxInBracket = taxableInBracket * (bracket.rate / 100);
        totalTax += taxInBracket;
        marginalRate = bracket.rate;

        table.push({
          lower,
          upper,
          rate: bracket.rate,
          taxInBracket,
          cumulative: totalTax,
        });
      }

      prevMax = upper;
      if (inc <= upper) break;
    }

    const effectiveRate = inc > 0 ? (totalTax / inc) * 100 : 0;
    const takeHome = inc - totalTax;

    return { totalTax, marginalRate, effectiveRate, takeHome, table };
  }, [filingStatus, income]);

  const handleDownload = () => {
    downloadCSV(
      "tax-bracket-breakdown.csv",
      ["Lower", "Upper", "Rate %", "Tax in this Bracket", "Cumulative Tax"],
      results.table.map((row) => [
        row.lower,
        row.upper === Infinity ? "∞" : row.upper,
        row.rate,
        row.taxInBracket.toFixed(2),
        row.cumulative.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Tax Bracket Calculator"
        url="https://calcora.website/tax-bracket-calculator/"
        description="Calculate your 2025 US federal income tax by bracket based on your taxable income."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Tax Bracket Calculator", url: "https://calcora.website/tax-bracket-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Tax Bracket Calculator"
        description="Estimate your 2025 US federal income tax by filing status and taxable income, broken down by each bracket."
        formula="Tax = Σ (Taxable Income in Bracket × Bracket Rate)"
        example="A single filer with $80,000 taxable income pays $12,568 in federal tax — an effective rate of 15.71% and a marginal rate of 22%."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Tax Bracket Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SelectInput
            id="tax-filing-status"
            label="Filing Status"
            value={filingStatus}
            onChange={setFilingStatus}
            options={[
              { label: "Single", value: "single" },
              { label: "Married Filing Jointly", value: "married" },
              { label: "Head of Household", value: "head" },
            ]}
          />
          <NumberInput
            id="tax-income"
            label="Taxable Income ($)"
            value={income}
            onChange={setIncome}
            min={0}
            step={1000}
            prefix="$"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Marginal Tax Bracket" value={`${results.marginalRate}%`} accent="navy" />
            <ResultCard label="Total Federal Tax" value={formatCurrency(results.totalTax)} />
            <ResultCard label="Effective Tax Rate" value={`${formatNumber(results.effectiveRate, 2)}%`} accent="green" />
            <ResultCard label="Take-Home Approximation" value={formatCurrency(results.takeHome)} />
          </div>
        </div>

        <AdSlot slotId="tax-bracket-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Bracket Breakdown</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Taxable Income Range</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Rate</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Tax in Bracket</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Cumulative Tax</th>
                </tr>
              </thead>
              <tbody>
                {results.table.map((row) => (
                  <tr key={row.lower} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">
                      {formatCurrency(row.lower)} — {row.upper === Infinity ? "∞" : formatCurrency(row.upper)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{row.rate}%</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.taxInBracket)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{formatCurrency(row.cumulative)}</td>
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
