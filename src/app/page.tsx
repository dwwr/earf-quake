import type { Metadata } from "next";
import { MagnitudeCompare } from "@/components/magnitude/MagnitudeCompare";

export const metadata: Metadata = {
  title: "earf-quake — magnitude compare",
  description:
    "Compare two earthquake magnitudes: amplitude, radiated energy, and seismic moment.",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#070b16] text-slate-100">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
        <p className="font-mono text-sm tracking-tight text-amber-300">
          earf-quake
        </p>
        <a
          href="http://localhost:6006"
          className="rounded-full bg-amber-300 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-amber-200"
        >
          Open Storybook
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 pb-16">
        <section>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Compare two magnitudes.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
            A jump of one on the Richter scale is 10× the ground-motion
            amplitude and about 32× the radiated energy. The calculator makes
            both numbers, and that gap, visible.
          </p>
        </section>

        <MagnitudeCompare />

        <section>
          <h2 className="text-lg font-semibold text-white">The math</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Magnitude is a logarithm of size. Amplitude and energy use
            different slopes on that log, which is why +1 looks modest on a
            seismogram and enormous in joules.
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <MathItem
              term="Amplitude"
              formula="A ∝ 10^M"
              detail="Richter local magnitude ML, same station and instrument. Ratio B/A = 10^(ΔM). Each +1 is 10×."
            />
            <MathItem
              term="Radiated energy"
              formula="log₁₀(Es) = 1.5M + 4.4"
              detail="Kanamori (1977), Es in joules. Ratio B/A = 10^(1.5 ΔM) ≈ 31.6× per unit."
            />
            <MathItem
              term="Seismic moment"
              formula="M₀ = 10^(1.5(Mw + 6.07))"
              detail="Hanks & Kanamori, M₀ in N·m. Energy and moment treat the input as Mw."
            />
            <MathItem
              term="TNT equivalent"
              formula="1 t TNT = 4.184×10⁹ J"
              detail="Order-of-magnitude metaphor only. Es is radiated seismic energy, not a blast yield."
            />
          </dl>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            ML saturates above ~M 6.5. Amplitude ratios assume the same
            distance. Felt intensity (MMI) is not magnitude.
          </p>
        </section>
      </main>
    </div>
  );
}

function MathItem({
  term,
  formula,
  detail,
}: {
  term: string;
  formula: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3">
      <dt className="text-[11px] tracking-wide text-slate-500 uppercase">
        {term}
      </dt>
      <dd className="mt-1 font-mono text-sm text-amber-200">{formula}</dd>
      <dd className="mt-2 text-xs leading-5 text-slate-400">{detail}</dd>
    </div>
  );
}
