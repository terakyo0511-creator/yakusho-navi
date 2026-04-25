import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const procedureT = await getTranslations("procedure");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Link href={`/${locale}`} className="text-[#1a2744] hover:underline text-sm font-medium">
        {procedureT("back")}
      </Link>
      <h1 className="text-2xl font-bold text-[#1a2744] mt-4 mb-2">{t("title")}</h1>
      <p className="text-gray-600 text-sm mb-6">{t("body")}</p>
      <ContactForm />
    </div>
  );
}
