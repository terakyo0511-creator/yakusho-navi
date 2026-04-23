"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";

const flagMap: Record<string, string> = {
  en: "🇺🇸",
  vi: "🇻🇳",
  zh: "🇨🇳",
  ja: "🇯🇵",
};

const labelMap: Record<string, string> = {
  en: "EN",
  vi: "VI",
  zh: "中文",
  ja: "日本語",
};

export default function LanguageSwitcher() {
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
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      className="px-3 py-1.5 rounded-lg border border-[#1a2744] text-sm font-medium text-[#1a2744] bg-white"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {flagMap[l]} {labelMap[l]}
        </option>
      ))}
    </select>
  );
}
