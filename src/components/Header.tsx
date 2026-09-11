"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBox } from "@/components/SearchBox";
import { CountrySelector } from "@/components/CountrySelector";
import {
  CALCULATORS,
  CATEGORY_LABELS,
  type CalculatorCategory,
} from "@/lib/registry";

const CATEGORY_ORDER: CalculatorCategory[] = [
  "mortgage",
  "finance",
  "investment",
  "tax",
  "health",
  "utility",
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    tools: CALCULATORS.filter((calc) => calc.category === category),
  }));

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green text-white text-sm font-bold">
              C
            </span>
            Calcora
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 py-2 text-white/80 hover:text-white transition-colors"
                aria-haspopup="true"
                aria-expanded={false}
              >
                Calculators
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                <div className="max-h-[70vh] w-[720px] overflow-y-auto rounded-xl border border-border bg-white p-6 text-left shadow-xl">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                    {groups.map((group) => (
                      <div key={group.category}>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                          {group.label}
                        </h4>
                        <ul className="space-y-1">
                          {group.tools.map((tool) => (
                            <li key={tool.slug}>
                              <Link
                                href={tool.path}
                                className="block text-sm py-0.5 text-text-secondary hover:text-navy hover:underline"
                              >
                                {tool.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1 text-sm font-medium text-green hover:underline"
                    >
                      View all calculators
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/blog/" className="text-white/80 hover:text-white transition-colors">
              Blog
            </Link>
          </nav>

          <div className="hidden md:block flex-1 max-w-sm ml-auto">
            <SearchBox />
          </div>

          <div className="hidden md:block">
            <CountrySelector />
          </div>

          <button
            type="button"
            className="md:hidden ml-auto inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-white/10 bg-navy-dark px-4 py-4 space-y-6">
          <div className="max-w-sm">
            <SearchBox />
          </div>
          <div>
            <CountrySelector />
          </div>
          <div className="space-y-5 pt-1 border-t border-white/10">
            {groups.map((group) => (
              <div key={group.category}>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  {group.label}
                </h4>
                <div className="grid grid-cols-1 gap-x-6">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.path}
                      className="block py-1.5 text-sm font-medium text-white/80 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3">
              <Link
                href="/blog/"
                className="block py-2 text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}