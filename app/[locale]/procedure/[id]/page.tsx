import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrintButton from "@/components/PrintButton";
import ShareLineButton from "@/components/ShareLineButton";
import ShowStaffButton from "@/components/ShowStaffButton";
import DocumentCheckboxList from "@/components/DocumentCheckboxList";
import CityOfficialLink from "@/components/CityOfficialLink";
import AdUnit from "@/components/AdUnit";
import AffiliateBox from "@/components/AffiliateBox";
import DeadlineCountdown from "@/components/DeadlineCountdown";
import RecordView from "@/components/RecordView";
import type { ProcedureLocationType } from "@/types/procedure";
import { isLocale } from "@/types/procedure";
import { procedureMap } from "@/lib/procedures";

const SITE_URL = "https://cityhall-guide.vercel.app";

const locationLabels: Record<ProcedureLocationType, { icon: string; key: string }> = {
  city_hall: { icon: "🏛️", key: "location_city_hall" },
  immigration_office: { icon: "🏢", key: "location_immigration" },
  license_center: { icon: "🚗", key: "location_license_center" },
  bank: { icon: "🏦", key: "location_bank" },
  phone_shop: { icon: "📱", key: "location_phone_shop" },
  tax_office: { icon: "🧾", key: "location_tax_office" },
  hello_work: { icon: "🤝", key: "location_hello_work" },
};

function getDeadlineFromKey(from: "after_moving" | "after_birth" | "after_event" | "before_expiry" | "expiry") {
  if (from === "after_moving") {
    return "deadline_moving";
  }

  if (from === "after_birth") {
    return "deadline_birth";
  }

  if (from === "after_event") {
    return "deadline_event";
  }

  if (from === "before_expiry") {
    return "deadline_before_expiry";
  }

  return "deadline_expiry";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const proc = procedureMap[id];

  if (!proc) {
    return {};
  }

  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const tr = proc.translations[locale] ?? proc.translations.en;
  const imageUrl = `${SITE_URL}/og/${locale}/${id}`;
  const pageUrl = `${SITE_URL}/${locale}/procedure/${id}`;

  return {
    title: tr.title,
    description: tr.subtitle,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: tr.title,
      description: tr.subtitle,
      url: pageUrl,
      type: "article",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: tr.title,
      description: tr.subtitle,
      images: [imageUrl],
    },
  };
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const proc = procedureMap[id];
  if (!proc) notFound();

  const t = await getTranslations("procedure");
  const tr = isLocale(locale) ? proc.translations[locale] : proc.translations.en;
  const trJa = proc.translations.ja;
  const deadlineFromKey =
    proc.deadline.type === "within_days" ? getDeadlineFromKey(proc.deadline.from) : null;

  const deadlineText = (() => {
    if (proc.deadline.type === "within_days" && "days" in proc.deadline) {
      const fromKey = getDeadlineFromKey(proc.deadline.from);
      return t("deadline_within_days", { days: proc.deadline.days, from: t(fromKey) });
    }
    return t("no_deadline");
  })();

  const location = locationLabels[proc.location_type];
  const locationLabel = `${location.icon} ${t(location.key)}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tr.title,
    description: tr.subtitle,
    ...(proc.cost_yen > 0 && {
      estimatedCost: { "@type": "MonetaryAmount", currency: "JPY", value: proc.cost_yen },
    }),
    totalTime: `PT${proc.duration_minutes.max}M`,
    step: tr.steps.map((text: string, i: number) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <RecordView id={id} />
      <div className="max-w-2xl mx-auto px-4 py-6 print:py-2">
        <div className="flex justify-between items-center mb-4 print:hidden">
          <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
            {t("back")}
          </Link>
          <div className="flex gap-1.5">
            <ShowStaffButton
              label={t("show_staff")}
              jaTitle={trJa.title}
              jaDocuments={trJa.required_documents.map((d) => ({ icon: d.icon, name: d.name }))}
              tapBackLabel={t("show_tap_back")}
              documentsLabel={t("show_documents")}
            />
            <PrintButton label={t("print")} />
            <ShareLineButton label={t("share_line")} title={tr.title} />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-200 p-6 print:border-0 print:p-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-5xl" aria-hidden="true">{proc.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-[#1a2744]">{tr.title}</h1>
              <p className="text-gray-500 text-sm">{locationLabel}</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1 mb-4">{tr.subtitle}</p>

          <div className="grid grid-cols-3 gap-3 my-4 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">{t("cost")}</div>
              <div className={`text-2xl font-bold ${proc.cost_yen === 0 ? "text-green-700" : "text-orange-600"}`}>
                {proc.cost_yen === 0 ? "¥0" : `¥${proc.cost_yen.toLocaleString()}`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">{t("time")}</div>
              <div className="text-2xl font-bold text-[#1a2744]">
                🕐 {proc.duration_minutes.min}〜{proc.duration_minutes.max}
                <span className="text-sm font-normal ml-1">min</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">{t("deadline")}</div>
              <div className={`text-base font-bold leading-tight ${proc.deadline.type === "within_days" ? "text-red-600" : "text-gray-500"}`}>
                {deadlineText}
              </div>
            </div>
          </div>

          {proc.deadline.type === "within_days" && deadlineFromKey && (
            <section className="mb-6 print:hidden">
              <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
                ⏳ {t("deadline_calculator")}
              </h2>
              <DeadlineCountdown
                procedureId={id}
                deadlineDays={proc.deadline.days}
                fromKey={t(deadlineFromKey)}
                locale={locale}
                labels={{
                  eventDateLabel: t("event_date"),
                  remainingLabel: t("days_remaining"),
                  overdueLabel: t("days_overdue"),
                  clearLabel: t("clear"),
                  saveLabel: t("save"),
                }}
              />
            </section>
          )}

          <section className="mb-6">
            <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
              📋 {t("required_documents")}
            </h2>
            <DocumentCheckboxList
              documents={tr.required_documents.map((d) => ({
                icon: d.icon,
                name: d.name,
                note: d.note ?? null,
              }))}
            />
          </section>

          <div className="my-4 print:hidden">
            <AdUnit />
          </div>

          <AffiliateBox procedureId={id} locale={locale} />

          <section className="mb-6">
            <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
              ✅ {t("steps")}
            </h2>
            <ol className="space-y-3">
              {tr.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-[#1a2744] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-900">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {tr.warnings.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-red-700 border-b-2 border-red-700 pb-1 mb-3">
                ⚠️ {t("warnings")}
              </h2>
              <ul className="space-y-2">
                {tr.warnings.map((w, i) => (
                  <li key={i} className="bg-red-50 rounded-lg px-4 py-2 text-sm text-red-800">
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {proc.location_type === "city_hall" && (
            <section className="mb-6 print:hidden">
              <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
                🏛️ {t("location_city_hall")}
              </h2>
              <CityOfficialLink locale={locale} />
            </section>
          )}

          {proc.official_links.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
                🔗 {t("official_link")}
              </h2>
              {proc.official_links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-700 underline text-sm hover:text-blue-900"
                >
                  {locale === "ja" ? link.label_ja : link.label_en}
                </a>
              ))}
            </section>
          )}

          <section className="border-t border-gray-100 pt-4 text-xs text-gray-500">
            <p>{t("last_updated")}: {proc.updated_at}</p>
            <p className="mt-1 leading-relaxed">{t("disclaimer")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
