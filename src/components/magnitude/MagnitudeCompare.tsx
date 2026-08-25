"use client";

import { useMemo, useState } from "react";
import {
  compareMagnitudes,
  formatRatio,
  formatSci,
  formatTnt,
} from "@/lib/magnitude";
import { copy } from "@/content/copy";
import { SeismographStylus } from "@/components/seismograph/SeismographStylus";
import { GrowthCurves } from "@/components/magnitude/GrowthCurves";
import { MagField } from "@/components/magnitude/MagField";
import { LogBars } from "@/components/magnitude/LogBars";
import { EnergyTiles } from "@/components/magnitude/EnergyTiles";
import { ChipButton } from "@/components/ui/ChipButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/ui/StatCard";
import { COLOR_A, COLOR_B } from "@/lib/palette";

export type MagnitudeCompareProps = {
  magA?: number;
  magB?: number;
};

const PRESETS = copy.compare.presets;

export function MagnitudeCompare({
  magA: magA0 = 5,
  magB: magB0 = 7,
}: MagnitudeCompareProps) {
  const [magA, setMagA] = useState(magA0);
  const [magB, setMagB] = useState(magB0);
  const [propMags, setPropMags] = useState({ a: magA0, b: magB0 });
  if (magA0 !== propMags.a || magB0 !== propMags.b) {
    setPropMags({ a: magA0, b: magB0 });
    setMagA(magA0);
    setMagB(magB0);
  }
  const cmp = useMemo(() => compareMagnitudes(magA, magB), [magA, magB]);
  const biggerIsB = cmp.delta >= 0;
  const amp = Math.max(
    cmp.amplitudeRatio,
    1 / Math.max(cmp.amplitudeRatio, 1e-12),
  );
  const ampA = biggerIsB ? 1 / amp : 1;
  const ampB = biggerIsB ? 1 : 1 / amp;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]">
      <div className="border-b border-white/10 px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-white">
          {copy.compare.title}
        </p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          {copy.compare.subtitle}
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <MagField
              label={copy.compare.eventA}
              color={COLOR_A}
              value={cmp.magA}
              onChange={setMagA}
            />
            <MagField
              label={copy.compare.eventB}
              color={COLOR_B}
              value={cmp.magB}
              onChange={setMagB}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <ChipButton
                key={p.label}
                onClick={() => {
                  setMagA(p.a);
                  setMagB(p.b);
                }}
              >
                {p.label}
              </ChipButton>
            ))}
            <ChipButton
              onClick={() => {
                setMagA(magB);
                setMagB(magA);
              }}
            >
              {copy.compare.swap}
            </ChipButton>
          </div>

          <div className="flex flex-col gap-4">
            <SectionLabel>{copy.compare.stats.ratiosLead}</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatCard
                variant="hero"
                label={copy.compare.stats.amplitude}
                hint={copy.compare.stats.amplitudeHint}
                value={formatRatio(cmp.amplitudeRatio)}
                color={COLOR_A}
              />
              <StatCard
                variant="hero"
                label={copy.compare.stats.energy}
                hint={copy.compare.stats.energyHint}
                value={formatRatio(cmp.energyRatio)}
                color={COLOR_B}
              />
            </div>
            <p className="font-mono text-sm text-slate-400">
              <span className="text-slate-500">
                {copy.compare.stats.delta}
              </span>
              <span className="mx-2 text-slate-600">·</span>
              <span className="text-slate-200">
                {cmp.delta === 0
                  ? "0"
                  : `${cmp.delta > 0 ? "+" : ""}${cmp.delta.toFixed(1)}`}
              </span>
            </p>
          </div>

          <LogBars
            ampRatio={cmp.amplitudeRatio}
            energyRatio={cmp.energyRatio}
          />
          <GrowthCurves delta={cmp.delta} />
          <EnergyTiles ratio={cmp.energyRatio} />

          <div>
            <SectionLabel className="mb-2">
              {copy.compare.stats.aboutB}
            </SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard
                label={copy.compare.stats.energyOfB}
                value={formatSci(cmp.energyB, "J")}
              />
              <StatCard
                label={copy.compare.stats.tnt}
                value={formatTnt(cmp.tntB)}
              />
              <StatCard
                label={copy.compare.stats.moment}
                value={formatSci(cmp.momentB, "N·m")}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <SectionLabel className="mb-2">
              {copy.compare.traceHeading}
            </SectionLabel>
            <SeismographStylus
              key={`${cmp.magA}-${cmp.magB}`}
              magA={cmp.magA}
              magB={cmp.magB}
              ampA={ampA}
              ampB={ampB}
              embedded
              jagged={false}
              aria-label={copy.compare.ariaTrace}
            />
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              {copy.compare.traceCaptionBefore}
              {formatRatio(1 / amp)}
              {copy.compare.traceCaptionAfter}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs leading-5 text-slate-400">
            <p className="font-medium text-slate-200">
              {copy.compare.limitationsTitle}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {copy.compare.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagnitudeCompare;
