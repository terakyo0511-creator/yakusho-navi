import type { Locale } from "@/types/procedure";

export interface SituationTranslation {
  title: string;
  description: string;
  intro: string;
}

export interface Situation {
  id: string;
  icon: string;
  procedure_ids: string[];
  translations: Record<Locale, SituationTranslation>;
}
