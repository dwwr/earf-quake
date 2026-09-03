import { ImageResponse } from "next/og";
import { copy } from "@/content/copy";

export const alt = copy.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070b16",
          color: "#e8eefc",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#fbbf24",
            fontWeight: 600,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {copy.brand}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.08,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            Compare two magnitudes
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "#94a3b8",
            }}
          >
            Amplitude is 10× per unit. Energy is about 32×.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 22,
            color: "#64748b",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span style={{ color: "#5eead4" }}>10^(B-A)</span>
          <span style={{ color: "#fbbf24" }}>10^(1.5 (B-A))</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
