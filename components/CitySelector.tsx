"use client";

import { useState, useEffect } from "react";

const cities: Record<string, string[]> = {
  en: ["(Select your city)", "Tokyo (23 Wards)", "Osaka", "Nagoya", "Yokohama", "Kawasaki", "Saitama", "Chiba", "Fukuoka", "Kobe", "Kyoto", "Other"],
  vi: ["(Chọn thành phố)", "Tokyo (23 quận)", "Osaka", "Nagoya", "Yokohama", "Kawasaki", "Saitama", "Chiba", "Fukuoka", "Kobe", "Kyoto", "Khác"],
  zh: ["（选择城市）", "东京（23区）", "大阪", "名古屋", "横滨", "川崎", "埼玉", "千叶", "福冈", "神户", "京都", "其他"],
  ja: ["（市区町村を選ぶ）", "東京23区", "大阪市", "名古屋市", "横浜市", "川崎市", "さいたま市", "千葉市", "福岡市", "神戸市", "京都市", "その他"],
};

const noteMap: Record<string, string> = {
  en: "Procedures shown are general guidelines. Details may vary by city.",
  vi: "Các thủ tục hiển thị là hướng dẫn chung. Chi tiết có thể khác nhau tùy thành phố.",
  zh: "所示手续为一般指南，具体细节可能因城市而异。",
  ja: "表示されている手続きは一般的なガイドです。詳細は市区町村によって異なる場合があります。",
};

const STORAGE_KEY = "yakusho_navi_city";

export default function CitySelector({ locale }: { locale: string }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCity(saved);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setCity(val);
    if (val) localStorage.setItem(STORAGE_KEY, val);
    else localStorage.removeItem(STORAGE_KEY);
  }

  const options = cities[locale] ?? cities.en;
  const note = noteMap[locale] ?? noteMap.en;

  return (
    <div className="mt-2">
      <select
        value={city}
        onChange={handleChange}
        className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white w-full sm:w-auto"
      >
        {options.map((c, i) => (
          <option key={i} value={i === 0 ? "" : c}>{c}</option>
        ))}
      </select>
      {city && (
        <p className="text-xs text-gray-400 mt-1">{note}</p>
      )}
    </div>
  );
}
