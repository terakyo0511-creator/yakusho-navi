import { getTranslations } from "next-intl/server";
import Link from "next/link";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";

const checklistProcedures = [movingIn, residenceCard, healthInsurance, myNumber, pension];

const titleMap: Record<string, string> = {
  en: "After Moving to Japan — Checklist",
  vi: "Sau khi đến Nhật Bản — Danh sách việc cần làm",
  zh: "来日后需要办理的手续清单",
  ja: "来日後にやること チェックリスト",
};

const subtitleMap: Record<string, string> = {
  en: "Complete these procedures within 14 days of arrival",
  vi: "Hoàn thành các thủ tục này trong vòng 14 ngày sau khi đến",
  zh: "请在抵达后14天内完成以下手续",
  ja: "到着後14日以内に完了させましょう",
};

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = titleMap[locale] ?? titleMap.en;
  const subtitle = subtitleMap[locale] ?? subtitleMap.en;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        ← Back
      </Link>
      <h1 className="text-xl font-bold text-[#1a2744] mt-4 mb-1">☑️ {title}</h1>
      <p className="text-sm text-gray-500 mb-6">{subtitle}</p>

      <ol className="space-y-3">
        {checklistProcedures.map((proc, i) => {
          const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
          return (
            <li key={proc.id}>
              <Link
                href={`/${locale}/procedure/${proc.id}`}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#1a2744] transition-colors"
              >
                <span className="text-2xl w-8 text-center">{proc.icon}</span>
                <div className="flex-1">
                  <span className="font-semibold text-gray-900">{tr.title}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{tr.subtitle}</p>
                </div>
                <span className="text-gray-300 text-lg">›</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
