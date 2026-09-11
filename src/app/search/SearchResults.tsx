"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { searchCalculators } from "@/lib/registry";
import { CalculatorCard } from "@/components/CalculatorGrid";
import { SearchBox } from "@/components/SearchBox";

export function SearchResults({ initialQuery }: { initialQuery: string }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? initialQuery;

  const results = useMemo(() => searchCalculators(query), [query]);

  return (
    <div>
      <div className="max-w-md mb-8">
        <SearchBox autoFocus />
      </div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((calc) => (
            <CalculatorCard key={calc.slug} calc={calc} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface p-6 text-sm text-text-secondary">
          No calculators match &ldquo;{query}&rdquo;. Try a different keyword, like &ldquo;interest&rdquo;,
          &ldquo;loan&rdquo;, or &ldquo;mortgage&rdquo;.
        </div>
      )}
    </div>
  );
}