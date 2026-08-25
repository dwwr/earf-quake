/**
 * Shared types for the seismograph stylus display.
 * Consumed by MagnitudeCompare (same amp scaling as the calculator) and Storybook.
 */

/** Relative peak amplitudes at one station: larger event fills the plot (= 1). */
export type SeismographChannelAmps = {
  /** Channel A peak scale in [~0, 1]. */
  ampA: number;
  /** Channel B peak scale in [~0, 1]. */
  ampB: number;
};

/**
 * Props for SeismographStylus.
 * Magnitudes are labels / restart keys; ampA/ampB drive the ink height
 * and must match MagnitudeCompare’s 10^−|ΔM| scaling.
 */
export type SeismographStylusProps = SeismographChannelAmps & {
  /** Event A magnitude (display + animation restart). */
  magA: number;
  /** Event B magnitude (display + animation restart). */
  magB: number;
  /**
   * When true, drop the outer FREQ/REC chrome strip so the panel sits
   * inside MagnitudeCompare’s existing card.
   */
  embedded?: boolean;
  /**
   * When true, add sample-and-hold jags on the pulse core.
   * MagnitudeCompare uses the smooth Ricker carrier only (`false`).
   */
  jagged?: boolean;
  className?: string;
  /** Accessible name for the SVG. */
  "aria-label"?: string;
};

/** Derive relative amps from a magnitude delta (B − A), same rule as the calculator. */
export function relativeAmpsFromDelta(delta: number): SeismographChannelAmps {
  const amp = Math.max(10 ** Math.abs(delta), 1);
  return delta >= 0
    ? { ampA: 1 / amp, ampB: 1 }
    : { ampA: 1, ampB: 1 / amp };
}

export function relativeAmpsFromMags(
  magA: number,
  magB: number,
): SeismographChannelAmps {
  return relativeAmpsFromDelta(magB - magA);
}
