import Link from "next/link";
import { copy } from "@/content/copy";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="font-mono text-sm tracking-tight text-amber-300 hover:text-amber-200"
      >
        {copy.brand}
      </Link>
      <a
        href={copy.storybookHref}
        className="rounded-full bg-amber-300 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-amber-200"
      >
        {copy.storybookCta}
      </a>
    </header>
  );
}
