import type { CountryCode } from "./countries";

export type CalculatorCategory = "mortgage" | "finance" | "investment" | "tax" | "health" | "utility";

export interface CalculatorMeta {
  slug: string;
  path: string;
  title: string;
  h1: string;
  description: string;
  category: CalculatorCategory;
  countryScope: "global" | CountryCode[];
  related: string[];
  keywords: string[];
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "mortgage-calculator",
    path: "/mortgage-calculator/",
    title: "Mortgage Calculator",
    h1: "Mortgage Calculator",
    description:
      "Calculate your monthly mortgage payments, total interest, and view a full amortization schedule.",
    category: "mortgage",
    countryScope: ["US", "UK", "CA", "AU"],
    related: ["emi-calculator", "loan-affordability-calculator", "debt-payoff-calculator"],
    keywords: [
      "mortgage calculator with pmi and taxes",
      "how much is my monthly mortgage payment",
      "30 year mortgage calculator",
      "mortgage amortization schedule",
    ],
  },
  {
    slug: "emi-calculator",
    path: "/emi-calculator/",
    title: "EMI Calculator",
    h1: "EMI Calculator",
    description:
      "Compute equated monthly installments for any loan with a detailed amortization breakdown.",
    category: "finance",
    countryScope: "global",
    related: ["mortgage-calculator", "loan-affordability-calculator", "debt-payoff-calculator"],
    keywords: [
      "loan emi calculator",
      "how to calculate emi on a loan",
      "monthly installment calculator",
    ],
  },
  {
    slug: "compound-interest-calculator",
    path: "/compound-interest-calculator/",
    title: "Compound Interest Calculator",
    h1: "Compound Interest Calculator",
    description:
      "See how your money grows over time with compound interest. View year-by-year breakdowns.",
    category: "investment",
    countryScope: "global",
    related: ["retirement-calculator", "inflation-calculator", "loan-affordability-calculator"],
    keywords: [
      "compound interest calculator monthly contribution",
      "how to calculate compound interest",
      "daily vs monthly compounding",
    ],
  },
  {
    slug: "inflation-calculator",
    path: "/inflation-calculator/",
    title: "Inflation Calculator",
    h1: "Inflation Calculator",
    description:
      "Find out what your money will be worth in the future or what past amounts equal today.",
    category: "investment",
    countryScope: "global",
    related: ["compound-interest-calculator", "retirement-calculator", "percentage-calculator"],
    keywords: [
      "inflation calculator by country",
      "what will money be worth in the future",
      "purchasing power calculator",
    ],
  },
  {
    slug: "bmi-calculator",
    path: "/bmi-calculator/",
    title: "BMI Calculator",
    h1: "BMI Calculator",
    description: "Calculate your Body Mass Index using metric or imperial units. Know your category instantly.",
    category: "health",
    countryScope: "global",
    related: ["calorie-calculator", "percentage-calculator"],
    keywords: [
      "bmi calculator kg and cm",
      "what is my bmi and healthy weight",
      "bmi chart for adults",
    ],
  },
  {
    slug: "calorie-calculator",
    path: "/calorie-calculator/",
    title: "Calorie Calculator",
    h1: "Calorie Calculator",
    description:
      "Find your daily calorie needs based on the Mifflin-St Jeor equation. Get targets for weight loss or gain.",
    category: "health",
    countryScope: "global",
    related: ["bmi-calculator", "percentage-calculator"],
    keywords: [
      "how many calories should i eat a day",
      "calorie deficit calculator to lose weight",
      "daily calorie needs calculator",
    ],
  },
  {
    slug: "paycheck-calculator",
    path: "/paycheck-calculator/",
    title: "Paycheck Calculator",
    h1: "Paycheck Calculator",
    description: "Estimate your take-home pay after federal tax, state tax, and other deductions.",
    category: "tax",
    countryScope: ["US", "UK", "CA", "AU"],
    related: ["loan-affordability-calculator", "retirement-calculator", "percentage-calculator"],
    keywords: [
      "take home pay calculator after taxes",
      "how much tax is taken out of my paycheck",
      "salary to hourly calculator",
    ],
  },
  {
    slug: "loan-affordability-calculator",
    path: "/loan-affordability-calculator/",
    title: "Loan Affordability Calculator",
    h1: "Loan Affordability Calculator",
    description: "Find out how much you can borrow based on your monthly budget and interest rate.",
    category: "finance",
    countryScope: "global",
    related: ["mortgage-calculator", "emi-calculator", "debt-payoff-calculator"],
    keywords: [
      "how much house can i afford on 60k salary",
      "loan amount based on monthly payment",
      "what can i afford to borrow",
    ],
  },
  {
    slug: "debt-payoff-calculator",
    path: "/debt-payoff-calculator/",
    title: "Debt Payoff Calculator",
    h1: "Debt Payoff Calculator",
    description: "Compare avalanche vs snowball strategies and see how fast you can become debt-free.",
    category: "finance",
    countryScope: "global",
    related: ["loan-affordability-calculator", "percentage-calculator", "emi-calculator"],
    keywords: [
      "how long to pay off debt calculator",
      "debt snowball vs avalanche",
      "balance transfer payoff calculator",
    ],
  },
  {
    slug: "percentage-calculator",
    path: "/percentage-calculator/",
    title: "Percentage Calculator",
    h1: "Percentage Calculator",
    description: "Calculate percentages, percentage changes, and convert between fractions and percentages.",
    category: "utility",
    countryScope: "global",
    related: ["compound-interest-calculator", "inflation-calculator", "debt-payoff-calculator"],
    keywords: [
      "what percent is x of y",
      "percentage change calculator",
      "add or subtract a percentage",
    ],
  },
  {
    slug: "retirement-calculator",
    path: "/retirement-calculator/",
    title: "Retirement Calculator",
    h1: "Retirement / 401(k) Calculator",
    description: "Project your retirement savings and see how contributions grow over decades.",
    category: "investment",
    countryScope: "global",
    related: ["compound-interest-calculator", "inflation-calculator", "paycheck-calculator"],
    keywords: [
      "retirement calculator with employer match",
      "how much do i need to retire",
      "401k growth calculator",
    ],
  },
{
    slug: "vat-calculator",
    path: "/vat-calculator/",
    title: "VAT / Sales Tax Calculator",
    h1: "VAT / Sales Tax Calculator",
    description: "Add or remove VAT from any price. Supports UK, EU, and custom tax rates.",
    category: "tax",
    countryScope: ["UK", "CA", "AU"],
    related: ["percentage-calculator", "paycheck-calculator", "loan-affordability-calculator"],
    keywords: [
      "add vat to a price calculator",
      "remove vat from price",
      "uk vat calculator 2024",
    ],
  },
  {
    slug: "cd-calculator",
    path: "/cd-calculator/",
    title: "CD Calculator",
    h1: "Certificate of Deposit (CD) Calculator",
    description:
      "Calculate the maturity value and interest earned on a certificate of deposit with monthly or annual compounding.",
    category: "investment",
    countryScope: ["US"],
    related: ["compound-interest-calculator", "apy-calculator", "retirement-calculator"],
    keywords: [
      "cd calculator interest maturity",
      "how much will a cd earn",
      "cd rates calculation",
    ],
  },
  {
    slug: "apy-calculator",
    path: "/apy-calculator/",
    title: "APY Calculator",
    h1: "APY Calculator",
    description:
      "Convert APR to APY, see how compounding frequency boosts your effective annual yield, and compare earnings.",
    category: "investment",
    countryScope: "global",
    related: ["cd-calculator", "compound-interest-calculator", "simple-interest-calculator"],
    keywords: [
      "apr to apy conversion",
      "how does compounding frequency affect apy",
      "effective annual rate calculator",
    ],
  },
  {
    slug: "auto-loan-calculator",
    path: "/auto-loan-calculator/",
    title: "Auto Loan Calculator",
    h1: "Auto Loan Calculator",
    description:
      "Estimate monthly car payments, total interest, and see a full amortization schedule for your auto loan.",
    category: "finance",
    countryScope: "global",
    related: ["emi-calculator", "loan-affordability-calculator", "personal-loan-calculator"],
    keywords: [
      "car loan payment calculator",
      "auto loan monthly payment",
      "car financing interest calculator",
    ],
  },
  {
    slug: "personal-loan-calculator",
    path: "/personal-loan-calculator/",
    title: "Personal Loan Calculator",
    h1: "Personal Loan Calculator",
    description:
      "Calculate monthly payments, total interest, and a payoff schedule for any personal loan.",
    category: "finance",
    countryScope: "global",
    related: ["emi-calculator", "debt-payoff-calculator", "loan-affordability-calculator"],
    keywords: [
      "personal loan monthly payment",
      "personal loan interest calculator",
      "how much will a personal loan cost",
    ],
  },
  {
    slug: "amortization-calculator",
    path: "/amortization-calculator/",
    title: "Amortization Calculator",
    h1: "Loan Amortization Calculator",
    description:
      "Generate a complete loan amortization schedule showing every principal and interest payment over the life of the loan.",
    category: "finance",
    countryScope: "global",
    related: ["mortgage-calculator", "emi-calculator", "auto-loan-calculator"],
    keywords: [
      "amortization schedule generator",
      "loan amortization table",
      "principal and interest breakdown",
    ],
  },
  {
    slug: "simple-interest-calculator",
    path: "/simple-interest-calculator/",
    title: "Simple Interest Calculator",
    h1: "Simple Interest Calculator",
    description:
      "Calculate simple interest on any loan or investment with clear principal, rate, and time inputs.",
    category: "finance",
    countryScope: "global",
    related: ["compound-interest-calculator", "apy-calculator", "percentage-calculator"],
    keywords: [
      "simple interest calculator",
      "simple interest formula",
      "how to calculate simple interest",
    ],
  },
  {
    slug: "dti-ratio-calculator",
    path: "/dti-ratio-calculator/",
    title: "Debt-to-Income (DTI) Ratio Calculator",
    h1: "Debt-to-Income (DTI) Ratio Calculator",
    description:
      "Calculate your debt-to-income ratio and see whether your monthly debt load is within healthy lending limits.",
    category: "finance",
    countryScope: "global",
    related: ["loan-affordability-calculator", "mortgage-calculator", "debt-payoff-calculator"],
    keywords: [
      "debt to income ratio calculator",
      "dti calculator mortgage",
      "what is a good debt to income ratio",
    ],
  },
  {
    slug: "savings-goal-calculator",
    path: "/savings-goal-calculator/",
    title: "Savings Goal Calculator",
    h1: "Savings Goal Calculator",
    description:
      "Find out how long it takes to reach a savings goal with monthly contributions and interest, or how much to save each month.",
    category: "finance",
    countryScope: "global",
    related: ["compound-interest-calculator", "compound-savings-calculator", "retirement-calculator"],
    keywords: [
      "savings goal calculator",
      "how long to save 10000 with monthly contributions",
      "how much should i save each month calculator",
    ],
  },
  {
    slug: "cagr-calculator",
    path: "/cagr-calculator/",
    title: "CAGR Calculator",
    h1: "Compound Annual Growth Rate (CAGR) Calculator",
    description:
      "Calculate the compound annual growth rate of an investment from its start and end values over any period.",
    category: "investment",
    countryScope: "global",
    related: ["compound-interest-calculator", "apy-calculator", "rule-of-72-calculator", "retirement-calculator"],
    keywords: [
      "cagr calculator",
      "compound annual growth rate formula",
      "investment growth rate calculator",
    ],
  },
  {
    slug: "compound-savings-calculator",
    path: "/compound-savings-calculator/",
    title: "Compound Savings Calculator",
    h1: "Compound Savings Calculator",
    description:
      "Project how your savings grow when you add money monthly and earn compounding interest, year after year.",
    category: "investment",
    countryScope: "global",
    related: ["compound-interest-calculator", "savings-goal-calculator", "retirement-calculator"],
    keywords: [
      "compound savings calculator",
      "monthly contribution compound interest",
      "how much will my savings grow",
    ],
  },
  {
    slug: "loan-comparison-calculator",
    path: "/loan-comparison-calculator/",
    title: "Loan Comparison Calculator",
    h1: "Loan Comparison Calculator",
    description:
      "Compare two loan offers side by side: monthly payments, total interest, fees, and total cost over the life of each loan.",
    category: "finance",
    countryScope: "global",
    related: ["loan-affordability-calculator", "mortgage-calculator", "auto-loan-calculator", "personal-loan-calculator"],
    keywords: [
      "compare loans calculator",
      "which loan is better monthly payment or total cost",
      "loan comparison monthly interest",
    ],
  },
  {
    slug: "rule-of-72-calculator",
    path: "/rule-of-72-calculator/",
    title: "Rule of 72 Calculator",
    h1: "Rule of 72 Calculator",
    description:
      "Estimate how long it takes your money to double with the Rule of 72, or what return you need to double by a target date.",
    category: "investment",
    countryScope: "global",
    related: ["cagr-calculator", "compound-interest-calculator", "apy-calculator"],
    keywords: [
      "rule of 72 calculator",
      "how long to double my money",
      "what rate to double money in 10 years",
    ],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((calc) => calc.slug === slug);
}

export function getCalculatorByPath(path: string): CalculatorMeta | undefined {
  return CALCULATORS.find((calc) => calc.path === path);
}

export function getRelatedCalculators(slug: string): CalculatorMeta[] {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return [];
  return calc.related
    .map((relatedSlug) => getCalculatorBySlug(relatedSlug))
    .filter((x): x is CalculatorMeta => x !== undefined);
}

export function getCalculatorsByCategory(category: CalculatorCategory): CalculatorMeta[] {
  return CALCULATORS.filter((calc) => calc.category === category);
}

export function calculatorSupportsCountry(slug: string, countryCode: string): boolean {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return false;
  if (calc.countryScope === "global") return true;
  return (calc.countryScope as string[]).includes(countryCode);
}