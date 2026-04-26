import { getTranslations } from "next-intl/server";
import Link from "next/link";
import CitySelector from "@/components/CitySelector";
import ProcedureFilter from "@/components/ProcedureFilter";
import RecentlyViewed from "@/components/RecentlyViewed";
import type { FilterableProcedure, ProcedureCategoryKey } from "@/components/ProcedureFilter";
import type { Locale, Procedure } from "@/types/procedure";
import { isLocale } from "@/types/procedure";
import { procedureMap } from "@/lib/procedures";
import { situations } from "@/lib/situations";

const categoryLabels: Record<ProcedureCategoryKey, Record<Locale, string>> = {
  arrival: {
    ja: "来日後すぐにすること",
    en: "After Arrival",
    zh: "抵达后办理",
    vi: "Sau khi đến Nhật",
  },
  living: {
    ja: "生活の変更",
    en: "Life Changes",
    zh: "生活变更",
    vi: "Thay đổi đời sống",
  },
  departure: {
    ja: "帰国時の手続き",
    en: "Before Leaving Japan",
    zh: "离日前手续",
    vi: "Trước khi rời Nhật",
  },
  visa: {
    ja: "ビザ・免許",
    en: "Visa & License",
    zh: "签证与驾照",
    vi: "Visa & bằng lái",
  },
  support: {
    ja: "生活支援",
    en: "Life Support",
    zh: "生活支持",
    vi: "Hỗ trợ đời sống",
  },
  family: {
    ja: "家族",
    en: "Family",
    zh: "家庭",
    vi: "Gia đình",
  },
};

const categories = [
  {
    key: "arrival",
    procedures: [
      procedureMap.moving_in,
      procedureMap.residence_card,
      procedureMap.health_insurance,
      procedureMap.my_number,
      procedureMap.my_number_card,
      procedureMap.pension,
      procedureMap.bank_account,
      procedureMap.mobile_phone,
      procedureMap.tax_return,
    ],
  },
  {
    key: "living",
    procedures: [
      procedureMap.address_change,
      procedureMap.hanko_registration,
      procedureMap.health_insurance_leave,
    ],
  },
  {
    key: "departure",
    procedures: [
      procedureMap.health_insurance_withdrawal,
      procedureMap.pension_withdrawal,
    ],
  },
  {
    key: "visa",
    procedures: [
      procedureMap.residence_extension,
      procedureMap.drivers_license,
    ],
  },
  {
    key: "support",
    procedures: [
      procedureMap.unemployment,
      procedureMap.birth_registration,
      procedureMap.child_allowance,
    ],
  },
  {
    key: "family",
    procedures: [
      procedureMap.marriage_registration,
      procedureMap.death_registration,
    ],
  },
] satisfies Array<{ key: ProcedureCategoryKey; procedures: Procedure[] }>;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const activeLocale = isLocale(locale) ? locale : "en";
  const locationLabels = {
    city_hall: t("at_city_hall"),
    immigration_office: t("at_immigration"),
    license_center: t("at_license_center"),
    bank: t("at_bank"),
    phone_shop: t("at_phone_shop"),
    tax_office: t("at_tax_office"),
    hello_work: t("at_hello_work"),
  };
  const filterableProcedures: FilterableProcedure[] = categories.flatMap(({ key, procedures }) =>
    procedures.map((procedure) => ({ category: key, procedure })),
  );
  const localizedCategoryLabels = Object.fromEntries(
    Object.entries(categoryLabels).map(([key, labels]) => [key, labels[activeLocale]]),
  ) as Record<ProcedureCategoryKey, string>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1a2744]">🏛️ {t("title")}</h1>
            <p className="text-gray-600 text-sm mt-1">{t("subtitle")}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <CitySelector />
        </div>
      </header>

      <main>
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {t("situations_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {situations.map((situation) => {
              const tr = situation.translations[activeLocale];

              return (
                <Link
                  key={situation.id}
                  href={`/${locale}/situations/${situation.id}`}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#1a2744] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">{situation.icon}</span>
                    <div>
                      <h3 className="font-bold text-[#1a2744] text-sm">{tr.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tr.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {t("procedures_title")}
          </h2>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`https://cityhall-guide.vercel.app/${locale}/checklist`)}&text=${encodeURIComponent(t("checklist_share_text"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#06C755] font-medium hover:opacity-80"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#06C755"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
            {t("share_checklist")}
          </a>
        </div>

        <RecentlyViewed
          procedureMap={procedureMap}
          locale={activeLocale}
          title={t("recently_viewed")}
        />

        <ProcedureFilter
          procedures={filterableProcedures}
          categoryLabels={localizedCategoryLabels}
          locationLabels={locationLabels}
          labels={{
            search: t("filter_search"),
            category: t("filter_category"),
            location: t("filter_location"),
            withDeadlineOnly: t("filter_with_deadline_only"),
            all: t("filter_all"),
            noResults: t("filter_no_results"),
            minutes: t("minutes"),
            days: t("days"),
          }}
          locale={activeLocale}
        />
      </main>
    </div>
  );
}
