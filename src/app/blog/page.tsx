import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbListSchema } from "@/components/Schema";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Financial tips, calculator guides, and money management advice from Calcora.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Blog", url: "https://calcora.website/blog" },
];

const posts = BLOG_POSTS;

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