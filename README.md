# Calcora — Free Online Finance & Health Calculators

A production-ready, SEO-optimized finance calculator website built with Next.js 14+ (App Router), TypeScript, and Tailwind CSS.

**Live URL:** https://calcora.website

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript (strict mode)
- **Styling:** Tailwind CSS 4, mobile-first responsive
- **Deployment:** Vercel (static generation)
- **Fonts:** Inter (self-hosted via `next/font`)
- **Calculations:** 100% client-side (React hooks, zero backend)

## Site Structure

### 12 Calculators
| Calculator | Route | Formula |
|------------|-------|---------|
| Compound Interest | `/compound-interest-calculator/` | A = P(1+r/n)^(nt) |
| Mortgage | `/mortgage-calculator/` | M = Pr(1+r)^n/((1+r)^n-1) |
| EMI | `/emi-calculator/` | Same as mortgage |
| Inflation | `/inflation-calculator/` | FV = PV(1+i)^y |
| BMI | `/bmi-calculator/` | BMI = weight(kg)/height(m)^2 |
| Calorie | `/calorie-calculator/` | Mifflin-St Jeor |
| Paycheck | `/paycheck-calculator/` | Gross - deductions |
| Loan Affordability | `/loan-affordability-calculator/` | L = M[(1+r)^n-1]/[r(1+r)^n] |
| Debt Payoff | `/debt-payoff-calculator/` | Amortization schedule |
| Percentage | `/percentage-calculator/` | Multiple modes |
| Retirement | `/retirement-calculator/` | FV = P(1+r)^n + PMT[((1+r)^n-1)/r] |
| VAT | `/vat-calculator/` | Add/Remove VAT |

### Other Pages
- **Blog:** 6 SEO-structured posts with FAQ schema
- **Legal:** About, Contact, Privacy Policy, Terms, Disclaimer

## Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd calcora-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Verify

```bash
# Production build
npm run build

# Lint
npx eslint src/

# Type check
npx tsc --noEmit
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, header, footer, cookie consent)
│   ├── page.tsx                # Homepage with calculator grid
│   ├── globals.css             # Design system (Tailwind + custom tokens)
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt
│   ├── ads.txt/route.ts        # Ads.txt endpoint
│   ├── compound-interest-calculator/page.tsx
│   ├── mortgage-calculator/page.tsx
│   ├── emi-calculator/page.tsx
│   ├── inflation-calculator/page.tsx
│   ├── bmi-calculator/page.tsx
│   ├── calorie-calculator/page.tsx
│   ├── paycheck-calculator/page.tsx
│   ├── loan-affordability-calculator/page.tsx
│   ├── debt-payoff-calculator/page.tsx
│   ├── percentage-calculator/page.tsx
│   ├── retirement-calculator/page.tsx
│   ├── vat-calculator/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── disclaimer/page.tsx
│   └── blog/
│       ├── page.tsx            # Blog index
│       ├── calculate-compound-interest/page.tsx
│       ├── 15-vs-30-year-mortgage/page.tsx
│       ├── salary-to-rent-ratio/page.tsx
│       ├── avalanche-vs-snowball/page.tsx
│       ├── debt-to-income-ratio/page.tsx
│       └── inflation-erodes-savings/page.tsx
├── components/
│   ├── Header.tsx              # Sticky nav with mobile menu
│   ├── Footer.tsx              # Site-wide footer with links
│   ├── CalculatorGrid.tsx      # Homepage calculator cards
│   ├── CalculatorShell.tsx     # Reusable calculator layout
│   ├── Schema.tsx              # JSON-LD schema helpers
│   ├── AdSlot.tsx              # Lazy-loaded ad placeholders + affiliate spot
│   └── CookieConsent.tsx       # GDPR/CCPA consent banner
└── lib/
    └── utils.ts                # Formatters, CSV download, helpers
```

## Deploy to Vercel

### Step-by-Step

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Root directory: `./`
   - Build command: `next build` (default)
   - Output directory: `.next` (default)
   - Click **Deploy**

3. **Configure Custom Domain**
   - In Vercel dashboard → Settings → Domains
   - Add `calcora.website`
   - Update DNS records as instructed by Vercel
   - Wait for SSL certificate (automatic)

4. **Verify Deployment**
   - Visit `https://calcora.website`
   - Check all calculator routes work
   - Verify `https://calcora.website/sitemap.xml` loads
   - Verify `https://calcora.website/robots.txt` loads
   - Verify `https://calcora.website/ads.txt` loads

## Google Search Console Setup

### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property** → **URL prefix** → `https://calcora.website`
3. Verify via:
   - HTML tag: Add `<meta name="google-site-verification" content="YOUR_CODE" />` to `src/app/layout.tsx` `<head>` section
   - Or DNS record (recommended)

### Step 2: Submit Sitemap
1. In Search Console → **Sitemaps**
2. Enter `sitemap.xml` and click **Submit**

### Step 3: Request Indexing
1. Use **URL Inspection** tool
2. Enter each key URL and click **Request Indexing**
3. Start with homepage, then calculator pages, then blog posts

### Step 4: Monitor
- Check **Performance** tab after 1-2 weeks
- Monitor **Coverage** for any indexing issues
- Review **Core Web Vitals** — all should pass (LCP < 2.5s, CLS < 0.1, INP < 200ms)

## Google AdSense Setup

### Prerequisites
- Site must be live with real content (no placeholder text)
- At least 15-20 pages with unique content
- Privacy Policy, Terms, and Disclaimer pages
- Cookie consent mechanism

### Steps

1. **Apply for AdSense**
   - Go to [adsense.google.com](https://adsense.google.com)
   - Sign up with your Google account
   - Enter your site URL: `https://calcora.website`

2. **Add AdSense Code**
   - After approval, get your publisher ID (e.g., `pub-1234567890123456`)
   - Add the AdSense script to `src/app/layout.tsx`:
     ```tsx
     <Script
       src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
       strategy="afterInteractive"
     />
     ```
   - Import `Script` from `next/script`

3. **Update ads.txt**
   - Edit `src/app/ads.txt/route.ts`
   - Replace `pub-0000000000000000` with your actual publisher ID

4. **Create Ad Units**
   - In AdSense dashboard → **Ads** → **By ad unit**
   - Create 3 responsive display ad units:
     - `calcora-above-tool` (ad_below_tool slot)
     - `calcora-mid-content` (ad_mid_content slot)
     - `calcora-below-content` (ad_after_content slot)
   - Update the `slotId` props in `<AdSlot>` components throughout the site

5. **Update AdSlot Component**
   - Edit `src/components/AdSlot.tsx`
   - Replace placeholder rendering with actual AdSense code:
     ```tsx
     <ins className="adsbygoogle"
       style={{ display: "block" }}
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="YOUR_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true"
     />
     ```

6. **Verify Ads**
   - Visit tool pages in a non-logged-in browser
   - Ads should appear below calculators
   - Check AdSense dashboard for "Ready" status

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| navy | #1E3A5F | Primary, headings, header/footer |
| green | #16A34A | CTAs, accents, positive values |
| surface | #F8FAFC | Light backgrounds |
| border | #E2E8F0 | Borders, dividers |
| text-primary | #1E293B | Body text |
| text-secondary | #475569 | Secondary text |
| text-muted | #94A3B8 | Muted/placeholder text |

### Typography
- **Font:** Inter (self-hosted)
- **Headings:** Bold, navy color
- **Body:** Regular weight, text-primary color
- **Smallest text:** 14px for labels, 12px for disclaimers

## SEO Checklist

- [x] Unique meta title (<=60 chars) per page
- [x] Unique meta description (<=155 chars) per page
- [x] Canonical tags on all pages
- [x] Open Graph + Twitter cards
- [x] JSON-LD: WebSite + SearchAction on homepage
- [x] JSON-LD: WebApplication + FAQPage + BreadcrumbList on every tool
- [x] Auto-generated sitemap.xml
- [x] robots.txt
- [x] Semantic HTML, one H1 per page
- [x] Internal linking (homepage → all tools, tools → related tools, blog → tools)
- [x] Self-hosted fonts (no Google Fonts requests)
- [x] No render-blocking scripts
- [x] Cookie consent for GDPR/CCPA

## Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Self-hosted fonts, static generation, no heavy libs |
| CLS | < 0.1 | Fixed dimensions, font-display: swap |
| INP | < 200ms | Client-side only calculations, lazy-loaded charts |
| Bundle | Minimal | No UI libraries, tree-shaking, code splitting |

## Adding New Calculators

1. Create `src/app/[calculator-name]/page.tsx`
2. Import `CalculatorShell` and schema components
3. Implement the calculator logic with `useState` + `useMemo`
4. Add to `CalculatorGrid.tsx` (homepage cards)
5. Add to `Footer.tsx` (footer links)
6. Add to `sitemap.ts` (for indexing)
7. Add related tool links to existing calculators
8. Write 4-6 FAQs for FAQ schema

## License

All rights reserved. © 2025 Calcora.
