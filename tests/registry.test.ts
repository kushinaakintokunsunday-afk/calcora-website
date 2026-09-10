import { describe, it, expect } from "vitest";
import {
  CALCULATORS,
  getCalculatorBySlug,
  getRelatedCalculators,
  calculatorSupportsCountry,
  getCalculatorsByCategory,
} from "@/lib/registry";

describe("calculator registry", () => {
  it("has 18 calculators", () => {
    expect(CALCULATORS).toHaveLength(18);
  });

  it("every slug and path is unique", () => {
    const slugs = CALCULATORS.map((c) => c.slug);
    const paths = CALCULATORS.map((c) => c.path);
    expect(new Set(slugs).size).toBe(18);
    expect(new Set(paths).size).toBe(18);
  });

  it("every calculator has valid paths and meta title/description", () => {
    for (const calc of CALCULATORS) {
      expect(calc.path).toMatch(/^\/[a-z-]+\/$/);
      expect(calc.title.length).toBeGreaterThan(0);
      expect(calc.h1.length).toBeGreaterThan(0);
      expect(calc.description.length).toBeGreaterThan(0);
      expect(calc.keywords.length).toBeGreaterThan(0);
    }
  });

  it("every related reference points to an existing calculator", () => {
    for (const calc of CALCULATORS) {
      for (const rel of calc.related) {
        expect(getCalculatorBySlug(rel)).toBeDefined();
      }
    }
  });

  it("related list excludes itself", () => {
    for (const calc of CALCULATORS) {
      expect(calc.related).not.toContain(calc.slug);
    }
  });

  it("mortgage calculator supports US/UK/CA/AU", () => {
    for (const code of ["US", "UK", "CA", "AU"]) {
      expect(calculatorSupportsCountry("mortgage-calculator", code)).toBe(true);
    }
  });

  it("vat calculator supports only VAT countries, not US", () => {
    expect(calculatorSupportsCountry("vat-calculator", "UK")).toBe(true);
    expect(calculatorSupportsCountry("vat-calculator", "US")).toBe(false);
  });

  it("global calculators support every country", () => {
    expect(calculatorSupportsCountry("bmi-calculator", "AU")).toBe(true);
    expect(calculatorSupportsCountry("compound-interest-calculator", "CA")).toBe(true);
  });

  it("getRelatedCalculators returns valid metas", () => {
    const related = getRelatedCalculators("mortgage-calculator");
    expect(related.length).toBeGreaterThan(0);
    for (const r of related) {
      expect(r).toHaveProperty("slug");
    }
  });

  it("all categories are represented", () => {
    expect(getCalculatorsByCategory("finance").length).toBeGreaterThan(0);
    expect(getCalculatorsByCategory("investment").length).toBeGreaterThan(0);
    expect(getCalculatorsByCategory("health").length).toBeGreaterThan(0);
    expect(getCalculatorsByCategory("tax").length).toBeGreaterThan(0);
  });
});