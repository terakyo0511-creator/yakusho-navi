import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { procedureMap } from "@/lib/procedures";
import { situationMap } from "@/lib/situations";
import { locales } from "@/types/procedure";

const situationsDir = path.join(process.cwd(), "content", "situations");
const files = fs.readdirSync(situationsDir).filter((file) => file.endsWith(".json"));

describe("situation data", () => {
  it("situationMap covers all JSON files", () => {
    expect(Object.keys(situationMap).sort()).toEqual(
      files.map((file) => file.replace(".json", "")).sort(),
    );
  });

  for (const file of files) {
    it(`${file} has valid procedure references and translations`, () => {
      const situation = JSON.parse(fs.readFileSync(path.join(situationsDir, file), "utf8"));

      expect(situation.procedure_ids.length, `${file} procedure_ids`).toBeGreaterThanOrEqual(3);
      for (const procedureId of situation.procedure_ids) {
        expect(procedureMap[procedureId], `${file} ${procedureId}`).toBeTruthy();
      }

      for (const locale of locales) {
        const translation = situation.translations?.[locale];
        expect(translation?.title, `${file} ${locale} title`).toBeTruthy();
        expect(translation?.description, `${file} ${locale} description`).toBeTruthy();
        expect(translation?.intro, `${file} ${locale} intro`).toBeTruthy();
        expect(JSON.stringify(translation), `${file} ${locale} placeholders`).not.toMatch(/\?{2,}|TODO/);
      }
    });
  }

  it("childbirth guide includes childbirth procedures", () => {
    expect(situationMap.childbirth.procedure_ids).toEqual(
      expect.arrayContaining(["birth_registration", "child_allowance"]),
    );
  });

  it("marriage guide includes marriage registration", () => {
    expect(situationMap.marriage.procedure_ids).toContain("marriage_registration");
  });
});
