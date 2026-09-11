"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";
import { NumberInput } from "@/components/NumberInput";

type Tab = "of" | "what-percent" | "change" | "add-subtract";

const TABS: { key: Tab; label: string }[] = [
  { key: "of", label: "% of Value" },
  { key: "what-percent", label: "What %?" },
  { key: "change", label: "% Change" },
  { key: "add-subtract", label: "Add/Subtract %" },
];

const FAQS = [
  {
    question: "How do you calculate X% of Y?",
    answer: "Multiply Y by X and divide by 100. For example, 15% of 200 = 200 × 15 / 100 = 30.",
  },
  {
    question: "How do you find what percent X is of Y?",
    answer: "Divide X by Y, then multiply by 100. For example, 30 is what percent of 200? 30 / 200 × 100 = 15%.",
  },
  {
    question: "How do you calculate percentage change?",
    answer: "Subtract the old value from the new value, divide by the old value, then multiply by 100. Formula: ((New - Old) / Old) × 100. If the result is positive it's an increase; if negative, a decrease.",
  },
  {
    question: "How do you add or subtract a percentage from a number?",
    answer: "To add: multiply the number by (1 + percentage/100). To subtract: multiply by (1 - percentage/100). For example, adding 15% to 200: 200 × 1.15 = 230.",
  },
  {
    question: "What is the difference between percentage and percentage points?",
    answer: "A percentage point is the arithmetic difference between two percentages (e.g., 5% to 7% is a 2 percentage point increase). A percent change is relative: 5% to 7% is a 40% increase ((7-5)/5 × 100).",
  },
];

const RELATED_TOOLS = [
  { href: "/compound-interest-calculator/", label: "Compound Interest" },
  { href: "/inflation-calculator/", label: "Inflation Calculator" },
  { href: "/debt-payoff-calculator/", label: "Debt Payoff" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
];

export default function PercentageCalculator() {
  const { money } = useMoney("percentage-calculator");
  const [tab, setTab] = useState<Tab>("of");

  const [pctOfValue, setPctOfValue] = useState(15);
  const [pctOfY, setPctOfY] = useState(200);

  const [whatX, setWhatX] = useState(30);
  const [whatY, setWhatY] = useState(200);

  const [changeOld, setChangeOld] = useState(100);
  const [changeNew, setChangeNew] = useState(125);

  const [addSubValue, setAddSubValue] = useState(200);
  const [addSubPct, setAddSubPct] = useState(15);
  const [addSubOp, setAddSubOp] = useState<"add" | "subtract">("add");

  const ofResult = useMemo(() => (pctOfValue / 100) * pctOfY, [pctOfValue, pctOfY]);

  const whatPercentResult = useMemo(
    () => (whatY !== 0 ? (whatX / whatY) * 100 : 0),
    [whatX, whatY]
  );

  const changeResult = useMemo(() => {
    if (changeOld === 0) return { pct: 0, direction: "no change" as const };
    const pct = ((changeNew - changeOld) / Math.abs(changeOld)) * 100;
    const direction = pct > 0 ? ("increase" as const) : pct < 0 ? ("decrease" as const) : ("no change" as const);
    return { pct, direction };
  }, [changeOld, changeNew]);

  const addSubResult = useMemo(() => {
    const factor = addSubOp === "add" ? 1 + addSubPct / 100 : 1 - addSubPct / 100;
    return addSubValue * factor;
  }, [addSubValue, addSubPct, addSubOp]);

  return (
    <>
      <WebApplicationSchema
        name="Percentage Calculator"
        url="https://calcora.website/percentage-calculator/"
        description="Free percentage calculator with 4 modes: find a percentage of a value, determine what percent one number is of another, calculate percentage change, and add or subtract percentages."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Percentage Calculator", url: "https://calcora.website/percentage-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Percentage Calculator"
        description="Perform common percentage calculations instantly. Choose a mode below and enter your values."
        example="To find 15% of 200: enter 15 and 200 in the '% of Value' tab. Result: 30. To check if 30 is 15% of 200, use the 'What %?' tab — it confirms 15%."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Percentage Calculator" }]}
      >
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-green text-white"
                  : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "of" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <NumberInput
              id="pc-of-pct"
              label="Percentage (%)"
              value={pctOfValue}
              onChange={setPctOfValue}
              min={0}
              max={10000}
              step={0.1}
              suffix="%"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <NumberInput
              id="pc-of-y"
              label="Of Value ($)"
              value={pctOfY}
              onChange={setPctOfY}
              step={1}
              prefix="$"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <div className="sm:col-span-2 rounded-lg bg-surface border border-border p-4">
              <p className="text-sm text-text-secondary">Result</p>
              <p className="text-2xl font-bold text-navy">{money(ofResult)}</p>
            </div>
          </div>
        )}

        {tab === "what-percent" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <NumberInput
              id="pc-wp-x"
              label="Value X"
              value={whatX}
              onChange={setWhatX}
              step={1}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <NumberInput
              id="pc-wp-y"
              label="Value Y"
              value={whatY}
              onChange={setWhatY}
              step={1}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <div className="sm:col-span-2 rounded-lg bg-surface border border-border p-4">
              <p className="text-sm text-text-secondary">X is what % of Y?</p>
              <p className="text-2xl font-bold text-navy">{formatNumber(whatPercentResult)}%</p>
            </div>
          </div>
        )}

        {tab === "change" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <NumberInput
              id="pc-ch-old"
              label="Old Value"
              value={changeOld}
              onChange={setChangeOld}
              step={1}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <NumberInput
              id="pc-ch-new"
              label="New Value"
              value={changeNew}
              onChange={setChangeNew}
              step={1}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <div className="sm:col-span-2 rounded-lg bg-surface border border-border p-4">
              <p className="text-sm text-text-secondary">Percentage Change</p>
              <p className="text-2xl font-bold text-navy">
                {formatNumber(changeResult.pct)}%
                {changeResult.direction === "increase" && (
                  <span className="text-green ml-2 text-sm font-medium">increase</span>
                )}
                {changeResult.direction === "decrease" && (
                  <span className="text-red-600 ml-2 text-sm font-medium">decrease</span>
                )}
              </p>
            </div>
          </div>
        )}

        {tab === "add-subtract" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <NumberInput
              id="pc-as-value"
              label="Value"
              value={addSubValue}
              onChange={setAddSubValue}
              step={1}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <NumberInput
              id="pc-as-pct"
              label="Percentage (%)"
              value={addSubPct}
              onChange={setAddSubPct}
              min={0}
              max={10000}
              step={0.1}
              suffix="%"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
            <div>
              <label htmlFor="pc-as-op" className="block text-sm font-medium text-text-primary mb-1">
                Operation
              </label>
              <select
                id="pc-as-op"
                value={addSubOp}
                onChange={(e) => setAddSubOp(e.target.value as "add" | "subtract")}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
              </select>
            </div>
            <div className="sm:col-span-3 rounded-lg bg-surface border border-border p-4">
              <p className="text-sm text-text-secondary">
                {addSubOp === "add" ? "Value + Percentage" : "Value - Percentage"}
              </p>
              <p className="text-2xl font-bold text-navy">{money(addSubResult)}</p>
            </div>
          </div>
        )}
      </CalculatorShell>

      <AdSlot slotId="percentage-mid" className="my-8" />
    </>
  );
}
