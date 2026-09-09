import type { Metadata } from "next";
import { BreadcrumbListSchema } from "@/components/Schema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Calcora team. We'd love to hear from you.",
};

const breadcrumbs = [
  { name: "Home", url: "https://calcora.website" },
  { name: "Contact", url: "https://calcora.website/contact" },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbListSchema items={breadcrumbs} />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm text-text-secondary" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-muted" aria-current="page">
              Contact
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-[#1E3A5F] sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            Whether you have a question about our calculators, a suggestion for a
            new tool, or just want to say hello, we&apos;re here to help.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-semibold text-[#1E3A5F]">
              Send Us a Message
            </h2>

            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-primary placeholder-text-muted transition-colors focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-primary placeholder-text-muted transition-colors focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-primary placeholder-text-muted transition-colors focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-text-primary placeholder-text-muted transition-colors focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
              >
                Send Message
              </button>

              <p className="text-sm text-text-muted">
                This form is for demonstration purposes. For inquiries, please
                email us at{" "}
                <a
                  href="mailto:hello@calcora.website"
                  className="underline transition-colors hover:text-[#1E3A5F]"
                >
                  hello@calcora.website
                </a>
                .
              </p>
            </form>
          </section>

          <aside className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-[#1E3A5F]">
              Other Ways to Reach Us
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-1 font-semibold text-text-primary">Email</h3>
                <a
                  href="mailto:hello@calcora.website"
                  className="text-[#1E3A5F] underline transition-colors hover:text-[#162d4a]"
                >
                  hello@calcora.website
                </a>
                <p className="mt-1 text-sm text-text-muted">
                  We typically respond within 48 hours.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-1 font-semibold text-text-primary">Social Media</h3>
                <ul className="mt-2 space-y-2 text-sm text-text-secondary">
                  <li>
                    <span className="text-text-muted">Twitter / X:</span>{" "}
                    <a href="#" className="text-[#1E3A5F] underline hover:text-[#162d4a]">
                      @calabora
                    </a>
                  </li>
                  <li>
                    <span className="text-text-muted">LinkedIn:</span>{" "}
                    <a href="#" className="text-[#1E3A5F] underline hover:text-[#162d4a]">
                      Calcora
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-1 font-semibold text-text-primary">
                  Feedback &amp; Suggestions
                </h3>
                <p className="text-sm text-text-secondary">
                  Have an idea for a new calculator or spotted an issue with an
                  existing one? We value your input and review every suggestion
                  we receive.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
