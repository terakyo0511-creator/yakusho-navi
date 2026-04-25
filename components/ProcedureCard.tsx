import Link from "next/link";
import type { ProcedureLocationType } from "@/types/procedure";

export interface ProcedureCardProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  costYen: number;
  durationMin: number;
  durationMax: number;
  deadlineDays: number | null;
  locationType: ProcedureLocationType;
  locationLabels: Record<ProcedureLocationType, string>;
  locale: string;
  minutesLabel: string;
  daysLabel: string;
}

const locationIcons: Record<ProcedureLocationType, string> = {
  city_hall: "🏛️",
  immigration_office: "🏢",
  license_center: "🚗",
  bank: "🏦",
  phone_shop: "📱",
  tax_office: "🧾",
  hello_work: "🤝",
};

export default function ProcedureCard({
  id,
  icon,
  title,
  subtitle,
  costYen,
  durationMin,
  durationMax,
  deadlineDays,
  locationType,
  locationLabels,
  locale,
  minutesLabel,
  daysLabel,
}: ProcedureCardProps) {
  return (
    <Link href={`/${locale}/procedure/${id}`} aria-label={title}>
      <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-[#1a2744] hover:shadow-md transition-all cursor-pointer">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold text-[#1a2744] leading-tight">{title}</h2>
              {deadlineDays !== null && (
                <span className="flex-shrink-0 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                  {deadlineDays} {daysLabel}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-xs mt-1">{locationIcons[locationType]} {locationLabels[locationType]}</p>
            <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
            <div className="flex gap-4 mt-3">
              <span className={`text-base font-bold ${costYen === 0 ? "text-green-700" : "text-orange-600"}`}>
                {costYen === 0 ? "¥0" : `¥${costYen.toLocaleString()}`}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                🕐 {durationMin}〜{durationMax} {minutesLabel}
              </span>
            </div>
          </div>
          <span className="text-gray-300 text-xl flex-shrink-0" aria-hidden="true">›</span>
        </div>
      </div>
    </Link>
  );
}
