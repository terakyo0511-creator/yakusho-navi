import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japan City Hall Guide | 役所手続きナビ",
  description: "Step-by-step guides for foreign residents in Japan. Residence card, health insurance, moving-in registration and more — in English, Vietnamese, and Chinese.",
  keywords: ["japan city hall", "residence card", "在留カード", "foreign residents japan", "city hall procedures english", "役所 英語", "国民健康保険 外国人"],
  openGraph: {
    title: "Japan City Hall Guide | 役所手続きナビ",
    description: "Step-by-step guides for foreign residents in Japan. In English, Vietnamese, and Chinese.",
    url: "https://cityhall-guide.vercel.app",
    siteName: "Japan City Hall Guide",
    locale: "en_US",
    type: "website",
  },
};

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
    <div lang={locale} className={`${geist.className} min-h-screen bg-white`}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
