import Link from "next/link";
import { CALCULATORS } from "@/lib/registry";

const FOOTER_TOOLS = CALCULATORS.map((calc) => ({
  href: calc.path,
  label: calc.title,
}));

const FOOTER_PAGES = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Service" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/blog/", label: "Blog" },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green text-white text-sm font-bold">
                C
              </span>
              Calcora
            </Link>
            <p className="text-sm leading-relaxed">
              Free online calculators for finance, health, and everyday math.
              Fast, accurate, and easy to use — no sign-up required.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              {FOOTER_TOOLS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {FOOTER_PAGES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Calcora. All rights reserved.
          </p>
          <p className="text-xs text-center sm:text-right max-w-lg">
            Results are estimates only and should not be considered financial or medical advice.
            Always consult a qualified professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
