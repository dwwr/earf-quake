export type StatCardProps = {
  label: string;
  value: string;
  /** Secondary line under the value (formula hint or math detail). */
  hint?: string;
  /** Accent for the label (hero) or ignored for math/stat. */
  color?: string;
  /**
   * - `stat` — compact absolute readout
   * - `hero` — large ratio callout
   * - `math` — formula card (amber value + detail hint)
   */
  variant?: "stat" | "hero" | "math";
  className?: string;
};

export function StatCard({
  label,
  value,
  hint,
  color,
  variant = "stat",
  className = "",
}: StatCardProps) {
  if (variant === "hero") {
    return (
      <div
        className={`rounded-xl border border-white/10 bg-black/40 px-4 py-4 ${className}`}
      >
        <p
          className="text-xs font-medium tracking-wide uppercase"
          style={color ? { color } : undefined}
        >
          {label}
        </p>
        <p className="mt-2 font-mono text-3xl leading-none tracking-tight text-white sm:text-4xl">
          {value}
        </p>
        {hint ? (
          <p className="mt-2 font-mono text-[11px] leading-4 text-slate-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }

  if (variant === "math") {
    return (
      <div
        className={`rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 ${className}`}
      >
        <p className="text-[11px] tracking-wide text-slate-500 uppercase">
          {label}
        </p>
        <p className="mt-1 font-mono text-sm text-amber-200">{value}</p>
        {hint ? (
          <p className="mt-2 text-xs leading-5 text-slate-400">{hint}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/30 px-3 py-2 ${className}`}
    >
      <p className="text-[11px] tracking-wide text-slate-500 uppercase">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-slate-100">{value}</p>
      {hint ? (
        <p className="mt-1 font-mono text-[11px] text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default StatCard;
