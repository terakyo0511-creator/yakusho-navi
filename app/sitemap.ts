import { MetadataRoute } from "next";

const SITE_URL = "https://cityhall-guide.vercel.app";
const locales = ["en", "vi", "zh", "ja"];
const procedureIds = [
  "moving_in",
  "residence_card",
  "health_insurance",
  "health_insurance_leave",
  "address_change",
  "hanko_registration",
  "my_number",
  "pension",
  "drivers_license",
  "pension_withdrawal",
  "bank_account",
  "mobile_phone",
  "health_insurance_withdrawal",
  "residence_extension",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      changeFrequency: "weekly",
      priority: 1.0,
    });
    entries.push({
      url: `${SITE_URL}/${locale}/checklist`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const id of procedureIds) {
      entries.push({
        url: `${SITE_URL}/${locale}/procedure/${id}`,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
    entries.push({ url: `${SITE_URL}/${locale}/about`, changeFrequency: "yearly", priority: 0.3 });
    entries.push({ url: `${SITE_URL}/${locale}/privacy`, changeFrequency: "yearly", priority: 0.3 });
    entries.push({ url: `${SITE_URL}/${locale}/contact`, changeFrequency: "yearly", priority: 0.3 });
  }

  return entries;
}
