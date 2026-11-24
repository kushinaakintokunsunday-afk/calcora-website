import { getCalculatorBySlug } from "@/lib/registry";

export interface AffiliateOffer {
  id: string;
  network: string;
  name: string;
  tagline: string;
  href: string;
  before?: string;
  after?: string;
  slugs?: string[];
  categories?: string[];
  keywords?: string[];
}

/**
 * Affiliate offers are intentionally empty until real, tracked links exist.
 *
 * The previous entries all pointed to `example-affiliate.com` with a
 * `yourfreetool-20` tracking tag. Those were placeholders: dead links that
 * damage user trust and can contribute to AdSense "Low value content" reviews.
 *
 * To add offers:
 *  1. Join an affiliate network (Impact, CJ Affiliate, FlexOffers).
 *  2. Get approved for real programs (LendingTree, TurboTax, Policygenius, etc.).
 *  3. Replace the array below with entries using YOUR real tracked URLs.
 *  4. Keep `rel="sponsored nofollow"` in ContextualAffiliate.
 *  5. Add one offer per page, below the calculator result.
 */
export const AFFILIATES: AffiliateOffer[] = [];

const NORMALIZE = (value: string) => value.toLowerCase().trim();

function scoreOffer(offer: AffiliateOffer, slug: string, category: string, keywords: string[]): number {
  let score = 0;

  if (offer.slugs?.includes(slug)) score += 4;
  if (offer.categories?.includes(category)) score += 2;

  const offerKeywords = new Set((offer.keywords ?? []).map(NORMALIZE));
  if (offerKeywords.has(NORMALIZE(category))) score += 1;
  for (const keyword of keywords) {
    const key = NORMALIZE(keyword);
    if (offerKeywords.has(key)) {
      score += 1;
      break;
    }
  }

  return score;
}

export function matchAffiliates(slug: string, limit: number = 2): AffiliateOffer[] {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return [];

  const ranked = AFFILIATES.map((offer) => ({
    offer,
    score: scoreOffer(offer, slug, calc.category, calc.keywords),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.offer.id.localeCompare(b.offer.id));

  return ranked.slice(0, Math.max(0, limit)).map((entry) => entry.offer);
}
