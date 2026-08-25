import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "earf-quake — magnitude compare",
  description:
    "Compare two earthquake magnitudes: amplitude, radiated energy, and seismic moment.",
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
            <p>Educational estimates</p>
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              <a
                className="text-slate-400 hover:text-amber-300"
                href="https://github.com/dwwr/earf-quake"
              >
                GitHub
              </a>
              <span>Kanamori 1977</span>
              <span>Hanks &amp; Kanamori 1979</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
