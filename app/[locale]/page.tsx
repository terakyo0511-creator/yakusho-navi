import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CitySelector from "@/components/CitySelector";
import ProcedureCard from "@/components/ProcedureCard";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import healthInsuranceLeave from "@/content/procedures/health_insurance_leave.json";
import addressChange from "@/content/procedures/address_change.json";
import hankoRegistration from "@/content/procedures/hanko_registration.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";
import driversLicense from "@/content/procedures/drivers_license.json";
import pensionWithdrawal from "@/content/procedures/pension_withdrawal.json";

const procedures = [movingIn, residenceCard, healthInsurance, healthInsuranceLeave, addressChange, hankoRegistration, myNumber, pension, driversLicense, pensionWithdrawal];

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
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <LanguageSwitcher />
          <CitySelector locale={locale} />
        </div>
      </header>

      <main>
        <div className="flex items-center justify-between mb-3">
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
        <div className="flex flex-col gap-3">
          {procedures.map((proc) => {
            const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
            const deadlineDays = proc.deadline.type === "within_days" && "days" in proc.deadline
              ? (proc.deadline as { days: number }).days
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
                daysLabel={t("days")}
                cityHallLabel={t("at_city_hall")}
                immigrationLabel={t("at_immigration")}
                licenseCenterLabel={t("at_license_center")}
                bankLabel={t("at_bank")}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
