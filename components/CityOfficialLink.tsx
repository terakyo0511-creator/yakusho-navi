"use client";

import { useTranslations } from "next-intl";
import { CITY_STORAGE_KEY } from "./CitySelector";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const cityHallMap: Record<string, { cityKey: string; url: string }> = {
  tokyo: {
    cityKey: "tokyo",
    url: "https://www.tokyo-23city.or.jp",
  },
  osaka: {
    cityKey: "osaka",
    url: "https://www.city.osaka.lg.jp",
  },
  nagoya: {
    cityKey: "nagoya",
    url: "https://www.city.nagoya.jp",
  },
  yokohama: {
    cityKey: "yokohama",
    url: "https://www.city.yokohama.lg.jp",
  },
  kawasaki: {
    cityKey: "kawasaki",
    url: "https://www.city.kawasaki.lg.jp",
  },
  saitama: {
    cityKey: "saitama",
    url: "https://www.city.saitama.lg.jp",
  },
  chiba: {
    cityKey: "chiba",
    url: "https://www.city.chiba.lg.jp",
  },
  fukuoka: {
    cityKey: "fukuoka",
    url: "https://www.city.fukuoka.lg.jp",
  },
  kobe: {
    cityKey: "kobe",
    url: "https://www.city.kobe.lg.jp",
  },
  kyoto: {
    cityKey: "kyoto",
    url: "https://www.city.kyoto.lg.jp",
  },
};

export default function CityOfficialLink() {
  const cityT = useTranslations("cities");
  const officialT = useTranslations("city_official");
  const cityKey = useLocalStorage(CITY_STORAGE_KEY);

  const city = cityKey ? cityHallMap[cityKey] : null;

  if (!city) {
    return <p className="text-xs text-gray-400">{officialT("not_selected")}</p>;
  }

  return (
    <a
      href={city.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-3 text-blue-700 font-medium text-sm transition-colors"
    >
      🏛️ {cityT(city.cityKey)} — {officialT("link_label")}
      <span className="ml-auto text-blue-400">↗</span>
    </a>
  );
}
