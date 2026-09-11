"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber, downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FREQUENCIES = [
  { label: "Daily", value: "365" },
  { label: "Monthly", value: "12" },
  { label: "Quarterly", value: "4" },
  { label: "Semiannually", value: "2" },
  { label: "Annually", value: "1" },
];

const COMPARISON_FREQUENCIES = [
  { label: "Daily (365x)", n: 365 },
  { label: "Monthly (12x)", n: 12 },
  { label: "Quarterly (4x)", n: 4 },
  { label: "Semiannually (2x)", n: 2 },
  { label: "Annually (1x)", n: 1 },
];

const FAQS = [
  {
    question: "What's the difference between APR and APY?",
    answer:
      "APR is the simple nominal rate before compounding. APY is the effective annual rate after compounding is applied. Because of compounding, APY is always equal to or higher than APR.",
  },
  {
    question: "Why is APY higher than APR?",
    answer:
      "Compounding. When interest is credited more than once per year, each period's interest earns interest in later periods. More frequent compounding produces a higher APY.",
  },
  {
    question: "Daily vs monthly compounding: which is better?",
    answer:
      "Daily compounding produces a slightly higher APY at the same nominal rate because interest is credited 365 times per year instead of 12. The difference is usually small.",
  },
  {
    question: "How do banks quote APY?",
    answer:
      "Banks advertise APY by law because it is the true annualized figure customers actually earn. The nominal APR is what they often divide to calculate the daily or monthly periodic rate.",
  },
  {
    question: "Is a savings account APY guaranteed?",
    answer:
      "No. Savings account APYs are variable and can change with the market. A CD, by contrast, locks in a fixed rate for the full term.",
  },
  {
    question: "How do I compare a CD and savings account fairly?",
    answer:
      "Compare the APY, not the nominal rate. Since APY accounts for compounding, comparing APYs between any two products tells you which truly pays more per year.",
  },
];

const RELATED_TOOLS = [
  { href: "/cd-calculator/", label: "CD Calculator" },
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/simple-interest-calculator/", label: "Simple Interest Calculator" },
];

export default function APYCalculator() {
  const { money } = useMoney("apy-calculator");
  const [nominalApr, setNominalApr] = useState(5.0);
  const [frequency, setFrequency] = useState(12);
  const [startingBalance, setStartingBalance] = useState(10000);

  const results = useMemo(() => {
    const r = nominalApr / 100;
    const apy = (Math.pow(1 + r / frequency, frequency) - 1) * 100;
    const afterOneYear = startingBalance * Math.pow(1 + r / frequency, frequency);
    const interestEarned = afterOneYear - startingBalance;

    const comparison = COMPARISON_FREQUENCIES.map((f) => ({
      label: f.label,
      apy: (Math.pow(1 + r / f.n, f.n) - 1) * 100,
    }));

    return { apy, afterOneYear, interestEarned, comparison };
  }, [nominalApr, frequency, startingBalance]);

  const handleDownload = () => {
    downloadCSV(
      "apy-comparison.csv",
      ["Compounding Frequency", "Nominal APR %", "APY %"],
      results.comparison.map((row) => [row.label, nominalApr.toFixed(2), row.apy.toFixed(4)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="APY Calculator"
        url="https://calcora.website/apy-calculator/"
        description="Convert APR to APY and see how compounding frequency affects your yield."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "APY Calculator", url: "https://calcora.website/apy-calculator/" },
        ]}
      />
      <CalculatorShell
        title="APY Calculator"
        description="Convert a nominal APR into the true annual percentage yield and see how compounding frequency changes what you actually earn."
        formula="APY = (1 + r/n)^n − 1"
        example="5% APR compounded monthly: APY = (1 + 0.05/12)^12 − 1 = 5.116%. $10,000 grows to about $10,511.62 in one year."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "APY Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="apy-apr"
            label="Nominal APR (%)"
            value={nominalApr}
            onChange={setNominalApr}
            min={0}
            max={50}
            step={0.1}
            suffix="%"
          />
          <SelectInput
            id="apy-frequency"
            label="Compounding Frequency"
            value={String(frequency)}
            onChange={(v) => setFrequency(parseInt(v))}
            options={FREQUENCIES}
          />
          <NumberInput
            id="apy-balance"
            label="Starting Balance ($)"
            value={startingBalance}
            onChange={setStartingBalance}
            min={0}
            step={500}
            prefix="$"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="APY (Effective Annual Rate)" value={`${formatNumber(results.apy, 3)}%`} accent="navy" />
            <ResultCard label="Balance After 1 Year" value={money(results.afterOneYear)} accent="navy" />
            <ResultCard label="Interest Earned" value={money(results.interestEarned)} accent="green" />
          </div>
        </div>

        <AdSlot slotId="apy-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Compounding Frequency Comparison</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Compounding Frequency</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Nominal APR</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">APY</th>
                </tr>
              </thead>
              <tbody>
                {results.comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.label}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatNumber(nominalApr, 2)}%</td>
                    <td className="px-4 py-2.5 text-right text-green">{formatNumber(row.apy, 4)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-text-muted">
            At the same nominal APR, more frequent compounding always yields a higher APY.
          </p>
        </div>
      </CalculatorShell>
    </>
  );
}