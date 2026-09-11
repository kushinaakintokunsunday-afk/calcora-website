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
    question: "What are the pros and cons of hourly vs. salaried pay?",
    answer:
      "Hourly workers are typically paid for every hour worked, including overtime (usually at 1.5×). Salaried workers receive a fixed annual amount regardless of hours, which can mean extra unpaid hours but often comes with better benefits. Hourly pay offers more transparency, while salaried roles often carry more stability and career perks.",
  },
  {
    question: "How do I convert a salary to an hourly rate?",
    answer:
      "Divide your annual salary by the number of hours you work per year. A common assumption is 2,080 hours (40 hours × 52 weeks). So a $60,000 salary equals roughly $28.85/hour ($60,000 ÷ 2,080). Some employers use 2,000 hours for a simpler calculation.",
  },
  {
    question: "Does unpaid time off affect my annual income?",
    answer:
      "Yes. Unpaid days reduce the total number of paid weeks or hours in the year, which lowers your annual income. For example, taking 2 unpaid weeks per year on a $20/hour, 40-hour schedule reduces annual income from $41,600 to $40,000.",
  },
  {
    question: "Does this calculation include overtime or taxes?",
    answer:
      "No. This calculator estimates gross pay based on your standard hourly rate, hours per week, and paid weeks per year. It does not account for overtime (time-and-a-half), taxes, health insurance deductions, retirement contributions, or any other payroll deductions.",
  },
  {
    question: "How does minimum wage affect my hourly pay?",
    answer:
      "The federal minimum wage is $7.25/hour, but many states and cities set higher minimums (e.g., California at $16.00, New York City at $16.00+). Always check your local minimum wage, as the higher rate applies. Some jobs also have different minimums for tipped workers.",
  },
  {
    question: "What is the difference between a contractor and an employee?",
    answer:
      "Independent contractors are self-employed and responsible for their own taxes (including self-employment tax), insurance, and benefits. Employees receive benefits like health insurance, paid time off, and employer payroll tax contributions. Contractors typically charge higher hourly rates to offset these costs.",
  },
];

const RELATED_TOOLS = [
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

interface BreakdownRow {
  period: string;
  amount: number;
}

export default function HourlyWageCalculator() {
  const [hourlyRate, setHourlyRate] = useState(20);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [paidWeeks, setPaidWeeks] = useState(52);

  const results = useMemo(() => {
    const rate = Math.max(0, hourlyRate);
    const hours = Math.max(0, hoursPerWeek);
    const weeks = Math.max(0, paidWeeks);

    const annual = rate * hours * weeks;
    const weekly = rate * hours;
    const biweekly = weekly * 2;
    const monthly = annual / 12;
    const semiMonthly = annual / 24;

    const breakdown: BreakdownRow[] = [
      { period: "Hourly", amount: rate },
      { period: "Weekly", amount: weekly },
      { period: "Biweekly", amount: biweekly },
      { period: "Monthly", amount: monthly },
      { period: "Semi-Monthly", amount: semiMonthly },
      { period: "Annual", amount: annual },
    ];

    return { annual, weekly, biweekly, monthly, semiMonthly, breakdown };
  }, [hourlyRate, hoursPerWeek, paidWeeks]);

  const handleDownload = () => {
    downloadCSV(
      "hourly-wage-breakdown.csv",
      ["Period", "Amount"],
      results.breakdown.map((row) => [row.period, row.amount.toFixed(2)])
    );
  };

  return (
    <>
      <WebApplicationSchema
        name="Hourly Wage Calculator"
        url="https://calcora.website/hourly-wage-calculator/"
        description="Convert your hourly wage to weekly, biweekly, monthly, and annual salary figures."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Hourly Wage Calculator", url: "https://calcora.website/hourly-wage-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Hourly Wage Calculator"
        description="Convert your hourly rate into weekly, biweekly, monthly, and annual salary equivalents."
        formula="Annual Salary = Hourly Rate × Hours per Week × Paid Weeks per Year"
        example="$20/hour × 40 hours × 52 weeks = $41,600 per year, or roughly $3,467 per month."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Hourly Wage Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <NumberInput
            id="hw-rate"
            label="Hourly Rate"
            value={hourlyRate}
            onChange={setHourlyRate}
            min={0}
            step={0.5}
            prefix="$"
          />
          <NumberInput
            id="hw-hours"
            label="Hours per Week"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
            min={0}
            max={168}
            step={1}
          />
          <NumberInput
            id="hw-weeks"
            label="Paid Weeks per Year"
            value={paidWeeks}
            onChange={setPaidWeeks}
            min={1}
            max={52}
            step={1}
          />
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard label="Annual Salary" value={formatCurrency(results.annual)} accent="navy" />
            <ResultCard label="Monthly Pay" value={formatCurrency(results.monthly)} />
            <ResultCard label="Biweekly Pay" value={formatCurrency(results.biweekly)} />
            <ResultCard label="Weekly Pay" value={formatCurrency(results.weekly)} accent="green" />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4 mb-6 text-sm text-text-secondary leading-relaxed">
          Multiply your hourly rate by the number of hours worked to get totals for different pay periods. This calculator does not account for overtime, unpaid time off, or pre-tax and post-tax deductions.
        </div>

        <AdSlot slotId="hourly-wage-mid" className="my-8" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-navy">Pay Breakdown</h2>
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
                  <th className="px-4 py-3 text-left font-medium text-text-primary">Period</th>
                  <th className="px-4 py-3 text-right font-medium text-text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                {results.breakdown.map((row) => (
                  <tr key={row.period} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-4 py-2.5 text-text-primary">{row.period}</td>
                    <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CalculatorShell>
    </>
  );
}
