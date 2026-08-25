import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { copy } from "@/content/copy";
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
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: "website",
    url: "/",
    siteName: copy.brand,
  },
  twitter: {
    card: "summary",
    title: copy.meta.title,
    description: copy.meta.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  ...(gsc ? { verification: { google: gsc } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="mt-auto border-t border-white/10 bg-[#070b16] text-slate-500">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 py-6 text-xs leading-5 sm:flex-row sm:items-center sm:justify-between">
            <p>{copy.footer.note}</p>
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              <a
                className="text-slate-400 hover:text-amber-300"
                href={copy.githubHref}
              >
                {copy.footer.github}
              </a>
              {copy.footer.refs.map((ref) => (
                <span key={ref}>{ref}</span>
              ))}
            </p>
          </div>
        </footer>
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
