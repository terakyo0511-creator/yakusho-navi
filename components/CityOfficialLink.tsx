"use client";

import { useState, useEffect } from "react";
import { CITY_STORAGE_KEY } from "./CitySelector";

const cityHallMap: Record<string, { name: Record<string, string>; url: string }> = {
  tokyo: {
    name: { en: "Tokyo (23 Wards)", ja: "東京23区", zh: "东京（23区）", vi: "Tokyo (23 quận)" },
    url: "https://www.tokyo-23city.or.jp",
  },
  osaka: {
    name: { en: "Osaka City", ja: "大阪市", zh: "大阪市", vi: "Thành phố Osaka" },
    url: "https://www.city.osaka.lg.jp",
  },
  nagoya: {
    name: { en: "Nagoya City", ja: "名古屋市", zh: "名古屋市", vi: "Thành phố Nagoya" },
    url: "https://www.city.nagoya.jp",
  },
  yokohama: {
    name: { en: "Yokohama City", ja: "横浜市", zh: "横滨市", vi: "Thành phố Yokohama" },
    url: "https://www.city.yokohama.lg.jp",
  },
  kawasaki: {
    name: { en: "Kawasaki City", ja: "川崎市", zh: "川崎市", vi: "Thành phố Kawasaki" },
    url: "https://www.city.kawasaki.lg.jp",
  },
  saitama: {
    name: { en: "Saitama City", ja: "さいたま市", zh: "埼玉市", vi: "Thành phố Saitama" },
    url: "https://www.city.saitama.lg.jp",
  },
  chiba: {
    name: { en: "Chiba City", ja: "千葉市", zh: "千叶市", vi: "Thành phố Chiba" },
    url: "https://www.city.chiba.lg.jp",
  },
  fukuoka: {
    name: { en: "Fukuoka City", ja: "福岡市", zh: "福冈市", vi: "Thành phố Fukuoka" },
    url: "https://www.city.fukuoka.lg.jp",
  },
  kobe: {
    name: { en: "Kobe City", ja: "神戸市", zh: "神户市", vi: "Thành phố Kobe" },
    url: "https://www.city.kobe.lg.jp",
  },
  kyoto: {
    name: { en: "Kyoto City", ja: "京都市", zh: "京都市", vi: "Thành phố Kyoto" },
    url: "https://www.city.kyoto.lg.jp",
  },
};

const labelMap: Record<string, { link: string; notSelected: string }> = {
  en: {
    link: "Official city hall website",
    notSelected: "Select your city on the top page to see your city hall's official website.",
  },
  ja: {
    link: "公式サイトを見る",
    notSelected: "トップページで市区町村を選ぶと公式サイトへのリンクが表示されます。",
  },
  zh: {
    link: "查看官方网站",
    notSelected: "请在首页选择城市以查看官方网站链接。",
  },
  vi: {
    link: "Xem trang web chính thức",
    notSelected: "Chọn thành phố ở trang chủ để xem liên kết trang web chính thức.",
  },
};

export default function CityOfficialLink({ locale }: { locale: string }) {
  const [cityKey, setCityKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CITY_STORAGE_KEY);
    if (saved) setCityKey(saved);
  }, []);

  if (!mounted) return null;

  const labels = labelMap[locale] ?? labelMap.en;
  const city = cityKey ? cityHallMap[cityKey] : null;

  if (!city) {
    return <p className="text-xs text-gray-400">{labels.notSelected}</p>;
  }

  const cityName = city.name[locale] ?? city.name.en;

  return (
    <a
      href={city.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-3 text-blue-700 font-medium text-sm transition-colors"
    >
      🏛️ {cityName} — {labels.link}
      <span className="ml-auto text-blue-400">↗</span>
    </a>
  );
}
