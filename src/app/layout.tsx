import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, siteConfig } from "@/content/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s — ${profile.name}` },
  description: siteConfig.description,
  applicationName: "VIET / BUILDS",
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Viet Nguyen-Dau",
    "AI-assisted development",
    "AI solutions consulting",
    "business automation",
    "solutions engineering",
    "product development",
    "TrueNorth Community Management",
    "Minneapolis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "VIET / BUILDS",
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#101d30" },
  ],
};

// Runs before paint: applies saved/OS theme (no flash) and flags that JS is available for scroll reveals.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url,
  jobTitle: "Entrepreneur & AI-Assisted Application Builder",
  address: { "@type": "PostalAddress", addressLocality: "Minneapolis", addressRegion: "MN", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: "TrueNorth Community Management", url: profile.links.truenorth },
  sameAs: [profile.links.linkedin, profile.links.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
