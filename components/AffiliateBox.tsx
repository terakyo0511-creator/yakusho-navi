import { getTranslations } from "next-intl/server";
import { affiliates } from "@/lib/affiliates";
import { isLocale } from "@/types/procedure";

interface AffiliateBoxProps {
  procedureId: string;
  locale: string;
}

export default async function AffiliateBox({ procedureId, locale }: AffiliateBoxProps) {
  const links = affiliates[procedureId] ?? [];

  if (links.length === 0) {
    return null;
  }

  const t = await getTranslations("procedure");
  const activeLocale = isLocale(locale) ? locale : "en";
  const noteKey = `note_${activeLocale}` as const;

  return (
    <section className="my-4 print:hidden">
      <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
        {t("recommended_services")}
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {links.map((link) => (
          <a
            key={`${link.name}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-[#1a2744] hover:shadow-sm"
          >
            <div className="font-bold text-[#1a2744]">{link.name}</div>
            <p className="mt-1 text-sm text-gray-600">{link[noteKey]}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
