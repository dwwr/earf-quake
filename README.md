# earf-quake

A calculator that compares two earthquake magnitudes. A jump of **one** on the scale is **10×** ground-motion amplitude and about **32×** radiated energy. Those are different logarithms; the UI makes both visible.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run storybook    # Storybook at http://localhost:6006/storybook/
```

The homepage **Open Storybook** link goes to `/storybook/`. In development that rewrites to the Storybook server (run `npm run storybook` alongside `npm run dev`). Production builds embed a static Storybook under `public/storybook` via `prebuild`.

Magnitudes are **0–10**, one decimal. Presets cover ΔM = 1, M5 vs M7, Northridge vs Loma Prieta, and M7 vs M9.

## What it computes

| Quantity            | Rule                                                   |
| ------------------- | ------------------------------------------------------ |
| Amplitude ratio B/A | `10^(B − A)` — Richter ML, same station and instrument |
| Energy ratio B/A    | `10^(1.5 (B − A))` ≈ **31.6×** per unit                |
| Radiated energy Es  | `log10(Es) = 1.5M + 4.4` joules (Kanamori 1977)        |
| Seismic moment      | Hanks & Kanamori, treating the input as Mw             |
| TNT equivalent      | order-of-magnitude metaphor only (`4.184×10^9` J/t)    |

## Visuals

- Dual Ricker traces at the same station- ie, the larger event fills the plot; the smaller is scaled by `10^(−ΔM)`.
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

Physics lives in `src/lib/magnitude.ts`. The UI is `src/components/magnitude/MagnitudeCompare.tsx`. App strings live in `src/content/copy.ts`.

## Go live

Env vars are listed in [`.env.example`](.env.example). On Vercel, set them under **Project → Settings → Environment Variables** for **Production**. Mark `NEXT_PUBLIC_*` as **Config** (not Sensitive) or Vercel may reject the public prefix.

| Variable                       | Purpose                                                       |
| ------------------------------ | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Production origin (canonical / OG / sitemap) — no trailing `/` |
| `NEXT_PUBLIC_ADSENSE_CLIENT`   | `ca-pub-…` after AdSense approval; enables script + `ads.txt` |
| `NEXT_PUBLIC_ADSENSE_SLOT`     | Optional display unit id; leave empty for Auto ads only       |
| `NEXT_PUBLIC_GA_ID`            | Optional GA4 `G-…`                                            |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional Search Console HTML-tag token                        |
| `NEXT_PUBLIC_CONTACT_EMAIL`    | Optional address on `/contact` (else GitHub issues)           |

### Domain and hosting

1. Buy a domain (Porkbun, Cloudflare Registrar, or Vercel Domains).
2. Import [dwwr/earf-quake](https://github.com/dwwr/earf-quake) on [vercel.com](https://vercel.com). Framework: Next.js (`vercel.json` / `npm run build`).
3. **Settings → Domains** → add the domain → copy DNS records to the registrar.
4. Set `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN` and **redeploy** so sitemap, canonical, and Open Graph use the custom domain (not `*.vercel.app`).
5. Confirm HTTPS on `/`, `/robots.txt`, `/sitemap.xml`, `/about`, `/privacy`, `/contact`.

Hobby is enough to start.

### Search Console and Analytics

1. [Google Search Console](https://search.google.com/search-console) → Add property → **Domain** (DNS TXT) **or** URL-prefix + `NEXT_PUBLIC_GSC_VERIFICATION`.
2. Submit `https://YOUR-DOMAIN/sitemap.xml`.
3. URL Inspection on `/` → Request indexing.
4. Optional: GA4 → `NEXT_PUBLIC_GA_ID` → redeploy.

`robots.txt` allows the app and **disallows `/storybook/`**.

### AdSense

Do this only after the custom domain is live and `/privacy`, `/about`, and `/contact` load.

1. Apply at [adsense.google.com](https://www.google.com/adsense) with `https://YOUR-DOMAIN`.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXX` → redeploy. `/ads.txt` is generated from that value.
3. Wait for review. Do not click your own ads.
4. After approval: turn on **Auto ads**. For California, enable **Privacy & messaging → US state regulations**.
5. Optional: create a Display unit → `NEXT_PUBLIC_ADSENSE_SLOT`. That fills the labeled unit between the comparator and the math section. Empty slot = Auto ads only.

### Post-deploy checks

- [ ] `/robots.txt` sitemap line uses **your** domain
- [ ] `/sitemap.xml` lists `/`, `/about`, `/privacy`, `/contact`
- [ ] `/ads.txt` is a comment until the client is set; then `google.com, pub-…, DIRECT, f08c47fec0942fa0`
- [ ] View source: no AdSense/GA scripts until those env vars are set
- [ ] Share preview shows `/opengraph-image` (dark card with brand + 10× / ~32×)
