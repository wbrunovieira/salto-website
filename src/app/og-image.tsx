import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0E0E0E",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute",
          bottom: -80,
          left: "50%",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(255,92,0,0.25) 0%, transparent 70%)",
          transform: "translateX(-50%)",
          filter: "blur(60px)",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="64" viewBox="0 0 56 76" fill="none">
            <rect x="19" y="36" width="18" height="38" rx="5" fill="#FF5C00" />
            <polygon points="0,40 28,2 56,40" fill="#FF5C00" />
          </svg>
          <span style={{ color: "#F5F5F5", fontWeight: 900, fontSize: 56, letterSpacing: -2 }}>SALTO</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#F5F5F5", fontWeight: 900, fontSize: 52, letterSpacing: -2 }}>
            Seu negócio pronto para o próximo
          </span>
          <span style={{ color: "#FF5C00", fontWeight: 900, fontSize: 52, letterSpacing: -2 }}>
            salto.
          </span>
        </div>

        {/* Tagline */}
        <span style={{ color: "#555", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", marginTop: 8 }}>
          saltoup.com
        </span>
      </div>
    ),
    { ...size }
  );
}
