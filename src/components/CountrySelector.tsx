"use client";

import { useCountry } from "@/lib/useCountry";
import type { CountryCode } from "@/lib/countries";

const COUNTRIES: { code: CountryCode; label: string }[] = [
  { code: "US", label: "USD ($)" },
  { code: "UK", label: "GBP (£)" },
  { code: "CA", label: "CAD ($)" },
  { code: "AU", label: "AUD ($)" },
];

export function CountrySelector() {
  const { country, setCountry } = useCountry();

  return (
    <>
      <label className="sr-only" htmlFor="country-select">
        Select country and currency
      </label>
      <select
        id="country-select"
        value={country}
        onChange={(e) => setCountry(e.target.value as CountryCode)}
        className="rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green [&>option]:text-navy"
        aria-label="Country and currency"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </>
  );
}