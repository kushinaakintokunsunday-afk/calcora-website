"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { DEFAULT_COUNTRY, getCountry, type CountryCode } from "@/lib/countries";
import { calculatorSupportsCountry } from "@/lib/registry";
import { formatCurrencyForCountry } from "@/lib/utils";

const STORAGE_KEY = "calcora_country";

interface CountryContextValue {
  country: CountryCode;
  countryName: string;
  setCountry: (country: CountryCode) => void;
}

const CountryContext = createContext<CountryContextValue>({
  country: DEFAULT_COUNTRY,
  countryName: getCountry(DEFAULT_COUNTRY).name,
  setCountry: () => {},
});

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>(DEFAULT_COUNTRY);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "US" || stored === "UK" || stored === "CA" || stored === "AU")) {
        const next = stored as CountryCode;
        window.requestAnimationFrame(() => setCountryState(next));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCountry = (next: CountryCode) => {
    setCountryState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <CountryContext.Provider value={{ country, countryName: getCountry(country).name, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): CountryContextValue {
  return useContext(CountryContext);
}

export function useMoney(toolSlug: string): {
  money: (value: number) => string;
  country: CountryCode;
  countryName: string;
} {
  const { country, countryName } = useCountry();
  const supported = calculatorSupportsCountry(toolSlug, country);
  const money = (value: number) => formatCurrencyForCountry(value, supported ? country : DEFAULT_COUNTRY);
  return { money, country, countryName };
}