"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is loan amortization?",
    answer: "Amortization is the process of paying off a loan through regular, fixed monthly payments over a set period. Each payment is split between interest and principal. Early payments are mostly interest, while later payments are mostly principal. By the end of the term, the loan balance reaches zero.",
  },
  {
    question: "How is interest front-loaded in an amortizing loan?",
    answer: "In the early years of a loan, the outstanding balance is high, so a larger portion of each payment goes toward interest. As you pay down the principal, the interest portion shrinks and more of each payment goes toward reducing the balance. On a 30-year mortgage at 6.5%, roughly the first 18 years see more interest than principal in each payment.",
  },
  {
    question: "How do extra payments affect my loan?",
    answer: "Extra payments directly reduce your principal balance, which means less interest accrues each subsequent month. This creates a compounding savings effect. For example, on a $300,000 mortgage at 6.5% over 30 years, paying an extra $100 per month can save over $24,000 in interest and shorten the loan by more than 3 years.",
  },
  {
    question: "Is it better to pay biweekly instead of monthly?",
    answer: "Biweekly payments can save you money because you end up making 26 half-payments per year, which equals 13 full monthly payments instead of 12. That extra monthly payment per year goes directly toward principal and reduces both the loan term and total interest paid.",
  },
  {
    question: "When does the principal portion of my payment accelerate?",
    answer: "The principal portion accelerates as the loan matures because each payment reduces the outstanding balance, which lowers the interest charge. The crossover point where principal exceeds interest in each payment depends on the rate and term. For a 30-year loan at 6.5%, this typically happens around year 19.",
  },
  {
    question: "How does refinancing affect my amortization schedule?",
    answer: "Refinancing replaces your existing loan with a new one, resetting the amortization clock. While a lower interest rate can reduce monthly payments and total interest, extending the term may negate those savings. Closing costs also factor into the break-even period. Always compare the remaining cost of your current loan with the new loan's total cost.",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/emi-calculator/", label: "EMI Calculator" },
  { href: "/auto-loan-calculator/", label: "Auto Loan" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
];

interface MonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

const MAX_DISPLAY_ROWS = 360;

export default function AmortizationCalculator() {
  const { money } = useMoney("amortization-calculator");
  const [loanAmount, setLoanAmount] = useState(300000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [extraPayment, setExtraPayment] = useState(0);

  const results = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const rate = Math.max(0, annualRate);
    const term = Math.max(1, termYears);
    const extra = Math.max(0, extraPayment);

    const n = term * 12;
    const r = rate / 100 / 12;

    let baseMonthly = 0;
    if (r > 0 && n > 0) {
      baseMonthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      baseMonthly = P / n;
    }

    const adjustedMonthly = baseMonthly + extra;

    const buildSchedule = (monthly: number): { schedule: MonthRow[]; totalInterest: number; totalPaid: number; monthsToPayOff: number } => {
      const schedule: MonthRow[] = [];
      let balance = P;
      let totalInterest = 0;
      let month = 0;

      while (balance > 0.005 && month < 600) {
        month++;
        const interest = balance * r;
        const principal = Math.min(monthly - interest, balance);
        if (principal <= 0) break;
        balance -= principal;
        if (balance < 0) balance = 0;
        totalInterest += interest;

        schedule.push({
          month,
          payment: interest + principal,
          principal,
          interest,
          balance,
        });
      }

      return { schedule, totalInterest, totalPaid: P + totalInterest, monthsToPayOff: month };
    };

    const baseResult = buildSchedule(baseMonthly);
    const adjustedResult = buildSchedule(adjustedMonthly);

    const monthsSaved = baseResult.monthsToPayOff - adjustedResult.monthsToPayOff;
    const interestSaved = baseResult.totalInterest - adjustedResult.totalInterest;

    const buildYearly = (schedule: MonthRow[]): YearRow[] => {
      const rows: YearRow[] = [];
      let yearBalance = P;

      for (let year = 1; year <= term; year++) {
        let yearlyPrincipal = 0;
        let yearlyInterest = 0;

        const yearMonths = schedule.filter((s) => Math.ceil(s.month / 12) === year);
        for (const m of yearMonths) {
          yearlyPrincipal += m.principal;
          yearlyInterest += m.interest;
        }
        yearBalance -= yearlyPrincipal;
        if (yearBalance < 0.01) yearBalance = 0;

        rows.push({
          year,
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          balance: yearBalance,
        });

        if (yearBalance <= 0) break;
      }

      return rows;
    };

    const monthlyDisplay = adjustedResult.schedule.slice(0, MAX_DISPLAY_ROWS);
    const yearlyDisplay = buildYearly(adjustedResult.schedule);

    return {
      baseMonthly,
      adjustedMonthly,
      totalInterest: adjustedResult.totalInterest,
      totalPaid: adjustedResult.totalPaid,
      monthsToPayOff: adjustedResult.monthsToPayOff,
      baseTotalInterest: baseResult.totalInterest,
      monthsSaved,
      interestSaved,
      monthlyDisplay,
      yearlyDisplay,
      cappedDisplay: adjustedResult.schedule.length > MAX_DISPLAY_ROWS,
    };
  }, [loanAmount, annualRate, termYears, extraPayment]);

  const handleDownload = () => {
    downloadCSV(
      "amortization-schedule.csv",
      ["Month", "Payment", "Principal", "Interest", "Balance"],
      results.monthlyDisplay.map((row) => [
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
        name="Amortization Calculator"
        url="https://calcora.website/amortization-calculator/"
        description="Generate a full loan amortization schedule with extra payment impact analysis and CSV download."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Amortization Calculator", url: "https://calcora.website/amortization-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Loan Amortization Calculator"
        description="Generate a full amortization schedule and see how extra payments reduce your total interest and loan term."
        formula="M = P × r(1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate, and n is the total number of months."
        example="A $300,000 loan at 6.5% over 30 years: monthly ≈ $1,896.20. An extra $100/month saves about $24,000 in interest and 3+ years."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Amortization Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="am-amount"
            label="Loan Amount"
            prefix="$"
            value={loanAmount}
            onChange={setLoanAmount}
            min={0}
            step={10000}
          />
          <NumberInput
            id="am-rate"
            label="Annual Interest Rate"
            suffix="%"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={30}
            step={0.1}
          />
          <NumberInput
            id="am-term"
            label="Loan Term"
            suffix="years"
            value={termYears}
            onChange={setTermYears}
            min={1}
            max={50}
            step={1}
          />
          <NumberInput
            id="am-extra"
            label="Extra Monthly Payment"
            prefix="$"
            value={extraPayment}
            onChange={setExtraPayment}
            min={0}
            step={50}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard label="Monthly Payment" value={money(results.adjustedMonthly)} accent="navy" sub={extraPayment > 0 ? `Base: ${money(results.baseMonthly)}` : undefined} />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} accent="green" />
          <ResultCard label="Total Paid" value={money(results.totalPaid)} sub={`${Math.ceil(results.monthsToPayOff / 12)} years, ${results.monthsToPayOff % 12} months`} />
          {extraPayment > 0 && (
            <>
              <ResultCard label="Months Saved" value={`${results.monthsSaved}`} accent="navy" sub={`${Math.floor(results.monthsSaved / 12)} years, ${results.monthsSaved % 12} months`} />
            </>
          )}
        </div>

        {extraPayment > 0 && results.interestSaved > 0 && (
          <div className="rounded-lg bg-green/5 border border-green/20 p-4 mb-6">
            <p className="text-sm text-text-secondary">
              Paying an extra <strong>{money(extraPayment)}/month</strong> saves you{" "}
              <strong className="text-green">{money(results.interestSaved)}</strong> in interest and{" "}
              <strong className="text-navy">{results.monthsSaved} months</strong> off your loan.
            </p>
          </div>
        )}

        <AdSlot slotId="amortization-mid" className="my-8" />

        {results.monthlyDisplay.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Monthly Amortization Schedule</h2>
              <button
                type="button"
                onClick={handleDownload}
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Download CSV
              </button>
            </div>
            {results.cappedDisplay && (
              <p className="text-xs text-text-muted mb-3">
                Showing first {MAX_DISPLAY_ROWS} of {Math.ceil(results.monthsToPayOff)} months. Download CSV for the full schedule.
              </p>
            )}
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
                  {results.monthlyDisplay.map((row) => (
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

        {results.yearlyDisplay.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-navy mb-3">Yearly Summary</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-text-primary">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Principal Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Interest Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyDisplay.map((row) => (
                    <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                      <td className="px-4 py-2.5 text-right text-green">{money(row.principalPaid)}</td>
                      <td className="px-4 py-2.5 text-right text-text-secondary">{money(row.interestPaid)}</td>
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
