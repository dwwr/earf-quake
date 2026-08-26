import Link from "next/link";
import { copy } from "@/content/copy";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#070b16] text-slate-500">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 px-6 py-6 text-xs leading-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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
        <nav
          className="flex flex-wrap gap-x-3 gap-y-1"
          aria-label={copy.footer.legalAria}
        >
          {copy.footer.legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-400 underline-offset-3 hover:text-amber-300 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
