"use client";

import { useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { CalculatorShell } from "@/components/CalculatorShell";
import {
  BreadcrumbListSchema,
  FAQSchema,
  WebApplicationSchema,
} from "@/components/Schema";
import { formatNumber } from "@/lib/utils";

type Unit = "metric" | "imperial";

type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

const KG_PER_LB = 0.45359237;
const M_PER_IN = 0.0254;

const CATEGORY_STYLES: Record<
  BmiCategory,
  { text: string; badge: string; panel: string }
> = {
  Underweight: {
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-800",
    panel: "border-blue-200 bg-blue-50",
  },
  Normal: {
    text: "text-green-700",
    badge: "bg-green-100 text-green-800",
    panel: "border-green-200 bg-green-50",
  },
  Overweight: {
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
    panel: "border-yellow-200 bg-yellow-50",
  },
  Obese: {
    text: "text-red-700",
    badge: "bg-red-100 text-red-800",
    panel: "border-red-200 bg-red-50",
  },
};

const RELATED_TOOLS = [
  { href: "/calorie-calculator/", label: "Calorie Calculator" },
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/percentage-calculator/", label: "Percentage Calculator" },
];

const FAQS = [
  {
    question: "What is BMI?",
    answer:
      "BMI (Body Mass Index) is a simple measure that compares your weight to your height. It is widely used to screen for weight categories that may be linked to health problems, though it does not directly measure body fat.",
  },
  {
    question: "What do the BMI categories mean?",
    answer:
      "For most adults, a BMI below 18.5 is underweight, 18.5 to 24.9 is normal weight, 25 to 29.9 is overweight, and 30 or above is obese. Higher BMIs are associated with an increased risk of certain health conditions.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI can overestimate body fat for muscular athletes and underestimate it for older adults. It is a screening tool rather than a diagnosis, so it makes sense to consider it alongside other health indicators.",
  },
  {
    question: "How do I read the healthy weight range?",
    answer:
      "The healthy weight range shows the weights that correspond to a BMI between 18.5 and 24.9 for your current height. Staying inside this range is a general guideline, but individual health depends on many factors.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://calcora.website/" },
  { name: "BMI Calculator", url: "https://calcora.website/bmi-calculator" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-green/50";

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [metricWeight, setMetricWeight] = useState(70);
  const [metricHeight, setMetricHeight] = useState(170);
  const [imperialWeight, setImperialWeight] = useState(154);
  const [imperialHeight, setImperialHeight] = useState(67);

  const weight = unit === "metric" ? metricWeight : imperialWeight;
  const height = unit === "metric" ? metricHeight : imperialHeight;

  const result = useMemo(() => {
    const weightKg =
      unit === "metric" ? metricWeight : imperialWeight * KG_PER_LB;
    const heightM =
      unit === "metric" ? metricHeight / 100 : imperialHeight * M_PER_IN;

    if (!(weightKg > 0) || !(heightM > 0)) return null;

    const bmi = weightKg / (heightM * heightM);
    const minKg = 18.5 * heightM * heightM;
    const maxKg = 24.9 * heightM * heightM;

    let category: BmiCategory;
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const toUnit = (kg: number) => (unit === "metric" ? kg : kg / KG_PER_LB);

    return {
      bmi,
      category,
      minWeight: toUnit(minKg),
      maxWeight: toUnit(maxKg),
    };
  }, [unit, metricWeight, metricHeight, imperialWeight, imperialHeight]);

  const handleWeightChange = (value: number) => {
    if (unit === "metric") setMetricWeight(value);
    else setImperialWeight(value);
  };

  const handleHeightChange = (value: number) => {
    if (unit === "metric") setMetricHeight(value);
    else setImperialHeight(value);
  };

  const styles = result ? CATEGORY_STYLES[result.category] : CATEGORY_STYLES.Normal;
  const weightUnit = unit === "metric" ? "kg" : "lb";
  const heightUnit = unit === "metric" ? "cm" : "in";

  return (
    <>
      <WebApplicationSchema
        name="BMI Calculator"
        url="https://calcora.website/bmi-calculator"
        description="Free BMI calculator with metric and imperial units. Instantly check your BMI category and healthy weight range."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema items={BREADCRUMB_ITEMS} />

      <CalculatorShell
        title="BMI Calculator"
        description="Calculate your Body Mass Index, discover your weight category, and find a healthy weight range for your height. Switch between metric and imperial units."
        formula="BMI = weight (kg) / height (m)²"
        example="For a person who is 70 kg and 170 cm tall: height in meters = 170 / 100 = 1.7 m. BMI = 70 / (1.7 × 1.7) = 70 / 2.89 ≈ 24.2, which falls in the Normal category. The healthy weight range for this height is about 53.5 kg to 71.9 kg."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "BMI Calculator" }]}
      >
        <div className="space-y-6">
          <div>
            <span className="mb-1.5 block text-sm font-medium text-text-primary">
              Units
            </span>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Unit system">
              <button
                type="button"
                onClick={() => setUnit("metric")}
                aria-pressed={unit === "metric"}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  unit === "metric"
                    ? "border-green bg-green text-white"
                    : "border-border bg-white text-text-secondary hover:bg-surface-alt"
                }`}
              >
                Metric (kg, cm)
              </button>
              <button
                type="button"
                onClick={() => setUnit("imperial")}
                aria-pressed={unit === "imperial"}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  unit === "imperial"
                    ? "border-green bg-green text-white"
                    : "border-border bg-white text-text-secondary hover:bg-surface-alt"
                }`}
              >
                Imperial (lb, in)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="bmi-weight"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Weight ({weightUnit})
              </label>
              <input
                id="bmi-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                value={weight}
                onChange={(e) => handleWeightChange(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="bmi-height"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Height ({heightUnit})
              </label>
              <input
                id="bmi-height"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={height}
                onChange={(e) => handleHeightChange(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
          </div>

          <AdSlot slotId="bmi-mid" />

          {result ? (
            <div className="space-y-4">
              <div className={`rounded-lg border p-5 ${styles.panel}`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-text-muted">
                      Your BMI
                    </p>
                    <p className={`text-4xl font-bold ${styles.text}`}>
                      {formatNumber(result.bmi, 1)}
                    </p>
                  </div>
                  <span
                    className={`inline-flex self-start rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}
                  >
                    {result.category}
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">
                  Your weight of {formatNumber(weight, 1)} {weightUnit} at a height
                  of {formatNumber(height, 1)} {heightUnit} places you in the{" "}
                  {result.category} category.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm text-text-muted">
                  Healthy weight range for your height
                </p>
                <p className="text-lg font-semibold text-navy">
                  {formatNumber(result.minWeight, 1)} –{" "}
                  {formatNumber(result.maxWeight, 1)} {weightUnit}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Corresponds to a BMI of 18.5 to 24.9
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-text-primary">
                  BMI categories
                </p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2 text-blue-800">
                    <span className="block font-semibold">Underweight</span>
                    <span className="block text-blue-600">{"< 18.5"}</span>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-2 text-green-800">
                    <span className="block font-semibold">Normal</span>
                    <span className="block text-green-600">18.5 – 24.9</span>
                  </div>
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-2 text-yellow-800">
                    <span className="block font-semibold">Overweight</span>
                    <span className="block text-yellow-700">25.0 – 29.9</span>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-800">
                    <span className="block font-semibold">Obese</span>
                    <span className="block text-red-600">{"30.0+"}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Enter a weight and height to see your results.
            </p>
          )}

          <p className="text-xs text-text-muted">
            This calculator is for informational purposes only. Consult a
            healthcare professional for personalized advice.
          </p>
        </div>
      </CalculatorShell>
    </>
  );
}