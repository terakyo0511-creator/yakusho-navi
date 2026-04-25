import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/types/procedure";
import { procedureMap } from "@/lib/procedures";

const proceduresDir = path.join(process.cwd(), "content", "procedures");
const files = fs.readdirSync(proceduresDir).filter((file) => file.endsWith(".json"));

describe("procedure data", () => {
  it("procedureMap covers all JSON files", () => {
    expect(Object.keys(procedureMap).sort()).toEqual(
      files.map((file) => file.replace(".json", "")).sort(),
    );
  });

  for (const file of files) {
    it(`${file} has required localized data`, () => {
      const procedure = JSON.parse(fs.readFileSync(path.join(proceduresDir, file), "utf8"));

      expect(procedure.updated_at, `${file} updated_at`).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      for (const locale of locales) {
        const translation = procedure.translations?.[locale];

        expect(translation, `${file} ${locale} translation`).toBeTruthy();
        expect(JSON.stringify(translation), `${file} ${locale} placeholders`).not.toMatch(/\?{2,}|TODO/);
        expect(translation.steps, `${file} ${locale} steps`).toBeInstanceOf(Array);
        expect(translation.steps.length, `${file} ${locale} steps`).toBeGreaterThan(0);
        expect(translation.required_documents, `${file} ${locale} required_documents`).toBeInstanceOf(Array);
        expect(translation.required_documents.length, `${file} ${locale} required_documents`).toBeGreaterThan(0);
      }

      expect(procedure.official_links, `${file} official_links`).toBeInstanceOf(Array);
    });
  }
});
