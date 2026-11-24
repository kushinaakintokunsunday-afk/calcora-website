import { describe, it, expect } from "vitest";
import { AFFILIATES, matchAffiliates } from "@/lib/affiliates";

describe("affiliates", () => {
  it("keeps placeholder affiliate offers disabled", () => {
    expect(AFFILIATES).toEqual([]);
  });

  it("returns no offers until real tracked links are added", () => {
    const slugs = [
      "mortgage-calculator",
      "401k-calculator",
      "vat-calculator",
      "auto-loan-calculator",
    ];

    for (const slug of slugs) {
      expect(matchAffiliates(slug)).toEqual([]);
      expect(matchAffiliates(slug, 1)).toEqual([]);
      expect(matchAffiliates(slug, 2)).toEqual([]);
    }
  });

  it("returns nothing for an unknown slug", () => {
    expect(matchAffiliates("not-a-real-tool")).toEqual([]);
  });

  it("respects the limit argument", () => {
    const slug = "mortgage-calculator";
    expect(matchAffiliates(slug, 0)).toEqual([]);
    expect(matchAffiliates(slug, 1).length).toBeLessThanOrEqual(1);
    expect(matchAffiliates(slug, 2).length).toBeLessThanOrEqual(2);
    expect(matchAffiliates(slug).length).toBeLessThanOrEqual(2);
    expect(matchAffiliates(slug, 99).length).toBeLessThanOrEqual(
      matchAffiliates(slug).length
    );
  });

  it("is deterministic for a fixed slug", () => {
    const first = matchAffiliates("auto-loan-calculator");
    const second = matchAffiliates("auto-loan-calculator");
    expect(first.map((o) => o.id)).toEqual(second.map((o) => o.id));
  });

  it("every active offer has a usable, non-placeholder href", () => {
    for (const offer of AFFILIATES) {
      expect(() => new URL(offer.href)).not.toThrow();
      expect(offer.href).toMatch(/^https:\/\//);
      expect(offer.id.length).toBeGreaterThan(0);
      expect(offer.name.length).toBeGreaterThan(0);
      expect(offer.href).not.toContain("YOUR_REF");
      expect(offer.href).not.toContain("example-affiliate");
      expect(offer.href).not.toContain("yourfreetool-20");
    }
  });
});
