"use client";

import { useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorShell } from "@/components/CalculatorShell";
import {
  BreadcrumbListSchema,
  FAQSchema,
  WebApplicationSchema,
} from "@/components/Schema";
import { downloadCSV } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

const FREQUENCIES: {
  value: PayFrequency;
  label: string;
  periods: number;
}[] = [
  { value: "weekly", label: "Weekly (52 paychecks/year)", periods: 52 },
  { value: "biweekly", label: "Biweekly (26 paychecks/year)", periods: 26 },
  { value: "semimonthly", label: "Semimonthly (24 paychecks/year)", periods: 24 },
  { value: "monthly", label: "Monthly (12 paychecks/year)", periods: 12 },
];

const relatedTools = [
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

const FAQS = [
  {
    question: "What is take-home pay?",
    answer:
      "Take-home pay, or net pay, is the amount you actually receive after deductions such as federal tax, state tax, and other withholdings are subtracted from your gross pay. Your employer payroll taxes are separate and are not deducted from your personal salary",
  },
  {
    question: "How does pay frequency affect my paycheck?",
    answer:
      "Your annual salary is divided by the number of pay periods per year to get each paycheck. Weekly pay gives 52 smaller checks, biweekly gives 26, semimonthly gives 24, and monthly gives 12 larger checks. The annual total stays the same.",
  },
  {
    question: "Why is this calculator an estimate?",
    answer:
      "This calculator uses flat federal and state tax rates, so it does not model tax brackets, exemptions, Social Security, Medicare, health insurance, or retirement contributions. Your real paycheck may differ based on your W-4 elections and benefits.",
  },
  {
    question: "How do I get a more accurate estimate?",
    answer:
      "To get closer numbers, adjust the federal and state tax rates to match your actual effective rates from a recent W-2 or pay stub, and add other deductions like 401(k) contributions, health insurance premiums, and wage garnishments.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://calcora.website/" },
  { name: "Paycheck Calculator", url: "https://calcora.website/paycheck-calculator" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-green/50";

export default function PaycheckCalculatorPage() {
  const { money } = useMoney("paycheck-calculator");
  const [salary, setSalary] = useState(60000);
  const [frequency, setFrequency] = useState<PayFrequency>("biweekly");
  const [federalRate, setFederalRate] = useState(22);
  const [stateRate, setStateRate] = useState(5);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const result = useMemo(() => {
    if (!(salary > 0)) return null;

    const periods =
      FREQUENCIES.find((item) => item.value === frequency)?.periods ?? 26;

    const grossPerPeriod = salary / periods;
    const federalPerPeriod = grossPerPeriod * (federalRate / 100);
    const statePerPeriod = grossPerPeriod * (stateRate / 100);
    const otherPerPeriod = (otherDeductions * 12) / periods;
    const netPerPeriod =
      grossPerPeriod - federalPerPeriod - statePerPeriod - otherPerPeriod;

    const rows = [
      {
        label: "Gross pay",
        perPeriod: grossPerPeriod,
        annual: salary,
        estimate: false,
      },
      {
        label: `Federal tax (${federalRate}%)`,
        perPeriod: federalPerPeriod,
        annual: federalPerPeriod * periods,
        estimate: true,
      },
      {
        label: `State tax (${stateRate}%)`,
        perPeriod: statePerPeriod,
        annual: statePerPeriod * periods,
        estimate: true,
      },
      {
        label: "Other deductions",
        perPeriod: otherPerPeriod,
        annual: otherPerPeriod * periods,
        estimate: true,
      },
      {
        label: "Net pay",
        perPeriod: netPerPeriod,
        annual: netPerPeriod * periods,
        estimate: true,
      },
    ];

    return { periods, grossPerPeriod, netPerPeriod, netAnnual: netPerPeriod * periods, rows };
  }, [salary, frequency, federalRate, stateRate, otherDeductions]);

  const handleExport = () => {
    if (!result) return;
    downloadCSV(
      "paycheck-estimate.csv",
      ["Description", "Per Period (USD)", "Annual (USD)"],
      result.rows.map((row) => [row.label, row.perPeriod, row.annual])
    );
  };

  const currentFrequency = FREQUENCIES.find((item) => item.value === frequency);

  return (
    <>
      <WebApplicationSchema
        name="Paycheck Calculator"
        url="https://calcora.website/paycheck-calculator"
        description="Free paycheck and take-home pay estimator. See gross pay, tax deductions, and net pay for weekly, biweekly, semimonthly, or monthly pay."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema items={BREADCRUMB_ITEMS} />

      <CalculatorShell
        title="Paycheck Calculator"
        description="Estimate your take-home pay after federal tax, state tax, and other deductions. Choose your pay frequency to see figures per paycheck and annually."
        formula="Gross pay per period = Annual salary / Pay periods per year; Net pay = Gross pay − Federal tax − State tax − Other deductions"
        example="For a $60,000 annual salary paid biweekly (26 periods): gross pay per period = $60,000 / 26 ≈ $2,307.69. With 22% federal tax (≈ $507.69) and 5% state tax (≈ $115.38), net pay per period ≈ $1,684.62, or about $43,800 per year."
        faqs={FAQS}
        relatedTools={relatedTools}
        breadcrumbs={[{ label: "Paycheck Calculator" }]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="paycheck-salary"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Annual gross salary ({money(0).replace(/0/g, "")})
              </label>
              <input
                id="paycheck-salary"
                type="number"
                inputMode="decimal"
                min={0}
                step={1000}
                value={salary}
                onChange={(e) => setSalary(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="paycheck-frequency"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Pay frequency
              </label>
              <select
                id="paycheck-frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as PayFrequency)}
                className={inputClass}
              >
                {FREQUENCIES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="paycheck-federal"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Federal tax rate (%)
              </label>
              <input
                id="paycheck-federal"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={0.5}
                value={federalRate}
                onChange={(e) => setFederalRate(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="paycheck-state"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                State tax rate (%)
              </label>
              <input
                id="paycheck-state"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={0.5}
                value={stateRate}
                onChange={(e) => setStateRate(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="paycheck-other"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Other deductions ($/month)
              </label>
              <input
                id="paycheck-other"
                type="number"
                inputMode="decimal"
                min={0}
                step={10}
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
          </div>

          <AdSlot slotId="paycheck-mid" />

          {result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-yellow-800">
                  Estimate
                </span>
                <p className="text-xs text-text-muted">
                  Approximate figures for {currentFrequency?.label.toLowerCase()} pay.
                  Actual amounts depend on your W-4 and benefits.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm text-text-muted">
                    Gross pay per period
                  </p>
                  <p className="text-2xl font-bold text-navy">
                    {money(result.grossPerPeriod)}
                  </p>
                </div>
                <div className="rounded-lg border border-green bg-green/5 p-4">
                  <p className="text-sm text-text-muted">Net pay per period</p>
                  <p className="text-2xl font-bold text-green">
                    {money(result.netPerPeriod)}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {money(result.netAnnual)} per year
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wide text-text-muted">
                      <th className="px-4 py-2.5 font-medium">Item</th>
                      <th className="px-4 py-2.5 text-right font-medium">
                        Per Period
                      </th>
                      <th className="px-4 py-2.5 text-right font-medium">
                        Annual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {result.rows.map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-2.5 text-text-primary">
                          <span className="flex flex-wrap items-center gap-2">
                            {row.label}
                            {row.estimate && (
                              <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-yellow-800">
                                Estimate
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-text-primary">
                          {money(row.perPeriod)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-text-primary">
                          {money(row.annual)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Download CSV
              </button>

              <p className="text-xs text-text-muted">
                ESTIMATE: This tool assumes flat federal and state tax rates and
                does not include Social Security, Medicare, pre-tax benefits, or
                retirement contributions. Always confirm figures with your
                employer or payroll system.
              </p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Enter your annual salary to see your estimated paycheck breakdown.
            </p>
          )}
        </div>
      </CalculatorShell>
    </>
  );
}