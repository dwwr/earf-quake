import type { Metadata } from "next";
import { MagnitudeCompare } from "@/components/magnitude/MagnitudeCompare";
import { AdSlot } from "@/components/AdSlot";
import { SiteHeader } from "@/components/SiteHeader";
import { StatCard } from "@/components/ui/StatCard";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: {
    absolute: copy.meta.title,
  },
  description: copy.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: "/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#070b16] text-slate-100">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 pb-16">
        <section>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {copy.home.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
            {copy.home.lead}
          </p>
        </section>

        <MagnitudeCompare />

        <AdSlot />

        <section>
          <h2 className="text-lg font-semibold text-white">
            {copy.home.mathHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {copy.home.mathLead}
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {copy.home.mathItems.map((item) => (
              <StatCard
                key={item.term}
                variant="math"
                label={item.term}
                value={item.formula}
                hint={item.detail}
              />
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            {copy.home.mathFootnote}
          </p>
        </section>
      </main>
    </div>
  );
}
