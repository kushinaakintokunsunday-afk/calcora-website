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
  { label: "36 months", value: 36 },
  { label: "48 months", value: 48 },
  { label: "60 months", value: 60 },
  { label: "72 months", value: 72 },
];

const FAQS = [
  {
    question: "How much car can I afford?",
    answer: "As a general rule, your total car payment should not exceed 10-15% of your gross monthly income, and the loan term should stay under 60 months to avoid negative equity. This calculator works backwards from your budgeted payment to find the maximum loan and sticker price.",
  },
  {
    question: "Should I include a down payment?",
    answer: "Yes. A larger down payment reduces the amount you finance and can lower your interest rate. A healthy down payment is 20% of the car's price, though 10% is common. Every dollar down is a dollar you do not pay interest on.",
  },
  {
    question: "What costs should I budget beyond the monthly payment?",
    answer: "Insurance, fuel, maintenance, registration, and taxes usually add 15-30% on top of your payment. Many experts suggest your total car-related costs (payment, insurance, fuel) stay under 20% of gross monthly income.",
  },
  {
    question: "Is a longer loan term better?",
    answer: "Longer terms lower your monthly payment but increase total interest and raise the risk of being 'underwater' (owing more than the car is worth). A shorter term with a payment you can afford is almost always the smarter choice.",
  },
];

const RELATED_TOOLS = [
  { href: "/auto-loan-calculator/", label: "Auto Loan" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/personal-loan-calculator/", label: "Personal Loan" },
  { href: "/loan-comparison-calculator/", label: "Loan Comparison" },
];

export default function CarAffordabilityCalculator() {
  const { money } = useMoney("car-affordability-calculator");
  const [monthlyBudget, setMonthlyBudget] = useState(500);
  const [annualRate, setAnnualRate] = useState(6);
  const [termMonths, setTermMonths] = useState<string>("60");
  const [downPayment, setDownPayment] = useState(2000);

  const results = useMemo(() => {
    const budget = Math.max(0, monthlyBudget);
    const rate = Math.max(0, annualRate);
    const months = Math.max(1, parseInt(termMonths) || 60);
    const down = Math.max(0, downPayment);
    const r = rate / 100 / 12;

    let maxLoan = 0;
    if (r > 0) {
      maxLoan = (budget * (1 - Math.pow(1 + r, -months))) / r;
    } else {
      maxLoan = budget * months;
    }

    const totalPayments = budget * months;
    const totalInterest = totalPayments - maxLoan;
    const maxCarPrice = maxLoan + down;

    return { maxLoan, maxCarPrice, totalPayments, totalInterest };
  }, [monthlyBudget, annualRate, termMonths, downPayment]);

  return (
    <>
      <WebApplicationSchema
        name="Car Affordability Calculator"
        url="https://calcora.website/car-affordability-calculator/"
        description="Find the maximum car price you can afford based on your monthly budget, trade-in, and loan term."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Car Affordability Calculator", url: "https://calcora.website/car-affordability-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Car Affordability Calculator"
        description="Work backwards from a comfortable monthly payment to find the max car price you can afford."
        formula="PV = M × (1 − (1+r)^−n) / r, where M is the monthly payment, r is the monthly rate, and n is the number of months. Car price = loan + down payment."
        example="With a $500 monthly budget at 6% over 60 months and a $2,000 down payment: max loan ≈ $25,862, max car ≈ $27,862."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Car Affordability Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="ca-budget"
            label="Monthly Payment Budget"
            prefix="$"
            value={monthlyBudget}
            onChange={setMonthlyBudget}
            min={0}
            step={25}
          />
          <NumberInput
            id="ca-rate"
            label="Annual Interest Rate"
            suffix="%"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={25}
            step={0.1}
          />
          <SelectInput
            id="ca-term"
            label="Loan Term"
            value={termMonths}
            onChange={setTermMonths}
            options={TERM_OPTIONS}
          />
          <NumberInput
            id="ca-down"
            label="Down Payment"
            prefix="$"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            step={500}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
          <ResultCard label="Max Car Price" value={money(results.maxCarPrice)} accent="navy" sub="Loan + down payment" />
          <ResultCard label="Max Loan Amount" value={money(results.maxLoan)} accent="green" sub="Before down payment" />
        </div>

        <p className="text-sm text-text-muted mb-6">
          Excludes taxes, registration, and dealer fees. Budget 15-30% extra on top of your payment for insurance, fuel, and maintenance.
        </p>

        <AdSlot slotId="car-affordability-mid" className="my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultCard label="Total Payments" value={money(results.totalPayments)} sub={`${termMonths} months`} />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} sub="Over the loan term" />
        </div>
      </CalculatorShell>
    </>
  );
}