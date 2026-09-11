"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { useMoney } from "@/lib/useCountry";
import { NumberInput } from "@/components/ui/NumberInput";
import { SelectInput } from "@/components/ui/SelectInput";
import { ResultCard } from "@/components/ui/Field";
import { AdSlot } from "@/components/AdSlot";

const MODE_OPTIONS = [
  { label: "Add tax to price", value: "add" },
  { label: "Remove tax from total", value: "remove" },
];

const FAQS = [
  {
    question: "How do I add sales tax to a price?",
    answer: "Multiply the price by (1 + tax rate). For example, a $100 item with 8.25% tax costs 100 × 1.0825 = $108.25. The tax portion is $8.25.",
  },
  {
    question: "How do I remove sales tax from a total?",
    answer: "Divide the total by (1 + tax rate). For a $108.25 receipt at 8.25% tax, the pre-tax price is 108.25 ÷ 1.0825 = $100.00.",
  },
  {
    question: "What sales tax rate should I use?",
    answer: "Sales tax varies by state, county, and city in the US. Check your receipt, or use your state's department of revenue lookup tool. Average combined US sales tax is around 7-9%.",
  },
  {
    question: "Is sales tax the same as VAT?",
    answer: "No. Sales tax is charged once at the final point of sale to consumers. VAT (value-added tax) is collected at every step of production and distribution. Both are consumption taxes, but they work differently.",
  },
];

const RELATED_TOOLS = [
  { href: "/vat-calculator/", label: "VAT Calculator" },
  { href: "/percentage-calculator/", label: "Percentage" },
  { href: "/paycheck-calculator/", label: "Paycheck" },
  { href: "/inflation-calculator/", label: "Inflation" },
];

export default function SalesTaxCalculator() {
  const { money } = useMoney("sales-tax-calculator");
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(8.25);
  const [mode, setMode] = useState("add");

  const results = useMemo(() => {
    const price = Math.max(0, amount);
    const taxPct = Math.max(0, rate) / 100;

    if (mode === "remove") {
      const preTax = price / (1 + taxPct);
      const tax = price - preTax;
      return { preTax, tax, total: price };
    }

    const tax = price * taxPct;
    const total = price + tax;
    return { preTax: price, tax, total };
  }, [amount, rate, mode]);

  return (
    <>
      <WebApplicationSchema
        name="Sales Tax Calculator"
        url="https://calcora.website/sales-tax-calculator/"
        description="Quickly add or remove sales tax from any price with our easy sales tax calculator."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "Sales Tax Calculator", url: "https://calcora.website/sales-tax-calculator/" },
        ]}
      />
      <CalculatorShell
        title="Sales Tax Calculator"
        description="Add or remove sales tax from a price instantly."
        formula="Total = Price × (1 + rate), or Price = Total ÷ (1 + rate) when removing tax."
        example="A $100 item at 8.25% sales tax: total = $108.25. Removing tax from a $108.25 receipt: $100.00."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Sales Tax Calculator" }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <NumberInput
            id="st-amount"
            label={mode === "add" ? "Price (before tax)" : "Total (with tax)"}
            prefix="$"
            value={amount}
            onChange={setAmount}
            min={0}
            step={1}
          />
          <NumberInput
            id="st-rate"
            label="Sales Tax Rate"
            suffix="%"
            value={rate}
            onChange={setRate}
            min={0}
            max={30}
            step={0.01}
          />
          <SelectInput
            id="st-mode"
            label="Mode"
            value={mode}
            onChange={setMode}
            options={MODE_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <ResultCard
            label={mode === "add" ? "Price (before tax)" : "Original Price"}
            value={money(results.preTax)}
            accent="navy"
          />
          <ResultCard label="Sales Tax" value={money(results.tax)} accent="green" />
          <ResultCard label="Total" value={money(results.total)} sub="After adjustment" />
        </div>

        <AdSlot slotId="sales-tax-mid" className="my-8" />
      </CalculatorShell>
    </>
  );
}