"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, formatNumber, downloadCSV } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FREQUENCIES = [
  { label: "Daily", value: "365" },
  { label: "Monthly", value: "12" },
  { label: "Quarterly", value: "4" },
  { label: "Annually", value: "1" },
];

const FAQS = [
  {
    question: "What is a certificate of deposit (CD)?",
    answer:
      "A CD is a savings product from a bank or credit union that pays a fixed interest rate for a set term. In exchange for locking your money away, CDs typically pay higher rates than regular savings accounts.",
  },
  {
    question: "What happens if I withdraw from a CD early?",
    answer:
      "Most banks charge an early-withdrawal penalty, usually a portion of the interest earned (for example, 3 months of interest for terms under 1 year, or 6 months for longer terms). Check your bank's policy before opening a CD.",
  },
  {
    question: "Are CD rates guaranteed?",
    answer:
      "The nominal rate is locked for the full term. However, if you choose to reinvest or roll over at maturity, the new rate depends on prevailing market rates, which may be higher or lower.",
  },
  {
    question: "CD vs savings account: which earns more?",
    answer:
      "CDs almost always earn more because they require you to lock up funds for a fixed term. Savings accounts offer liquidity with lower rates. A CD ladder can capture higher rates while keeping some money accessible.",
  },
  {
    question: "Is CD interest taxable?",
    answer:
      "Yes. Interest earned on a CD is generally reported as income and subject to income tax in most countries, even if you don't withdraw it until maturity.",
  },
  {
    question: "What is a CD ladder?",
    answer:
      "A CD ladder splits your money across CDs with different maturity dates (e.g., 6, 12, 18, 24 months). As each matures, you reinvest at the current rate, balancing yield and liquidity.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest Calculator" },
  { href: "/apy-calculator/", label: "APY Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

export default function CDCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [apy, setApy] = useState(5.0);
  const [termMonths, setTermMonths] = useState(12);
  const [frequency, setFrequency] = useState(12);

  const results = useMemo(() => {
    const p = Math.max(0, principal);
    const r = apy / 100;
    const n = frequency;
    const t = Math.max(0, termMonths) / 12;

    const maturityValue = p * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityValue - p;
    const growthPct = p > 0 ? (maturityValue / p - 1) * 100 : 0;
    const effectiveApy = (Math.pow(1 + r / n, n) - 1) * 100;

    const monthlyTable: { month: number; balance: number; interest: number }[] = [];
    for (let m = 1; m <= termMonths; m++) {
      const balance = p * Math.pow(1 + r / n, (n * m) / 12);
      monthlyTable.push({ month: m, balance, interest: balance - p });
    }

    return { maturityValue, interestEarned, growthPct, effectiveApy, monthlyTable };
  }, [principal, apy, termMonths, frequency]);

  const handleDownload = () => {
    downloadCSV(
      "cd-growth-schedule.csv",
      ["Month", "Balance", "Cumulative Interest"],
      results.monthlyTable.map((row) => [row.month, row.balance.toFixed(2), row.interest.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="CD Calculator"
        url="https://calcora.website/cd-calculator/"
        description="Calculate certificate of deposit maturity value and interest earned."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "CD Calculator", url: "https://calcora.website/cd-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Certificate of Deposit (CD) Calculator"
        description="Find out how much your certificate of deposit will grow. Adjust the deposit, APY, term, and compounding frequency for instant results."
        formula="A = P × (1 + r/n)^(n × t)"
        example="Deposit $10,000 at 5% APY compounded monthly for 12 months: A = 10,000 × (1 + 0.05/12)^(12 × 1) ≈ $10,511.62. You earn about $511.62."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "CD Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <NumberInput
            id="cd-principal"
            label="Deposit Amount ($)"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="cd-apy"
            label="APY (%)"
            value={apy}
            onChange={setApy}
            min={0}
            max={20}
            step={0.1}
            suffix="%"
          />
          <NumberInput
            id="cd-terms"
            label="Term (months)"
            value={termMonths}
            onChange={setTermMonths}
            min={1}
            max={120}
            step={1}
          />
          <SelectInput
            id="cd-frequency"
            label="Compounding Frequency"
            value={String(frequency)}
            onChange={(v) => setFrequency(parseInt(v))}
            options={FREQUENCIES}
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Maturity Value" value={formatCurrency(results.maturityValue)} accent="navy" />
            <ResultCard label="Total Interest Earned" value={formatCurrency(results.interestEarned)} accent="green" />
            <ResultCard label="Effective APY" value={`${formatNumber(results.effectiveApy, 3)}%`} />
            <ResultCard label="Total Growth" value={`${formatNumber(results.growthPct, 2)}%`} />
          </div>
        </div>

        <AdSlot slotId="cd-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Growth Schedule</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Month</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Cumulative Interest</th>
                </tr>
              </thead>
              <tbody>
                {results.monthlyTable.slice(0, 60).map((row) => (
                  <tr key={row.month} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.month}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.balance)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{formatCurrency(row.interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {results.monthlyTable.length > 60 && (
            <p className="mt-2 text-xs text-text-muted">
              Showing the first 60 months. Download the CSV for the full schedule.
            </p>
          )}
        </div>
      </CalculatorShell>
    </>
  );
}