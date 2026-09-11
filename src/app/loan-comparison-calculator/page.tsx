"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "How do I compare two loans fairly?",
    answer:
      "Compare all-in cost: monthly payment plus total interest plus fees. The lower monthly payment isn't always cheaper — a longer term lowers the payment but increases total interest. This calculator shows you both numbers side by side.",
  },
  {
    question: "Why is a loan's interest rate not the only thing that matters?",
    answer:
      "Loan terms and fees change the cost. A loan with a slightly higher rate but no origination fee can beat a lower-rate loan with a large fee — especially when you'd pay the fee for only a short period.",
  },
  {
    question: "Does the calculator include fees in the monthly payment?",
    answer:
      "Fees are added to the borrowed amount before the payment is calculated, so the monthly payment reflects the true cost of the loan — the same way an origination fee added to principal works in practice.",
  },
  {
    question: "Which loan should I choose if one has a lower payment?",
    answer:
      "Choose the loan with the lower total cost (principal + interest + fees) unless the smaller payment matters more to your monthly cash flow. Use the difference shown in the results to decide.",
  },
  {
    question: "Can I compare loans with different terms?",
    answer:
      "Yes. Enter a different number of years for each loan. The calculator shows total interest and total cost for each so you can see whether a shorter term is worth the higher payment.",
  },
  {
    question: "What is the 'total cost' of a loan?",
    answer:
      "Total cost is the full amount you repay: the money you borrowed, every dollar of interest over the life of the loan, and any fees. Comparing two loans by total cost is the fairest way to see which is cheaper.",
  },
];

const RELATED_TOOLS = [
  { href: "/loan-affordability-calculator/", label: "Loan Affordability Calculator" },
  { href: "/personal-loan-calculator/", label: "Personal Loan Calculator" },
  { href: "/auto-loan-calculator/", label: "Auto Loan Calculator" },
];

interface LoanInput {
  amount: number;
  rate: number;
  years: number;
  fees: number;
}

function loanCosts(loan: LoanInput) {
  const amount = Math.max(0, loan.amount);
  const fees = Math.max(0, loan.fees);
  const financed = amount + fees;
  const r = Math.max(0, loan.rate) / 100 / 12;
  const n = Math.max(0, Math.round(loan.years)) * 12;

  let monthly: number;
  if (n === 0) {
    monthly = financed;
  } else if (r === 0) {
    monthly = financed / n;
  } else {
    monthly = (financed * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthly * n;
  const totalInterest = totalPayment - financed;
  const totalCost = financed + totalInterest;
  return { financed, monthly, totalPayment, totalInterest, totalCost };
}

export default function LoanComparisonCalculator() {
  const { money } = useMoney("loan-comparison-calculator");
  const [loanA, setLoanA] = useState<LoanInput>({ amount: 25000, rate: 7, years: 4, fees: 0 });
  const [loanB, setLoanB] = useState<LoanInput>({ amount: 25000, rate: 5.5, years: 6, fees: 500 });

  const results = useMemo(() => {
    const a = loanCosts(loanA);
    const b = loanCosts(loanB);
    const monthlyDiff = Math.abs(a.monthly - b.monthly);
    const totalDiff = Math.abs(a.totalCost - b.totalCost);
    const cheaper = a.totalCost <= b.totalCost ? "A" : "B";
    return { a, b, monthlyDiff, totalDiff, cheaper };
  }, [loanA, loanB]);

  const updateA = (field: keyof LoanInput) => (v: number) => setLoanA((loan) => ({ ...loan, [field]: v }));
  const updateB = (field: keyof LoanInput) => (v: number) => setLoanB((loan) => ({ ...loan, [field]: v }));

  const loans = [
    { name: "Loan A", set: updateA, state: loanA },
    { name: "Loan B", set: updateB, state: loanB },
  ];

  return (
    <>
      <WebApplicationSchema
        name="Loan Comparison Calculator"
        url="https://calcora.website/loan-comparison-calculator/"
        description="Compare two loans side by side by monthly payment, total interest, and total cost."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Loan Comparison Calculator", url: "https://calcora.website/loan-comparison-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Loan Comparison Calculator"
        description="Put two loan offers head to head. See which has the lower payment, lower total interest, and lower total cost — including any fees."
        formula="M = P × r(1+r)^n / ((1+r)^n − 1); Total cost = financed + total interest"
        example="$25,000 at 7% for 4 years (no fees) versus $25,000 at 5.5% for 6 years with a $500 fee: Loan A costs about $593/month and $28,460 total; Loan B about $418/month and $30,110 total. Loan A is cheaper overall; Loan B has the lower payment."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Loan Comparison Calculator" }]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {loans.map((loan, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-white p-5">
              <h2 className="text-lg font-semibold text-navy mb-4">{loan.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  id={`cmp-${idx}-amount`}
                  label="Loan Amount ($)"
                  value={loan.state.amount}
                  onChange={loan.set("amount")}
                  min={0}
                  step={500}
                  prefix="$"
                />
                <NumberInput
                  id={`cmp-${idx}-rate`}
                  label="Annual Rate (%)"
                  value={loan.state.rate}
                  onChange={loan.set("rate")}
                  min={0}
                  max={30}
                  step={0.1}
                  suffix="%"
                />
                <NumberInput
                  id={`cmp-${idx}-years`}
                  label="Term (years)"
                  value={loan.state.years}
                  onChange={loan.set("years")}
                  min={1}
                  max={40}
                  step={1}
                  suffix="yrs"
                />
                <NumberInput
                  id={`cmp-${idx}-fees`}
                  label="Origination Fee ($)"
                  value={loan.state.fees}
                  onChange={loan.set("fees")}
                  min={0}
                  step={50}
                  prefix="$"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Side by Side</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-text-primary">Metric</th>
                  <th className="px-3 py-2 text-right font-medium text-navy">Loan A</th>
                  <th className="px-3 py-2 text-right font-medium text-green">Loan B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-3 py-2 text-text-secondary">Amount Financed (fees incl.)</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.a.financed)}</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.b.financed)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-3 py-2 text-text-secondary">Monthly Payment</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.a.monthly)}</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.b.monthly)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-3 py-2 text-text-secondary">Total Interest</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.a.totalInterest)}</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.b.totalInterest)}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-3 py-2 text-text-secondary">Total Cost</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.a.totalCost)}</td>
                  <td className="px-3 py-2 text-right text-text-primary">{money(results.b.totalCost)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 text-text-secondary font-medium">Winner</td>
                  <td className={`px-3 py-2 text-right font-medium ${results.cheaper === "A" ? "text-green" : "text-text-muted"}`}>
                    {results.cheaper === "A" ? "Cheaper" : "—"}
                  </td>
                  <td className={`px-3 py-2 text-right font-medium ${results.cheaper === "B" ? "text-green" : "text-text-muted"}`}>
                    {results.cheaper === "B" ? "Cheaper" : "—"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <ResultCard
              label="Differences"
              value={`${formatNumber((results.monthlyDiff / Math.max(results.a.monthly, results.b.monthly)) * 100, 0)}%`}
              sub={money(results.monthlyDiff)}
            />
            <ResultCard
              label="Loan B vs Loan A Total Cost"
              value={money(results.b.totalCost - results.a.totalCost)}
              accent={results.b.totalCost >= results.a.totalCost ? "default" : "green"}
              sub={results.b.totalCost >= results.a.totalCost ? "more expensive by" : "savings by choosing B"}
            />
          </div>
        </div>

        <AdSlot slotId="loan-comparison-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}