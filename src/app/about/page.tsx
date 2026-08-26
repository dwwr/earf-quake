import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: copy.about.metaTitle,
  description: copy.about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: copy.about.metaTitle,
    description: copy.about.metaDescription,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <LegalPage
      title={copy.about.title}
      lede={copy.about.lede}
      sections={copy.about.sections}
    />
  );
}
