"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const flagMap = {
  en: "🇺🇸",
  vi: "🇻🇳",
  zh: "🇨🇳",
  ja: "🇯🇵",
} as const;

export default function LanguageSwitcher() {
  const t = useTranslations("lang");
  const a11y = useTranslations("a11y");
  const fallbackLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const seg = pathname.split("/")[1];
  const locale = routing.locales.includes(seg as (typeof routing.locales)[number]) ? seg : fallbackLocale;

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <select
      aria-label={a11y("aria_language_selector")}
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      className="px-3 py-1.5 rounded-lg border border-[#1a2744] text-sm font-medium text-[#1a2744] bg-white"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {flagMap[l]} {t(l)}
        </option>
      ))}
    </select>
  );
}
