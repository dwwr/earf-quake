import type { ReactNode } from "react";

/** Shared dark Storybook canvas. */
export function darkCanvas(
  Story: () => ReactNode,
  opts?: { maxWidth?: number },
) {
  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "#070b16" }}>
      <div style={opts?.maxWidth ? { maxWidth: opts.maxWidth } : undefined}>
        <Story />
      </div>
    </div>
  );
}
