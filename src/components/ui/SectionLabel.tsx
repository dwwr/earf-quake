import type { ReactNode } from "react";

export type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Uppercase section eyebrow used across compare visuals. */
export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`text-sm font-bold tracking-wide text-slate-400 uppercase ${className}`}
    >
      {children}
    </p>
  );
}

export default SectionLabel;
