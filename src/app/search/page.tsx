import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  title: "Search Calculators",
  description: "Search all free calculators on Calcora.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2">Search Calculators</h1>
        <p className="text-lg text-text-secondary">
          {q ? <>Results for &ldquo;{q}&rdquo;</> : "Enter a term to find the right tool."}
        </p>
      </header>
      <Suspense fallback={<p className="text-sm text-text-muted">Searching…</p>}>
        <SearchResults initialQuery={q} />
      </Suspense>
    </div>
  );
}