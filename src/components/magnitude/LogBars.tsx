import { formatLogDecadeTick, formatRatio } from "@/lib/magnitude";
import { COLOR_A, COLOR_B } from "@/lib/palette";
import { copy } from "@/content/copy";
import { SectionLabel } from "@/components/ui/SectionLabel";

export type LogBarsProps = {
  ampRatio: number;
  energyRatio: number;
  className?: string;
};

/** Fixed ± decades on a shared log₁₀(B/A) axis so energy isn’t pinned at 100%. */
const LOG_AXIS_DECADES = 6;
const LOG_TICKS = [-6, -3, 0, 3, 6] as const;

function logRatioToPct(logRatio: number): number {
  const t = logRatio / LOG_AXIS_DECADES;
  return 50 + 50 * Math.max(-1, Math.min(1, t));
}

export function LogBars({
  ampRatio,
  energyRatio,
  className = "",
}: LogBarsProps) {
  const ampLog = Math.log10(Math.max(ampRatio, 1e-12));
  const eLog = Math.log10(Math.max(energyRatio, 1e-12));

  return (
    <div className={`grid gap-3 ${className}`}>
      <SectionLabel>{copy.compare.logAxis}</SectionLabel>
      {(
        [
          [copy.compare.logAmp, ampLog, ampRatio, COLOR_A],
          [copy.compare.logEnergy, eLog, energyRatio, COLOR_B],
        ] as const
      ).map(([name, logR, ratio, color]) => {
        const markPct = logRatioToPct(logR);
        const overflow = Math.abs(logR) > LOG_AXIS_DECADES;
        const from = Math.min(50, markPct);
        const to = Math.max(50, markPct);
        return (
          <div key={name}>
            <div className="mb-1 flex justify-between gap-2 font-mono text-[11px] text-slate-400">
              <span>{name}</span>
              <span style={{ color }}>
                {formatRatio(ratio)} B/A
                {overflow ? ` · ${copy.compare.logOverflow}` : ""}
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
              {LOG_TICKS.map((d) => (
                <span
                  key={d}
                  aria-hidden
                  className="absolute top-0 h-full w-px bg-white/15"
                  style={{ left: `${logRatioToPct(d)}%` }}
                />
              ))}
              <span
                aria-hidden
                className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-slate-400/70"
              />
              <div
                className="absolute top-0 h-full rounded-full"
                style={{
                  left: `${from}%`,
                  width: `${Math.max(to - from, 0.8)}%`,
                  background: color,
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        );
      })}
      <div className="relative h-4 font-mono text-[10px] text-slate-500">
        {LOG_TICKS.map((d) => (
          <span
            key={d}
            className="absolute -translate-x-1/2"
            style={{ left: `${logRatioToPct(d)}%` }}
          >
            {formatLogDecadeTick(d)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LogBars;
