"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, formatNumber, downloadCSV } from "@/lib/utils";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is EMI?",
    answer: "EMI stands for Equated Monthly Installment. It is a fixed monthly payment made by a borrower to a lender on a specific date each month, covering both principal and interest components over the loan tenure.",
  },
  {
    question: "How is EMI calculated?",
    answer: "EMI is calculated using the formula EMI = P × r(1+r)^n / ((1+r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly installments.",
  },
  {
    question: "What is the difference between principal and interest in EMI?",
    answer: "The principal portion reduces your outstanding loan balance, while the interest portion is the cost of borrowing. In the early months, a larger share of EMI goes toward interest. Over time, the principal share increases as the outstanding balance decreases.",
  },
  {
    question: "How does loan tenure affect EMI?",
    answer: "A longer tenure reduces the monthly EMI amount but increases the total interest paid over the life of the loan. A shorter tenure increases the monthly payment but saves significantly on total interest.",
  },
  {
    question: "What is a loan amortization schedule?",
    answer: "An amortization schedule is a detailed table showing each periodic payment broken down into principal and interest, along with the remaining balance after each payment. It helps borrowers understand how their loan is paid off over time.",
  },
  {
    question: "Can I prepay my loan to save on interest?",
    answer: "Yes, prepaying your loan reduces the outstanding principal, which lowers the interest component of future EMIs. Even small additional payments can significantly reduce total interest and shorten the loan tenure.",
  },
];

const RELATED_TOOLS = [
  { href: "/mortgage-calculator/", label: "Mortgage Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/percentage-calculator/", label: "Percentage" },
];

interface MonthRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [tenureValue, setTenureValue] = useState(60);
  const [tenureUnit, setTenureUnit] = useState<"months" | "years">("months");

  const totalMonths = useMemo(() => {
    return tenureUnit === "years" ? tenureValue * 12 : tenureValue;
  }, [tenureValue, tenureUnit]);

  const results = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const annual = Math.max(0, annualRate);
    const n = Math.max(1, Math.floor(totalMonths));
    const r = annual / 100 / 12;

    let emi = 0;
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }

    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    const amortization: MonthRow[] = [];
    let balance = P;

    for (let month = 1; month <= n; month++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principal = Math.min(emi - interest, balance);
      balance -= principal;
      if (balance < 0.01) balance = 0;

      amortization.push({
        month,
        emi,
        principal,
        interest,
        balance,
      });
    }

    const principalPct = P > 0 ? (P / totalPayable) * 100 : 50;
    const interestPct = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 50;

    return {
      emi,
      totalPayable,
      totalInterest,
      principalPct,
      interestPct,
      amortization,
    };
  }, [loanAmount, annualRate, totalMonths]);

  const handleDownload = () => {
    downloadCSV(
      "emi-amortization.csv",
      ["Month", "EMI", "Principal", "Interest", "Balance"],
      results.amortization.map((row) => [
        row.month,
        row.emi.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="EMI Calculator"
        url="https://calcora.website/emi-calculator/"
        description="Calculate your equated monthly installment (EMI) with a full amortization schedule and CSV download."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "EMI Calculator", url: "https://calcora.website/emi-calculator/" },
        ]}
      />
      <CalculatorShell
        title="EMI Calculator"
        description="Calculate your equated monthly installment (EMI) for any loan. View a month-by-month amortization breakdown."
        formula="EMI = P × r(1+r)^n / ((1+r)^n - 1)"
        example="For a loan of $500,000 at 8.5% annual interest over 60 months: EMI = $10,243. Total interest = $14,658. Total payable = $514,658."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "EMI Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="emi-principal" className="block text-sm font-medium text-text-primary mb-1">
              Loan Amount ($)
            </label>
            <input
              id="emi-principal"
              type="number"
              min={0}
              step={1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="emi-rate" className="block text-sm font-medium text-text-primary mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              id="emi-rate"
              type="number"
              min={0}
              max={50}
              step={0.1}
              value={annualRate}
              onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="emi-tenure" className="block text-sm font-medium text-text-primary mb-1">
              Loan Tenure
            </label>
            <input
              id="emi-tenure"
              type="number"
              min={1}
              step={1}
              value={tenureValue}
              onChange={(e) => setTenureValue(parseInt(e.target.value) || 1)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="emi-unit" className="block text-sm font-medium text-text-primary mb-1">
              Tenure Unit
            </label>
            <select
              id="emi-unit"
              value={tenureUnit}
              onChange={(e) => setTenureUnit(e.target.value as "months" | "years")}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-text-secondary">Monthly EMI</p>
              <p className="text-2xl font-bold text-navy">{formatCurrency(results.emi)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Interest</p>
              <p className="text-2xl font-bold text-green">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Payable</p>
              <p className="text-2xl font-bold text-navy">{formatCurrency(results.totalPayable)}</p>
            </div>
          </div>

          <h3 className="text-sm font-medium text-text-primary mb-3">Principal vs Interest</h3>
          <div className="flex h-8 rounded-lg overflow-hidden mb-2">
            <div
              className="bg-navy transition-all"
              style={{ width: `${results.principalPct}%` }}
            />
            <div
              className="bg-green transition-all"
              style={{ width: `${results.interestPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded bg-navy" />
              Principal ({formatNumber(results.principalPct, 1)}%)
            </span>
            <span className="flex items-center gap-1.5">
              Interest ({formatNumber(results.interestPct, 1)}%)
              <span className="inline-block w-3 h-3 rounded bg-green" />
            </span>
          </div>
        </div>

        <AdSlot slotId="emi-mid" className="my-8" />

        {results.amortization.length > 0 && (
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
                    <th className="px-4 py-3 text-right font-medium text-text-primary">EMI</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Principal</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Interest</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortization.map((row) => (
                    <tr key={row.month} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.month}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.emi)}</td>
                      <td className="px-4 py-2.5 text-right text-green">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-2.5 text-right text-text-secondary">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.balance)}</td>
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
