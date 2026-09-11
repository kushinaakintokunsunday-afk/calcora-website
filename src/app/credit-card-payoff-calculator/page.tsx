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
    question: "How long does it take to pay off a credit card?",
    answer: "With a fixed monthly payment, the payoff time depends on your balance, APR, and how much you pay above the minimum. Paying only the minimum can take decades; doubling your payment usually cuts the term in half or better.",
  },
  {
    question: "Why does interest accrue daily on credit cards?",
    answer: "Most cards calculate a daily interest rate by dividing the APR by 365. Interest accrues at that daily rate on the outstanding balance between billing periods, which is why clearing your balance in full each month costs nothing.",
  },
  {
    question: "Is it better to pay off or consolidate credit card debt?",
    answer: "A balance transfer or personal loan at a lower APR can save money, but the surest win is a payment plan you stick to. Compare the interest saved versus any balance transfer or origination fees before switching.",
  },
  {
    question: "How much should I pay each month?",
    answer: "Beyond covering interest, aim to pay more than 1% of the balance plus interest each month. Tools like the avalanche and snowball methods on our blog can help you prioritize multiple cards.",
  },
];

const RELATED_TOOLS = [
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/personal-loan-calculator/", label: "Personal Loan" },
  { href: "/loan-comparison-calculator/", label: "Loan Comparison" },
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
];

export default function CreditCardPayoffCalculator() {
  const { money } = useMoney("credit-card-payoff-calculator");
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22.99);
  const [monthlyPayment, setMonthlyPayment] = useState(200);

  const results = useMemo(() => {
    const start = Math.max(0, balance);
    const rate = Math.max(0, apr);
    const payment = Math.max(0, monthlyPayment);
    const dailyRate = rate / 100 / 365;

    // Payment applies after a month of daily compounding.
    let months = 0;
    let totalInterest = 0;
    let remaining = start;
    while (remaining > 0 && months < 600) {
      months++;
      const interest = remaining * (Math.pow(1 + dailyRate, 30) - 1);
      totalInterest += interest;
      let applied = payment - interest;
      if (applied <= 0) {
        applied = 0;
        remaining += interest;
        continue;
      }
      remaining = Math.max(0, remaining - applied);
      if (remaining < 0.01) remaining = 0;
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      months,
      totalInterest,
      totalPaid: start + totalInterest,
      payoffDate,
      minimumCoversInterest: payment > start * dailyRate * 30,
    };
  }, [balance, apr, monthlyPayment]);

  const years = Math.floor(results.months / 12);
  const monthsRemainder = results.months % 12;
  const duration =
    results.months === 600
      ? "600+ months"
      : `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${monthsRemainder} mo`;

  return (
    <>
      <WebApplicationSchema
        name="Credit Card Payoff Calculator"
        url="https://calcora.website/credit-card-payoff-calculator/"
        description="See how long it will take to pay off your credit card balance and how much interest you will pay."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Credit Card Payoff Calculator", url: "https://calcora.website/credit-card-payoff-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Credit Card Payoff Calculator"
        description="Find out how many months it takes to clear your balance and the total interest you will pay."
        formula="Monthly interest ≈ balance × ((1 + APR/365)^30 − 1). The balance is reduced by your payment after interest accrues each month."
        example="A $5,000 balance at 22.99% APR with a $200 monthly payment: about 34 months and roughly $1,680 in interest."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Credit Card Payoff Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="cc-balance"
            label="Current Balance"
            prefix="$"
            value={balance}
            onChange={setBalance}
            min={0}
            step={100}
          />
          <NumberInput
            id="cc-apr"
            label="APR"
            suffix="%"
            value={apr}
            onChange={setApr}
            min={0}
            max={40}
            step={0.01}
          />
          <NumberInput
            id="cc-payment"
            label="Monthly Payment"
            prefix="$"
            value={monthlyPayment}
            onChange={setMonthlyPayment}
            min={0}
            step={10}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard label="Payoff Time" value={duration} accent="navy" />
          <ResultCard label="Payoff Date" value={results.payoffDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })} sub="Estimated" />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} accent="green" />
          <ResultCard label="Total Paid" value={money(results.totalPaid)} sub="Balance + interest" />
        </div>

        {!results.minimumCoversInterest && results.months === 600 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
            Your payment is less than the monthly interest, so the balance will keep growing. Increase your payment to make progress.
          </div>
        )}

        <AdSlot slotId="credit-card-payoff-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}