import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const procedureT = await getTranslations("procedure");
  const sections = ["service", "operator", "disclaimer"] as const;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        {procedureT("back")}
      </Link>
      <h1 className="text-2xl font-bold text-[#1a2744] mt-4 mb-6">{t("title")}</h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section}>
            <h2 className="text-base font-bold text-[#1a2744] mb-2">{t(`${section}_heading`)}</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{t(`${section}_body`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
