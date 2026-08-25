import { formatRatio } from "@/lib/magnitude";
import { COLOR_A, COLOR_B } from "@/lib/palette";
import { copy } from "@/content/copy";
import { SectionLabel } from "@/components/ui/SectionLabel";

export type EnergyTilesProps = {
  /** Energy ratio B/A. */
  ratio: number;
  className?: string;
};

export function EnergyTiles({ ratio, className = "" }: EnergyTilesProps) {
  const aPerB = ratio;
  const bIsLarger = aPerB >= 1;
  const n = Math.round(bIsLarger ? aPerB : 1 / aPerB);
  const show = bIsLarger ? Math.min(Math.max(n, 0), 64) : 1;
  const overflow = bIsLarger && n > 64;
  const tileColor = bIsLarger ? COLOR_B : COLOR_A;
  const textClass = bIsLarger ? "text-amber-200" : "text-teal-200";

  return (
    <div className={className}>
      <SectionLabel className="mb-2">{copy.compare.tiles}</SectionLabel>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: show }, (_, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-[2px] opacity-90"
            style={{ background: tileColor }}
            aria-hidden
          />
        ))}
      </div>
      <p className={`mt-2 font-mono text-sm ${textClass}`}>
        {formatRatio(aPerB)}
        {overflow ? copy.compare.tilesCapped : ""}
        {!bIsLarger && aPerB !== 1
          ? `  — one A ≈ ${formatRatio(1 / aPerB).replace(/×$/, "")} B`
          : ""}
      </p>
    </div>
  );
}

export default EnergyTiles;
