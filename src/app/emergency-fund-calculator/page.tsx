"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "How much should I have in my emergency fund?",
    answer:
      "Most experts recommend saving three to six months of essential living expenses. If you have irregular income, are self-employed, or have dependents, aim for six to twelve months for extra security.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer:
      "Keep it in a liquid, easily accessible account such as a high-yield savings account or money market fund. You want to avoid investments that could lose value or have withdrawal restrictions.",
  },
  {
    question: "Is three months or six months the right target?",
    answer:
      "Three months is a reasonable bare minimum if you have stable employment and few dependents. Six months provides a stronger safety net. Your ideal amount depends on job stability, health, family size, and monthly obligations.",
  },
  {
    question: "Should my emergency fund earn interest?",
    answer:
      "Yes — while safety and liquidity come first, a high-yield savings account can help your emergency fund keep pace with inflation. Even a small interest rate makes a difference over time.",
  },
  {
    question: "How do I rebuild my emergency fund after using it?",
    answer:
      "Treat your emergency fund contribution as a non-negotiable monthly expense. Start with whatever you can afford, even if it is small, and increase the amount as your income grows or debts are paid off.",
  },
  {
    question: "Should I build an emergency fund or pay off debt first?",
    answer:
      "Financial experts generally recommend building a starter emergency fund of at least $1,000 before aggressively paying down high-interest debt. Once the debt is under control, focus on growing the fund to your target amount.",
  },
];

const RELATED_TOOLS = [
  { href: "/savings-goal-calculator/", label: "Savings Goal Calculator" },
  { href: "/net-worth-calculator/", label: "Net Worth Calculator" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff Calculator" },
];

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500);
  const [targetMonths, setTargetMonths] = useState("6");
  const [currentlySaved, setCurrentlySaved] = useState(2000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [interestRate, setInterestRate] = useState(4);

  const results = useMemo(() => {
    const expenses = Math.max(0, monthlyExpenses);
    const months = parseInt(targetMonths, 10) || 6;
    const saved = Math.max(0, currentlySaved);
    const contribution = Math.max(0, monthlyContribution);
    const rate = Math.max(0, interestRate) / 100;

    const target = expenses * months;
    const gap = Math.max(0, target - saved);

    if (gap === 0) {
      return {
        target,
        gap: 0,
        monthsToBuild: 0,
        alreadyFunded: true,
        totalInterest: 0,
        totalContributions: 0,
      };
    }

    const monthlyRate = rate / 12;
    let balance = saved;
    let monthsToBuild = 0;
    let totalInterest = 0;

    while (balance < target && monthsToBuild < 1200) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance += interest + contribution;
      monthsToBuild++;
    }

    const years = Math.floor(monthsToBuild / 12);
    const remainingMonths = monthsToBuild % 12;
    const timeLabel =
      monthsToBuild >= 1200
        ? "Over 100 years"
        : years > 0
          ? `${monthsToBuild} months (~${formatNumber(years + remainingMonths / 12, 1)} yrs)`
          : `${monthsToBuild} months`;

    const totalContributions = contribution * monthsToBuild;

    return {
      target,
      gap,
      monthsToBuild,
      alreadyFunded: false,
      totalInterest,
      totalContributions,
      timeLabel,
    };
  }, [monthlyExpenses, targetMonths, currentlySaved, monthlyContribution, interestRate]);

  return (
    <>
      <WebApplicationSchema
        name="Emergency Fund Calculator"
        url="https://calcora.website/emergency-fund-calculator/"
        description="Find out how much you need for an emergency fund and how long it will take to save."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Emergency Fund Calculator", url: "https://calcora.website/emergency-fund-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Emergency Fund Calculator"
        description="Work out your target emergency fund and see how long it will take to build based on your current savings and monthly contributions."
        formula="Target = Monthly Expenses × Target Months"
        example="$3,500/mo expenses × 6 months = $21,000 target. If you have $2,000 saved and add $300/mo at 4% APY, it takes about 48 months to reach your goal."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Emergency Fund Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="ef-monthly-expenses"
            label="Monthly Expenses"
            value={monthlyExpenses}
            onChange={setMonthlyExpenses}
            min={0}
            step={100}
            prefix="$"
          />
          <SelectInput
            id="ef-target-months"
            label="Target Months of Expenses"
            value={targetMonths}
            onChange={setTargetMonths}
            options={[
              { label: "3 months", value: "3" },
              { label: "6 months", value: "6" },
              { label: "9 months", value: "9" },
              { label: "12 months", value: "12" },
            ]}
          />
          <NumberInput
            id="ef-currently-saved"
            label="Currently Saved"
            value={currentlySaved}
            onChange={setCurrentlySaved}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="ef-monthly-contribution"
            label="Monthly Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min={0}
            step={50}
            prefix="$"
          />
          <NumberInput
            id="ef-interest-rate"
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.25}
            suffix="%"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Emergency Fund Target" value={formatCurrency(results.target)} accent="navy" />
            <ResultCard
              label="Remaining Gap"
              value={results.gap === 0 ? "Fully Funded" : formatCurrency(results.gap)}
              accent={results.gap === 0 ? "green" : "default"}
            />
            <ResultCard
              label="Time to Build"
              value={results.alreadyFunded ? "Already funded" : results.timeLabel!}
            />
            {!results.alreadyFunded && (
              <ResultCard label="Total Interest Earned" value={formatCurrency(results.totalInterest)} accent="green" />
            )}
          </div>
        </div>

        <div className="rounded-lg border border-green/30 bg-green/5 p-4 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            <span className="font-medium text-navy">Recommended targets:</span> A bare-minimum emergency fund covers 1 month of expenses. A solid safety net is 3–6 months, and a conservative fund for self-employed or single-income households is 6–12 months.
          </p>
        </div>

        <AdSlot slotId="emergency-fund-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}
