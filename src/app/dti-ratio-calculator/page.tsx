"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is a good debt-to-income ratio?",
    answer:
      "Most lenders prefer a total DTI ratio of 36% or less. Ratios between 36% and 43% are acceptable to many lenders, while anything above 43% usually makes it hard to qualify for a mortgage. For FHA loans, the typical cap is 43%.",
  },
  {
    question: "What is the difference between front-end and back-end DTI?",
    answer:
      "Front-end DTI looks only at your housing costs (rent or mortgage, taxes, and insurance) divided by gross income. Back-end DTI includes all monthly debt payments: housing, car loans, student loans, and credit-card minimums. Lenders focus on back-end DTI.",
  },
  {
    question: "Which payments count toward DTI?",
    answer:
      "Lenders count your housing payment, car and personal loans, student loans, credit-card minimums, alimony and child support, and other installment debt. Costs like utilities, groceries, and insurance that aren't part of your mortgage payment are usually excluded.",
  },
  {
    question: "How can I lower my debt-to-income ratio?",
    answer:
      "Pay down balances, pay off or consolidate high-interest debts, avoid taking on new loans, or increase your income. Even raising your gross income with a side job lowers DTI without changing your debt.",
  },
  {
    question: "Does DTI affect my credit score?",
    answer:
      "No. Your credit score and DTI are separate measures. DTI compares your income to your debt load and is used mainly for loan underwriting, while your score reflects your repayment history and credit usage.",
  },
  {
    question: "Why do lenders use DTI instead of just my credit score?",
    answer:
      "A credit score measures how reliably you've repaid debt in the past. DTI measures whether you can realistically afford a new monthly payment today. Lenders use both to size the loan you qualify for.",
  },
];

const RELATED_TOOLS = [
  { href: "/loan-affordability-calculator/", label: "Loan Affordability Calculator" },
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff Calculator" },
];

function dtiStatus(totalDti: number): { label: string; tone: string } {
  if (totalDti <= 36) return { label: "Healthy — within most lender limits", tone: "text-green" };
  if (totalDti <= 43) return { label: "Borderline — may need a lower ratio to qualify", tone: "text-yellow-600" };
  return { label: "High — most lenders will struggle to approve you", tone: "text-red-500" };
}

export default function DTICalculator() {
  const [grossIncome, setGrossIncome] = useState(6000);
  const [housing, setHousing] = useState(1500);
  const [autoLoan, setAutoLoan] = useState(400);
  const [creditCards, setCreditCards] = useState(100);
  const [otherDebts, setOtherDebts] = useState(0);

  const results = useMemo(() => {
    const income = Math.max(0, grossIncome);
    const housingPayment = Math.max(0, housing);
    const totalDebts = Math.max(0, autoLoan) + Math.max(0, creditCards) + Math.max(0, otherDebts);
    const totalMonthlyDebt = housingPayment + totalDebts;

    const frontEnd = income > 0 ? (housingPayment / income) * 100 : 0;
    const backEnd = income > 0 ? (totalMonthlyDebt / income) * 100 : 0;

    return { frontEnd, backEnd, totalMonthlyDebt, status: dtiStatus(backEnd) };
  }, [grossIncome, housing, autoLoan, creditCards, otherDebts]);

  return (
    <>
      <WebApplicationSchema
        name="DTI Ratio Calculator"
        url="https://calcora.website/dti-ratio-calculator/"
        description="Calculate your debt-to-income ratio and see if you qualify for a loan."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "DTI Ratio Calculator", url: "https://calcora.website/dti-ratio-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Debt-to-Income (DTI) Ratio Calculator"
        description="Measure your monthly debt against your gross monthly income. Lenders use this ratio to decide how much house or loan you can afford."
        formula="DTI = (Total monthly debt payments ÷ Gross monthly income) × 100"
        example="Gross income $6,000, housing $1,500, car $400, cards $100, other $0: DTI = ($2,000 ÷ $6,000) × 100 = 33.3% — a healthy ratio within most lender limits."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "DTI Ratio Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="dti-income"
            label="Gross Monthly Income ($)"
            value={grossIncome}
            onChange={setGrossIncome}
            min={0}
            step={100}
            prefix="$"
          />
          <NumberInput
            id="dti-housing"
            label="Monthly Housing Payment ($)"
            value={housing}
            onChange={setHousing}
            min={0}
            step={50}
            prefix="$"
            placeholder="Rent or mortgage + taxes + insurance"
          />
          <NumberInput
            id="dti-auto"
            label="Car / Auto Loan ($)"
            value={autoLoan}
            onChange={setAutoLoan}
            min={0}
            step={25}
            prefix="$"
          />
          <NumberInput
            id="dti-cards"
            label="Credit Card Minimums ($)"
            value={creditCards}
            onChange={setCreditCards}
            min={0}
            step={25}
            prefix="$"
          />
          <NumberInput
            id="dti-other"
            label="Other Loan Payments ($)"
            value={otherDebts}
            onChange={setOtherDebts}
            min={0}
            step={25}
            prefix="$"
            placeholder="Student loans, personal loans, etc."
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard label="Total DTI (Back-End)" value={`${formatNumber(results.backEnd, 1)}%`} accent="navy" />
            <ResultCard label="Housing-Only DTI (Front-End)" value={`${formatNumber(results.frontEnd, 1)}%`} />
            <ResultCard label="Total Monthly Debt" value={`$${formatNumber(results.totalMonthlyDebt, 0)}`} />
          </div>
          <p className={`mt-4 text-sm font-medium ${results.status.tone}`}>{results.status.label}</p>
        </div>

        <AdSlot slotId="dti-mid" className="my-8" />

        <div className="rounded-lg border border-border bg-white p-5">
          <h2 className="text-lg font-semibold text-navy mb-3">What the Numbers Mean</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li><strong className="text-text-primary">36% or less</strong> — healthy; most lenders approve comfortably.</li>
            <li><strong className="text-text-primary">36% to 43%</strong> — borderline; you may qualify with a strong credit history.</li>
            <li><strong className="text-text-primary">Above 43%</strong> — high; most conventional and FHA loans won&apos;t approve without co-signers or debt reduction.</li>
          </ul>
        </div>
      </CalculatorShell>
    </>
  );
}