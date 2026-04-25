"use client";

import { useTranslations } from "next-intl";
import { setLocalStorageValue, useLocalStorage } from "@/hooks/useLocalStorage";

const cityKeys = [
  "",
  "tokyo",
  "osaka",
  "nagoya",
  "yokohama",
  "kawasaki",
  "saitama",
  "chiba",
  "fukuoka",
  "kobe",
  "kyoto",
  "other",
] as const;

type CityKey = (typeof cityKeys)[number];

function isCityKey(value: string): value is CityKey {
  return cityKeys.includes(value as CityKey);
}

export const CITY_STORAGE_KEY = "yakusho_navi_city";

export default function CitySelector() {
  const t = useTranslations("cities");
  const a11y = useTranslations("a11y");
  const savedCityKey = useLocalStorage(CITY_STORAGE_KEY);
  const cityKey = savedCityKey && isCityKey(savedCityKey) ? savedCityKey : "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const key = e.target.value;
    setLocalStorageValue(CITY_STORAGE_KEY, key || null);
  }

  return (
    <div className="mt-2">
      <select
        aria-label={a11y("aria_city_selector")}
        value={cityKey}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white w-full sm:w-auto"
      >
        {cityKeys.map((key) => (
          <option key={key} value={key}>
            {key ? t(key) : t("select_placeholder")}
          </option>
        ))}
      </select>
      {cityKey && cityKey !== "other" && (
        <p className="text-xs text-gray-400 mt-1">{t("note")}</p>
      )}
    </div>
  );
}
