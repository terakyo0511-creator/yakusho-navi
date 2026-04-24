import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import "../globals.css";

const geist = Geist({ subsets: ["latin"] });

const SITE_URL = "https://cityhall-guide.vercel.app";

const titleMap: Record<string, string> = {
  en: "Japan City Hall Guide",
  ja: "役所手続きナビ",
  zh: "日本市政厅手续指南",
  vi: "Hướng dẫn thủ tục ủy ban nhân dân Nhật Bản",
};

const descriptionMap: Record<string, string> = {
  en: "Step-by-step guides for foreign residents in Japan. Residence card, health insurance, moving-in registration and more — in English, Vietnamese, and Chinese.",
  ja: "在日外国人向けの役所手続きガイド。在留カード・国民健康保険・転入届などを英語・ベトナム語・中国語で分かりやすく解説。",
  zh: "外国居民在日本的手续指南。在留卡、国民健康保险、转入手续等逐步指引，提供英语、越南语、中文版本。",
  vi: "Hướng dẫn thủ tục cho người nước ngoài tại Nhật Bản. Thẻ cư trú, bảo hiểm y tế, đăng ký chuyển đến — bằng tiếng Anh, tiếng Việt và tiếng Trung.",
};

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
  vi: "vi_VN",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = titleMap[locale] ?? titleMap.en;
  const description = descriptionMap[locale] ?? descriptionMap.en;
  const ogLocale = ogLocaleMap[locale] ?? "en_US";

  return {
    title,
    description,
    keywords: [
      "japan city hall",
      "residence card",
      "在留カード",
      "foreign residents japan",
      "city hall procedures english",
      "役所 英語",
      "国民健康保険 外国人",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ja: `${SITE_URL}/ja`,
        zh: `${SITE_URL}/zh`,
        vi: `${SITE_URL}/vi`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Japan City Hall Guide | 役所手続きナビ",
      locale: ogLocale,
      type: "website",
    },
    verification: {
      google: "X8DfpdGmgVP3EeJSnYkFW0GNVxsFnpY7DnsN4Bn1tdQ",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a2744" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="役所ナビ" />
      </head>
      <body className={`${geist.className} min-h-screen bg-white`}>
        <ServiceWorkerRegistrar />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
