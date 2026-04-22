import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi", "zh", "ja"],
  defaultLocale: "en",
});
