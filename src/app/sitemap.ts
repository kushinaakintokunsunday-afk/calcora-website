import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/registry";

const BASE_URL = "https://calcora.website";

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
    url: `${BASE_URL}${calc.path}`,
    lastModified: new Date(),
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