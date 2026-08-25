/** Co-located UI / metadata strings. Wording is human-owned — do not invent marketing copy. */

export const copy = {
  brand: "Quake Compare",
  storybookCta: "Open Storybook",
  storybookHref: "/storybook/",
  githubHref: "https://github.com/dwwr/earf-quake",

  meta: {
    title: "Quake Compare",
    description:
      "Compare two earthquake magnitudes: amplitude, radiated energy, and seismic moment.",
  },

  home: {
    title: "Compare Two Magnitudes.",
    lead: "A jump of one on the Richter scale is 10× the ground-motion amplitude and about 32× the radiated energy. This calculator helps you see both.",
    mathHeading: "The Math",
    mathLead:
      "Magnitude is a logarithm of size. Amplitude and energy use different slopes on that log, which is why +1 looks modest on a seismogram and enormous in joules.",
    mathItems: [
      {
        term: "Amplitude",
        formula: "A ∝ 10^M",
        detail:
          "Richter local magnitude ML, same station and instrument. Ratio B/A = 10^(ΔM). Each +1 is 10×.",
      },
      {
        term: "Radiated energy",
        formula: "log₁₀(Es) = 1.5M + 4.4",
        detail:
          "Kanamori (1977), Es in joules. Ratio B/A = 10^(1.5 ΔM) ≈ 31.6× per unit.",
      },
      {
        term: "Seismic moment",
        formula: "M₀ = 10^(1.5(Mw + 6.07))",
        detail:
          "Hanks & Kanamori, M₀ in N·m. Energy and moment treat the input as Mw.",
      },
      {
        term: "TNT equivalent",
        formula: "1 t TNT = 4.184×10⁹ J",
        detail:
          "Order-of-magnitude metaphor only. Es is radiated seismic energy, not a blast yield.",
      },
    ] as const,
    mathFootnote:
      "ML saturates above ~M 6.5. Amplitude ratios assume the same distance. Felt intensity (MMI) is not magnitude.",
  },

  footer: {
    note: "Educational estimates",
    github: "GitHub",
    refs: ["Kanamori 1977", "Hanks & Kanamori 1979"] as const,
  },

  ads: {
    label: "Advertisement",
  },

  compare: {
    title: "Magnitude Comparison",
    subtitle:
      "Richter-style amplitude is 10× per unit. Radiated energy is ~32× per unit. Those are different logarithms.",
    eventA: "Event A",
    eventB: "Event B",
    swap: "Swap A ↔ B",
    presets: [
      { label: "ΔM = 1", a: 5, b: 6 },
      { label: "M5 vs M7", a: 5, b: 7 },
      { label: "Northridge vs Loma Prieta", a: 6.7, b: 6.9 },
      { label: "M7 vs M9", a: 7, b: 9 },
    ] as const,
    stats: {
      delta: "ΔM (B − A)",
      amplitude: "Amplitude B/A",
      amplitudeHint: "10^ΔM · wiggle height",
      energy: "Energy B/A",
      energyHint: "10^(1.5 ΔM) · radiated Es",
      ratiosLead: "How much bigger is B than A?",
      aboutB: "Event B alone (not a ratio)",
      energyOfB: "Radiated energy Es",
      tnt: "TNT equivalent (order of magnitude)",
      moment: "Seismic moment M₀",
    },
    logAxis: "Shared log scale — 1× at center; energy outruns amplitude",
    logAmp: "Amplitude  10^ΔM",
    logEnergy: "Energy  10^(1.5 ΔM)",
    logOverflow: "off scale",
    tiles: "How many A events match one B in energy",
    tilesCapped: "  (tiles capped at 64)",
    growthHeading: "Two slopes vs ΔM",
    growthAmp: "Amplitude  10^ΔM",
    growthEnergy: "Energy  10^(1.5 ΔM)",
    growthX: "ΔM (B − A)",
    growthY: "B/A (log)",
    growthCaptionBefore:
      "Both curves start at 1× when ΔM = 0. Amplitude rises as 10^ΔM (slope 1 on this log plot). Energy rises as 10^(1.5 ΔM) (slope 1.5) — steeper, so it peels away. Your pair sits at ΔM = ",
    growthCaptionAfter: ".",
    ariaGrowth:
      "Log plot of amplitude and energy ratios versus magnitude difference, with the current pair marked",
    traceHeading: "Same station, amplitude ∝ 10^M",
    traceY: "Relative amplitude",
    traceZero: "0",
    traceCaptionBefore:
      "This plot shows amplitude — how tall the wiggle is. The larger quake fills the frame; the smaller is drawn ",
    traceCaptionAfter:
      " as tall. Height scales by 10× per magnitude unit. Energy is steeper: about 32× more radiated energy for each +1 magnitude, so a modest height gap can hide a much larger energy jump.",
    limitationsTitle: "Limitations",
    limitations: [
      "Original Richter magnitude (ML) is a local Wood-Anderson amplitude. It saturates above ~M 6.5. Energy and moment here treat the number as moment magnitude Mw.",
      "Amplitude ratio assumes the same distance and instrument. Felt intensity (MMI) is not magnitude.",
      "Es = 10^(1.5M + 4.4) J is Kanamori’s radiated-energy estimate, not total strain energy on the fault. TNT is an order-of-magnitude metaphor only.",
    ] as const,
    ariaTrace:
      "Synthetic traces scaled by amplitude ratio, drawn left to right",
  },
} as const;

export type AppCopy = typeof copy;
