import { ENERGY_EXPONENT, formatLogDecadeTick } from "@/lib/magnitude";
import { COLOR_A, COLOR_B } from "@/lib/palette";
import { copy } from "@/content/copy";
import { SectionLabel } from "@/components/ui/SectionLabel";

export type GrowthCurvesProps = {
  /** Magnitude difference B − A. Negative means A is larger than B. */
  delta: number;
  className?: string;
};

const W = 640;
const H = 220;
const PAD = { l: 56, r: 18, t: 18, b: 40 } as const;
const SAMPLES = 64;

/** Amp vs energy as straight lines on log(B/A) vs ΔM — the site’s core lesson. */
export function GrowthCurves({ delta, className = "" }: GrowthCurvesProps) {
  const span = Math.max(2, Math.abs(delta) + 0.5);
  const xMin = -span;
  const xMax = span;
  // Pad to whole decades so the Y axis is a clean functional log scale.
  const yMax = Math.max(Math.ceil(ENERGY_EXPONENT * span), 2);
  const yMin = -yMax;

  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;

  function xPx(d: number) {
    return PAD.l + ((d - xMin) / (xMax - xMin)) * plotW;
  }
  function yPx(logRatio: number) {
    return PAD.t + ((yMax - logRatio) / (yMax - yMin)) * plotH;
  }

  const ampPts: string[] = [];
  const energyPts: string[] = [];
  for (let i = 0; i < SAMPLES; i++) {
    const d = xMin + ((xMax - xMin) * i) / (SAMPLES - 1);
    ampPts.push(`${xPx(d).toFixed(1)},${yPx(d).toFixed(1)}`);
    energyPts.push(
      `${xPx(d).toFixed(1)},${yPx(ENERGY_EXPONENT * d).toFixed(1)}`,
    );
  }

  const markX = xPx(delta);
  const markAmpY = yPx(delta);
  const markEnergyY = yPx(ENERGY_EXPONENT * delta);

  const xTicks: number[] = [];
  const xStep = span <= 4 ? 1 : 2;
  for (let t = Math.ceil(xMin); t <= Math.floor(xMax); t += xStep) {
    xTicks.push(t);
  }
  if (!xTicks.includes(0)) xTicks.push(0);
  xTicks.sort((a, b) => a - b);

  // One tick per decade of B/A (log₁₀) — same idea as LogBars.
  const yTickLogs: number[] = [];
  for (let t = yMin; t <= yMax; t += 1) {
    yTickLogs.push(t);
  }

  const deltaLabel =
    delta === 0 ? "0" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}`;

  return (
    <div className={className}>
      <SectionLabel className="mb-2">
        {copy.compare.growthHeading}
      </SectionLabel>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-44 w-full rounded-xl bg-[#0a0f1c]"
        role="img"
        aria-label={copy.compare.ariaGrowth}
      >
        {xTicks.map((t) => (
          <line
            key={`vx-${t}`}
            x1={xPx(t)}
            x2={xPx(t)}
            y1={PAD.t}
            y2={H - PAD.b}
            stroke="#1e293b"
            strokeWidth={t === 0 ? 1.25 : 0.75}
          />
        ))}
        {yTickLogs.map((t) => (
          <line
            key={`hy-${t}`}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={yPx(t)}
            y2={yPx(t)}
            stroke="#1e293b"
            strokeWidth={t === 0 ? 1.25 : 0.75}
          />
        ))}

        <polyline
          fill="none"
          stroke={COLOR_A}
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={ampPts.join(" ")}
        />
        <polyline
          fill="none"
          stroke={COLOR_B}
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={energyPts.join(" ")}
        />

        <line
          x1={markX}
          x2={markX}
          y1={PAD.t}
          y2={H - PAD.b}
          stroke="#94a3b8"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.85"
        />
        <circle
          cx={markX}
          cy={markAmpY}
          r="4.5"
          fill={COLOR_A}
          stroke="#0a0f1c"
          strokeWidth="1.5"
        />
        <circle
          cx={markX}
          cy={markEnergyY}
          r="4.5"
          fill={COLOR_B}
          stroke="#0a0f1c"
          strokeWidth="1.5"
        />

        {xTicks.map((t) => (
          <text
            key={`xl-${t}`}
            x={xPx(t)}
            y={H - 14}
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
          >
            {t > 0 ? `+${t}` : `${t}`}
          </text>
        ))}
        {yTickLogs.map((t) => (
          <text
            key={`yl-${t}`}
            x={PAD.l - 8}
            y={yPx(t) + 3.5}
            textAnchor="end"
            fill="#64748b"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            {formatLogDecadeTick(t)}
          </text>
        ))}
        <text
          x={W / 2}
          y={H - 2}
          textAnchor="middle"
          fill="#475569"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          {copy.compare.growthX}
        </text>
        <text
          x={14}
          y={H / 2}
          textAnchor="middle"
          fill="#475569"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          transform={`rotate(-90 14 ${H / 2})`}
        >
          {copy.compare.growthY}
        </text>

        <text
          x={PAD.l + 8}
          y={PAD.t + 14}
          fill={COLOR_A}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          {copy.compare.growthAmp}
        </text>
        <text
          x={PAD.l + 8}
          y={PAD.t + 30}
          fill={COLOR_B}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
        >
          {copy.compare.growthEnergy}
        </text>
      </svg>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        {copy.compare.growthCaptionBefore}
        <span className="font-mono text-slate-300">{deltaLabel}</span>
        {copy.compare.growthCaptionAfter}
      </p>
    </div>
  );
}

export default GrowthCurves;
