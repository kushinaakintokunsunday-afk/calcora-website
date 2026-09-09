"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatCurrency, formatNumber, downloadCSV } from "@/lib/utils";
import { AdSlot } from "@/components/AdSlot";

const FAQS = [
  {
    question: "What is inflation?",
    answer: "Inflation is the rate at which the general level of prices for goods and services rises over time, causing the purchasing power of currency to fall. A moderate level of inflation is considered normal in a healthy economy.",
  },
  {
    question: "How does inflation affect the value of money?",
    answer: "As inflation increases, each unit of currency buys fewer goods and services. For example, if inflation is 3% per year, something that costs $100 today will cost about $103 next year, meaning $100 will have less purchasing power.",
  },
  {
    question: "What is the difference between future value and present value?",
    answer: "Future value (FV) calculates how much a current amount will be worth in the future given inflation. Present value (PV) calculates what a future amount is worth in today's dollars. Both use the same formula but in reverse directions.",
  },
  {
    question: "What is the formula for adjusting for inflation?",
    answer: "The formula is FV = PV × (1 + i)^y for future value, where PV is the present amount, i is the annual inflation rate, and y is the number of years. For present value, rearrange to PV = FV / (1 + i)^y.",
  },
  {
    question: "How much does inflation erode savings over 10 years at 3%?",
    answer: "At 3% annual inflation, $10,000 in today's money will need to become approximately $13,439 in 10 years to maintain the same purchasing power. That means your $10,000 savings effectively loses about $2,560 in purchasing power over that period.",
  },
  {
    question: "What is a good rate of return to beat inflation?",
    answer: "To grow your wealth in real terms, you need investments that return more than the inflation rate. Historically, a diversified portfolio of stocks has returned about 7-10% annually, comfortably beating the average 2-3% inflation rate over the long term.",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
  { href: "/retirement-calculator/", label: "Retirement" },
  { href: "/paycheck-calculator/", label: "Paycheck" },
  { href: "/percentage-calculator/", label: "Percentage" },
];

interface YearRow {
  year: number;
  value: number;
  purchasingPowerLost?: number;
  presentValue?: number;
}

export default function InflationCalculator() {
  const [mode, setMode] = useState<"future" | "present">("future");
  const [futureValueInput, setFutureValueInput] = useState(0);
  const [presentValueInput, setPresentValueInput] = useState(10000);
  const [inflationRate, setInflationRate] = useState(3);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const i = Math.max(0, inflationRate) / 100;
    const y = Math.max(0, Math.floor(years));

    const yearlyData: YearRow[] = [];

    if (mode === "future") {
      const pv = Math.max(0, presentValueInput);

      for (let year = 1; year <= y; year++) {
        const value = pv * Math.pow(1 + i, year);
        yearlyData.push({
          year,
          value,
          purchasingPowerLost: pv - (pv / Math.pow(1 + i, year)),
        });
      }

      const futureValue = pv * Math.pow(1 + i, y);
      const totalPowerLost = pv > 0 ? (1 - 1 / Math.pow(1 + i, y)) * 100 : 0;

      return {
        futureValue,
        purchasingPowerLost: pv > 0 ? futureValue - pv : 0,
        purchasingPowerLostPct: totalPowerLost,
        yearlyData,
      };
    } else {
      const fv = Math.max(0, futureValueInput);

      for (let year = 1; year <= y; year++) {
        const presentValue = fv / Math.pow(1 + i, year);
        yearlyData.push({
          year,
          value: presentValue,
          presentValue,
        });
      }

      const presentValue = fv / Math.pow(1 + i, y);
      const purchasingPowerLost = fv - presentValue;

      return {
        futureValue: fv,
        presentValue,
        purchasingPowerLost,
        purchasingPowerLostPct: fv > 0 ? (purchasingPowerLost / fv) * 100 : 0,
        yearlyData,
      };
    }
  }, [mode, presentValueInput, futureValueInput, inflationRate, years]);

  const handleDownload = () => {
    const headers = mode === "future"
      ? ["Year", "Equivalent Future Value", "Purchasing Power Lost"]
      : ["Year", "Present Value in Today's Dollars"];

    const rows = results.yearlyData.map((row) =>
      mode === "future"
        ? [row.year, row.value.toFixed(2), (row.purchasingPowerLost ?? 0).toFixed(2)]
        : [row.year, (row.presentValue ?? row.value).toFixed(2)]
    );

    downloadCSV("inflation-calculator.csv", headers, rows);
  };

  return (
    <>
      <WebApplicationSchema
        name="Inflation Calculator"
        url="https://calcora.website/inflation-calculator/"
        description="Calculate the effect of inflation on money over time. Find future value or present value with year-by-year comparison."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Inflation Calculator", url: "https://calcora.website/inflation-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Inflation Calculator"
        description="See how inflation affects the value of money over time. Switch between future value and present value modes."
        formula="FV = PV × (1 + i)^y"
        example="If you have $10,000 today and inflation averages 3% per year, in 10 years that amount will need to be $13,439 to have the same purchasing power. Your current $10,000 would only buy what $7,441 buys today."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Inflation Calculator" }]}
      >
        <div className="mb-6">
          <div className="flex gap-1 rounded-lg bg-surface border border-border p-1 w-fit">
            <button
              type="button"
              onClick={() => setMode("future")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "future"
                  ? "bg-white text-navy shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Future Value
            </button>
            <button
              type="button"
              onClick={() => setMode("present")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "present"
                  ? "bg-white text-navy shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Present Value
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {mode === "future" ? (
            <div>
              <label htmlFor="inf-pv" className="block text-sm font-medium text-text-primary mb-1">
                Present Amount ($)
              </label>
              <input
                id="inf-pv"
                type="number"
                min={0}
                step={100}
                value={presentValueInput}
                onChange={(e) => setPresentValueInput(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="inf-fv" className="block text-sm font-medium text-text-primary mb-1">
                Future Amount ($)
              </label>
              <input
                id="inf-fv"
                type="number"
                min={0}
                step={100}
                value={futureValueInput}
                onChange={(e) => setFutureValueInput(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
              />
            </div>
          )}
          <div>
            <label htmlFor="inf-rate" className="block text-sm font-medium text-text-primary mb-1">
              Annual Inflation Rate (%)
            </label>
            <input
              id="inf-rate"
              type="number"
              min={0}
              max={50}
              step={0.1}
              value={inflationRate}
              onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="inf-years" className="block text-sm font-medium text-text-primary mb-1">
              Years
            </label>
            <input
              id="inf-years"
              type="number"
              min={0}
              max={100}
              step={1}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6 mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mode === "future" ? (
              <>
                <div>
                  <p className="text-sm text-text-secondary">Future Value Needed</p>
                  <p className="text-2xl font-bold text-navy">{formatCurrency(results.futureValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Purchasing Power Lost</p>
                  <p className="text-2xl font-bold text-green">{formatNumber(results.purchasingPowerLostPct, 1)}%</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-text-secondary">Present Value (Today&apos;s Dollars)</p>
                  <p className="text-2xl font-bold text-navy">{formatCurrency(results.presentValue ?? 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Purchasing Power Lost</p>
                  <p className="text-2xl font-bold text-green">{formatCurrency(results.purchasingPowerLost)}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <AdSlot slotId="inflation-mid" className="my-8" />

        {results.yearlyData.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-navy">Year-by-Year Comparison</h2>
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
                    {mode === "future" ? (
                      <>
                        <th className="px-4 py-3 text-right font-medium text-text-primary">Equivalent Amount</th>
                        <th className="px-4 py-3 text-right font-medium text-text-primary">Purchasing Power Lost</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 text-right font-medium text-text-primary">Present Value</th>
                        <th className="px-4 py-3 text-right font-medium text-text-primary">% of Original</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.yearlyData.map((row) => (
                    <tr key={row.year} className="border-b border-border last:border-0 hover:bg-surface/50">
                      <td className="px-4 py-2.5 text-text-primary">{row.year}</td>
                      <td className="px-4 py-2.5 text-right text-text-primary">{formatCurrency(row.value)}</td>
                      <td className="px-4 py-2.5 text-right text-green">
                        {mode === "future"
                          ? formatCurrency(row.purchasingPowerLost ?? 0)
                          : formatNumber(
                              ((row.presentValue ?? row.value) /
                                (mode === "present" ? Math.max(1, futureValueInput) : Math.max(1, presentValueInput))) *
                                100,
                              1
                            ) + "%"
                        }
                      </td>
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
