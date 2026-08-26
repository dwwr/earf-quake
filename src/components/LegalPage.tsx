import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type LegalSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  title: string;
  lede: string;
  sections: readonly LegalSection[];
  after?: ReactNode;
};

/** Shared shell for About / Privacy / Contact. No AdSlot on these routes. */
export function LegalPage({ title, lede, sections, after }: LegalPageProps) {
  return (
    <div className="flex flex-1 flex-col bg-[#070b16] text-slate-100">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 pb-16">
        <section>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            {lede}
          </p>
        </section>

        <div className="flex max-w-2xl flex-col gap-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-8">
              <h2 className="text-lg font-semibold text-white">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-400">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.id}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          {after}
        </div>
      </main>
    </div>
  );
}
