export const locales = ["ja", "en", "zh", "vi"] as const;

export type Locale = (typeof locales)[number];

export type ProcedureLocationType =
  | "city_hall"
  | "immigration_office"
  | "license_center"
  | "bank"
  | "phone_shop"
  | "tax_office"
  | "hello_work";

export type ProcedureDeadline =
  | {
      type: "within_days";
      days: number;
      from: "after_moving" | "after_birth" | "after_event" | "before_expiry" | "expiry";
    }
  | {
      type: "none";
    };

export interface ProcedureDocument {
  icon: string;
  name: string;
  note: string | null;
}

export interface ProcedureTranslation {
  title: string;
  subtitle: string;
  required_documents: ProcedureDocument[];
  steps: string[];
  warnings: string[];
}

export interface ProcedureOfficialLink {
  label_ja: string;
  label_en: string;
  url: string;
}

export interface Procedure {
  id: string;
  icon: string;
  updated_at: string;
  deadline: ProcedureDeadline;
  location_type: ProcedureLocationType;
  cost_yen: number;
  duration_minutes: {
    min: number;
    max: number;
  };
  translations: Record<Locale, ProcedureTranslation>;
  official_links: ProcedureOfficialLink[];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
