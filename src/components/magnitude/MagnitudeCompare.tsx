"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MAG_MAX,
  MAG_MIN,
  clampMag,
  compareMagnitudes,
  formatRatio,
  formatSci,
  formatTnt,
} from "@/lib/magnitude";

function ricker(t: number, f0: number): number {
  const x = Math.PI * f0 * t;
  return (1 - 2 * x * x) * Math.exp(-x * x);
}

export type MagnitudeCompareProps = {
  magA?: number;
  magB?: number;
};

const PRESETS: { label: string; a: number; b: number }[] = [
  { label: "ΔM = 1", a: 5, b: 6 },
  { label: "M5 vs M7", a: 5, b: 7 },
  { label: "Northridge vs Loma Prieta", a: 6.7, b: 6.9 },
  { label: "M7 vs M9", a: 7, b: 9 },
];

function formatMag(n: number): string {
  return n.toFixed(1);
}

/** Empty, digits, and at most one decimal place — so "7." can exist while typing. */
const MAG_DRAFT = /^\d*\.?\d?$/;

function MagField({
  label,
  color,
  value,
  onChange,
}: {
  label: string;
  color: string;
  value: number;
  onChange: (n: number) => void;
}) {
  const focused = useRef(false);
  const [draft, setDraft] = useState(formatMag(value));

  useEffect(() => {
    if (!focused.current) setDraft(formatMag(value));
  }, [value]);

  function commitDraft(raw: string) {
    const next = clampMag(raw === "" || raw === "." ? MAG_MIN : Number(raw));
    onChange(next);
    setDraft(formatMag(next));
  }

  return (
    <label className="flex flex-1 flex-col gap-2">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span style={{ color }} className="font-medium">
          {label}
        </span>
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          aria-valuemin={MAG_MIN}
          aria-valuemax={MAG_MAX}
          value={draft}
          onFocus={() => {
            focused.current = true;
            setDraft(formatMag(value));
          }}
          onChange={(e) => {
            const raw = e.target.value;
            if (!MAG_DRAFT.test(raw)) return;
            setDraft(raw);
            if (raw === "" || raw === ".") return;
            const n = Number(raw);
            if (!Number.isFinite(n)) return;
            const next = clampMag(n);
            onChange(next);
            if (n > MAG_MAX || n < MAG_MIN) setDraft(formatMag(next));
          }}
          onBlur={(e) => {
            focused.current = false;
            commitDraft(e.target.value);
          }}
          className="mag-input w-20 rounded-md border border-white/15 bg-black/40 px-2 py-1 text-right font-mono text-sm text-white"
        />
      </span>
      <input
        type="range"
        min={MAG_MIN}
        max={MAG_MAX}
        step={0.1}
        value={value}
        onChange={(e) => onChange(clampMag(Number(e.target.value)))}
        className="w-full accent-amber-300"
        aria-label={label}
      />
    </label>
  );
}

function waveformPath(amp: number, width: number, height: number): string {
  const n = 180;
  const mid = height / 2;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * 3.2 - 0.4;
    const y = mid - ricker(t - 1.05, 1.15) * amp * mid * 0.92;
    const x = (i / (n - 1)) * width;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function TracePlot({
  magA,
  magB,
  ampA,
  ampB,
}: {
  magA: number;
  magB: number;
  ampA: number;
  ampB: number;
}) {
  return (
    <svg
      viewBox="0 0 640 168"
      className="h-40 w-full rounded-xl bg-[#0a0f1c]"
      role="img"
      aria-label="Synthetic traces scaled by amplitude ratio, drawn left to right"
    >
      <polyline
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={waveformPath(ampA, 640, 84)}
      />
      <g transform="translate(0, 84)">
        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={waveformPath(ampB, 640, 84)}
        />
      </g>
      <line x1="0" x2="640" y1="84" y2="84" stroke="#1e293b" />
      <rect
        className="trace-curtain"
        x="0"
        y="0"
        width="640"
        height="168"
        fill="#0a0f1c"
      >
        <animate
          attributeName="x"
          dur="4.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="0;640;640"
          keySplines="0.25 1 0.5 1; 0 0 1 1"
        />
      </rect>
      <line
        className="trace-playhead"
        x1="0"
        x2="0"
        y1="8"
        y2="160"
        stroke="#e2e8f0"
        strokeWidth="1.2"
        opacity="0.8"
      >
        <animate
          attributeName="x1"
          dur="4.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="0;640;640"
          keySplines="0.25 1 0.5 1; 0 0 1 1"
        />
        <animate
          attributeName="x2"
          dur="4.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          values="0;640;640"
          keySplines="0.25 1 0.5 1; 0 0 1 1"
        />
        <animate
          attributeName="opacity"
          dur="4.8s"
          repeatCount="indefinite"
          keyTimes="0;0.5;0.62;1"
          values="0.8;0.8;0;0"
        />
      </line>
      <text x="12" y="22" fill="#38bdf8" fontSize="12" fontFamily="ui-monospace, monospace">
        A  M {magA.toFixed(1)}
      </text>
      <text x="12" y="106" fill="#f59e0b" fontSize="12" fontFamily="ui-monospace, monospace">
        B  M {magB.toFixed(1)}
      </text>
    </svg>
  );
}

function LogBars({
  ampRatio,
  energyRatio,
}: {
  ampRatio: number;
  energyRatio: number;
}) {
  const maxLog = Math.max(
    Math.log10(Math.max(ampRatio, 1 / ampRatio, 1.001)),
    Math.log10(Math.max(energyRatio, 1 / energyRatio, 1.001)),
    1,
  );
  const ampLog = Math.log10(Math.max(ampRatio, 1e-12));
  const eLog = Math.log10(Math.max(energyRatio, 1e-12));
  const ampPct = Math.min(100, (Math.abs(ampLog) / maxLog) * 100);
  const ePct = Math.min(100, (Math.abs(eLog) / maxLog) * 100);
  const ampLarger = ampRatio >= 1;
  const eLarger = energyRatio >= 1;

  return (
    <div className="grid gap-3">
      <p className="text-xs tracking-wide text-slate-400 uppercase">
        Same log axis — energy outruns amplitude
      </p>
      {(
        [
          ["Amplitude  10^ΔM", ampPct, ampLarger, "#38bdf8", formatRatio(ampRatio)],
          [
            "Energy  10^(1.5 ΔM)",
            ePct,
            eLarger,
            "#f59e0b",
            formatRatio(energyRatio),
          ],
        ] as const
      ).map(([name, pct, larger, color, label]) => (
        <div key={name}>
          <div className="mb-1 flex justify-between font-mono text-[11px] text-slate-400">
            <span>{name}</span>
            <span style={{ color }}>{label} B/A</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute top-0 h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: color,
                left: larger ? "0%" : "auto",
                right: larger ? "auto" : "0%",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function EnergyTiles({ ratio }: { ratio: number }) {
  const aPerB = ratio;
  const bIsLarger = aPerB >= 1;
  const n = Math.round(bIsLarger ? aPerB : 1 / aPerB);
  const show = bIsLarger ? Math.min(Math.max(n, 0), 64) : 1;
  const overflow = bIsLarger && n > 64;
  return (
    <div>
      <p className="mb-2 text-xs tracking-wide text-slate-400 uppercase">
        How many A events match one B in energy
      </p>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: show }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-[2px] ${
              bIsLarger ? "bg-amber-400/90" : "bg-sky-400/90"
            }`}
            aria-hidden
          />
        ))}
      </div>
      <p
        className={`mt-2 font-mono text-sm ${
          bIsLarger ? "text-amber-200" : "text-sky-200"
        }`}
      >
        {formatRatio(aPerB)}
        {overflow ? "  (tiles capped at 64)" : ""}
        {!bIsLarger && aPerB !== 1
          ? `  — one A ≈ ${formatRatio(1 / aPerB).replace(/×$/, "")} B`
          : ""}
      </p>
    </div>
  );
}

export function MagnitudeCompare({
  magA: magA0 = 5,
  magB: magB0 = 7,
}: MagnitudeCompareProps) {
  const [magA, setMagA] = useState(magA0);
  const [magB, setMagB] = useState(magB0);
  useEffect(() => {
    setMagA(magA0);
    setMagB(magB0);
  }, [magA0, magB0]);
  const cmp = useMemo(() => compareMagnitudes(magA, magB), [magA, magB]);
  const biggerIsB = cmp.delta >= 0;
  const amp = Math.max(cmp.amplitudeRatio, 1 / Math.max(cmp.amplitudeRatio, 1e-12));
  const ampA = biggerIsB ? 1 / amp : 1;
  const ampB = biggerIsB ? 1 : 1 / amp;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
      <div className="border-b border-white/10 px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-white">
          Magnitude comparison
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Richter-style amplitude is 10× per unit. Radiated energy is ~32× per
          unit. Those are different logarithms.
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagField
              label="Event A"
              color="#38bdf8"
              value={cmp.magA}
              onChange={setMagA}
            />
            <MagField
              label="Event B"
              color="#f59e0b"
              value={cmp.magB}
              onChange={setMagB}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setMagA(p.a);
                  setMagB(p.b);
                }}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
              >
                {p.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMagA(magB);
                setMagB(magA);
              }}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
            >
              Swap A ↔ B
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat
              k="ΔM (B − A)"
              v={cmp.delta === 0 ? "0" : `${cmp.delta > 0 ? "+" : ""}${cmp.delta.toFixed(1)}`}
            />
            <Stat k="Amplitude B/A" v={formatRatio(cmp.amplitudeRatio)} />
            <Stat k="Energy B/A" v={formatRatio(cmp.energyRatio)} />
            <Stat
              k="Energy of B"
              v={formatSci(cmp.energyB, "J")}
            />
            <Stat k="B as TNT (order of mag.)" v={formatTnt(cmp.tntB)} />
            <Stat k="Seismic moment B" v={formatSci(cmp.momentB, "N·m")} />
          </div>

          <LogBars
            ampRatio={cmp.amplitudeRatio}
            energyRatio={cmp.energyRatio}
          />
          <EnergyTiles ratio={cmp.energyRatio} />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-xs tracking-wide text-slate-400 uppercase">
              Same station, amplitude ∝ 10^M
            </p>
            <TracePlot
              key={`${cmp.magA}-${cmp.magB}`}
              magA={cmp.magA}
              magB={cmp.magB}
              ampA={ampA}
              ampB={ampB}
            />
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              The larger event fills the plot; the smaller is scaled by{" "}
              {formatRatio(1 / amp)}. If you only glance at wiggle height you
              miss the ~32× energy jump.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs leading-5 text-slate-400">
            <p className="font-medium text-slate-200">Limitations</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                Original Richter magnitude (ML) is a local Wood-Anderson
                amplitude. It saturates above ~M 6.5. Energy and moment here
                treat the number as moment magnitude Mw.
              </li>
              <li>
                Amplitude ratio assumes the same distance and instrument.
                Felt intensity (MMI) is not magnitude.
              </li>
              <li>
                Es = 10^(1.5M + 4.4) J is Kanamori’s radiated-energy estimate,
                not total strain energy on the fault. TNT is an order-of-magnitude
                metaphor, not a blast yield.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">
      <p className="text-[11px] tracking-wide text-slate-500 uppercase">{k}</p>
      <p className="mt-1 font-mono text-sm text-slate-100">{v}</p>
    </div>
  );
}

export default MagnitudeCompare;
