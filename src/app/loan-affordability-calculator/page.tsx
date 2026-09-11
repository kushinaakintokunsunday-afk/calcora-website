"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";

type Mode = "max-loan" | "monthly-payment";

const FAQS = [
  {
    question: "How much house can I afford with a $1,000 monthly payment?",
    answer: "It depends on your interest rate and loan term. At 7% over 30 years, a $1,000 monthly payment supports a loan of about $150,030. A lower interest rate or longer term increases the amount you can borrow.",
  },
  {
    question: "What is the 28/36 rule for loan affordability?",
    answer: "The 28/36 rule suggests spending no more than 28% of gross monthly income on housing costs and no more than 36% on total debt payments. This helps ensure you don't overextend yourself.",
  },
  {
    question: "Does a longer loan term mean I can borrow more?",
    answer: "Yes. A 30-year term spreads payments over more months, reducing the monthly payment for a given loan amount — or conversely, allowing a larger loan for the same monthly payment. However, you pay significantly more interest over the life of the loan.",
  },
  {
    question: "How does my interest rate affect borrowing power?",
    answer: "Even small changes in interest rate have a large impact. At 6% over 30 years, a $1,500/month payment supports a $250,000 loan. At 8%, the same payment only supports about $204,000.",
  },
  {
    question: "Should I pay points to lower my interest rate?",
    answer: "Buying discount points lowers your rate and monthly payment but requires upfront cash. Each point typically costs 1% of the loan amount and reduces the rate by about 0.25%. It usually pays off if you keep the loan for more than 5 years.",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/emi-calculator/", label: "EMI Calculator" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
];

function calcMaxLoan(monthlyPayment: number, annualRate: number, years: number) {
  if (monthlyPayment <= 0 || years <= 0) return { maxLoan: 0, totalPaid: 0, totalInterest: 0 };
  if (annualRate === 0) {
    const totalPaid = monthlyPayment * years * 12;
    return { maxLoan: totalPaid, totalPaid, totalInterest: 0 };
  }
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  const maxLoan = monthlyPayment * ((factor - 1) / (r * factor));
  const totalPaid = monthlyPayment * n;
  return { maxLoan, totalPaid, totalInterest: totalPaid - maxLoan };
}

function calcMonthlyPayment(loanAmount: number, annualRate: number, years: number) {
  if (loanAmount <= 0 || years <= 0) return { monthlyPayment: 0, totalPaid: 0, totalInterest: 0 };
  if (annualRate === 0) {
    const monthlyPayment = loanAmount / (years * 12);
    return { monthlyPayment, totalPaid: loanAmount, totalInterest: 0 };
  }
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  const monthlyPayment = loanAmount * ((r * factor) / (factor - 1));
  const totalPaid = monthlyPayment * n;
  return { monthlyPayment, totalPaid, totalInterest: totalPaid - loanAmount };
}

export default function LoanAffordabilityCalculator() {
  const { money } = useMoney("loan-affordability-calculator");
  const [mode, setMode] = useState<Mode>("max-loan");
  const [monthlyPayment, setMonthlyPayment] = useState(1000);
  const [loanAmount, setLoanAmount] = useState(250000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(30);

  const maxLoanResult = useMemo(() => calcMaxLoan(monthlyPayment, rate, years), [monthlyPayment, rate, years]);
  const paymentResult = useMemo(() => calcMonthlyPayment(loanAmount, rate, years), [loanAmount, rate, years]);

  const results = mode === "max-loan" ? maxLoanResult : paymentResult;

  return (
    <>
      <WebApplicationSchema
        name="Loan Affordability Calculator"
        url="https://calcora.website/loan-affordability-calculator/"
        description="Find out how much you can borrow or calculate your monthly loan payment with our free loan affordability calculator."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Loan Affordability Calculator", url: "https://calcora.website/loan-affordability-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Loan Affordability Calculator"
        description="Find out how much you can borrow based on your budget, or calculate the monthly payment for a given loan amount."
        formula={
          mode === "max-loan"
            ? "L = M × [(1+r)^n - 1] / [r(1+r)^n]"
            : "M = P × r(1+r)^n / [(1+r)^n - 1]"
        }
        example={
          mode === "max-loan"
            ? "With $1,000/month at 7% over 30 years: L = 1,000 × [(1.00583)^360 - 1] / [0.00583 × (1.00583)^360] = $150,030. You pay $360,000 total with $209,970 in interest."
            : "For a $250,000 loan at 7% over 30 years: M = 250,000 × 0.00583 × (1.00583)^360 / [(1.00583)^360 - 1] = $1,663.26/month. You pay $598,774 total with $348,774 in interest."
        }
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Loan Affordability Calculator" }]}
      >
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode("max-loan")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "max-loan"
                ? "bg-green text-white"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
            }`}
          >
            How much can I borrow?
          </button>
          <button
            type="button"
            onClick={() => setMode("monthly-payment")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "monthly-payment"
                ? "bg-green text-white"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
            }`}
          >
            What&apos;s my monthly payment?
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {mode === "max-loan" ? (
            <div>
              <label htmlFor="la-monthly-payment" className="block text-sm font-medium text-text-primary mb-1">
                Max Monthly Payment ($)
              </label>
              <input
                id="la-monthly-payment"
                type="number"
                min={0}
                step={50}
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="la-loan-amount" className="block text-sm font-medium text-text-primary mb-1">
                Loan Amount ($)
              </label>
              <input
                id="la-loan-amount"
                type="number"
                min={0}
                step={1000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
              />
            </div>
          )}
          <div>
            <label htmlFor="la-rate" className="block text-sm font-medium text-text-primary mb-1">
              Interest Rate (%)
            </label>
            <input
              id="la-rate"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="la-years" className="block text-sm font-medium text-text-primary mb-1">
              Loan Term (years)
            </label>
            <input
              id="la-years"
              type="number"
              min={1}
              max={50}
              step={1}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 1)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-text-secondary">
                {mode === "max-loan" ? "Max Loan Amount" : "Monthly Payment"}
              </p>
              <p className="text-2xl font-bold text-navy">
                {money(mode === "max-loan" ? maxLoanResult.maxLoan : paymentResult.monthlyPayment)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Amount Paid</p>
              <p className="text-2xl font-bold text-navy">{money(results.totalPaid)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Interest</p>
              <p className="text-2xl font-bold text-green">{money(results.totalInterest)}</p>
            </div>
          </div>
        </div>
      </CalculatorShell>

      <AdSlot slotId="loan-affordability-mid" className="my-8" />
    </>
  );
}
