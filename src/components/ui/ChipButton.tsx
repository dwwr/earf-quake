import type { ReactNode } from "react";

export type ChipButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

/** Compact pill control (presets, swap, etc.). */
export function ChipButton({
  children,
  onClick,
  type = "button",
  className = "",
}: ChipButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-white/10 ${className}`}
    >
      {children}
    </button>
  );
}

export default ChipButton;
