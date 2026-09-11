"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";

const TERMS = [15, 20, 30];

const FAQS = [
  {
    question: "What is a mortgage?",
    answer: "A mortgage is a loan used to purchase real estate. The borrower repays the loan plus interest over a set period, typically 15 to 30 years. The property itself serves as collateral for the loan.",
  },
  {
    question: "What does PITI stand for?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four components of a typical monthly mortgage payment. Principal and interest go toward repaying the loan, while taxes and insurance cover property-related expenses.",
  },
  {
    question: "What is PMI and when do I need to pay it?",
    answer: "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home's purchase price. PMI protects the lender in case you default on the loan. It can typically be removed once you reach 20% equity.",
  },
  {
    question: "How is the monthly mortgage payment calculated?",
    answer: "The monthly principal and interest payment is calculated using the formula M = P × r(1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the total number of monthly payments.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 15-year mortgage has higher monthly payments but significantly lower total interest and builds equity faster. A 30-year mortgage offers lower monthly payments, providing more flexibility, but costs more in total interest over the life of the loan.",
  },
  {
    question: "How much of my payment goes to interest vs principal?",
    answer: "In the early years of a mortgage, most of your payment goes toward interest. Over time, a larger portion goes toward principal. This is shown in the amortization schedule. For example, with a $300,000 loan at 6.5% over 30 years, about 64% of the first payment goes to interest.",
  },
];

const RELATED_TOOLS = [
  { href: "/emi-calculator/", label: "EMI Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
];

interface AmortizationRow {
  year: number;
  startingBalance: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export default function MortgageCalculator() {
  const { money } = useMoney("mortgage-calculator");
  const [homePrice, setHomePrice] = useState(300000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [propertyTax, setPropertyTax] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [pmiPct, setPmiPct] = useState(0);

  const results = useMemo(() => {
    const price = Math.max(0, homePrice);
    const dpPct = Math.max(0, Math.min(100, downPaymentPct));
    const rate = Math.max(0, interestRate);
    const term = Math.max(1, termYears);

    const downPayment = price * (dpPct / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0 && numPayments > 0) {
      monthlyPI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else if (numPayments > 0) {
      monthlyPI = loanAmount / numPayments;
    }

    const monthlyPMI = dpPct < 20 ? loanAmount * (pmiPct / 100) / 12 : 0;
    const totalPITI = monthlyPI + propertyTax + insurance + monthlyPMI;
    const totalPaid = monthlyPI * numPayments;
    const totalInterest = totalPaid - loanAmount;
    const totalCost = totalPaid + (propertyTax + insurance) * numPayments + monthlyPMI * numPayments;

    const amortization: AmortizationRow[] = [];
    let balance = loanAmount;

    for (let year = 1; year <= term; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      const startBalance = balance;

      for (let month = 0; month < 12; month++) {
        if (balance <= 0) break;
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(monthlyPI - interestPayment, balance);
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }

      if (balance < 0.01) balance = 0;

      amortization.push({
        year,
        startingBalance: startBalance,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        endingBalance: balance,
      });
    }

    return {
      loanAmount,
      monthlyPI,
      totalPITI,
      totalInterest,
      totalCost,
      amortization,
      hasPMI: dpPct < 20,
    };
  }, [homePrice, downPaymentPct, interestRate, termYears, propertyTax, insurance, pmiPct]);

  const handleDownload = () => {
    downloadCSV(
      "mortgage-amortization.csv",
      ["Year", "Starting Balance", "Principal Paid", "Interest Paid", "Ending Balance"],
      results.amortization.map((row) => [
        row.year,
        row.startingBalance.toFixed(2),
        row.principalPaid.toFixed(2),
        row.interestPaid.toFixed(2),
        row.endingBalance.toFixed(2),
      ])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Mortgage Calculator"
        url="https://calcora.website/mortgage-calculator/"
        description="Calculate monthly mortgage payments, total interest, and view a full amortization schedule."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Mortgage Calculator", url: "https://calcora.website/mortgage-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Mortgage Calculator"
        description="Calculate your monthly mortgage payment, total interest, and view a full yearly amortization schedule."
        formula="M = P × r(1+r)^n / ((1+r)^n - 1)"
        example="For a $300,000 home with 20% down ($60,000), a 6.5% interest rate, and a 30-year term: Loan = $240,000, Monthly P&I = $1,517. Monthly property tax and insurance are added to get the total PITI."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Mortgage Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="mg-price" className="block text-sm font-medium text-text-primary mb-1">
              Home Price ($)
            </label>
            <input
              id="mg-price"
              type="number"
              min={0}
              step={1000}
              value={homePrice}
              onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="mg-dp" className="block text-sm font-medium text-text-primary mb-1">
              Down Payment (%)
            </label>
            <input
              id="mg-dp"
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="mg-rate" className="block text-sm font-medium text-text-primary mb-1">
              Interest Rate (%)
            </label>
            <input
              id="mg-rate"
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="mg-term" className="block text-sm font-medium text-text-primary mb-1">
              Loan Term (years)
            </label>
            <select
              id="mg-term"
              value={termYears}
              onChange={(e) => setTermYears(parseInt(e.target.value))}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            >
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t} years
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="mg-tax" className="block text-sm font-medium text-text-primary mb-1">
              Property Tax ($/mo)
            </label>
            <input
              id="mg-tax"
              type="number"
              min={0}
              step={10}
              value={propertyTax}
              onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="mg-ins" className="block text-sm font-medium text-text-primary mb-1">
              Insurance ($/mo)
            </label>
            <input
              id="mg-ins"
              type="number"
              min={0}
              step={10}
              value={insurance}
              onChange={(e) => setInsurance(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="mg-pmi" className="block text-sm font-medium text-text-primary mb-1">
              PMI (% of loan/year)
            </label>
            <input
              id="mg-pmi"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={pmiPct}
              onChange={(e) => setPmiPct(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            {downPaymentPct < 20 && (
              <p className="text-xs text-text-muted mt-1">Down payment is below 20%, PMI applies.</p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-text-secondary">Monthly P&I</p>
              <p className="text-2xl font-bold text-navy">{money(results.monthlyPI)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Monthly (PITI)</p>
              <p className="text-2xl font-bold text-green">{money(results.totalPITI)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Interest</p>
              <p className="text-2xl font-bold text-navy">{money(results.totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Cost</p>
              <p className="text-2xl font-bold text-navy">{money(results.totalCost)}</p>
            </div>
          </div>
        </div>

        <AdSlot slotId="mortgage-mid" className="my-8" />

        {results.amortization.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Yearly Amortization Summary</h2>
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
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Starting Balance</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Principal Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Interest Paid</th>
                    <th className="px-4 py-3 text-right font-medium text-text-primary">Ending Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortization.map((row) => (
                    <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.startingBalance)}</td>
                      <td className="px-4 py-2.5 text-right text-green">{money(row.principalPaid)}</td>
                      <td className="px-4 py-2.5 text-right text-text-secondary">{money(row.interestPaid)}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{money(row.endingBalance)}</td>
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
