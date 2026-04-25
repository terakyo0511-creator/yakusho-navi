import movingIn from "@/content/procedures/moving_in.json";
import residenceCard from "@/content/procedures/residence_card.json";
import healthInsurance from "@/content/procedures/health_insurance.json";
import healthInsuranceLeave from "@/content/procedures/health_insurance_leave.json";
import addressChange from "@/content/procedures/address_change.json";
import hankoRegistration from "@/content/procedures/hanko_registration.json";
import myNumber from "@/content/procedures/my_number.json";
import pension from "@/content/procedures/pension.json";
import driversLicense from "@/content/procedures/drivers_license.json";
import pensionWithdrawal from "@/content/procedures/pension_withdrawal.json";
import bankAccount from "@/content/procedures/bank_account.json";
import mobilePhone from "@/content/procedures/mobile_phone.json";
import healthInsuranceWithdrawal from "@/content/procedures/health_insurance_withdrawal.json";
import residenceExtension from "@/content/procedures/residence_extension.json";
import taxReturn from "@/content/procedures/tax_return.json";
import myNumberCard from "@/content/procedures/my_number_card.json";
import unemployment from "@/content/procedures/unemployment.json";
import birthRegistration from "@/content/procedures/birth_registration.json";
import marriageRegistration from "@/content/procedures/marriage_registration.json";
import childAllowance from "@/content/procedures/child_allowance.json";
import deathRegistration from "@/content/procedures/death_registration.json";
import type { Locale, Procedure, ProcedureLocationType } from "@/types/procedure";
import { locales } from "@/types/procedure";

const locationTypes = new Set<ProcedureLocationType>([
  "city_hall",
  "immigration_office",
  "license_center",
  "bank",
  "phone_shop",
  "tax_office",
  "hello_work",
]);

export const procedureMap: Record<string, Procedure> = {
  moving_in: defineProcedure(movingIn),
  residence_card: defineProcedure(residenceCard),
  health_insurance: defineProcedure(healthInsurance),
  health_insurance_leave: defineProcedure(healthInsuranceLeave),
  address_change: defineProcedure(addressChange),
  hanko_registration: defineProcedure(hankoRegistration),
  my_number: defineProcedure(myNumber),
  pension: defineProcedure(pension),
  drivers_license: defineProcedure(driversLicense),
  pension_withdrawal: defineProcedure(pensionWithdrawal),
  bank_account: defineProcedure(bankAccount),
  mobile_phone: defineProcedure(mobilePhone),
  health_insurance_withdrawal: defineProcedure(healthInsuranceWithdrawal),
  residence_extension: defineProcedure(residenceExtension),
  tax_return: defineProcedure(taxReturn),
  my_number_card: defineProcedure(myNumberCard),
  unemployment: defineProcedure(unemployment),
  birth_registration: defineProcedure(birthRegistration),
  marriage_registration: defineProcedure(marriageRegistration),
  child_allowance: defineProcedure(childAllowance),
  death_registration: defineProcedure(deathRegistration),
};

function defineProcedure(value: unknown): Procedure {
  assertProcedure(value);
  return value;
}

function assertProcedure(value: unknown): asserts value is Procedure {
  if (!isRecord(value)) {
    throw new Error("Procedure data must be an object.");
  }

  if (typeof value.id !== "string" || typeof value.icon !== "string") {
    throw new Error("Procedure data is missing id or icon.");
  }

  if (typeof value.updated_at !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value.updated_at)) {
    throw new Error(`Procedure ${value.id} has an invalid updated_at.`);
  }

  if (!locationTypes.has(value.location_type as ProcedureLocationType)) {
    throw new Error(`Procedure ${value.id} has an invalid location_type.`);
  }

  if (!isRecord(value.deadline) || typeof value.deadline.type !== "string") {
    throw new Error(`Procedure ${value.id} has an invalid deadline.`);
  }

  if (!isRecord(value.duration_minutes)) {
    throw new Error(`Procedure ${value.id} has invalid duration_minutes.`);
  }

  if (typeof value.cost_yen !== "number") {
    throw new Error(`Procedure ${value.id} has an invalid cost_yen.`);
  }

  if (
    typeof value.duration_minutes.min !== "number" ||
    typeof value.duration_minutes.max !== "number"
  ) {
    throw new Error(`Procedure ${value.id} has invalid duration_minutes values.`);
  }

  if (!isRecord(value.translations)) {
    throw new Error(`Procedure ${value.id} has invalid translations.`);
  }

  for (const locale of locales) {
    assertTranslation(value.id, locale, value.translations[locale]);
  }

  if (!Array.isArray(value.official_links)) {
    throw new Error(`Procedure ${value.id} official_links must be an array.`);
  }
}

function assertTranslation(id: unknown, locale: Locale, translation: unknown): void {
  if (!isRecord(translation)) {
    throw new Error(`Procedure ${String(id)} is missing ${locale} translation.`);
  }

  if (
    typeof translation.title !== "string" ||
    typeof translation.subtitle !== "string" ||
    !Array.isArray(translation.required_documents) ||
    !Array.isArray(translation.steps) ||
    !Array.isArray(translation.warnings)
  ) {
    throw new Error(`Procedure ${String(id)} has invalid ${locale} translation.`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
