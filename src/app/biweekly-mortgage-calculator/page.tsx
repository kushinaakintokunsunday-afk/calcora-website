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
    question: "How does biweekly mortgage payment work?",
    answer:
      "Instead of making 12 monthly payments per year, you make 26 half-payments. Since each payment is half your monthly amount, 26 half-payments equal 13 full monthly payments per year — one extra payment annually — which reduces your balance faster.",
  },
  {
    question: "Why does biweekly payment save interest?",
    answer:
      "Each half-payment reduces your principal sooner than a full monthly payment would. Because interest accrues on the remaining balance, paying down principal faster means less interest compounds over the life of the loan.",
  },
  {
    question: "Are there fees or penalties for biweekly payments?",
    answer:
      "Some lenders charge a setup fee or recurring fee for biweekly payment programs. Others allow it for free. Always check with your lender first. You can also simulate biweekly payments yourself by making one extra monthly payment per year.",
  },
  {
    question: "Is lump-sum extra payment better than biweekly?",
    answer:
      "Both reduce interest. Biweekly payments spread the extra payment across the year, while a lump sum applied early in the year saves slightly more interest because it reduces the balance sooner. Choose whichever fits your cash flow.",
  },
  {
    question: "Does biweekly work in months with 5 Fridays?",
    answer:
      "Standard biweekly programs are based on 26 half-payments per year regardless of how the calendar falls. The extra half-payment in a 5-Friday month is already factored into the annual total of 26 payments.",
  },
  {
    question: "What are the pros and cons of biweekly payments?",
    answer:
      "Pros: pay off your mortgage years earlier, save thousands in interest, build equity faster. Cons: requires consistent discipline if not automated, some lenders charge fees, and the cash flow difference is small each period but adds up over time.",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/amortization-calculator/", label: "Amortization Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability Calculator" },
];

interface YearlyRow {
  year: number;
  standardBalance: number;
  biweeklyBalance: number;
  cumulativeInterestSaved: number;
}

export default function BiweeklyMortgageCalculator() {
  const { money } = useMoney("biweekly-mortgage-calculator");
  const [loanAmount, setLoanAmount] = useState(300000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  const results = useMemo(() => {
    const principal = Math.max(0, loanAmount);
    const annualPct = Math.max(0, annualRate);
    const years = Math.max(1, Math.round(loanTermYears));

    const monthlyRate = annualPct / 12 / 100;
    const totalMonths = years * 12;

    let standardMonthly: number;
    if (monthlyRate === 0) {
      standardMonthly = principal / totalMonths;
    } else {
      standardMonthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const biweeklyPayment = standardMonthly / 2;
    const biweeklyRate = monthlyRate / 2;

    let stdBalance = principal;
    let stdTotalInterest = 0;
    let stdMonths = 0;
    for (let m = 0; m < totalMonths; m++) {
      const interest = stdBalance * monthlyRate;
      stdTotalInterest += interest;
      stdBalance -= standardMonthly - interest;
      if (stdBalance <= 0) {
        stdBalance = 0;
        stdMonths = m + 1;
        break;
      }
      stdMonths = m + 1;
    }

    let bwBalance = principal;
    let bwTotalInterest = 0;
    let bwPeriods = 0;
    const maxPeriods = totalMonths * 2 + 12;
    for (let p = 0; p < maxPeriods; p++) {
      const interest = bwBalance * biweeklyRate;
      bwTotalInterest += interest;
      bwBalance -= biweeklyPayment - interest;
      bwPeriods++;
      if (bwBalance <= 0) {
        bwBalance = 0;
        break;
      }
    }

    const bwMonths = bwPeriods / 2;
    const monthsSaved = Math.round(stdMonths - bwMonths);
    const interestSaved = stdTotalInterest - bwTotalInterest;

    const yearlyTable: YearlyRow[] = [];
    let stdBal = principal;
    let bwBal = principal;
    let stdIntCumulative = 0;
    let bwIntCumulative = 0;
    let stdMonth = 0;
    for (let yr = 1; yr <= years; yr++) {
      for (let m = 0; m < 12 && stdMonth < totalMonths; m++) {
        const sInterest = stdBal * monthlyRate;
        stdIntCumulative += sInterest;
        stdBal -= standardMonthly - sInterest;
        if (stdBal < 0) stdBal = 0;
        stdMonth++;
      }

      for (let half = 0; half < 2; half++) {
        const bInterest = bwBal * biweeklyRate;
        bwIntCumulative += bInterest;
        bwBal -= biweeklyPayment - bInterest;
        if (bwBal < 0) bwBal = 0;
      }

      const cumulativeSaved = stdIntCumulative - bwIntCumulative;

      yearlyTable.push({
        year: yr,
        standardBalance: Math.max(0, stdBal),
        biweeklyBalance: Math.max(0, bwBal),
        cumulativeInterestSaved: cumulativeSaved,
      });
    }

    return {
      standardMonthly,
      biweeklyPayment,
      standardTotalInterest: stdTotalInterest,
      biweeklyTotalInterest: bwTotalInterest,
      monthsSaved,
      interestSaved,
      yearlyTable,
    };
  }, [loanAmount, annualRate, loanTermYears]);

  const handleDownload = () => {
    downloadCSV(
      "biweekly-mortgage-comparison.csv",
      ["Year", "Standard Balance", "Biweekly Balance", "Cumulative Interest Saved"],
      results.yearlyTable.map((row) => [
        row.year,
        row.standardBalance.toFixed(2),
        row.biweeklyBalance.toFixed(2),
        row.cumulativeInterestSaved.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Biweekly Mortgage Calculator"
        url="https://calcora.website/biweekly-mortgage-calculator/"
        description="Compare biweekly vs monthly mortgage payments and see how much interest and time you can save."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Biweekly Mortgage Calculator", url: "https://calcora.website/biweekly-mortgage-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Biweekly vs Monthly Mortgage Calculator"
        description="See how switching to biweekly payments can shave years off your mortgage and save thousands in interest."
        formula="Biweekly Payment = Monthly Payment ÷ 2 (paid 26 times per year = 13 full payments annually)"
        example="A $300,000 loan at 6.5% for 30 years: monthly payment is $1,896. Switching to $948 biweekly saves about $82,000 in interest and pays off the loan roughly 5 years earlier."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Biweekly Mortgage Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="bw-loan-amount"
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={0}
            step={5000}
            prefix="$"
          />
          <NumberInput
            id="bw-annual-rate"
            label="Annual Interest Rate"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={30}
            step={0.125}
            suffix="%"
          />
          <NumberInput
            id="bw-loan-term"
            label="Loan Term (Years)"
            value={loanTermYears}
            onChange={setLoanTermYears}
            min={1}
            max={50}
            step={1}
            suffix="yrs"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Standard Monthly Payment" value={money(results.standardMonthly)} accent="navy" />
            <ResultCard label="Biweekly Payment" value={money(results.biweeklyPayment)} />
            <ResultCard label="Standard Total Interest" value={money(results.standardTotalInterest)} />
            <ResultCard label="Biweekly Total Interest" value={money(results.biweeklyTotalInterest)} accent="green" />
          </div>
          <div className="mt-4 rounded-lg bg-green/5 border border-green/30 p-4">
            <p className="text-sm font-medium text-navy">
              Biweekly saves {money(results.interestSaved)} and pays off {results.monthsSaved} months (~{formatNumber(results.monthsSaved / 12, 1)} years) earlier.
            </p>
          </div>
        </div>

        <AdSlot slotId="biweekly-mortgage-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Year-by-Year Comparison</h2>
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
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Standard Balance</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Biweekly Balance</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Interest Saved</th>
                </tr>
              </thead>
              <tbody>
                {results.yearlyTable.map((row) => (
                  <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.standardBalance)}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{money(row.biweeklyBalance)}</td>
                    <td className="px-4 py-2.5 text-right text-green">{money(row.cumulativeInterestSaved)}</td>
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
