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
    question: "What is the difference between a car loan and a lease?",
    answer: "A car loan means you are borrowing money to purchase the vehicle outright. You own it once the loan is paid off. A lease is essentially a long-term rental where you make monthly payments for the use of the car but never own it. At the end of a lease you return the vehicle or buy it at a predetermined price.",
  },
  {
    question: "What is a good interest rate for an auto loan?",
    answer: "A good auto loan rate depends on your credit score, the loan term, and whether the car is new or used. As of recent averages, borrowers with excellent credit can secure rates between 3% and 5% on new cars. Average credit scores typically see rates from 6% to 9%. Checking offers from multiple lenders is the best way to find a competitive rate.",
  },
  {
    question: "Can I pay off my auto loan early?",
    answer: "Most auto loans allow early payoff without a penalty, but some lenders charge a prepayment penalty. Paying off your loan early saves you money on interest and frees up your monthly cash flow. Always check your loan agreement for any prepayment terms before making extra payments.",
  },
  {
    question: "How does a trade-in value affect my auto loan?",
    answer: "Your trade-in value reduces the total amount you need to borrow. For example, if your car costs $35,000 and your trade-in is worth $5,000, you only need to finance $30,000 (assuming no down payment). This lowers your monthly payment and total interest paid over the life of the loan.",
  },
  {
    question: "Do I have to pay sales tax on a car purchase?",
    answer: "Yes, most states require you to pay sales tax on a vehicle purchase. The tax is typically calculated on the full purchase price of the vehicle, including any dealer-installed options, but minus any trade-in credit in some states. Sales tax is usually rolled into the total financed amount.",
  },
  {
    question: "How does loan term length affect my auto loan?",
    answer: "A longer loan term (e.g., 72 or 84 months) lowers your monthly payment but increases the total interest you pay and can leave you owing more than the car is worth (negative equity). A shorter term (e.g., 36 or 48 months) has higher monthly payments but saves significantly on interest and builds equity faster.",
  },
];

const RELATED_TOOLS = [
  { href: "/emi-calculator/", label: "EMI Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/personal-loan-calculator/", label: "Personal Loan" },
  { href: "/amortization-calculator/", label: "Amortization" },
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

export default function AutoLoanCalculator() {
  const { money } = useMoney("auto-loan-calculator");
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);
  const [tradeIn, setTradeIn] = useState(0);
  const [salesTaxPct, setSalesTaxPct] = useState(7);

  const results = useMemo(() => {
    const price = Math.max(0, vehiclePrice);
    const dp = Math.max(0, downPayment);
    const rate = Math.max(0, annualRate);
    const term = Math.max(1, termYears);
    const trade = Math.max(0, tradeIn);
    const taxPct = Math.max(0, salesTaxPct);

    const taxOnPrice = price * (taxPct / 100);
    const loanAmount = Math.max(0, price + taxOnPrice - dp - trade);

    const n = term * 12;
    const r = rate / 100 / 12;

    let monthlyPayment = 0;
    if (r > 0 && n > 0) {
      monthlyPayment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      monthlyPayment = loanAmount / n;
    }

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - loanAmount;
    const totalCost = dp + trade + loanAmount + taxOnPrice;

    const monthlySchedule: MonthRow[] = [];
    let balance = loanAmount;

    for (let month = 1; month <= n; month++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principal = Math.min(monthlyPayment - interest, balance);
      balance -= principal;
      if (balance < 0.01) balance = 0;

      monthlySchedule.push({
        month,
        payment: monthlyPayment,
        principal,
        interest,
        balance,
      });
    }

    const yearlySchedule: YearRow[] = [];
    let yearBalance = loanAmount;

    for (let year = 1; year <= term; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let m = 0; m < 12; m++) {
        if (yearBalance <= 0) break;
        const interest = yearBalance * r;
        const principal = Math.min(monthlyPayment - interest, yearBalance);
        yearlyInterest += interest;
        yearlyPrincipal += principal;
        yearBalance -= principal;
      }

      if (yearBalance < 0.01) yearBalance = 0;

      yearlySchedule.push({
        year,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        balance: yearBalance,
      });
    }

    return {
      loanAmount,
      monthlyPayment,
      totalInterest,
      totalCost,
      taxOnPrice,
      monthlySchedule: monthlySchedule.slice(0, 24),
      yearlySchedule,
    };
  }, [vehiclePrice, downPayment, annualRate, termYears, tradeIn, salesTaxPct]);

  const handleDownload = () => {
    downloadCSV(
      "auto-loan-amortization.csv",
      ["Month", "Payment", "Principal", "Interest", "Balance"],
      results.yearlySchedule.map((row) => [
        row.year,
        "",
        row.principalPaid.toFixed(2),
        row.interestPaid.toFixed(2),
        row.balance.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Auto Loan Calculator"
        url="https://calcora.website/auto-loan-calculator/"
        description="Calculate your monthly car payment, total interest, and view an amortization schedule for your auto loan."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Auto Loan Calculator", url: "https://calcora.website/auto-loan-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Auto Loan Calculator"
        description="Calculate your monthly car payment, total interest, and view a full amortization schedule for your auto loan."
        formula="M = P × r(1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly rate, and n is the total number of months."
        example="A $35,000 car at 6.5% over 5 years with $5,000 down: monthly ≈ $586.15, total interest ≈ $5,168.78."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Auto Loan Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="al-price"
            label="Vehicle Price"
            prefix="$"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            min={0}
            step={500}
          />
          <NumberInput
            id="al-down"
            label="Down Payment"
            prefix="$"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            step={500}
          />
          <NumberInput
            id="al-rate"
            label="Annual Interest Rate"
            suffix="%"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={30}
            step={0.1}
          />
          <NumberInput
            id="al-term"
            label="Loan Term"
            suffix="years"
            value={termYears}
            onChange={setTermYears}
            min={1}
            max={10}
            step={1}
          />
          <NumberInput
            id="al-tradein"
            label="Trade-in Value (optional)"
            prefix="$"
            value={tradeIn}
            onChange={setTradeIn}
            min={0}
            step={500}
          />
          <NumberInput
            id="al-tax"
            label="Sales Tax"
            suffix="%"
            value={salesTaxPct}
            onChange={setSalesTaxPct}
            min={0}
            max={15}
            step={0.25}
          />
        </div>

        <p className="text-xs text-text-muted mb-6">
          Sales tax applies to the full vehicle price. Loan amount = price + tax − down payment − trade-in.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard label="Monthly Payment" value={money(results.monthlyPayment)} accent="navy" />
          <ResultCard label="Total Interest" value={money(results.totalInterest)} accent="green" />
          <ResultCard label="Total Cost" value={money(results.totalCost)} sub="Includes down payment, trade-in, and tax" />
          <ResultCard label="Loan Amount" value={money(results.loanAmount)} sub={results.taxOnPrice > 0 ? `Includes ${money(results.taxOnPrice)} in sales tax` : undefined} />
        </div>

        <AdSlot slotId="auto-loan-mid" className="my-8" />

        {results.yearlySchedule.length > 0 && (
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
                    <th className="px-4 py-3 text-left font-medium text-text-primary">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Principal Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Interest Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.yearlySchedule.map((row) => (
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
