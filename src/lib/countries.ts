export type CountryCode = "US" | "UK" | "CA" | "AU";

export interface CountryNumberFormat {
  thousands: string;
  decimal: string;
}

export interface CountryConfig {
  code: CountryCode;
  name: string;
  language: string;
  locale: string;
  currencyCode: string;
  currencySymbol: string;
  currencyPosition: "before" | "after";
  vatLabel: string;
  vatPresets: number[];
  numberFormat: CountryNumberFormat;
  tz: string;
  mortgageDefaults: {
    defaultTermYears: number;
    maxTermYears: number;
    downPaymentLabel: string;
  };
  taxDefaults: {
    federalTaxPct: number;
    stateTaxPct: number;
    taxYear: string;
  };
}

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  US: {
    code: "US",
    name: "United States",
    language: "en",
    locale: "en-US",
    currencyCode: "USD",
    currencySymbol: "$",
    currencyPosition: "before",
    vatLabel: "Sales Tax",
    vatPresets: [0, 4, 6.25, 7, 8],
    numberFormat: { thousands: ",", decimal: "." },
    tz: "America/New_York",
    mortgageDefaults: {
      defaultTermYears: 30,
      maxTermYears: 30,
      downPaymentLabel: "Down payment",
    },
    taxDefaults: {
      federalTaxPct: 22,
      stateTaxPct: 5,
      taxYear: "2024",
    },
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    language: "en",
    locale: "en-GB",
    currencyCode: "GBP",
    currencySymbol: "£",
    currencyPosition: "before",
    vatLabel: "VAT",
    vatPresets: [5, 20],
    numberFormat: { thousands: ",", decimal: "." },
    tz: "Europe/London",
    mortgageDefaults: {
      defaultTermYears: 25,
      maxTermYears: 35,
      downPaymentLabel: "Deposit",
    },
    taxDefaults: {
      federalTaxPct: 20,
      stateTaxPct: 0,
      taxYear: "2024/25",
    },
  },
  CA: {
    code: "CA",
    name: "Canada",
    language: "en",
    locale: "en-CA",
    currencyCode: "CAD",
    currencySymbol: "C$",
    currencyPosition: "before",
    vatLabel: "GST/HST",
    vatPresets: [5, 13, 15],
    numberFormat: { thousands: ",", decimal: "." },
    tz: "America/Toronto",
    mortgageDefaults: {
      defaultTermYears: 25,
      maxTermYears: 30,
      downPaymentLabel: "Down payment",
    },
    taxDefaults: {
      federalTaxPct: 20.5,
      stateTaxPct: 8,
      taxYear: "2024",
    },
  },
  AU: {
    code: "AU",
    name: "Australia",
    language: "en",
    locale: "en-AU",
    currencyCode: "AUD",
    currencySymbol: "AU$",
    currencyPosition: "before",
    vatLabel: "GST",
    vatPresets: [10],
    numberFormat: { thousands: ",", decimal: "." },
    tz: "Australia/Sydney",
    mortgageDefaults: {
      defaultTermYears: 30,
      maxTermYears: 30,
      downPaymentLabel: "Deposit",
    },
    taxDefaults: {
      federalTaxPct: 19,
      stateTaxPct: 0,
      taxYear: "2024/25",
    },
  },
};

export const DEFAULT_COUNTRY: CountryCode = "US";

export function getCountry(code: string): CountryConfig {
  return COUNTRIES[(code as CountryCode)] ?? COUNTRIES[DEFAULT_COUNTRY];
}

export const COUNTRY_LIST: CountryConfig[] = Object.values(COUNTRIES);