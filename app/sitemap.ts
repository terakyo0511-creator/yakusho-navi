import { MetadataRoute } from "next";
import { procedureMap } from "@/lib/procedures";
import { situationMap } from "@/lib/situations";
import { locales } from "@/types/procedure";

const SITE_URL = "https://cityhall-guide.vercel.app";

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
    for (const id of Object.keys(procedureMap)) {
      entries.push({
        url: `${SITE_URL}/${locale}/procedure/${id}`,
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
    for (const id of Object.keys(situationMap)) {
      entries.push({
        url: `${SITE_URL}/${locale}/situations/${id}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    entries.push({ url: `${SITE_URL}/${locale}/about`, changeFrequency: "yearly", priority: 0.3 });
    entries.push({ url: `${SITE_URL}/${locale}/privacy`, changeFrequency: "yearly", priority: 0.3 });
    entries.push({ url: `${SITE_URL}/${locale}/contact`, changeFrequency: "yearly", priority: 0.3 });
  }

  return entries;
}
