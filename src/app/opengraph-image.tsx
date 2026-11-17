import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time — the social preview card for every page that doesn't override it.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#12271B",
          color: "#EEF0E4",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: -0.5, fontWeight: 700 }}>
          <span>Viet</span>
          <span style={{ color: "#F2B33D", margin: "0 14px" }}>/</span>
          <span style={{ color: "#A3B5A2" }}>builds</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 960 }}>
            {profile.headline}
          </div>
          <div style={{ marginTop: 28, height: 4, width: 120, background: "#F2B33D", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A3B5A2" }}>
          <span>{profile.name}</span>
          <span>Business experience, built into software</span>
        </div>
      </div>
    ),
    size,
  );
}
