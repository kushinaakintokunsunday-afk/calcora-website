export const ADSENSE_CLIENT = "ca-pub-7585642142236720";

export const AD_SLOTS: Record<string, string> = {};

export function numericSlotFor(slotId: string): string | null {
  return AD_SLOTS[slotId] ?? null;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}