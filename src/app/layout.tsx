import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/instrument-sans";
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
    { color: "#12271b" },
  ],
};

// Runs before paint so a saved theme applies without a flash.
// Dark is the signature look; visitors can switch to light and it's remembered.
const themeScript = `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url,
  jobTitle: "Entrepreneur & AI-Assisted Application Builder",
  image: `${siteConfig.url}/images/headshot/viet-square.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Minneapolis", addressRegion: "MN", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: "TrueNorth Community Management", url: profile.links.truenorth },
  sameAs: [profile.links.linkedin, profile.links.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
      </body>
    </html>
  );
}
