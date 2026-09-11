"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const TERM_OPTIONS = [
  { label: "10 years (Standard)", value: 120 },
  { label: "15 years", value: 180 },
  { label: "20 years", value: 240 },
  { label: "25 years (Extended)", value: 300 },
];

const FAQS = [
  {
    question: "What is the standard repayment plan for federal student loans?",
    answer: "The Standard Repayment Plan spreads your payment evenly over 10 years, which usually results in the lowest total interest cost. Income-driven plans lower your monthly payment but extend the term and increase total interest paid.",
  },
  {
    question: "How is a student loan monthly payment calculated?",
    answer: "The standard amortization formula M = P × r(1+r)^n / ((1+r)^n − 1) is used, where P is the balance, r is the monthly interest rate, and n is the number of months. Your payment depends on the balance, interest rate, and repayment term.",
  },
  {
    question: "Should I refinance or consolidate my student loans?",
    answer: "Consolidation combines federal loans into a single Direct Consolidation Loan (keeping federal benefits). Refinancing with a private lender can lower your rate, but you lose federal protections like income-driven repayment and loan forgiveness.",
  },
  {
    question: "Does paying extra on a student loan help?",
    answer: "Yes. Extra payments reduce the principal balance directly, which shortens the term and lowers total interest. Check that your extra payments are applied to principal rather than future payments.",
  },
];

const RELATED_TOOLS = [
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/personal-loan-calculator/", label: "Personal Loan" },
  { href: "/simple-interest-calculator/", label: "Simple Interest" },
];

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function StudentLoanCalculator() {
  const { money } = useMoney("student-loan-calculator");
  const [balance, setBalance] = useState(35000);
  const [annualRate, setAnnualRate] = useState(5.5);
  const [termMonths, setTermMonths] = useState<string>("120");

  const results = useMemo(() => {
    const loan = Math.max(0, balance);
    const rate = Math.max(0, annualRate);
    const months = Math.max(1, parseInt(termMonths) || 120);
    const r = rate / 100 / 12;

    let monthlyPayment = 0;
    if (r > 0) {
      monthlyPayment = (loan * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    } else if (months > 0) {
      monthlyPayment = loan / months;
    }

    const totalRepaid = monthlyPayment * months;
    const totalInterest = totalRepaid - loan;

    const schedule: MonthRow[] = [];
    let outstanding = loan;
    for (let month = 1; month <= months; month++) {
      if (outstanding <= 0) break;
      const interest = outstanding * r;
      const principal = Math.min(monthlyPayment - interest, outstanding);
      outstanding -= principal;
      if (outstanding < 0.01) outstanding = 0;
      schedule.push({ month, payment: monthlyPayment, principal, interest, balance: outstanding });
    }

    return { monthlyPayment, totalRepaid, totalInterest, schedule };
  }, [balance, annualRate, termMonths]);

  const handleDownload = () => {
    downloadCSV(
      "student-loan-amortization.csv",
      ["Month", "Payment", "Principal", "Interest", "Balance"],
      results.schedule.map((row) => [
        row.month,
        row.payment.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Student Loan Calculator"
        url="https://calcora.website/student-loan-calculator/"
        description="Estimate your federal or private student loan monthly payment and see a full payoff schedule."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Student Loan Calculator", url: "https://calcora.website/student-loan-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Student Loan Calculator"
        description="Estimate your monthly student loan payment and total interest for any balance, rate, and term."
        formula="M = P × r(1+r)^n / ((1+r)^n − 1), where P is the balance, r is the monthly rate, and n is the number of months."
        example="A $35,000 loan at 5.5% over 10 years (120 months): monthly ≈ $379.82, total interest ≈ $10,578.06."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Student Loan Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="sl-balance"
            label="Loan Balance"
            prefix="$"
            value={balance}
            onChange={setBalance}
            min={0}
            step={1000}
          />
          <NumberInput
            id="sl-rate"
            label="Annual Interest Rate"
            suffix="%"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={30}
            step={0.1}
          />
          <SelectInput
            id="sl-term"
            label="Repayment Term"
            value={termMonths}
            onChange={setTermMonths}
            options={TERM_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <ResultCard label="Monthly Payment" value={money(results.monthlyPayment)} accent="navy" />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} accent="green" />
          <ResultCard label="Total Repaid" value={money(results.totalRepaid)} sub="Principal + interest" />
        </div>

        <AdSlot slotId="student-loan-mid" className="my-8" />

        {results.schedule.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Payoff Schedule</h2>
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
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((row) => (
                    <tr key={row.month} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.month}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.payment)}</td>
                      <td className="px-4 py-2.5 text-right text-green">{money(row.principal)}</td>
                      <td className="px-4 py-2.5 text-right text-text-secondary">{money(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CalculatorShell>
    </>
  );
}