import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ChecklistItem from "@/components/ChecklistItem";
import ChecklistProgress from "@/components/ChecklistProgress";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";
import bankAccount from "@/content/procedures/bank_account.json";
import mobilePhone from "@/content/procedures/mobile_phone.json";

const checklistProcedures = [movingIn, residenceCard, healthInsurance, myNumber, pension, bankAccount, mobilePhone];

const titleMap: Record<string, string> = {
  en: "After Moving to Japan — Checklist",
  vi: "Sau khi đến Nhật Bản — Danh sách việc cần làm",
  zh: "来日后需要办理的手续清单",
  ja: "来日後にやること チェックリスト",
};

const subtitleMap: Record<string, string> = {
  en: "Tap the circle to mark as done. Progress is saved on this device.",
  vi: "Nhấn vào vòng tròn để đánh dấu hoàn thành. Tiến độ được lưu trên thiết bị này.",
  zh: "点击圆圈标记为已完成。进度保存在此设备上。",
  ja: "丸をタップして完了マーク。進捗はこの端末に保存されます。",
};

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("procedure");
  const checklistT = await getTranslations("checklist");

  const title = titleMap[locale] ?? titleMap.en;
  const subtitle = subtitleMap[locale] ?? subtitleMap.en;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        {t("back")}
      </Link>
      <h1 className="text-xl font-bold text-[#1a2744] mt-4 mb-1">☑️ {title}</h1>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>

      <ChecklistProgress
        procedureIds={checklistProcedures.map((procedure) => procedure.id)}
        labels={{
          progressLabel: checklistT("progress"),
          allDoneLabel: checklistT("all_done"),
        }}
      />

      <ol className="space-y-3">
        {checklistProcedures.map((proc) => {
          const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
          return (
            <ChecklistItem
              key={proc.id}
              id={proc.id}
              icon={proc.icon}
              title={tr.title}
              subtitle={tr.subtitle}
              href={`/${locale}/procedure/${proc.id}`}
            />
          );
        })}
      </ol>
    </div>
  );
}
