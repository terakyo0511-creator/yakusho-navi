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
  }

  return entries;
}
