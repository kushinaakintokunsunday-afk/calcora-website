import type { MetadataRoute } from "next";

const BASE_URL = "https://calcora.website";

const CALCULATORS = [
  { slug: "mortgage-calculator", lastModified: new Date() },
  { slug: "emi-calculator", lastModified: new Date() },
  { slug: "compound-interest-calculator", lastModified: new Date() },
  { slug: "inflation-calculator", lastModified: new Date() },
  { slug: "bmi-calculator", lastModified: new Date() },
  { slug: "calorie-calculator", lastModified: new Date() },
  { slug: "paycheck-calculator", lastModified: new Date() },
  { slug: "loan-affordability-calculator", lastModified: new Date() },
  { slug: "debt-payoff-calculator", lastModified: new Date() },
  { slug: "percentage-calculator", lastModified: new Date() },
  { slug: "retirement-calculator", lastModified: new Date() },
  { slug: "vat-calculator", lastModified: new Date() },
];

const PAGES = [
  { path: "/about/", lastModified: new Date() },
  { path: "/contact/", lastModified: new Date() },
  { path: "/privacy-policy/", lastModified: new Date() },
  { path: "/terms/", lastModified: new Date() },
  { path: "/disclaimer/", lastModified: new Date() },
  { path: "/blog/", lastModified: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntry: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const calcEntries: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${BASE_URL}/${calc.slug}/`,
    lastModified: calc.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const pageEntries: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...homeEntry, ...calcEntries, ...pageEntries];
}
