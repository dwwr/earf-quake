"use client";

import { useEffect, useRef, useState } from "react";
import { MAG_MAX, MAG_MIN, clampMag } from "@/lib/magnitude";

export type MagFieldProps = {
  label: string;
  color: string;
  value: number;
  onChange: (n: number) => void;
};

function formatMag(n: number): string {
  return n.toFixed(1);
}

/** Empty, digits, and at most one decimal place — so "7." can exist while typing. */
const MAG_DRAFT = /^\d*\.?\d?$/;

export function MagField({ label, color, value, onChange }: MagFieldProps) {
  const focused = useRef(false);
  const [draft, setDraft] = useState(formatMag(value));

  useEffect(() => {
    if (!focused.current) setDraft(formatMag(value));
  }, [value]);

  function commitDraft(raw: string) {
    const next = clampMag(raw === "" || raw === "." ? MAG_MIN : Number(raw));
    onChange(next);
    setDraft(formatMag(next));
  }

  return (
    <label className="flex flex-1 flex-col gap-2">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span style={{ color }} className="font-medium">
          {label}
        </span>
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          aria-label={label}
          value={draft}
          onFocus={() => {
            focused.current = true;
            setDraft(formatMag(value));
          }}
          onChange={(e) => {
            const raw = e.target.value;
            if (!MAG_DRAFT.test(raw)) return;
            setDraft(raw);
            if (raw === "" || raw === ".") return;
            const n = Number(raw);
            if (!Number.isFinite(n)) return;
            const next = clampMag(n);
            onChange(next);
            if (n > MAG_MAX || n < MAG_MIN) setDraft(formatMag(next));
          }}
          onBlur={(e) => {
            focused.current = false;
            commitDraft(e.target.value);
          }}
          className="mag-input w-20 rounded-md border border-white/15 bg-black/40 px-2 py-1 text-right font-mono text-sm text-white"
        />
      </span>
      <input
        type="range"
        min={MAG_MIN}
        max={MAG_MAX}
        step={0.1}
        value={value}
        onChange={(e) => onChange(clampMag(Number(e.target.value)))}
        className="w-full accent-amber-300"
        aria-label={label}
      />
    </label>
  );
}

export default MagField;
