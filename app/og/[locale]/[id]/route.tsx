import { ImageResponse } from "next/og";
import { isLocale } from "@/types/procedure";
import { procedureMap } from "@/lib/procedures";

export const runtime = "edge";

const siteTitle = {
  ja: "役所手続きナビ",
  en: "Japan City Hall Guide",
  zh: "日本市政手续指南",
  vi: "Hướng dẫn thủ tục Nhật Bản",
} as const;

const siteSubtitle = {
  ja: "外国人住民のための手続きガイド",
  en: "Step-by-step guides for foreign residents",
  zh: "面向外国居民的手续指南",
  vi: "Hướng dẫn từng bước cho cư dân nước ngoài",
} as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; id: string }> },
) {
  const { locale: rawLocale, id } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";

  const isIndex = id === "index";
  const procedure = isIndex ? null : procedureMap[id];

  if (!isIndex && !procedure) {
    return new Response("Not found", { status: 404 });
  }

  const translation = procedure?.translations[locale] ?? procedure?.translations.en;
  const title = translation?.title ?? siteTitle[locale];
  const subtitle = translation?.subtitle ?? siteSubtitle[locale];
  const icon = procedure?.icon ?? "🏛️";
  const meta = procedure
    ? `¥${procedure.cost_yen.toLocaleString()} · ${procedure.duration_minutes.min}-${procedure.duration_minutes.max} min`
    : "ja / en / zh / vi";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a2744",
          color: "white",
          padding: "58px 66px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <span>🏛️</span>
          <span>{siteTitle[locale]}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div style={{ fontSize: 110, lineHeight: 1 }}>{icon}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
            <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.12 }}>{title}</div>
            <div style={{ fontSize: 28, color: "#d7deea", lineHeight: 1.35 }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#c5cfdd" }}>
          <span>cityhall-guide.vercel.app</span>
          <span>{meta}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
