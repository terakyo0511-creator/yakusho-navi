import marriage from "@/content/situations/marriage.json";
import childbirth from "@/content/situations/childbirth.json";
import moving from "@/content/situations/moving.json";
import leavingJapan from "@/content/situations/leaving_japan.json";
import { procedureMap } from "@/lib/procedures";
import type { Locale } from "@/types/procedure";
import { locales } from "@/types/procedure";
import type { Situation } from "@/types/situation";

export const situationMap: Record<string, Situation> = {
  marriage: defineSituation(marriage),
  childbirth: defineSituation(childbirth),
  moving: defineSituation(moving),
  leaving_japan: defineSituation(leavingJapan),
};

export const situations = Object.values(situationMap);

function defineSituation(value: unknown): Situation {
  assertSituation(value);
  return value;
}

function assertSituation(value: unknown): asserts value is Situation {
  if (!isRecord(value)) {
    throw new Error("Situation data must be an object.");
  }

  if (typeof value.id !== "string" || typeof value.icon !== "string") {
    throw new Error("Situation data is missing id or icon.");
  }

  if (!Array.isArray(value.procedure_ids) || value.procedure_ids.length === 0) {
    throw new Error(`Situation ${value.id} must include procedure_ids.`);
  }

  for (const procedureId of value.procedure_ids) {
    if (typeof procedureId !== "string" || !procedureMap[procedureId]) {
      throw new Error(`Situation ${value.id} references unknown procedure ${String(procedureId)}.`);
    }
  }

  if (!isRecord(value.translations)) {
    throw new Error(`Situation ${value.id} has invalid translations.`);
  }

  for (const locale of locales) {
    assertTranslation(value.id, locale, value.translations[locale]);
  }
}

function assertTranslation(id: unknown, locale: Locale, translation: unknown): void {
  if (!isRecord(translation)) {
    throw new Error(`Situation ${String(id)} is missing ${locale} translation.`);
  }

  if (
    typeof translation.title !== "string" ||
    typeof translation.description !== "string" ||
    typeof translation.intro !== "string" ||
    translation.title.length === 0 ||
    translation.description.length === 0 ||
    translation.intro.length === 0
  ) {
    throw new Error(`Situation ${String(id)} has invalid ${locale} translation.`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
