import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

/**
 * Ijtimoiy tarmoqlarda (Telegram, LinkedIn, X) link ulashilganda ko'rinadigan rasm.
 * Statik fayl o'rniga build vaqtida generatsiya qilinadi — ism yoki kasb
 * o'zgarsa rasm ham o'zi yangilanadi, Figma'ga qaytish shart emas.
 */
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0b0d12",
          backgroundImage:
            "radial-gradient(900px 600px at 85% -10%, rgba(124,58,237,0.45), transparent 60%), radial-gradient(700px 500px at 0% 20%, rgba(6,182,212,0.30), transparent 55%), radial-gradient(700px 500px at 100% 100%, rgba(34,197,94,0.22), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#7c3aed",
            }}
          />
          <div style={{ fontSize: 28, color: "rgba(233,238,247,0.75)" }}>
            {siteConfig.shortName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#e9eef7",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 38,
              color: "rgba(233,238,247,0.7)",
              letterSpacing: "-0.01em",
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["UI/UX Design", "Frontend", "Design Systems"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 24,
                color: "rgba(233,238,247,0.72)",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
