"use client";

import { useMemo } from "react";
import { matchAffiliates } from "@/lib/affiliates";
import { trackAffiliateClick } from "@/lib/analytics";

interface ContextualAffiliateProps {
  slug: string;
  limit?: number;
}

export function ContextualAffiliate({ slug, limit = 2 }: ContextualAffiliateProps) {
  const offers = useMemo(() => matchAffiliates(slug, limit), [slug, limit]);

  if (offers.length === 0) return null;

  return (
    <section className="mt-8 rounded-xl border border-border bg-white p-5">
      <h2 className="text-base font-semibold text-navy mb-1">Compare Offers</h2>
      <p className="text-xs text-text-muted mb-4">
        These partners help keep Calcora free. We may earn a small commission
        when you click a link — it never affects your results and you&apos;re never
        charged extra.
      </p>
      <ul className="space-y-3">
        {offers.map((offer) => (
          <li key={offer.id}>
            <a
              href={offer.href}
              target="_blank"
              rel="sponsored nofollow noopener"
              onClick={() =>
                trackAffiliateClick({
                  offerId: offer.id,
                  position: "smart-next-step",
                  tool: slug,
                })
              }
              className="flex items-start gap-3 rounded-lg border border-border bg-surface/50 px-4 py-3 hover:border-green/40 hover:bg-surface transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy">{offer.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{offer.tagline}</p>
              </div>
              <span className="shrink-0 rounded-md bg-green/10 px-2 py-1 text-xs font-medium text-green">
                {offer.network}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-text-muted">
        Ad disclosure: partners pay for placement. Check official sites for
        current terms, rates and eligibility before applying.
      </p>
    </section>
  );
}