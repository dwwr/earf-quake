import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { copy } from "@/content/copy";
import { getContactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: copy.contact.metaTitle,
  description: copy.contact.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: copy.contact.metaTitle,
    description: copy.contact.metaDescription,
    url: "/contact",
  },
};

const linkClass = "text-amber-300/90 underline-offset-3 hover:underline";

function GitHubLink() {
  return (
    <a
      className={linkClass}
      href={copy.githubHref}
      rel="noopener noreferrer"
      target="_blank"
    >
      {copy.contact.githubLinkLabel}
    </a>
  );
}

export default function ContactPage() {
  const email = getContactEmail();

  return (
    <LegalPage
      title={copy.contact.title}
      lede={copy.contact.lede}
      sections={copy.contact.sections}
      after={
        <div className="space-y-3 text-sm leading-6 text-slate-400">
          {email ? (
            <>
              <p>
                {copy.contact.emailLineBefore}
                <a className={linkClass} href={`mailto:${email}`}>
                  {email}
                </a>
                {copy.contact.emailLineAfter}
              </p>
              <p>
                {copy.contact.githubBefore}
                <GitHubLink />
                {copy.contact.afterLink}
              </p>
            </>
          ) : (
            <p>
              {copy.contact.noEmailBefore}
              <GitHubLink />
              {copy.contact.afterLink}
            </p>
          )}
        </div>
      }
    />
  );
}
