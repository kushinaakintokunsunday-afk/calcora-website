import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbListSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Financial tips, calculator guides, and money management advice from Calcora.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
];

const posts = [
  {
    title: "How to Calculate Compound Interest (With Examples)",
    slug: "calculate-compound-interest",
    excerpt:
      "Learn the compound interest formula, see worked examples with different rates and frequencies, and discover how to maximize your returns.",
    date: "2026-01-15",
    readTime: "6 min read",
    tool: "/compound-interest-calculator/",
    toolLabel: "Compound Interest Calculator",
  },
  {
    title: "15-Year vs 30-Year Mortgage: The Real Math",
    slug: "15-vs-30-year-mortgage",
    excerpt:
      "A side-by-side comparison of 15-year and 30-year mortgages with real numbers so you can decide which term is right for you.",
    date: "2026-01-22",
    readTime: "5 min read",
    tool: "/mortgage-calculator/",
    toolLabel: "Mortgage Calculator",
  },
  {
    title: "How Much of My Salary Should Go to Rent?",
    slug: "salary-to-rent-ratio",
    excerpt:
      "The 30% rule, why it may not apply to your situation, and how to calculate a rent budget that actually works for you.",
    date: "2026-02-01",
    readTime: "5 min read",
    tool: "/paycheck-calculator/",
    toolLabel: "Paycheck Calculator",
  },
  {
    title: "Avalanche vs Snowball: Which Debt Payoff Method Saves More?",
    slug: "avalanche-vs-snowball",
    excerpt:
      "Two popular strategies for paying off debt, compared head-to-head with real numbers. See which saves more in interest.",
    date: "2026-02-10",
    readTime: "7 min read",
    tool: "/debt-payoff-calculator/",
    toolLabel: "Debt Payoff Calculator",
  },
  {
    title: "What Is a Good Debt-to-Income Ratio?",
    slug: "debt-to-income-ratio",
    excerpt:
      "How lenders evaluate your DTI, what ranges mean for your loan approval chances, and steps to improve your ratio.",
    date: "2026-02-18",
    readTime: "5 min read",
    tool: "/loan-affordability-calculator/",
    toolLabel: "Loan Affordability Calculator",
  },
  {
    title: "How Inflation Erodes Your Savings (and What to Do)",
    slug: "inflation-erodes-savings",
    excerpt:
      "See how inflation quietly reduces your purchasing power over time and learn strategies to protect and grow your money.",
    date: "2026-03-01",
    readTime: "6 min read",
    tool: "/inflation-calculator/",
    toolLabel: "Inflation Calculator",
  },
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbListSchema items={breadcrumbs} />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-muted" aria-current="page">
              Blog
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Financial tips, calculator guides, and money management advice from
            Calcora.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <time
                dateTime={post.date}
                className="text-sm text-text-muted"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-xl font-semibold text-[#1E3A5F]">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-text-muted">{post.readTime}</span>
                <Link
                  href={post.tool}
                  className="font-medium text-[#1E3A5F] hover:underline"
                >
                  {post.toolLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
