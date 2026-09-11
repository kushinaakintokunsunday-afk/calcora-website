"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, downloadCSV } from "@/lib/utils";
import { NumberInput } from "@/components/ui/NumberInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is net worth?",
    answer:
      "Net worth is the difference between everything you own (assets) and everything you owe (liabilities). It gives you a single snapshot of your financial health at any point in time.",
  },
  {
    question: "Is having a negative net worth bad?",
    answer:
      "Not necessarily. A negative net worth is common early in life — for example, when you have student loans or a large mortgage but haven&apos;t yet built significant savings. What matters is whether the trend is improving over time.",
  },
  {
    question: "What should I include in my net worth calculation?",
    answer:
      "Include all liquid assets (cash, savings, checking), investments (stocks, bonds, retirement accounts), real estate equity, vehicle values, and any other tangible assets. For liabilities, include mortgages, auto loans, credit card balances, student loans, and any other debts.",
  },
  {
    question: "How often should I calculate my net worth?",
    answer:
      "Most financial experts recommend calculating your net worth at least once per year. Tracking it quarterly or monthly can help you see trends and stay motivated as you work toward your financial goals.",
  },
  {
    question: "Is net worth the same as income?",
    answer:
      "No. Income is the money you earn each year, while net worth is the total value of what you own minus what you owe. Someone with a high income but high spending may have a lower net worth than someone earning less who saves consistently.",
  },
  {
    question: "How do I improve my net worth?",
    answer:
      "You can improve your net worth by increasing assets (saving more, investing, paying down high-interest debt) and decreasing liabilities (paying off loans, reducing credit card balances). The key is consistently spending less than you earn and directing the surplus toward wealth-building.",
  },
];

const RELATED_TOOLS = [
  { href: "/debt-payoff-calculator/", label: "Debt Payoff Calculator" },
  { href: "/savings-goal-calculator/", label: "Savings Goal Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

export default function NetWorthCalculator() {
  const [cashSavings, setCashSavings] = useState(15000);
  const [investments, setInvestments] = useState(45000);
  const [homeValue, setHomeValue] = useState(350000);
  const [vehicles, setVehicles] = useState(20000);
  const [otherAssets, setOtherAssets] = useState(5000);
  const [mortgageBalance, setMortgageBalance] = useState(220000);
  const [autoLoan, setAutoLoan] = useState(8000);
  const [creditCardDebt, setCreditCardDebt] = useState(2500);
  const [studentLoans, setStudentLoans] = useState(12000);
  const [otherDebts, setOtherDebts] = useState(0);

  const results = useMemo(() => {
    const totalAssets = cashSavings + investments + homeValue + vehicles + otherAssets;
    const totalLiabilities = mortgageBalance + autoLoan + creditCardDebt + studentLoans + otherDebts;
    const netWorth = totalAssets - totalLiabilities;

    return { totalAssets, totalLiabilities, netWorth };
  }, [cashSavings, investments, homeValue, vehicles, otherAssets, mortgageBalance, autoLoan, creditCardDebt, studentLoans, otherDebts]);

  const assets = useMemo(
    () => [
      { label: "Cash & Savings", amount: cashSavings },
      { label: "Investments", amount: investments },
      { label: "Home Value", amount: homeValue },
      { label: "Vehicles", amount: vehicles },
      { label: "Other Assets", amount: otherAssets },
    ],
    [cashSavings, investments, homeValue, vehicles, otherAssets]
  );

  const liabilities = useMemo(
    () => [
      { label: "Mortgage Balance", amount: mortgageBalance },
      { label: "Auto Loan", amount: autoLoan },
      { label: "Credit Card Debt", amount: creditCardDebt },
      { label: "Student Loans", amount: studentLoans },
      { label: "Other Debts", amount: otherDebts },
    ],
    [mortgageBalance, autoLoan, creditCardDebt, studentLoans, otherDebts]
  );

  const handleDownload = () => {
    const rows: (string | number)[][] = [["Asset", "", ""]];
    assets.forEach((a) => rows.push(["Assets", a.label, a.amount]));
    rows.push(["", "Total Assets", results.totalAssets]);
    rows.push(["", "", ""]);
    rows.push(["Liability", "", ""]);
    liabilities.forEach((l) => rows.push(["Liabilities", l.label, l.amount]));
    rows.push(["", "Total Liabilities", results.totalLiabilities]);
    rows.push(["", "", ""]);
    rows.push(["", "Net Worth", results.netWorth]);
    downloadCSV("net-worth-breakdown.csv", ["Category", "Item", "Amount"], rows);
  };

  return (
    <>
      <WebApplicationSchema
        name="Net Worth Calculator"
        url="https://calcora.website/net-worth-calculator/"
        description="Calculate your total net worth by adding up your assets and subtracting your liabilities."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Net Worth Calculator", url: "https://calcora.website/net-worth-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Net Worth Calculator"
        description="Add up everything you own and subtract everything you owe to find your total net worth."
        formula="Net Worth = Total Assets − Total Liabilities"
        example="$15,000 cash + $45,000 investments + $350,000 home + $20,000 vehicles + $5,000 other = $435,000 assets. Minus $220,000 mortgage + $8,000 auto loan + $2,500 credit card + $12,000 student loans = $242,500 liabilities. Net worth = $192,500."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Net Worth Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="nw-cash"
            label="Cash &amp; Savings"
            value={cashSavings}
            onChange={setCashSavings}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="nw-investments"
            label="Investments"
            value={investments}
            onChange={setInvestments}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="nw-home"
            label="Home Value"
            value={homeValue}
            onChange={setHomeValue}
            min={0}
            step={5000}
            prefix="$"
          />
          <NumberInput
            id="nw-vehicles"
            label="Vehicles"
            value={vehicles}
            onChange={setVehicles}
            min={0}
            step={1000}
            prefix="$"
          />
          <NumberInput
            id="nw-other-assets"
            label="Other Assets"
            value={otherAssets}
            onChange={setOtherAssets}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="nw-mortgage"
            label="Mortgage Balance"
            value={mortgageBalance}
            onChange={setMortgageBalance}
            min={0}
            step={5000}
            prefix="$"
          />
          <NumberInput
            id="nw-auto-loan"
            label="Auto Loan Balance"
            value={autoLoan}
            onChange={setAutoLoan}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="nw-credit-card"
            label="Credit Card Debt"
            value={creditCardDebt}
            onChange={setCreditCardDebt}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="nw-student-loans"
            label="Student Loans"
            value={studentLoans}
            onChange={setStudentLoans}
            min={0}
            step={500}
            prefix="$"
          />
          <NumberInput
            id="nw-other-debts"
            label="Other Debts"
            value={otherDebts}
            onChange={setOtherDebts}
            min={0}
            step={500}
            prefix="$"
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard
              label="Net Worth"
              value={formatCurrency(results.netWorth)}
              accent="navy"
              sub={results.netWorth < 0 ? "Negative net worth — focus on reducing debt and building savings." : undefined}
            />
            <ResultCard label="Total Assets" value={formatCurrency(results.totalAssets)} accent="green" />
            <ResultCard label="Total Liabilities" value={formatCurrency(results.totalLiabilities)} />
          </div>
        </div>

        <AdSlot slotId="net-worth-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Net Worth Breakdown</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Item</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-surface/50">
                  <td className="px-4 py-2.5 font-medium text-navy" colSpan={2}>Assets</td>
                  <td className="px-4 py-2.5 text-right font-medium text-navy" />
                </tr>
                {assets.map((a) => (
                  <tr key={a.label} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-muted" />
                    <td className="px-4 py-2.5 text-text-primary">{a.label}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(a.amount)}</td>
                  </tr>
                ))}
                <tr className="border-b border-border bg-surface/30">
                  <td className="px-4 py-2.5 font-medium text-navy" colSpan={2}>Total Assets</td>
                  <td className="px-4 py-2.5 text-right font-medium text-navy">{formatCurrency(results.totalAssets)}</td>
                </tr>
                <tr className="bg-surface/50">
                  <td className="px-4 py-2.5 font-medium text-navy" colSpan={2}>Liabilities</td>
                  <td className="px-4 py-2.5 text-right font-medium text-navy" />
                </tr>
                {liabilities.map((l) => (
                  <tr key={l.label} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-muted" />
                    <td className="px-4 py-2.5 text-text-primary">{l.label}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(l.amount)}</td>
                  </tr>
                ))}
                <tr className="border-b border-border bg-surface/30">
                  <td className="px-4 py-2.5 font-medium text-navy" colSpan={2}>Total Liabilities</td>
                  <td className="px-4 py-2.5 text-right font-medium text-navy">{formatCurrency(results.totalLiabilities)}</td>
                </tr>
                <tr className="bg-navy/5">
                  <td className="px-4 py-3 font-bold text-navy" colSpan={2}>Net Worth</td>
                  <td className="px-4 py-3 text-right font-bold text-navy">{formatCurrency(results.netWorth)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CalculatorShell>
    </>
  );
}
