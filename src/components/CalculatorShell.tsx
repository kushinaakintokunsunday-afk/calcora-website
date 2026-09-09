"use client";

import { Suspense, useCallback, type ReactNode } from "react";
import Link from "next/link";

export interface CalculatorShellProps {
  title: string;
  description: string;
  children: ReactNode;
  formula?: string;
  example?: string;
  faqs?: { question: string; answer: string }[];
  relatedTools?: { href: string; label: string }[];
  breadcrumbs?: { label: string; href?: string }[];
}

function CalculatorShellFallback() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-surface rounded w-1/3" />
        <div className="h-4 bg-surface rounded w-2/3" />
        <div className="h-64 bg-surface rounded" />
      </div>
    </div>
  );
}

function ShellContent({
  title,
  description,
  children,
  formula,
  example,
  faqs,
  relatedTools,
  breadcrumbs,
}: CalculatorShellProps) {
  const copyResults = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    navigator.clipboard.writeText(url).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-6 text-sm text-text-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                <span className="text-text-muted">/</span>
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-navy transition-colors">{crumb.label}</a>
                ) : (
                  <span className="text-text-primary">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-3">{title}</h1>
        <p className="text-lg text-text-secondary">{description}</p>
      </header>

      <div className="rounded-xl border border-border bg-white shadow-sm p-6 sm:p-8 mb-8">
        {children}
      </div>

      <p className="text-sm text-text-muted mb-8 italic">
        Results are estimates only and should not be considered financial advice.
        Always consult a qualified professional before making financial decisions.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          type="button"
          onClick={copyResults}
          className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-alt transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          Copy Shareable Link
        </button>
      </div>

      {formula && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">Formula</h2>
          <div className="rounded-lg bg-surface border border-border p-4 font-mono text-sm text-text-primary overflow-x-auto">
            {formula}
          </div>
        </section>
      )}

      {example && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">Worked Example</h2>
          <div className="rounded-lg bg-surface border border-border p-4 text-sm text-text-secondary leading-relaxed">
            {example}
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-lg border border-border bg-white">
                <summary className="cursor-pointer px-4 py-3 font-medium text-text-primary hover:bg-surface transition-colors">
                  {faq.question}
                </summary>
                <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-navy mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-navy hover:bg-surface hover:border-green/40 transition-colors"
              >
                {tool.label}
                <svg className="h-3.5 w-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function CalculatorShell(props: CalculatorShellProps) {
  return (
    <Suspense fallback={<CalculatorShellFallback />}>
      <ShellContent {...props} />
    </Suspense>
  );
}
