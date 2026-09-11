"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";
import { NumberInput } from "@/components/NumberInput";

const FAQS = [
  {
    question: "What is the debt avalanche method?",
    answer: "The avalanche method prioritizes paying off debts with the highest interest rate first. You make minimum payments on all debts, then put any extra money toward the highest-rate debt. This saves the most money on interest over time.",
  },
  {
    question: "What is the debt snowball method?",
    answer: "The snowball method prioritizes paying off the smallest balance first, regardless of interest rate. You make minimum payments on all debts, then put extra money toward the smallest balance. The quick wins provide psychological motivation to keep going.",
  },
  {
    question: "Which debt payoff method is better?",
    answer: "Mathematically, the avalanche method always wins because it minimizes total interest paid. However, the snowball method can be more effective for people who need quick wins to stay motivated. The best method is the one you'll stick with.",
  },
  {
    question: "How does a debt payoff calculator help?",
    answer: "It shows you exactly when you'll be debt-free, how much interest you'll pay, and how extra payments accelerate your payoff date. Seeing the numbers can motivate you to increase your monthly payment.",
  },
  {
    question: "Should I pay off debt or invest?",
    answer: "Generally, pay off high-interest debt (above 6-7%) first since guaranteed interest savings typically beat average investment returns. For low-interest debt like a mortgage, investing may be more beneficial. Consider your risk tolerance and tax situation.",
  },
  {
    question: "How much can extra payments save me?",
    answer: "Extra payments have a compounding effect. On a $15,000 balance at 18% APR with $500/month payments, adding just $100/month saves you thousands in interest and pays off the debt months earlier.",
  },
];

const RELATED_TOOLS = [
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
  { href: "/emi-calculator/", label: "EMI Calculator" },
];

interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

function calcPayoff(balance: number, apr: number, monthlyPayment: number) {
  if (balance <= 0 || monthlyPayment <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0, schedule: [] as ScheduleRow[] };
  }

  const monthlyRate = apr / 100 / 12;
  const schedule: ScheduleRow[] = [];
  let remaining = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  while (remaining > 0.005 && month < 600) {
    month++;
    const interestCharge = remaining * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interestCharge, remaining);
    if (principalPayment <= 0) {
      break;
    }
    remaining -= principalPayment;
    if (remaining < 0) remaining = 0;
    totalInterest += interestCharge;
    totalPaid += principalPayment + interestCharge;

    schedule.push({
      month,
      payment: principalPayment + interestCharge,
      principal: principalPayment,
      interest: interestCharge,
      balance: remaining,
    });
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + month);

  return {
    months: month,
    totalInterest,
    totalPaid,
    payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    schedule,
  };
}

export default function DebtPayoffCalculator() {
  const { money } = useMoney("debt-payoff-calculator");
  const [balance, setBalance] = useState(15000);
  const [apr, setApr] = useState(18);
  const [monthlyPayment, setMonthlyPayment] = useState(500);

  const result = useMemo(() => calcPayoff(balance, apr, monthlyPayment), [balance, apr, monthlyPayment]);

  const displaySchedule = useMemo(() => {
    const sched = result.schedule;
    if (sched.length === 0) return [];
    const rows: ScheduleRow[] = [];
    for (let i = 0; i < sched.length; i++) {
      const r = sched[i];
      if (i < 12 || i === sched.length - 1 || (r.month % 12 === 0)) {
        rows.push(r);
      }
    }
    return rows;
  }, [result.schedule]);

  const handleDownload = () => {
    downloadCSV(
      "debt-payoff-schedule.csv",
      ["Month", "Payment", "Principal", "Interest", "Remaining Balance"],
      result.schedule.map((r) => [r.month, r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.balance.toFixed(2)])
    );
  };

  const minPayment = balance > 0 ? Math.ceil(balance * (apr / 100 / 12) + 1) : 0;
  const isInsufficient = monthlyPayment <= balance * (apr / 100 / 12);

  return (
    <>
      <WebApplicationSchema
        name="Debt Payoff Calculator"
        url="https://calcora.website/debt-payoff-calculator/"
        description="Calculate how long it will take to pay off your debt and how much interest you'll pay with our free debt payoff calculator."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Debt Payoff Calculator", url: "https://calcora.website/debt-payoff-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Debt Payoff Calculator"
        description="Find out when you'll be debt-free, how much interest you'll pay, and the impact of increasing your monthly payment."
        formula="Each month: Interest = Balance × (APR / 12); Principal = Payment - Interest"
        example="For a $15,000 balance at 18% APR with $500/month payments: you'll pay off the debt in about 35 months, paying approximately $4,200 in interest. Increasing to $600/month saves over $1,000 in interest."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Debt Payoff Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="dp-balance"
            label="Outstanding Balance ($)"
            value={balance}
            onChange={setBalance}
            min={0}
            step={100}
            prefix="$"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
          />
          <NumberInput
            id="dp-apr"
            label="APR (%)"
            value={apr}
            onChange={setApr}
            min={0}
            max={100}
            step={0.1}
            suffix="%"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
          />
          <NumberInput
            id="dp-payment"
            label="Monthly Payment ($)"
            value={monthlyPayment}
            onChange={setMonthlyPayment}
            min={0}
            step={25}
            prefix="$"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
          />
          {isInsufficient && balance > 0 && (
            <p className="mt-1 text-xs text-red-600">
              Payment must be at least {money(minPayment)}/month to cover interest.
            </p>
          )}
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Payoff Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Months to Payoff</p>
              <p className="text-2xl font-bold text-navy">
                {result.months > 0 ? `${result.months} months` : "—"}
              </p>
              {result.payoffDate && result.months > 0 && (
                <p className="text-xs text-text-muted mt-1">
                  {result.payoffDate}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Interest Paid</p>
              <p className="text-2xl font-bold text-green">{money(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Amount Paid</p>
              <p className="text-2xl font-bold text-navy">{money(result.totalPaid)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface/50 p-5 mb-8">
          <h2 className="text-lg font-semibold text-navy mb-3">Avalanche vs. Snowball</h2>
          <p className="text-sm text-text-secondary mb-3">
            For a single debt, both the avalanche and snowball methods produce the same result. The difference
            matters when you have <strong>multiple debts</strong> to prioritize.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-white border border-border p-4">
              <h3 className="font-medium text-navy mb-1">Avalanche Method</h3>
              <p className="text-sm text-text-secondary">
                Pay off the <strong>highest interest rate</strong> debt first. Saves the most money on interest.
                Best for minimizing total cost.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-border p-4">
              <h3 className="font-medium text-navy mb-1">Snowball Method</h3>
              <p className="text-sm text-text-secondary">
                Pay off the <strong>smallest balance</strong> first. Provides quick wins for motivation.
                Best for staying on track psychologically.
              </p>
            </div>
          </div>
        </div>

        {displaySchedule.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Payment Schedule</h2>
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
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Payment</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Principal</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Interest</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {displaySchedule.map((row) => (
                    <tr key={row.month} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.month}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.payment)}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.principal)}</td>
                      <td className="px-4 py-2.5 text-right text-green">{money(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CalculatorShell>

      <AdSlot slotId="debt-mid" className="my-8" />
    </>
  );
}
