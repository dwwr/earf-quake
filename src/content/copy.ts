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
    lead: "A jump of one on the Richter scale is 10× the ground-motion amplitude and about 32× the radiated energy. This calculator helps visualize the big difference between two magnitudes.",
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
    legalAria: "About and legal",
    legalNav: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/contact", label: "Contact" },
    ] as const,
  },

  ads: {
    label: "Advertisement",
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "What Quake Compare is, where the formulas come from, and how the site stays up.",
    title: "About Quake Compare",
    lede: "A small calculator that shows why amplitude and radiated energy scale differently when magnitude goes up by one.",
    sections: [
      {
        id: "what",
        heading: "What this is",
        paragraphs: [
          "Quake Compare lets you pick two magnitudes and see the amplitude ratio (10^ΔM), the radiated-energy ratio (~32× per unit), synthetic traces at the same station, and order-of-magnitude energy and moment for the larger event.",
          "It is an educational tool, not a seismic network product, and not a substitute for USGS or other official earthquake information.",
        ],
      },
      {
        id: "sources",
        heading: "Where the numbers come from",
        paragraphs: [
          "Amplitude ratios follow Richter local magnitude (ML) for the same station and instrument. Radiated energy Es uses Kanamori (1977): log₁₀(Es) = 1.5M + 4.4 (joules). Seismic moment uses Hanks & Kanamori, treating the input as moment magnitude Mw. TNT is only an order-of-magnitude metaphor.",
          "Original ML saturates above roughly M 6.5. Felt intensity (MMI) is not magnitude. See the limitations on the homepage for the rest of the caveats.",
        ],
      },
      {
        id: "ads",
        heading: "How the site stays up",
        paragraphs: [
          "Once Google approves a publisher account, labeled display ads may appear on the calculator page. See Privacy for cookies and opt-outs.",
        ],
      },
    ],
  },

  privacy: {
    metaTitle: "Privacy",
    metaDescription:
      "What Quake Compare logs, how Google ads and analytics work, and how to opt out of personalized ads.",
    title: "Privacy policy",
    lede: "This site has no accounts and does not ask for personal details. Hosting and optional Google products may still see that you visited.",
    sections: [
      {
        id: "collect",
        heading: "What we collect",
        paragraphs: [
          "There is no login, mailing list, or server-side profile. Magnitude choices live only in your browser session.",
          "The host (Vercel) and ordinary HTTP requests produce technical logs — IP address, user agent, pages requested — used to run and debug the site. We do not sell those logs.",
        ],
      },
      {
        id: "ads",
        heading: "Advertising (Google AdSense)",
        paragraphs: [
          "When ads are enabled, Google AdSense may use cookies and similar technology to show ads, measure them, and (unless you opt out) personalize them.",
          "Opt out of personalized Google ads at adssettings.google.com. California residents can also use the opt-out Google shows under US state regulations in AdSense Privacy & messaging. We do not sell personal information for money. Personalized advertising can still count as a “sale” or “sharing” under CCPA/CPRA; the Google controls are how you say no.",
        ],
      },
      {
        id: "analytics",
        heading: "Analytics",
        paragraphs: [
          "If Google Analytics is configured, Google may collect usage data (pages viewed, approximate location, device) under Google’s privacy policy. We use it to see whether anyone is using the calculator, not to identify you.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: [
          "This site does not set first-party tracking cookies. Google may set cookies for ads or analytics when those products are on. You can block cookies in your browser; ads may still show, just less tailored.",
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "This site is a general educational calculator. It is not directed at children under 13.",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        paragraphs: [
          "If this policy changes, the date on this page will change. Last updated August 2026.",
        ],
      },
    ],
    contactBefore: "Questions about privacy: ",
    contactLink: "Contact",
    contactAfter: ".",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Corrections and questions about Quake Compare. Not a place for seismic emergency advice.",
    title: "Contact",
    lede: "Corrections to formulas, citations, or copy are welcome. This inbox cannot answer what to do during an earthquake — use official emergency channels.",
    sections: [
      {
        id: "reach",
        heading: "How to reach the author",
        paragraphs: [
          "If a number looks wrong, a reference moved, or the UI misstates the physics, say so. For live earthquake data and alerts, use USGS and your local emergency services.",
        ],
      },
    ],
    emailLineBefore: "Email ",
    emailLineAfter:
      ". Do not send anything you would not put on a postcard.",
    noEmailBefore: "No public email is configured yet. Open an issue on ",
    githubBefore: "You can also open an issue on ",
    githubLinkLabel: "GitHub",
    afterLink: ".",
  },

  compare: {
    title: "Magnitude Comparison",
    subtitle:
      "Richter-style amplitude is 10× per unit. Radiated energy is ~32× per unit. Those are different logarithms.",
    eventA: "Quake A",
    eventB: "Quake B",
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
      aboutB: "Quake B alone (not a ratio)",
      energyOfB: "Radiated energy Es",
      tnt: "TNT equivalent (order of magnitude)",
      moment: "Seismic moment M₀",
    },
    logAxis: "Shared log scale — 1× at center; energy outruns amplitude",
    logAmp: "Amplitude  10^ΔM",
    logEnergy: "Energy  10^(1.5 ΔM)",
    logOverflow: "off scale",
    tiles: "How many A quakes match one B in energy",
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
