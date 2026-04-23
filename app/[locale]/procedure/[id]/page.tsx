import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";
import PrintButton from "@/components/PrintButton";
import ShareLineButton from "@/components/ShareLineButton";
import ShowStaffButton from "@/components/ShowStaffButton";

const procedureMap: Record<string, typeof movingIn> = {
  moving_in: movingIn,
  residence_card: residenceCard as typeof movingIn,
  health_insurance: healthInsurance as typeof movingIn,
  my_number: myNumber as typeof movingIn,
  pension: pension as typeof movingIn,
};

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const proc = procedureMap[id];
  if (!proc) notFound();

  const t = await getTranslations("procedure");
  const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
  const trJa = proc.translations.ja;

  const deadlineText = (() => {
    if (proc.deadline.type === "within_days" && "days" in proc.deadline) {
      const fromKey = proc.deadline.from === "after_moving" ? "deadline_moving" : "deadline_expiry";
      return t("deadline_within_days", { days: proc.deadline.days, from: t(fromKey) });
    }
    return t("no_deadline");
  })();

  const locationLabel = proc.location_type === "immigration_office"
    ? `🏢 ${t("location_immigration")}`
    : `🏛️ ${t("location_city_hall")}`;

  return (
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
          />
          <PrintButton label={t("print")} />
          <ShareLineButton label={t("share_line")} title={tr.title} />
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 print:border-0 print:p-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-5xl">{proc.icon}</span>
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
              {proc.duration_minutes.min}〜{proc.duration_minutes.max}
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

        <section className="mb-6">
          <h2 className="text-lg font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-3">
            📋 {t("required_documents")}
          </h2>
          <ul className="space-y-2">
            {tr.required_documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 bg-blue-50 rounded-lg px-4 py-3">
                <span className="text-2xl">{doc.icon}</span>
                <div>
                  <span className="font-semibold text-gray-900">{doc.name}</span>
                  {doc.note && <p className="text-sm text-gray-600 mt-0.5">{doc.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

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
      </div>
    </div>
  );
}
