import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ChecklistItem from "@/components/ChecklistItem";
import ChecklistProgress from "@/components/ChecklistProgress";
import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";
import bankAccount from "@/content/procedures/bank_account.json";
import mobilePhone from "@/content/procedures/mobile_phone.json";
import { isLocale } from "@/types/procedure";

const SITE_URL = "https://cityhall-guide.vercel.app";

const checklistProcedures = [movingIn, residenceCard, healthInsurance, myNumber, pension, bankAccount, mobilePhone];

function getLanguageAlternates(path: string) {
  return {
    en: `${SITE_URL}/en${path}`,
    ja: `${SITE_URL}/ja${path}`,
    zh: `${SITE_URL}/zh${path}`,
    vi: `${SITE_URL}/vi${path}`,
    "x-default": `${SITE_URL}/en${path}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const checklistT = await getTranslations("checklist");
  const url = `${SITE_URL}/${locale}/checklist`;

  return {
    title: checklistT("title"),
    description: checklistT("subtitle"),
    alternates: {
      canonical: url,
      languages: getLanguageAlternates("/checklist"),
    },
    openGraph: {
      title: checklistT("title"),
      description: checklistT("subtitle"),
      url,
      type: "website",
      images: [`${SITE_URL}/og/${locale}/index`],
    },
    twitter: {
      card: "summary_large_image",
      title: checklistT("title"),
      description: checklistT("subtitle"),
      images: [`${SITE_URL}/og/${locale}/index`],
    },
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("procedure");
  const checklistT = await getTranslations("checklist");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        {t("back")}
      </Link>
      <h1 className="text-xl font-bold text-[#1a2744] mt-4 mb-1">☑️ {checklistT("title")}</h1>
      <p className="text-sm text-gray-500 mb-6">{checklistT("subtitle")}</p>

      <ChecklistProgress
        procedureIds={checklistProcedures.map((procedure) => procedure.id)}
        labels={{
          progressLabel: checklistT("progress"),
          allDoneLabel: checklistT("all_done"),
        }}
      />

      <ol className="space-y-3">
        {checklistProcedures.map((proc) => {
          const tr = proc.translations[locale as keyof typeof proc.translations] ?? proc.translations.en;
          return (
            <ChecklistItem
              key={proc.id}
              id={proc.id}
              icon={proc.icon}
              title={tr.title}
              subtitle={tr.subtitle}
              href={`/${locale}/procedure/${proc.id}`}
            />
          );
        })}
      </ol>
    </div>
  );
}
