import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { copy } from "@/content/copy";
import { websiteJsonLd } from "@/lib/seo";
import { getGscVerification, getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const gsc = getGscVerification();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: copy.meta.title,
    template: `%s · ${copy.brand}`,
  },
  description: copy.meta.description,
  applicationName: copy.brand,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: "website",
    locale: "en_US",
    siteName: copy.brand,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
  robots: { index: true, follow: true },
  ...(gsc ? { verification: { google: gsc } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={websiteJsonLd()} />
        {children}
        <SiteFooter />
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
