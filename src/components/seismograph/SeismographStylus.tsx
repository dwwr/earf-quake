"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { SeismographStylusProps } from "./types";
import { COLOR_A, COLOR_B } from "@/lib/palette";

export type {
  SeismographChannelAmps,
  SeismographStylusProps,
} from "./types";
export { relativeAmpsFromDelta, relativeAmpsFromMags } from "./types";

const WIDTH = 640;
const HEIGHT = 200;
const CHANNEL_H = 100;
const CYCLE_MS = 5400;
const DRAW_FRAC = 0.5;
const RICKER_F0 = 1.05;
const RICKER_PEAK = 1.05;
const TRACE_SAMPLES = 560;

const CHASSIS = "#0b1020";
const PANEL = "#05080f";
const VFD_CYAN = COLOR_A;
const VFD_CYAN_DIM = "#134e4a";
const VFD_AMBER = COLOR_B;
const VFD_AMBER_DIM = "#78350f";
const HUD = "#94a3b8";
const BRACKET = "#f59e0b";

function ricker(t: number, f0: number): number {
  const x = Math.PI * f0 * t;
  return (1 - 2 * x * x) * Math.exp(-x * x);
}

function hash1(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function holdNoise(x: number, seed: number): number {
  return hash1(Math.floor(x) + seed * 97) * 2 - 1;
}

function lerpNoise(x: number, seed: number): number {
  const i = Math.floor(x);
  const f = x - i;
  return holdNoise(i, seed) * (1 - f) + holdNoise(i + 1, seed) * f;
}

/** Ricker carrier; optional extreme jags gated to the pulse core. */
function signalAt(
  xNorm: number,
  amp: number,
  seed: number,
  jagged: boolean,
): number {
  const t = xNorm * 3.2 - 0.4;
  const tau = t - RICKER_PEAK;
  const shape = ricker(tau, RICKER_F0);
  const carrier = shape * amp;

  if (!jagged) return carrier;

  const salience = Math.min(
    1,
    Math.abs(shape) * 1.35 + Math.exp(-tau * tau * 2.8) * 0.55,
  );
  const jag = salience * salience;

  const floor =
    holdNoise(xNorm * 90, seed) * 0.012 +
    holdNoise(xNorm * 200, seed + 2) * 0.008;

  const micro =
    (holdNoise(xNorm * 72, seed) * 0.28 +
      holdNoise(xNorm * 160, seed + 7) * 0.24 +
      holdNoise(xNorm * 310, seed + 19) * 0.2 +
      lerpNoise(xNorm * 48, seed + 3) * 0.12) *
    jag;

  const spikes =
    ((hash1(Math.floor(xNorm * 95) * 13 + seed) > 0.82
      ? holdNoise(xNorm * 400, seed + 50) * 0.7
      : 0) +
      (hash1(Math.floor(xNorm * 140) * 29 + seed) > 0.88
        ? holdNoise(xNorm * 600, seed + 61) * 0.95
        : 0)) *
    jag;

  const chatter =
    (holdNoise(xNorm * 240, seed + 41) * 0.32 +
      holdNoise(xNorm * 420, seed + 44) * 0.4) *
    jag *
    (0.4 + Math.abs(carrier));

  const crushed =
    Math.round((carrier + micro * 0.6) * (10 + jag * 8)) / (10 + jag * 8);

  return (
    carrier * (1 - 0.35 * jag) +
    crushed * (0.35 * jag) +
    micro +
    spikes +
    chatter +
    floor * (1 - jag * 0.85)
  );
}

function ampAt(
  x: number,
  amp: number,
  channelTop: number,
  seed: number,
  jagged: boolean,
): number {
  const mid = channelTop + CHANNEL_H / 2;
  const half = (CHANNEL_H / 2) * 0.9;
  const y = mid - signalAt(x / WIDTH, amp, seed, jagged) * half;
  return Math.min(channelTop + CHANNEL_H - 4, Math.max(channelTop + 4, y));
}

function waveformPoints(
  amp: number,
  channelTop: number,
  seed: number,
  jagged: boolean,
): string {
  const pts: string[] = [];
  for (let i = 0; i < TRACE_SAMPLES; i++) {
    const x = (i / (TRACE_SAMPLES - 1)) * WIDTH;
    const y = ampAt(x, amp, channelTop, seed, jagged);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

function scanlinePath(): string {
  const lines: string[] = [];
  for (let y = 1; y < HEIGHT; y += 3) {
    lines.push(`M0 ${y} H${WIDTH}`);
  }
  return lines.join(" ");
}

function gridPath(): string {
  const lines: string[] = [];
  for (let x = 40; x < WIDTH; x += 40) lines.push(`M${x} 0 V${HEIGHT}`);
  for (let y = 20; y < HEIGHT; y += 20) lines.push(`M0 ${y} H${WIDTH}`);
  return lines.join(" ");
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Dual-channel VFD seismograph with hinged styli.
 * Amplitudes come from the parent (MagnitudeCompare) — do not recompute here.
 */
export function SeismographStylus({
  magA,
  magB,
  ampA,
  ampB,
  embedded = false,
  jagged = false,
  className = "",
  "aria-label": ariaLabel = "Seismograph stylus traces scaled by amplitude ratio",
}: SeismographStylusProps) {
  const clipId = useId().replace(/:/g, "");
  const glowA = useId().replace(/:/g, "");
  const glowB = useId().replace(/:/g, "");
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  );
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startRef.current) % CYCLE_MS;
      setProgress(elapsed / CYCLE_MS);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, magA, magB, ampA, ampB, jagged]);

  const pathA = useMemo(
    () => waveformPoints(ampA, 0, 11, jagged),
    [ampA, jagged],
  );
  const pathB = useMemo(
    () => waveformPoints(ampB, CHANNEL_H, 29, jagged),
    [ampB, jagged],
  );
  const scans = useMemo(() => scanlinePath(), []);
  const grid = useMemo(() => gridPath(), []);

  const effectiveProgress = reduceMotion ? 1 : progress;
  const drawT = Math.min(1, effectiveProgress / DRAW_FRAC);
  const playX = drawT * WIDTH;
  const tipA = ampAt(playX, ampA, 0, 11, jagged);
  const tipB = ampAt(playX, ampB, CHANNEL_H, 29, jagged);
  const pivotOffset = 22;
  const pivotXA = Math.max(4, playX - pivotOffset);
  const pivotXB = Math.max(4, playX - pivotOffset);
  const showingNeedle = !reduceMotion && effectiveProgress < DRAW_FRAC + 0.12;
  const clipW = reduceMotion ? WIDTH : Math.max(playX, 0.5);
  const freqHz = (40 + drawT * 180).toFixed(1);

  return (
    <div
      className={`overflow-hidden rounded-sm border border-amber-300/40 bg-[#070b16] ${className}`}
    >
      {!embedded && (
        <div className="flex items-center justify-between gap-3 border-b border-amber-300/30 bg-[#0b1020] px-3 py-2">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-amber-300 uppercase">
            <span className="inline-block h-2 w-2 bg-teal-300 shadow-[0_0_6px_#5eead4]" />
            FREQ
            <span className="text-teal-300 tabular-nums">{freqHz}</span>
            <span className="text-slate-500">HZ</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
            CH-A / CH-B · STYLUS
          </p>
          <div className="font-mono text-[10px] tracking-[0.2em] text-amber-300/80 uppercase">
            REC
            <span className="ml-2 inline-block h-2 w-2 animate-pulse bg-red-500" />
          </div>
        </div>
      )}

      <div className={`relative ${embedded ? "p-2" : "p-3 sm:p-4"}`}>
        {!embedded && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-2 border border-amber-300/20"
            />
            <Corner mark="tl" />
            <Corner mark="tr" />
            <Corner mark="bl" />
            <Corner mark="br" />
          </>
        )}

        <svg
          key={`${magA}-${magB}-${ampA}-${ampB}-${jagged}`}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className={`relative z-[1] w-full ${embedded ? "h-40" : "h-48"}`}
          role="img"
          aria-label={ariaLabel}
          style={{ background: PANEL }}
        >
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={clipW} height={HEIGHT} />
            </clipPath>
            <filter id={glowA} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="1.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={glowB} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="1.6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={PANEL} />
          <path d={grid} fill="none" stroke="#1e293b" strokeWidth="0.7" />
          <line
            x1="0"
            x2={WIDTH}
            y1={CHANNEL_H}
            y2={CHANNEL_H}
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          <g clipPath={`url(#${clipId})`}>
            <polyline
              fill="none"
              stroke={VFD_CYAN_DIM}
              strokeWidth="3.2"
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeMiterlimit="1.5"
              opacity="0.55"
              points={pathA}
              filter={`url(#${glowA})`}
            />
            <polyline
              fill="none"
              stroke={VFD_CYAN}
              strokeWidth="1.35"
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeMiterlimit="1.5"
              points={pathA}
            />
            <polyline
              fill="none"
              stroke={VFD_AMBER_DIM}
              strokeWidth="3.2"
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeMiterlimit="1.5"
              opacity="0.55"
              points={pathB}
              filter={`url(#${glowB})`}
            />
            <polyline
              fill="none"
              stroke={VFD_AMBER}
              strokeWidth="1.35"
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeMiterlimit="1.5"
              points={pathB}
            />
          </g>

          <path
            d={scans}
            fill="none"
            stroke="#000"
            strokeWidth="1"
            opacity="0.28"
          />

          {showingNeedle && (
            <>
              <line
                x1={playX}
                y1="0"
                x2={playX}
                y2={HEIGHT}
                stroke={BRACKET}
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.55"
              />
              <StylusArm
                pivotX={pivotXA}
                pivotY={10}
                tipX={playX}
                tipY={tipA}
                accent={VFD_CYAN}
              />
              <StylusArm
                pivotX={pivotXB}
                pivotY={CHANNEL_H + 10}
                tipX={playX}
                tipY={tipB}
                accent={VFD_AMBER}
              />
            </>
          )}

          <text
            x="10"
            y="16"
            fill={VFD_CYAN}
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.5"
          >
            {`CH-A  M${magA.toFixed(1)}`}
          </text>
          <text
            x="10"
            y={CHANNEL_H + 16}
            fill={VFD_AMBER}
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="1.5"
          >
            {`CH-B  M${magB.toFixed(1)}`}
          </text>
        </svg>

        {!embedded && (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">
            <span>
              {jagged
                ? "JAGS ON PULSE CORE · QUIET FLANKS"
                : "SMOOTH RICKER · QUIET FLANKS"}
            </span>
            <span className="text-amber-300/70">earf-quake // stylus</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Corner({ mark }: { mark: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-3 w-3 border-amber-300";
  const pos =
    mark === "tl"
      ? "top-2 left-2 border-t-2 border-l-2"
      : mark === "tr"
        ? "top-2 right-2 border-t-2 border-r-2"
        : mark === "bl"
          ? "bottom-2 left-2 border-b-2 border-l-2"
          : "right-2 bottom-2 border-r-2 border-b-2";
  return <div aria-hidden className={`${base} ${pos}`} />;
}

function StylusArm({
  pivotX,
  pivotY,
  tipX,
  tipY,
  accent,
}: {
  pivotX: number;
  pivotY: number;
  tipX: number;
  tipY: number;
  accent: string;
}) {
  return (
    <g>
      <line
        x1={pivotX}
        y1={pivotY}
        x2={tipX}
        y2={tipY}
        stroke="#64748b"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <line
        x1={pivotX}
        y1={pivotY}
        x2={tipX}
        y2={tipY}
        stroke={accent}
        strokeWidth="0.9"
        strokeLinecap="square"
        opacity="0.85"
      />
      <rect
        x={pivotX - 4}
        y={pivotY - 4}
        width="8"
        height="8"
        fill={CHASSIS}
        stroke={HUD}
        strokeWidth="1"
      />
      <rect
        x={tipX - 2.5}
        y={tipY - 2.5}
        width="5"
        height="5"
        fill={accent}
        stroke="#0f172a"
        strokeWidth="0.6"
      />
    </g>
  );
}

export default SeismographStylus;
