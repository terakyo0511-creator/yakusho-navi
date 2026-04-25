import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProcedureCard from "@/components/ProcedureCard";
import { procedureMap } from "@/lib/procedures";
import { situationMap } from "@/lib/situations";
import { isLocale } from "@/types/procedure";

const SITE_URL = "https://cityhall-guide.vercel.app";

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
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, id } = await params;
  const situation = situationMap[id];

  if (!situation) {
    return {};
  }

  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const tr = situation.translations[locale] ?? situation.translations.en;
  const url = `${SITE_URL}/${locale}/situations/${id}`;
  const imageUrl = `${SITE_URL}/og/${locale}/index`;

  return {
    title: tr.title,
    description: tr.description,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(`/situations/${id}`),
    },
    openGraph: {
      title: tr.title,
      description: tr.description,
      url,
      type: "article",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: tr.title,
      description: tr.description,
      images: [imageUrl],
    },
  };
}

export default async function SituationPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const activeLocale = isLocale(locale) ? locale : "en";
  const situation = situationMap[id];

  if (!situation) {
    notFound();
  }

  const homeT = await getTranslations("home");
  const procedureT = await getTranslations("procedure");
  const tr = situation.translations[activeLocale];
  const procedures = situation.procedure_ids.map((procedureId) => procedureMap[procedureId]);
  const lastUpdated = procedures
    .map((procedure) => procedure.updated_at)
    .sort()
    .at(-1);
  const locationLabels = {
    city_hall: homeT("at_city_hall"),
    immigration_office: homeT("at_immigration"),
    license_center: homeT("at_license_center"),
    bank: homeT("at_bank"),
    phone_shop: homeT("at_phone_shop"),
    tax_office: homeT("at_tax_office"),
    hello_work: homeT("at_hello_work"),
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
          {procedureT("back")}
        </Link>
      </div>

      <header className="mb-6">
        <div className="flex items-start gap-3">
          <span className="text-5xl" aria-hidden="true">{situation.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-[#1a2744]">{tr.title}</h1>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{tr.intro}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {procedures.map((proc) => {
          const procTr = proc.translations[activeLocale];
          const deadlineDays = proc.deadline.type === "within_days" ? proc.deadline.days : null;

          return (
            <ProcedureCard
              key={proc.id}
              id={proc.id}
              icon={proc.icon}
              title={procTr.title}
              subtitle={procTr.subtitle}
              costYen={proc.cost_yen}
              durationMin={proc.duration_minutes.min}
              durationMax={proc.duration_minutes.max}
              deadlineDays={deadlineDays}
              locationType={proc.location_type}
              locationLabels={locationLabels}
              locale={locale}
              minutesLabel={homeT("minutes")}
              daysLabel={homeT("days")}
            />
          );
        })}
      </div>

      <section className="border-t border-gray-100 mt-6 pt-4 text-xs text-gray-500">
        <p>{procedureT("last_updated")}: {lastUpdated}</p>
        <p className="mt-1 leading-relaxed">{procedureT("disclaimer")}</p>
      </section>
    </div>
  );
}
