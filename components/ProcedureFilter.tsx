"use client";

import { useMemo, useState } from "react";
import ProcedureCard from "@/components/ProcedureCard";
import type { Locale, Procedure, ProcedureLocationType } from "@/types/procedure";

export type ProcedureCategoryKey =
  | "arrival"
  | "living"
  | "departure"
  | "visa"
  | "support"
  | "family";

export interface FilterableProcedure {
  category: ProcedureCategoryKey;
  procedure: Procedure;
}

interface ProcedureFilterLabels {
  search: string;
  category: string;
  location: string;
  withDeadlineOnly: string;
  all: string;
  noResults: string;
  minutes: string;
  days: string;
}

interface ProcedureFilterProps {
  procedures: FilterableProcedure[];
  categoryLabels: Record<ProcedureCategoryKey, string>;
  locationLabels: Record<ProcedureLocationType, string>;
  labels: ProcedureFilterLabels;
  locale: Locale;
}

const categoryOptions: ProcedureCategoryKey[] = [
  "arrival",
  "living",
  "departure",
  "visa",
  "support",
  "family",
];

const locationOptions: ProcedureLocationType[] = [
  "city_hall",
  "immigration_office",
  "license_center",
  "bank",
  "phone_shop",
  "tax_office",
  "hello_work",
];

export default function ProcedureFilter({
  procedures,
  categoryLabels,
  locationLabels,
  labels,
  locale,
}: ProcedureFilterProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProcedureCategoryKey>("all");
  const [location, setLocation] = useState<"all" | ProcedureLocationType>("all");
  const [withDeadlineOnly, setWithDeadlineOnly] = useState(false);

  const filteredProcedures = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return procedures.filter(({ category: itemCategory, procedure }) => {
      const translation = procedure.translations[locale];
      const matchesQuery =
        normalizedQuery.length === 0 ||
        translation.title.toLocaleLowerCase().includes(normalizedQuery) ||
        translation.subtitle.toLocaleLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "all" || itemCategory === category;
      const matchesLocation = location === "all" || procedure.location_type === location;
      const matchesDeadline = !withDeadlineOnly || procedure.deadline.type === "within_days";

      return matchesQuery && matchesCategory && matchesLocation && matchesDeadline;
    });
  }, [category, locale, location, procedures, query, withDeadlineOnly]);

  const groupedProcedures = categoryOptions
    .map((key) => ({
      key,
      procedures: filteredProcedures.filter((item) => item.category === key),
    }))
    .filter((group) => group.procedures.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] gap-3 items-end">
          <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
            {labels.search}
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
            {labels.category}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as "all" | ProcedureCategoryKey)}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10"
            >
              <option value="all">{labels.all}</option>
              {categoryOptions.map((key) => (
                <option key={key} value={key}>
                  {categoryLabels[key]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
            {labels.location}
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value as "all" | ProcedureLocationType)}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10"
            >
              <option value="all">{labels.all}</option>
              {locationOptions.map((key) => (
                <option key={key} value={key}>
                  {locationLabels[key]}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-h-10 items-center gap-2 rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={withDeadlineOnly}
              onChange={(event) => setWithDeadlineOnly(event.target.checked)}
              className="h-4 w-4 accent-[#1a2744]"
            />
            {labels.withDeadlineOnly}
          </label>
        </div>
      </div>

      {groupedProcedures.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white px-4 py-6 text-center text-sm text-gray-500">
          {labels.noResults}
        </p>
      ) : (
        groupedProcedures.map(({ key, procedures: groupProcedures }) => (
          <section key={key}>
            <h3 className="text-sm font-bold text-[#1a2744] mb-2 pb-1 border-b border-gray-200">
              {categoryLabels[key]}
            </h3>
            <div className="flex flex-col gap-3">
              {groupProcedures.map(({ procedure }) => {
                const tr = procedure.translations[locale];
                const deadlineDays =
                  procedure.deadline.type === "within_days" ? procedure.deadline.days : null;

                return (
                  <ProcedureCard
                    key={procedure.id}
                    id={procedure.id}
                    icon={procedure.icon}
                    title={tr.title}
                    subtitle={tr.subtitle}
                    costYen={procedure.cost_yen}
                    durationMin={procedure.duration_minutes.min}
                    durationMax={procedure.duration_minutes.max}
                    deadlineDays={deadlineDays}
                    locationType={procedure.location_type}
                    locationLabels={locationLabels}
                    locale={locale}
                    minutesLabel={labels.minutes}
                    daysLabel={labels.days}
                  />
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
