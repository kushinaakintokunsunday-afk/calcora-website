"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const TERM_OPTIONS = [
  { label: "15 years", value: 15 },
  { label: "20 years", value: 20 },
  { label: "25 years", value: 25 },
  { label: "30 years", value: 30 },
];

const FAQS = [
  {
    question: "When does refinancing a mortgage make sense?",
    answer: "Refinancing is usually worth it when you can drop your rate by 0.75% or more, or when switching from a 30-year to a 15-year term. It also makes sense if you have a high-rate FHA loan and can drop PMI with a conventional refinance.",
  },
  {
    question: "What is break-even on a refinance?",
    answer: "Break-even = closing costs ÷ monthly savings. If closing costs are $6,000 and you save $200 per month, it takes 30 months to recoup the cost. If you plan to stay in the home longer than that, the refinance pays for itself.",
  },
  {
    question: "Do I have to pay closing costs on a refinance?",
    answer: "Most lenders charge closing costs of 2-5% of the loan amount. Some offer 'no-cost' refis, but compensate with a higher interest rate. Always compare the total cost over the life of the loan, not just the monthly payment.",
  },
  {
    question: "Should I refinance if I plan to move soon?",
    answer: "Only if you will stay long enough to pass the break-even point. A general rule is to stay at least 3-5 years after refinancing to recoup the costs and start saving.",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage" },
  { href: "/biweekly-mortgage-calculator/", label: "Biweekly Mortgage" },
  { href: "/loan-comparison-calculator/", label: "Loan Comparison" },
  { href: "/amortization-calculator/", label: "Amortization" },
];

function mortgagePayment(principal: number, annualRate: number, termYears: number): number {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r <= 0 || n <= 0) return principal / Math.max(1, n);
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function MortgageRefinanceCalculator() {
  const { money } = useMoney("mortgage-refinance-calculator");
  const [balance, setBalance] = useState(280000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentYearsLeft, setCurrentYearsLeft] = useState(25);
  const [newRate, setNewRate] = useState(5.5);
  const [newTermYears, setNewTermYears] = useState<string>("30");
  const [closingCosts, setClosingCosts] = useState(5000);

  const results = useMemo(() => {
    const loan = Math.max(0, balance);
    const cr = Math.max(0, currentRate);
    const nr = Math.max(0, newRate);
    const term = Math.max(1, parseInt(newTermYears) || 30);
    const yearsLeft = Math.max(1, currentYearsLeft);
    const closing = Math.max(0, closingCosts);

    const currentPayment = mortgagePayment(loan, cr, yearsLeft);
    const newPayment = mortgagePayment(loan, nr, term);
    const monthlySavings = currentPayment - newPayment;
    const totalSavings = monthlySavings * term * 12;
    const netSavings = totalSavings - closing;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closing / monthlySavings) : 0;

    return { currentPayment, newPayment, monthlySavings, totalSavings, netSavings, breakEvenMonths };
  }, [balance, currentRate, currentYearsLeft, newRate, newTermYears, closingCosts]);

  const breakEvenYears = Math.floor(results.breakEvenMonths / 12);
  const breakEvenRemainder = results.breakEvenMonths % 12;
  const breakEvenLabel =
    results.monthlySavings <= 0
      ? "N/A"
      : results.breakEvenMonths === 0
        ? "Immediate"
        : `${breakEvenYears > 0 ? `${breakEvenYears} yr${breakEvenYears > 1 ? "s" : ""} ` : ""}${breakEvenRemainder} mo`;

  return (
    <>
      <WebApplicationSchema
        name="Mortgage Refinance Calculator"
        url="https://calcora.website/mortgage-refinance-calculator/"
        description="See how much you could save by refinancing your mortgage and find the break-even point."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Mortgage Refinance Calculator", url: "https://calcora.website/mortgage-refinance-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Mortgage Refinance Calculator"
        description="Compare your current mortgage to a new refinance offer and find the break-even point on closing costs."
        formula="Monthly = P × r(1+r)^n / ((1+r)^n − 1), then compare current vs new payment. Break-even = closing costs ÷ monthly savings."
        example="Refinancing $280k from 6.5% to 5.5% over 30 years with $5k closing costs: new payment ≈ $1,591, monthly savings ≈ $249, break-even ≈ 21 months."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Mortgage Refinance Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="rf-balance"
            label="Current Loan Balance"
            prefix="$"
            value={balance}
            onChange={setBalance}
            min={0}
            step={5000}
          />
          <NumberInput
            id="rf-current-rate"
            label="Current Interest Rate"
            suffix="%"
            value={currentRate}
            onChange={setCurrentRate}
            min={0}
            max={20}
            step={0.01}
          />
          <NumberInput
            id="rf-years-left"
            label="Current Term Remaining"
            value={currentYearsLeft}
            onChange={setCurrentYearsLeft}
            min={1}
            max={50}
            step={1}
          />
          <NumberInput
            id="rf-new-rate"
            label="New Interest Rate"
            suffix="%"
            value={newRate}
            onChange={setNewRate}
            min={0}
            max={20}
            step={0.01}
          />
          <SelectInput
            id="rf-new-term"
            label="New Term"
            value={newTermYears}
            onChange={setNewTermYears}
            options={TERM_OPTIONS}
          />
          <NumberInput
            id="rf-closing"
            label="Estimated Closing Costs"
            prefix="$"
            value={closingCosts}
            onChange={setClosingCosts}
            min={0}
            step={500}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ResultCard label="Current Payment" value={money(results.currentPayment)} accent="navy" />
          <ResultCard label="New Payment" value={money(results.newPayment)} accent="navy" />
          <ResultCard label="Monthly Savings" value={money(results.monthlySavings)} accent="green" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <ResultCard label="Break-even Time" value={breakEvenLabel} sub="Closing costs recouped" />
          <ResultCard label="Net Savings" value={money(results.netSavings)} sub={`Over ${newTermYears} years minus closing`} />
        </div>

        {results.monthlySavings <= 0 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            The new payment is higher than your current payment. The refinance increases your cost.
          </div>
        )}

        <AdSlot slotId="mortgage-refinance-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}