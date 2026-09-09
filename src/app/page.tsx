import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorGrid } from "@/components/CalculatorGrid";

export const metadata: Metadata = {
  title: "Calcora — Free Online Finance & Health Calculators",
  description:
    "Free online calculators for mortgage, EMI, compound interest, inflation, BMI, calories, retirement, and more. Fast, accurate, and easy to use.",
  alternates: {
    canonical: "https://calcora.website",
  },
};

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,163,74,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Free Online Calculators
              <span className="block text-green-light">for Every Decision</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
              Mortgage payments, loan EMIs, compound interest, retirement savings,
              BMI, and more — all calculated instantly in your browser. No sign-up required.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#calculators"
                className="inline-flex items-center rounded-lg bg-green px-6 py-3 text-sm font-semibold text-white hover:bg-green-dark transition-colors"
              >
                Browse Calculators
              </a>
              <Link
                href="/about/"
                className="inline-flex items-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="calculators" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            Our Calculators
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose a tool below. Every calculator works instantly in your browser
            — your data never leaves your device.
          </p>
        </div>
        <CalculatorGrid />
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Instant Results</h3>
              <p className="text-sm text-text-secondary">
                All calculations happen in your browser. No waiting, no server delays.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">100% Private</h3>
              <p className="text-sm text-text-secondary">
                Your financial data never leaves your device. Everything runs locally.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">Trusted Formulas</h3>
              <p className="text-sm text-text-secondary">
                Industry-standard formulas with transparent calculations and worked examples.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
