import { ImageResponse } from "next/og";

// Site-wide social share card (applies to every route unless a segment overrides it).
// Latin-only text on purpose: satori's default font covers it, so no font file is bundled.
export const alt = "Tho Phan — full-stack engineer. Two cities, one codebase.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const sun = "#f2b632";
const mist = "#e9efe3";
const muted = "#b7c1ad";

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
          padding: 84,
          background: "linear-gradient(135deg, #2b2119 0%, #1f4d3a 100%)",
          color: mist,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, letterSpacing: "0.18em", color: sun, textTransform: "uppercase" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: sun }} />
          Full-stack engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 124, fontWeight: 700, lineHeight: 1 }}>Tho Phan</div>
          <div style={{ fontSize: 42, color: muted, marginTop: 20 }}>I build commerce platforms end to end — schema to screen.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, color: muted }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, border: `4px solid ${sun}` }} />
          <div style={{ width: 120, height: 3, background: sun }} />
          <div style={{ width: 22, height: 22, borderRadius: 11, border: `4px solid ${mist}` }} />
          <div style={{ marginLeft: 14, display: "flex" }}>Ho Chi Minh City &nbsp;→&nbsp; Pittsburgh</div>
        </div>
      </div>
    ),
    size,
  );
}
