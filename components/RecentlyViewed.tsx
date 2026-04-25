"use client";

import Link from "next/link";
import { useRecentProcedures } from "@/hooks/useRecentProcedures";
import type { Procedure } from "@/types/procedure";
import { isLocale } from "@/types/procedure";

interface RecentlyViewedProps {
  procedureMap: Record<string, Procedure>;
  locale: string;
  title: string;
}

export default function RecentlyViewed({ procedureMap, locale, title }: RecentlyViewedProps) {
  const activeLocale = isLocale(locale) ? locale : "en";
  const recentIds = useRecentProcedures().filter((id) => procedureMap[id]);

  if (recentIds.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {title}
      </h2>
      <div className="-mx-4 overflow-x-auto px-4 pb-1">
        <div className="flex gap-3">
          {recentIds.map((id) => {
            const procedure = procedureMap[id];
            const tr = procedure.translations[activeLocale];

            return (
              <Link
                key={id}
                href={`/${locale}/procedure/${id}`}
                className="min-w-[220px] rounded-lg border border-gray-200 bg-white px-4 py-3 hover:border-[#1a2744]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">{procedure.icon}</span>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#1a2744]">{tr.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">{tr.subtitle}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
