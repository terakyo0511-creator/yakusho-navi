import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "../globals.css";

const SITE_URL = "https://cityhall-guide.vercel.app";

const titleMap = {
  en: "Japan City Hall Guide",
  ja: "役所手続きナビ",
  zh: "日本市政厅手续指南",
  vi: "Hướng dẫn thủ tục ủy ban nhân dân Nhật Bản",
} as const;

const descriptionMap = {
  en: "Step-by-step guides for foreign residents in Japan. Residence card, health insurance, moving-in registration and more — in English, Japanese, Vietnamese, and Chinese.",
  ja: "在日外国人向けの役所手続きガイド。在留カード・国民健康保険・転入届など14手続きを日本語・英語・ベトナム語・中国語で解説。",
  zh: "外国居民在日本的手续指南。在留卡、国民健康保险、转入手续等14项手续，提供日语、英语、越南语、中文版本。",
  vi: "Hướng dẫn thủ tục cho người nước ngoài tại Nhật Bản. Thẻ cư trú, bảo hiểm y tế, đăng ký chuyển đến — bằng tiếng Nhật, tiếng Anh, tiếng Việt và tiếng Trung.",
} as const;

const ogLocaleMap = {
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
  vi: "vi_VN",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = routing.locales.includes(locale as (typeof routing.locales)[number])
    ? (locale as keyof typeof titleMap)
    : "en";
  const title = titleMap[localeKey];
  const description = descriptionMap[localeKey];
  const ogLocale = ogLocaleMap[localeKey];

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
      images: [`${SITE_URL}/og/${locale}/index`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/${locale}/index`],
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

  setRequestLocale(locale);

  const messages = await getMessages();
  const footerT = await getTranslations("footer");

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a2744" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="役所ナビ" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7995912357051752" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen bg-white flex flex-col">
        <GoogleAnalytics />
        <ServiceWorkerRegistrar />
        <NextIntlClientProvider messages={messages}>
          <div className="flex-1">{children}</div>
          <footer className="border-t border-gray-100 mt-8 py-4 print:hidden">
            <div className="max-w-2xl mx-auto px-4 flex flex-wrap gap-4 text-xs text-gray-400">
              <a href={`/${locale}/about`} className="hover:text-gray-600">{footerT("about")}</a>
              <a href={`/${locale}/privacy`} className="hover:text-gray-600">{footerT("privacy")}</a>
              <a href={`/${locale}/contact`} className="hover:text-gray-600">{footerT("contact")}</a>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
