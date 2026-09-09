import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { WebSiteSchema } from "@/components/Schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Calcora — Free Online Finance & Health Calculators",
    template: "%s | Calcora",
  },
  description:
    "Free online calculators for mortgage, EMI, compound interest, inflation, BMI, calories, retirement, and more. Fast, accurate, and easy to use.",
  metadataBase: new URL("https://calcora.website"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Calcora",
    title: "Calcora — Free Online Finance & Health Calculators",
    description:
      "Free online calculators for mortgage, EMI, compound interest, inflation, BMI, calories, retirement, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcora — Free Online Finance & Health Calculators",
    description:
      "Free online calculators for mortgage, EMI, compound interest, inflation, BMI, calories, retirement, and more.",
  },
  alternates: {
    canonical: "https://calcora.website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A5F",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <WebSiteSchema />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
