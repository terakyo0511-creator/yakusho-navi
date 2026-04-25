import { beforeEach, describe, expect, it } from "vitest";
import { addRecentProcedure } from "@/hooks/useRecentProcedures";

describe("recent procedures", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a procedure to the front", () => {
    addRecentProcedure("moving_in");
    addRecentProcedure("health_insurance");

    expect(JSON.parse(localStorage.getItem("recent_procedures") ?? "[]")).toEqual([
      "health_insurance",
      "moving_in",
    ]);
  });

  it("moves duplicates to the front", () => {
    addRecentProcedure("moving_in");
    addRecentProcedure("health_insurance");
    addRecentProcedure("moving_in");

    expect(JSON.parse(localStorage.getItem("recent_procedures") ?? "[]")).toEqual([
      "moving_in",
      "health_insurance",
    ]);
  });

  it("keeps at most five procedures", () => {
    ["one", "two", "three", "four", "five", "six"].forEach(addRecentProcedure);

    expect(JSON.parse(localStorage.getItem("recent_procedures") ?? "[]")).toEqual([
      "six",
      "five",
      "four",
      "three",
      "two",
    ]);
  });
});
