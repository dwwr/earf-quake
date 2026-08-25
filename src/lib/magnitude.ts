/**
 * Magnitude comparisons.
 *
 * Amplitude follows the original Richter definition of local magnitude ML:
 *   A ∝ 10^M   (same instrument, same distance)
 *
 * Radiated seismic energy follows Kanamori (1977):
 *   log10(Es / 1 J) = 1.5 M + 4.4
 * so each +1 magnitude is 10^1.5 ≈ 31.62× energy, not 10×.
 *
 * Treat the inputs as Mw for energy/moment; ML saturates above ~6.5.
 */

export const ENERGY_EXPONENT = 1.5;
export const KANAMORI_ENERGY_OFFSET = 4.4;
export const JOULES_PER_TON_TNT = 4.184e9;
export const MAG_MIN = 0;
export const MAG_MAX = 10;

export type MagnitudeCompareResult = {
  magA: number;
  magB: number;
  delta: number;
  amplitudeRatio: number;
  energyRatio: number;
  energyA: number;
  energyB: number;
  tntA: number;
  tntB: number;
  momentA: number;
  momentB: number;
};

export function clampMag(m: number): number {
  if (!Number.isFinite(m)) return MAG_MIN;
  const clamped = Math.min(MAG_MAX, Math.max(MAG_MIN, m));
  return Math.round(clamped * 10) / 10;
}

export function amplitudeRatio(magA: number, magB: number): number {
  return 10 ** (magB - magA);
}

export function energyRatio(magA: number, magB: number): number {
  return 10 ** (ENERGY_EXPONENT * (magB - magA));
}

/** Radiated seismic energy Es in joules (Kanamori 1977). */
export function seismicEnergyJoules(mag: number): number {
  return 10 ** (ENERGY_EXPONENT * mag + KANAMORI_ENERGY_OFFSET);
}

/** Scalar moment M0 in N·m, treating mag as Mw (Hanks & Kanamori). */
export function seismicMomentNm(mag: number): number {
  return 10 ** ((3 / 2) * (mag + 6.07));
}

export function compareMagnitudes(
  magA: number,
  magB: number,
): MagnitudeCompareResult {
  const a = clampMag(magA);
  const b = clampMag(magB);
  const energyA = seismicEnergyJoules(a);
  const energyB = seismicEnergyJoules(b);
  return {
    magA: a,
    magB: b,
    delta: b - a,
    amplitudeRatio: amplitudeRatio(a, b),
    energyRatio: energyRatio(a, b),
    energyA,
    energyB,
    tntA: energyA / JOULES_PER_TON_TNT,
    tntB: energyB / JOULES_PER_TON_TNT,
    momentA: seismicMomentNm(a),
    momentB: seismicMomentNm(b),
  };
}

export function formatRatio(value: number): string {
  const x = Math.abs(value);
  if (x === 0) return "0×";
  if (Math.abs(x - 1) < 1e-6) return "1×";
  if (x >= 1e6 || x < 0.01) {
    const exp = Math.floor(Math.log10(x));
    const mant = x / 10 ** exp;
    return `${mant.toFixed(2)}×10${sup(exp)}`;
  }
  if (x >= 100) return `${Math.round(x).toLocaleString("en-US")}×`;
  if (x >= 10) return `${x.toFixed(1)}×`;
  return `${x.toFixed(2)}×`;
}

export function formatSci(value: number, unit: string): string {
  if (value === 0) return `0 ${unit}`;
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mant = value / 10 ** exp;
  return `${mant.toFixed(2)}×10${sup(exp)} ${unit}`;
}

export function formatTnt(tons: number): string {
  if (tons < 0.001) return formatSci(tons * 1e6, "g TNT");
  if (tons < 1) return `${(tons * 1000).toFixed(1)} kg TNT`;
  if (tons < 1000) return `${tons.toFixed(1)} t TNT`;
  if (tons < 1e6) return `${(tons / 1000).toFixed(2)} kt TNT`;
  return `${(tons / 1e6).toFixed(2)} Mt TNT`;
}

function sup(n: number): string {
  const map: Record<string, string> = {
    "-": "⁻",
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };
  return String(n)
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}
