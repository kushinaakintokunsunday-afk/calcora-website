import { describe, it, expect } from "vitest";
import { ADSENSE_CLIENT, AD_SLOTS, numericSlotFor } from "@/lib/ads";

describe("adsense config", () => {
  it("uses a valid publisher id", () => {
    expect(ADSENSE_CLIENT).toMatch(/^ca-pub-\d{16}$/);
  });

  it("has unique slot keys", () => {
    const keys = Object.keys(AD_SLOTS);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("returns null for unconfigured slots", () => {
    expect(numericSlotFor("mortgage-mid")).toBeNull();
    expect(numericSlotFor("--")).toBeNull();
  });
});