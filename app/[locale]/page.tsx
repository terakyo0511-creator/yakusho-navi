import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProcedureCard from "@/components/ProcedureCard";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import healthInsuranceLeave from "@/content/procedures/health_insurance_leave.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";

const procedures = [movingIn, residenceCard, healthInsurance, healthInsuranceLeave, myNumber, pension];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1a2744]">🏛️ {t("title")}</h1>
            <p className="text-gray-600 text-sm mt-1">{t("subtitle")}</p>
          </div>
        </div>
        <div className="mt-3">
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {t("procedures_title")}
        </h2>
        <div className="flex flex-col gap-3">
          {procedures.map((proc) => {
            const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
            const deadlineDays = proc.deadline.type === "within_days" && "days" in proc.deadline
              ? proc.deadline.days
              : null;
            return (
              <ProcedureCard
                key={proc.id}
                id={proc.id}
                icon={proc.icon}
                title={tr.title}
                subtitle={tr.subtitle}
                costYen={proc.cost_yen}
                durationMin={proc.duration_minutes.min}
                durationMax={proc.duration_minutes.max}
                deadlineDays={deadlineDays}
                locationType={proc.location_type}
                locale={locale}
                freeLabel={t("free")}
                minutesLabel={t("minutes")}
                cityHallLabel={t("at_city_hall")}
                immigrationLabel={t("at_immigration")}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
