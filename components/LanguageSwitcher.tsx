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
    <div className="flex gap-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            l === locale
              ? "bg-navy-700 text-white bg-[#1a2744]"
              : "bg-white text-[#1a2744] border border-[#1a2744] hover:bg-gray-100"
          }`}
        >
          {flagMap[l]} {labelMap[l]}
        </button>
      ))}
    </div>
  );
}
