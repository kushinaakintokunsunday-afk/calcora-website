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
    question: "How does monthly compounding help me reach my goal faster?",
    answer:
      "Interest compounds monthly, so you earn interest on both your deposits and previously earned interest. The earlier you start and the more you save monthly, the faster your balance accelerates toward the goal.",
  },
  {
    question: "How much should I save each month?",
    answer:
      "A common rule is 15–20% of your income toward long-term savings. Use this calculator's monthly-contribution estimate by entering your goal, timeline, and expected return to find the exact amount for your situation.",
  },
  {
    question: "What return should I assume for savings?",
    answer:
      "High-yield savings accounts and CDs currently pay around 3–5%. Broad stock-market index funds have historically returned 7–10% per year before inflation, but they carry risk. Use a conservative figure if the goal is short-term.",
  },
  {
    question: "What's the difference between this and a compound interest calculator?",
    answer:
      "A plain compound interest calculator projects a single lump sum growing. This savings goal calculator also includes regular monthly contributions, so it is designed for building toward a specific target.",
  },
  {
    question: "Should I count inflation against my savings goal?",
    answer:
      "Yes, for goals more than a few years away. Saving $20,000 for a car today buys more car than $20,000 of savings ten years from now. Consider inflating your target amount before calculating.",
  },
  {
    question: "What happens if I miss a contribution month?",
    answer:
      "Missing a contribution simply delays the goal by roughly that month, plus a small amount of lost compounding interest. Consistent, automatic contributions are the surest way to stay on schedule.",
  },
];

const RELATED_TOOLS = [
  { href: "/savings-goal-calculator/", label: "Savings Goal Calculator" },
  { href: "/compound-savings-calculator/", label: "Compound Savings Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

const MONTHS_CAP = 1200;

function monthsToGoal(
  current: number,
  target: number,
  monthly: number,
  annualRate: number
): { months: number; contributions: number; interest: number } {
  let balance = Math.max(0, current);
  let contributions = 0;
  const i = annualRate / 100 / 12;
  let month = 0;

  while (balance < target && month < MONTHS_CAP) {
    month++;
    balance += monthly;
    contributions += monthly;
    if (i > 0) balance *= 1 + i;
  }

  return { months: month, contributions, interest: Math.max(0, balance - contributions - Math.max(0, current)) };
}

export default function SavingsGoalCalculator() {
  const { money } = useMoney("savings-goal-calculator");
  const [current, setCurrent] = useState(5000);
  const [target, setTarget] = useState(50000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(5);

  const results = useMemo(() => {
    const goal = monthsToGoal(current, target, monthly, rate);
    const years = goal.months / 12;
    return { ...goal, years };
  }, [current, target, monthly, rate]);

  const reached = results.months < MONTHS_CAP;

  const handleDownload = () => {
    const rows: [string, string, string, string][] = [];
    let balance = Math.max(0, current);
    let contributions = 0;
    const i = rate / 100 / 12;
    let month = 0;
    while (month < results.months) {
      month++;
      balance += monthly;
      contributions += monthly;
      if (i > 0) balance *= 1 + i;
      rows.push([String(month), (balance - contributions).toFixed(2), (balance - Math.max(0, current)).toFixed(2), balance.toFixed(2)]);
    }
    downloadCSV(
      "savings-goal-projection.csv",
      ["Month", "Contributions", "Interest Earned", "Balance"],
      rows
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Savings Goal Calculator"
        url="https://calcora.website/savings-goal-calculator/"
        description="Find out how long it takes to reach a savings goal with monthly contributions and interest."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Savings Goal Calculator", url: "https://calcora.website/savings-goal-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Savings Goal Calculator"
        description="Enter what you've saved, what you're adding each month, and the expected return to see exactly when you'll hit your target."
        formula="FV = PV(1+i)^n + PMT × ((1+i)^n − 1)/i, solved for n"
        example="You have $5,000 saved and add $300/month at 5% annual interest. To reach $50,000: it takes about 10 years, with roughly $41,000 of contributions and $4,000 of interest."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Savings Goal Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <NumberInput
            id="sg-current"
            label="Current Savings ($)"
            value={current}
            onChange={setCurrent}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="sg-target"
            label="Savings Goal ($)"
            value={target}
            onChange={setTarget}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="sg-monthly"
            label="Monthly Contribution ($)"
            value={monthly}
            onChange={setMonthly}
            min={0}
            step={50}
            prefix="$"
          />
          <NumberInput
            id="sg-rate"
            label="Expected Annual Return (%)"
            value={rate}
            onChange={setRate}
            min={0}
            max={20}
            step={0.25}
            suffix="%"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          {reached ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ResultCard label="Time to Reach Goal" value={`${results.months} months`} accent="navy" sub={`≈ ${formatNumber(results.years, 1)} years`} />
                <ResultCard label="Total Contributions" value={money(results.contributions)} />
                <ResultCard label="Interest Earned" value={money(results.interest)} accent="green" />
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="mt-4 text-sm text-green hover:text-green-dark font-medium"
              >
                Download Monthly Projection (CSV)
              </button>
            </>
          ) : (
            <p className="text-sm text-text-secondary">
              Your contributions are too low to reach this goal within {Math.floor(MONTHS_CAP / 12)} years at this rate. Try a higher monthly contribution or a longer timeline.
            </p>
          )}
        </div>

        <AdSlot slotId="savings-goal-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}