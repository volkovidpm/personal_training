import { describe, it, expect } from "vitest";
import type { Exercise, WeekPlan } from "../types";
import { emptyWeek } from "../types";
import { buildBackup, serialize, parseBackup } from "./exportImport";

const ex: Exercise = {
  id: "ex-1",
  name: "Своё упражнение",
  type: "strength",
  description: "Описание",
  equipment: ["Гантели"],
  muscles: { primary: ["biceps"], secondary: [] },
  custom: true,
};

const week: WeekPlan = (() => {
  const w = emptyWeek("2026-W25");
  w.days.mon = [{ entryId: "e1", exerciseId: "ex-1", sets: 3, reps: 10 }];
  return w;
})();

describe("exportImport", () => {
  it("round-trip: build → serialize → parse сохраняет данные", () => {
    const data = buildBackup([ex], { "2026-W25": week });
    const restored = parseBackup(serialize(data));
    expect(restored.exercises).toHaveLength(1);
    expect(restored.exercises[0].name).toBe("Своё упражнение");
    expect(restored.weeks["2026-W25"].days.mon[0].exerciseId).toBe("ex-1");
  });

  it("бросает ошибку на неверном формате", () => {
    expect(() => parseBackup("{}")).toThrow();
    expect(() => parseBackup('{"exercises":[],"weeks":42}')).toThrow();
  });

  it("валидный минимум не падает", () => {
    expect(() => parseBackup('{"exercises":[],"weeks":{}}')).not.toThrow();
  });
});
