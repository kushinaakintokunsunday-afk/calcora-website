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

type Sex = "male" | "female";

type ActivityLevel = "sedentary" | "lightly" | "moderately" | "very" | "extra";

const ACTIVITY_LEVELS: {
  value: ActivityLevel;
  label: string;
  multiplier: number;
}[] = [
  { value: "sedentary", label: "Sedentary (little or no exercise)", multiplier: 1.2 },
  { value: "lightly", label: "Lightly active (1-3 days/week)", multiplier: 1.375 },
  { value: "moderately", label: "Moderately active (3-5 days/week)", multiplier: 1.55 },
  { value: "very", label: "Very active (6-7 days/week)", multiplier: 1.725 },
  { value: "extra", label: "Extra active (physical job + exercise)", multiplier: 1.9 },
];

const RELATED_TOOLS = [
  { href: "/bmi-calculator/", label: "BMI Calculator" },
  { href: "/paycheck-calculator/", label: "Paycheck Calculator" },
  { href: "/retirement-calculator/", label: "Retirement Calculator" },
];

const FAQS = [
  {
    question: "What is BMR?",
    answer:
      "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to keep vital functions like breathing, circulation, and cell repair working. It usually accounts for the largest share of your daily energy expenditure.",
  },
  {
    question: "What is the Mifflin-St Jeor equation?",
    answer:
      "The Mifflin-St Jeor equation estimates BMR using your sex, age, weight, and height. For men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161.",
  },
  {
    question: "How many calories should I cut to lose weight?",
    answer:
      "A deficit of roughly 500 calories per day is commonly used to lose about 0.5 kg (1 lb) per week, and about 250 calories per day for a slower 0.25 kg (0.5 lb) per week. The best approach is one you can sustain over the long term.",
  },
  {
    question: "Why does my activity level matter?",
    answer:
      "Your activity level determines your TDEE (Total Daily Energy Expenditure), which is your BMR multiplied by an activity factor. The more active you are, the more calories you burn, so your calorie targets shift even if your BMR stays the same.",
  },
  {
    question: "Are these calorie estimates accurate?",
    answer:
      "These figures are estimates based on population averages and can vary from person to person. Genes, muscle mass, medications, and health conditions all affect your true needs, so it is best to treat the results as a starting point and adjust based on real-world progress.",
  },
];

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://calcora.website/" },
  { name: "Calorie Calculator", url: "https://calcora.website/calorie-calculator" },
];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-green/50";

export default function CalorieCalculatorPage() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState<ActivityLevel>("moderately");

  const result = useMemo(() => {
    if (!(age > 0) || !(weight > 0) || !(height > 0)) return null;

    const multiplier =
      ACTIVITY_LEVELS.find((level) => level.value === activity)?.multiplier ?? 1.2;

    const bmr =
      sex === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const tdee = bmr * multiplier;

    const targets = [
      { label: "Mild weight loss", detail: "0.25 lb/week", calories: tdee - 250 },
      { label: "Weight loss", detail: "0.5 lb/week", calories: tdee - 500 },
      { label: "Mild weight gain", detail: "0.25 lb/week", calories: tdee + 250 },
      { label: "Weight gain", detail: "0.5 lb/week", calories: tdee + 500 },
    ];

    return { bmr, tdee, targets };
  }, [sex, age, weight, height, activity]);

  const activeLevel = ACTIVITY_LEVELS.find((level) => level.value === activity);

  return (
    <>
      <WebApplicationSchema
        name="Calorie Calculator"
        url="https://calcora.website/calorie-calculator"
        description="Free calorie calculator based on the Mifflin-St Jeor equation. Estimate your BMR, TDEE, and calorie targets for weight loss or gain."
      />
      <FAQSchema faqs={FAQS} />
      <BreadcrumbListSchema items={BREADCRUMB_ITEMS} />

      <CalculatorShell
        title="Calorie Calculator"
        description="Estimate your daily calorie needs using the Mifflin-St Jeor equation. See your BMR, maintenance calories, and targets for losing or gaining weight."
        formula="Male BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5; Female BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161; TDEE = BMR × activity multiplier"
        example="For a 30-year-old man weighing 70 kg at 170 cm: BMR = (10 × 70) + (6.25 × 170) − (5 × 30) + 5 = 700 + 1,062.5 − 150 + 5 = 1,617.5 kcal/day. With a moderately active lifestyle (× 1.55), his maintenance calories are 1,617.5 × 1.55 ≈ 2,507 kcal/day."
        faqs={FAQS}
        relatedTools={RELATED_TOOLS}
        breadcrumbs={[{ label: "Calorie Calculator" }]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="calorie-sex"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Sex
              </label>
              <select
                id="calorie-sex"
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
                className={inputClass}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="calorie-age"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Age (years)
              </label>
              <input
                id="calorie-age"
                type="number"
                inputMode="numeric"
                min={1}
                max={120}
                step={1}
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="calorie-weight"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Weight (kg)
              </label>
              <input
                id="calorie-weight"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={weight}
                onChange={(e) => setWeight(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="calorie-height"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Height (cm)
              </label>
              <input
                id="calorie-height"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={height}
                onChange={(e) => setHeight(e.target.valueAsNumber || 0)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="calorie-activity"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Activity level
              </label>
              <select
                id="calorie-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className={inputClass}
              >
                {ACTIVITY_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label} (× {level.multiplier})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <AdSlot slotId="calorie-mid" />

          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-sm text-text-muted">Basal Metabolic Rate (BMR)</p>
                  <p className="text-3xl font-bold text-navy">
                    {formatNumber(result.bmr, 0)}
                    <span className="ml-1 text-sm font-medium text-text-muted">kcal/day</span>
                  </p>
                </div>
                <div className="rounded-lg border border-green bg-green/5 p-4">
                  <p className="text-sm text-text-muted">
                    Maintenance calories (TDEE)
                  </p>
                  <p className="text-3xl font-bold text-green">
                    {formatNumber(result.tdee, 0)}
                    <span className="ml-1 text-sm font-medium text-text-muted">kcal/day</span>
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {activeLevel?.label}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-text-primary">
                  Calorie targets
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {result.targets.map((target) => (
                    <div
                      key={target.label}
                      className="flex items-center justify-between rounded-lg border border-border bg-white p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {target.label}
                        </p>
                        <p className="text-xs text-text-muted">{target.detail}</p>
                      </div>
                      <p className="text-lg font-semibold text-navy">
                        {formatNumber(target.calories, 0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-text-muted">
                Estimates are based on the Mifflin-St Jeor equation and do not
                account for pregnancy, illness, or medical conditions. Consult a
                healthcare professional for personalized nutrition advice.
              </p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Enter your age, weight, and height to see your results.
            </p>
          )}
        </div>
      </CalculatorShell>
    </>
  );
}