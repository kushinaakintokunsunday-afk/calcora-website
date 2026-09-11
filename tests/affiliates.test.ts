import { describe, it, expect } from "vitest";
import { AFFILIATES, matchAffiliates } from "@/lib/affiliates";

describe("affiliates", () => {
  it("matches offers by category and keywords for mortgage tools", () => {
    const offers = matchAffiliates("mortgage-calculator");
    expect(offers.length).toBeGreaterThan(0);
    expect(offers[0].id).toBe("mortgage-rates");
    expect(offers[0].categories).toContain("mortgage");
  });

  it("matches investment offers for retirement tools", () => {
    const offers = matchAffiliates("401k-calculator");
    expect(offers.length).toBeGreaterThan(0);
    expect(offers[0].id).toBe("brokerage");
  });

  it("returns taxable offers for the VAT calculator", () => {
    const offers = matchAffiliates("vat-calculator");
    expect(offers.length).toBeGreaterThan(0);
  });

  it("returns nothing for an unknown slug", () => {
    expect(matchAffiliates("not-a-real-tool")).toEqual([]);
  });

  it("respects the limit argument", () => {
    const slug = "mortgage-calculator";
    expect(matchAffiliates(slug, 1)).toHaveLength(1);
    expect(matchAffiliates(slug, 2)).toHaveLength(2);
    expect(matchAffiliates(slug)).toHaveLength(2);
    expect(matchAffiliates(slug, 99).length).toBeLessThanOrEqual(
      matchAffiliates(slug, 2).length
    );
  });

  it("is deterministic for a fixed slug", () => {
    const first = matchAffiliates("auto-loan-calculator");
    const second = matchAffiliates("auto-loan-calculator");
    expect(first.map((o) => o.id)).toEqual(second.map((o) => o.id));
  });

  it("every offer has a usable href", () => {
    for (const offer of AFFILIATES) {
      expect(() => new URL(offer.href)).not.toThrow();
      expect(offer.id.length).toBeGreaterThan(0);
      expect(offer.name.length).toBeGreaterThan(0);
      expect(offer.href).not.toContain("YOUR_REF");
      expect(offer.href).toContain("yourfreetool-20");
    }
  });
});