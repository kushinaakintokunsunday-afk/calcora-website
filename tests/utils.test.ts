import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCurrencyForCountry,
  formatNumber,
  formatNumberForCountry,
  formatPercent,
} from "@/lib/utils";

describe("currency formatting", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(1000)).toBe("$1,000");
  });

  it("formats with decimals when needed", () => {
    expect(formatCurrency(1234.56)).toContain("1,234.56");
  });

  it("formats GBP for UK", () => {
    expect(formatCurrencyForCountry(1000, "UK")).toContain("1,000");
  });

  it("handles negative values", () => {
    expect(formatCurrency(-500)).toContain("500");
  });

  it("zero formats to $0", () => {
    expect(formatCurrency(0)).toContain("0");
  });
});

describe("number formatting", () => {
  it("formats thousands separators", () => {
    expect(formatNumber(10000.5)).toContain("10,000.50");
  });

  it("applies decimal precision", () => {
    expect(formatNumber(1.567, 1)).toBe("1.6");
  });

  it("formats percents", () => {
    expect(formatPercent(7.5)).toBe("7.50%");
  });

  it("country-aware number format respects locale", () => {
    expect(formatNumberForCountry(12345.67, "AU")).toBe("12,345.67");
    expect(formatNumberForCountry(12345.6, "US", 1)).toBe("12,345.6");
  });
});