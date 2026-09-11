"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/CalculatorShell";
import { WebApplicationSchema, FAQSchema, BreadcrumbListSchema } from "@/components/Schema";
import { formatNumber } from "@/lib/utils";
import { useMoney } from "@/lib/useCountry";
import { AdSlot } from "@/components/AdSlot";

type VatMode = "add" | "remove";

const PRESET_RATES = [
  { label: "20% UK", value: 20 },
  { label: "19% Germany", value: 19 },
  { label: "21% Netherlands", value: 21 },
  { label: "5%", value: 5 },
  { label: "12%", value: 12 },
  { label: "18%", value: 18 },
  { label: "Custom", value: -1 },
];

const FAQS = [
  {
    question: "What is VAT?",
    answer: "VAT (Value Added Tax) is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale. It is the most common form of sales tax in Europe and many other countries.",
  },
  {
    question: "How do I add VAT to a net price?",
    answer: "Multiply the net price by (1 + VAT rate / 100). For example, to add 20% VAT to £100: £100 × 1.20 = £120. The VAT amount is £20.",
  },
  {
    question: "How do I remove VAT from a gross price?",
    answer: "Divide the gross price by (1 + VAT rate / 100). For example, to remove 20% VAT from £120: £120 ÷ 1.20 = £100. The VAT amount is £20.",
  },
  {
    question: "What is the standard VAT rate in the UK?",
    answer: "The standard VAT rate in the UK is 20%. There are also reduced rates of 5% (e.g., domestic energy) and 0% (e.g., most food, children's clothing) for certain goods and services.",
  },
  {
    question: "Is VAT the same as sales tax?",
    answer: "They are similar but not identical. VAT is charged at every stage of production and distribution, while sales tax is only charged at the final point of sale to the consumer. The end price to the consumer can be the same, but the collection mechanism differs.",
  },
];

const RELATED_TOOLS = [
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/loan-affordability-calculator/", label: "Loan Affordability" },
];

export default function VatCalculator() {
  const { money } = useMoney("vat-calculator");
  const [mode, setMode] = useState<VatMode>("add");
  const [amount, setAmount] = useState(100);
  const [vatRate, setVatRate] = useState(20);
  const [customRate, setCustomRate] = useState("");
  const [activePreset, setActivePreset] = useState(0);

  const effectiveRate = activePreset === -1 ? (parseFloat(customRate) || 0) : PRESET_RATES[activePreset]?.value ?? vatRate;

  const results = useMemo(() => {
    const rate = Math.max(0, effectiveRate);
    const val = Math.max(0, amount);

    if (mode === "add") {
      const gross = val * (1 + rate / 100);
      const vat = gross - val;
      return { net: val, vat, gross };
    } else {
      const net = val / (1 + rate / 100);
      const vat = val - net;
      return { net, vat, gross: val };
    }
  }, [mode, amount, effectiveRate]);

  const handlePresetClick = (index: number) => {
    setActivePreset(index);
    if (PRESET_RATES[index].value !== -1) {
      setVatRate(PRESET_RATES[index].value);
    }
  };

  const formulaText = mode === "add"
    ? `gross = ${formatNumber(amount, 2)} × (1 + ${effectiveRate}/100) = ${formatNumber(results.gross, 2)}`
    : `net = ${formatNumber(amount, 2)} ÷ (1 + ${effectiveRate}/100) = ${formatNumber(results.net, 2)}`;

  return (
    <>
      <WebApplicationSchema
        name="VAT / Sales Tax Calculator"
        url="https://calcora.website/vat-calculator/"
        description="Add or remove VAT (sales tax) from any price with preset rates for UK, EU, and more."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://calcora.website" },
          { name: "VAT Calculator", url: "https://calcora.website/vat-calculator/" },
        ]}
      />
      <CalculatorShell
        title="VAT / Sales Tax Calculator"
        description="Quickly add or remove VAT (Value Added Tax) from any price. Choose from common preset rates or enter a custom percentage."
        formula={formulaText}
        example="Adding 20% VAT to £100: gross = 100 × 1.20 = £120, VAT = £20. Removing 20% from £120: net = 120 ÷ 1.20 = £100, VAT = £20."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "VAT Calculator" }]}
      >
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode("add")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "add"
                ? "bg-green text-white"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
            }`}
          >
            Add VAT
          </button>
          <button
            type="button"
            onClick={() => setMode("remove")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "remove"
                ? "bg-green text-white"
                : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
            }`}
          >
            Remove VAT
          </button>
        </div>

        <div className="mb-6">
          <p className="block text-sm font-medium text-text-primary mb-2">VAT Rate</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_RATES.map((preset, i) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(i)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activePreset === i
                    ? "bg-green text-white"
                    : "bg-surface border border-border text-text-secondary hover:bg-surface-alt"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {activePreset === -1 && (
          <div className="mb-6">
            <label htmlFor="vat-custom-rate" className="block text-sm font-medium text-text-primary mb-1">
              Custom VAT Rate (%)
            </label>
            <input
              id="vat-custom-rate"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              placeholder="Enter rate"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="vat-amount" className="block text-sm font-medium text-text-primary mb-1">
              {mode === "add" ? "Net Price ($)" : "Gross Price ($)"}
            </label>
            <input
              id="vat-amount"
              type="number"
              min={0}
              step={0.01}
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary focus:border-green focus:ring-1 focus:ring-green"
            />
          </div>
          <div>
            <label htmlFor="vat-rate-display" className="block text-sm font-medium text-text-primary mb-1">
              VAT Rate
            </label>
            <div className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-text-primary font-medium">
              {formatNumber(effectiveRate, effectiveRate % 1 === 0 ? 0 : 1)}%
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-surface border border-border p-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-text-secondary">VAT Amount</p>
              <p className="text-2xl font-bold text-green">{money(results.vat)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Net Price</p>
              <p className="text-2xl font-bold text-navy">{money(results.net)}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Gross Price</p>
              <p className="text-2xl font-bold text-navy">{money(results.gross)}</p>
            </div>
          </div>
        </div>

        <AdSlot slotId="vat-mid" />
      </CalculatorShell>
    </>
  );
}
