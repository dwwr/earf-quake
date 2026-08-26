import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: copy.privacy.metaTitle,
  description: copy.privacy.metaDescription,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: copy.privacy.metaTitle,
    description: copy.privacy.metaDescription,
    url: "/privacy",
  },
};

const linkClass = "text-amber-300/90 underline-offset-3 hover:underline";

export default function PrivacyPage() {
  return (
    <LegalPage
      title={copy.privacy.title}
      lede={copy.privacy.lede}
      sections={copy.privacy.sections}
      after={
        <section id="contact" className="scroll-mt-8">
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-slate-400">
            <p>
              Google’s policies:{" "}
              <a
                className={linkClass}
                href="https://policies.google.com/privacy"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Privacy
              </a>{" "}
              and{" "}
              <a
                className={linkClass}
                href="https://policies.google.com/technologies/partner-sites"
                rel="noopener noreferrer"
                target="_blank"
              >
                how Google uses data on partner sites
              </a>
              . Opt-out controls:{" "}
              <a
                className={linkClass}
                href="https://adssettings.google.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                adssettings.google.com
              </a>
              .
            </p>
            <p>
              {copy.privacy.contactBefore}
              <Link className={linkClass} href="/contact">
                {copy.privacy.contactLink}
              </Link>
              {copy.privacy.contactAfter}
            </p>
          </div>
        </section>
      }
    />
  );
}
