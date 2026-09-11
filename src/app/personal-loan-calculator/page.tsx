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
  { label: "12 months", value: 12 },
  { label: "24 months", value: 24 },
  { label: "36 months", value: 36 },
  { label: "48 months", value: 48 },
  { label: "60 months", value: 60 },
];

const FAQS = [
  {
    question: "What is a personal loan and how is it different from a credit card?",
    answer: "A personal loan provides a lump sum of money upfront that you repay in fixed monthly installments over a set term. A credit card offers a revolving line of credit you can draw from repeatedly. Personal loans typically have lower interest rates and a clear payoff date, while credit cards often carry higher APRs and can become a long-term debt trap if you only make minimum payments.",
  },
  {
    question: "What is an origination fee?",
    answer: "An origination fee is a one-time charge deducted from your loan amount by the lender to cover processing costs. For example, a 2% origination fee on a $15,000 loan means you receive $14,700 but repay the full $15,000 plus interest. It effectively increases your cost of borrowing, so compare the APR with and without the fee.",
  },
  {
    question: "What is a good interest rate for a personal loan?",
    answer: "A good personal loan rate depends on your credit score, income, and debt-to-income ratio. Borrowers with excellent credit (750+) can often secure rates between 6% and 9%. Average credit scores typically see rates from 10% to 15%. It is always worth shopping around and pre-qualifying with multiple lenders to find the best rate available to you.",
  },
  {
    question: "Does a personal loan affect my credit score?",
    answer: "Applying for a personal loan may cause a small temporary dip in your credit score due to a hard inquiry. However, consistently making on-time payments will positively impact your credit over time. Additionally, adding a personal loan can improve your credit mix, which is a factor in your credit score calculation.",
  },
  {
    question: "Can I pay off a personal loan early?",
    answer: "Many personal loans allow early payoff without a penalty, but some lenders charge a prepayment fee. Paying off early saves you money on interest. Always check your loan agreement for prepayment terms before committing to extra payments.",
  },
  {
    question: "What is the difference between a secured and unsecured personal loan?",
    answer: "An unsecured personal loan does not require collateral, meaning the lender cannot seize an asset if you default. A secured personal loan requires collateral such as a savings account, car, or other asset, which typically results in a lower interest rate. Unsecured loans are more common but may carry higher rates to offset the lender's risk.",
  },
];

const RELATED_TOOLS = [
  { href: "/emi-calculator/", label: "EMI Calculator" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/auto-loan-calculator/", label: "Auto Loan" },
];

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function PersonalLoanCalculator() {
  const { money } = useMoney("personal-loan-calculator");
  const [loanAmount, setLoanAmount] = useState(15000);
  const [annualRate, setAnnualRate] = useState(10.5);
  const [termMonths, setTermMonths] = useState<string>("36");
  const [originationFeePct, setOriginationFeePct] = useState(0);

  const results = useMemo(() => {
    const amount = Math.max(0, loanAmount);
    const rate = Math.max(0, annualRate);
    const months = Math.max(1, parseInt(termMonths) || 36);
    const feePct = Math.max(0, Math.min(100, originationFeePct));

    const feeAmount = amount * (feePct / 100);
    const effectiveAmount = amount - feeAmount;
    const r = rate / 100 / 12;

    let monthlyPayment = 0;
    if (r > 0 && months > 0) {
      monthlyPayment = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    } else if (months > 0) {
      monthlyPayment = amount / months;
    }

    const totalRepaid = monthlyPayment * months;
    const totalInterest = totalRepaid - amount;

    const schedule: MonthRow[] = [];
    let balance = amount;

    for (let month = 1; month <= months; month++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principal = Math.min(monthlyPayment - interest, balance);
      balance -= principal;
      if (balance < 0.01) balance = 0;

      schedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance,
      });
    }

    return {
      feeAmount,
      effectiveAmount,
      monthlyPayment,
      totalRepaid,
      totalInterest,
      schedule,
    };
  }, [loanAmount, annualRate, termMonths, originationFeePct]);

  const handleDownload = () => {
    downloadCSV(
      "personal-loan-amortization.csv",
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
        name="Personal Loan Calculator"
        url="https://calcora.website/personal-loan-calculator/"
        description="Calculate your monthly personal loan payment, total interest, and view a full amortization schedule."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Personal Loan Calculator", url: "https://calcora.website/personal-loan-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Personal Loan Calculator"
        description="Calculate your monthly personal loan payment, total interest, and view a full amortization schedule."
        formula="M = P × r(1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate, and n is the total number of months."
        example="A $15,000 loan at 10.5% over 36 months: monthly ≈ $487.94, total interest ≈ $2,565.93."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Personal Loan Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="pl-amount"
            label="Loan Amount"
            prefix="$"
            value={loanAmount}
            onChange={setLoanAmount}
            min={0}
            step={500}
          />
          <NumberInput
            id="pl-rate"
            label="Annual Interest Rate"
            suffix="%"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={50}
            step={0.1}
          />
          <SelectInput
            id="pl-term"
            label="Loan Term"
            value={termMonths}
            onChange={setTermMonths}
            options={TERM_OPTIONS}
          />
          <NumberInput
            id="pl-fee"
            label="Origination Fee"
            suffix="%"
            value={originationFeePct}
            onChange={setOriginationFeePct}
            min={0}
            max={20}
            step={0.5}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard label="Monthly Payment" value={money(results.monthlyPayment)} accent="navy" />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} accent="green" />
          <ResultCard label="Total Repaid" value={money(results.totalRepaid)} sub="Principal + interest" />
          {results.feeAmount > 0 && (
            <ResultCard label="Origination Fee" value={money(results.feeAmount)} sub={`You receive ${money(results.effectiveAmount)}`} />
          )}
        </div>

        <AdSlot slotId="personal-loan-mid" className="my-8" />

        {results.schedule.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Amortization Schedule</h2>
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
