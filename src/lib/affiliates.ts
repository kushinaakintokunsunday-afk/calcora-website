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

export const AFFILIATES: AffiliateOffer[] = [
  {
    id: "compare-loan-offers",
    network: "Lending Tree",
    name: "Compare Loan Offers",
    tagline: "Pre-qualify with multiple lenders in minutes using a soft credit check.",
    href: "https://www.example-affiliate.com/compare-loans?ref=yourfreetool-20&topic=loans",
    keywords: ["loan", "rate", "apr", "debt", "credit", "refinance", "lender", "approval"],
  },
  {
    id: "personal-loans",
    network: "SoFi",
    name: "Personal Loans",
    tagline: "Fixed-rate loans with no origination fees and flexible terms.",
    href: "https://www.example-affiliate.com/sofi?ref=yourfreetool-20&topic=personal-loan",
    keywords: ["loan", "personal", "apr", "debt", "credit", "payment"],
  },
  {
    id: "robo-advisor",
    network: "Wealthfront",
    name: "Automated Investing",
    tagline: "Low-fee robo advisor that builds a diversified portfolio for you.",
    href: "https://www.example-affiliate.com/wealthfront?ref=yourfreetool-20&topic=investing",
    categories: ["investment"],
    keywords: ["invest", "retirement", "compound", "interest", "portfolio", "stock", "bond", "cagr"],
  },
  {
    id: "brokerage",
    network: "Fidelity",
    name: "Open a Brokerage",
    tagline: "Trade stocks, ETFs and mutual funds with zero commission.",
    href: "https://www.example-affiliate.com/fidelity?ref=yourfreetool-20&topic=brokerage",
    categories: ["investment"],
    keywords: ["401k", "retirement", "stock", "etf", "save", "saving", "invest"],
  },
  {
    id: "high-yield-savings",
    network: "Ally Bank",
    name: "High-Yield Savings",
    tagline: "Competitive APY with no monthly maintenance fees.",
    href: "https://www.example-affiliate.com/ally?ref=yourfreetool-20&topic=savings",
    keywords: ["apy", "cd", "savings", "interest", "yield", "compound", "emergency", "goal"],
  },
  {
    id: "cd-rates",
    network: "Marcus by Goldman Sachs",
    name: "Competitive CD Rates",
    tagline: "Lock in a rate with flexible certificate of deposit terms.",
    href: "https://www.example-affiliate.com/marcus?ref=yourfreetool-20&topic=cd",
    slugs: ["cd-calculator", "apy-calculator"],
    keywords: ["cd", "apy", "yield", "rate", "interest"],
  },
  {
    id: "mortgage-rates",
    network: "Better",
    name: "Compare Mortgage Rates",
    tagline: "Talk to a licensed loan officer. Rates and fees disclosed upfront.",
    href: "https://www.example-affiliate.com/better?ref=yourfreetool-20&topic=mortgage",
    categories: ["mortgage"],
    keywords: ["mortgage", "rate", "apr", "refinance", "home", "house", "biweekly", "affordability", "payment"],
  },
  {
    id: "refinance",
    network: "Rocket Mortgage",
    name: "Refinance Offers",
    tagline: "See if refinancing lowers your monthly mortgage payment.",
    href: "https://www.example-affiliate.com/rocket?ref=yourfreetool-20&topic=refinance",
    categories: ["mortgage"],
    keywords: ["refinance", "mortgage", "rate", "payment", "interest"],
  },
  {
    id: "vat-filing",
    network: "TaxJar",
    name: "Sales Tax and VAT Filing",
    tagline: "Automate sales tax and VAT compliance for your business.",
    href: "https://www.example-affiliate.com/taxjar?ref=yourfreetool-20&topic=vat",
    keywords: ["vat", "tax", "sales tax", "gst"],
  },
  {
    id: "tax-software",
    network: "TurboTax",
    name: "Tax Filing Software",
    tagline: "File accurately with step-by-step guidance for deductions and credits.",
    href: "https://www.example-affiliate.com/turbotax?ref=yourfreetool-20&topic=taxes",
    categories: ["tax"],
    keywords: ["tax", "deduction", "credit", "bracket", "wage", "paycheck", "salary", "federal"],
  },
{
    id: "insurance-quotes",
    network: "Policygenius",
    name: "Personal Insurance",
    tagline: "Compare quotes for auto, home and life insurance from top carriers.",
    href: "https://www.example-affiliate.com/policygenius?ref=yourfreetool-20&topic=insurance",
    keywords: ["life", "insurance", "protect", "risk", "net worth", "family"],
  },
  {
    id: "health-insurance",
    network: "Aetna",
    name: "Health Plan Quotes",
    tagline: "Compare individual and family health insurance plans in your area.",
    href: "https://www.example-affiliate.com/aetna?ref=yourfreetool-20&topic=health",
    categories: ["health"],
    keywords: ["health", "bmi", "calorie", "diet"],
  },
];

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