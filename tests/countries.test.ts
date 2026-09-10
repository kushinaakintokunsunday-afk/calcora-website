import { describe, it, expect } from "vitest";
import { COUNTRIES, getCountry, DEFAULT_COUNTRY } from "@/lib/countries";

describe("country configs", () => {
  it("has all four countries defined", () => {
    expect(Object.keys(COUNTRIES).sort()).toEqual(["AU", "CA", "UK", "US"]);
  });

  it("each country has valid currency and locale", () => {
    for (const c of Object.values(COUNTRIES)) {
      expect(c.currencyCode).toBeTruthy();
      expect(c.locale).toMatch(/^en-/);
      expect(c.vatPresets.length).toBeGreaterThan(0);
    }
  });

  it("US uses USD and 30-year mortgage default", () => {
    const us = COUNTRIES.US;
    expect(us.currencyCode).toBe("USD");
    expect(us.mortgageDefaults.defaultTermYears).toBe(30);
    expect(us.taxDefaults.federalTaxPct).toBeGreaterThan(0);
  });

  it("UK uses GBP, VAT label, and no state tax", () => {
    const uk = COUNTRIES.UK;
    expect(uk.currencyCode).toBe("GBP");
    expect(uk.vatLabel).toBe("VAT");
    expect(uk.taxDefaults.stateTaxPct).toBe(0);
    expect(uk.taxDefaults.federalTaxPct).toBeGreaterThan(0);
  });

  it("getCountry falls back to default for unknown codes", () => {
    expect(getCountry("XX").code).toBe(DEFAULT_COUNTRY);
    expect(getCountry("UK").code).toBe("UK");
  });

  it("AU uses AUD with 10% GST preset", () => {
    expect(COUNTRIES.AU.currencyCode).toBe("AUD");
    expect(COUNTRIES.AU.vatPresets).toContain(10);
  });

  it("CA uses CAD and contains HST presets", () => {
    expect(COUNTRIES.CA.currencyCode).toBe("CAD");
    expect(COUNTRIES.CA.vatPresets).toContain(13);
  });
});