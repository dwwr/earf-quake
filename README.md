# earf-quake

A calculator that compares two earthquake magnitudes. A jump of **one** on the scale is **10×** ground-motion amplitude and about **32×** radiated energy. Those are different logarithms; the UI makes both visible.

The homepage is the calculator. Storybook isolates the same component.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run storybook    # http://localhost:6006
```

Magnitudes are **0–10**, one decimal. Presets cover ΔM = 1, M5 vs M7, Northridge vs Loma Prieta, and M7 vs M9.

## What it computes

| Quantity | Rule |
| --- | --- |
| Amplitude ratio B/A | `10^(B − A)` — Richter ML, same station and instrument |
| Energy ratio B/A | `10^(1.5 (B − A))` ≈ **31.6×** per unit |
| Radiated energy Es | `log10(Es) = 1.5M + 4.4` joules (Kanamori 1977) |
| Seismic moment | Hanks & Kanamori, treating the input as Mw |
| TNT equivalent | order-of-magnitude metaphor only (`4.184×10^9` J/t) |

## Visuals

- Dual Ricker traces at the same station: the larger event fills the plot; the smaller is scaled by `10^(−ΔM)`.
- Shared log-axis bars so energy visibly outruns amplitude.
- Energy tiles: how many A events match one B. After a swap, the ratio inverts.

## Limitations

- Original Richter magnitude (ML) saturates above ~M 6.5. Energy and moment treat the number as moment magnitude Mw.
- Amplitude ratios assume the same distance and instrument. Felt intensity (MMI) is not magnitude.
- Es is radiated seismic energy, not total strain energy on the fault. TNT is not a blast yield.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4
- Storybook 10 (`@storybook/nextjs-vite`)
- SVG for the scaled waveforms

Physics lives in `src/lib/magnitude.ts`. The UI is `src/components/magnitude/MagnitudeCompare.tsx`.
