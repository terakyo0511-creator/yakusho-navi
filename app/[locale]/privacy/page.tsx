import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("privacy");
  const procedureT = await getTranslations("procedure");
  const paragraphs = ["p1", "p2", "p3", "p4", "p5", "p6"] as const;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        {procedureT("back")}
      </Link>
      <h1 className="text-2xl font-bold text-[#1a2744] mt-4 mb-6">{t("title")}</h1>
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{t(paragraph)}</p>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-8">{t("last_updated")}: 2026-04-25</p>
    </div>
  );
}
