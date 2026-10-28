import { ImageResponse } from "next/og";
import { isLang } from "@/lib/i18n";

export const runtime = "nodejs";

export const alt = "Eliezer Salas | Senior Software Architect — esalasdev.vercel.app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  es: {
    eyebrow: "> Hola, soy",
    role: "Senior Software Architect — Microservicios, Cloud e IA",
    foot: "Disponible remoto global · esalasdev.vercel.app/es",
  },
  en: {
    eyebrow: "> Hello, I'm",
    role: "Senior Software Architect — Microservices, Cloud & AI",
    foot: "Open to global remote opportunities · esalasdev.vercel.app/en",
  },
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : "en";
  const c = copy[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#071014",
          padding: "80px 90px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            backgroundColor: "#00d2ff",
          }}
        />
        <div style={{ fontSize: 44, color: "#00d2ff" }}>{c.eyebrow}</div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            color: "#f3f4f6",
            lineHeight: 1.05,
            marginTop: 8,
          }}
        >
          Eliezer Salas
        </div>
        <div style={{ fontSize: 36, color: "#9ca3af", marginTop: 20 }}>{c.role}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 44,
            fontSize: 30,
            color: "#10b981",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: "#10b981",
              marginRight: 18,
            }}
          />
          {c.foot}
        </div>
      </div>
    ),
    { ...size }
  );
}
