import { describe, it, expect } from "vitest";
import type { Exercise, WeekPlan } from "../types";
import { emptyWeek } from "../types";
import {
  entryVolume,
  weeklyMuscleLoad,
  weeklyCardioMinutes,
  intensityLevel,
  summarizeWeek,
  DEFAULT_THRESHOLDS,
} from "./load";

const bench: Exercise = {
  id: "bench",
  name: "Жим лёжа",
  type: "strength",
  description: "",
  equipment: [],
  muscles: { primary: ["chest"], secondary: ["triceps"] },
  custom: false,
};

const run: Exercise = {
  id: "run",
  name: "Бег",
  type: "cardio",
  description: "",
  equipment: [],
  muscles: { primary: [], secondary: [] },
  custom: false,
};

const byId = new Map<string, Exercise>([
  [bench.id, bench],
  [run.id, run],
]);

function weekWith(...entries: WeekPlan["days"]["mon"]): WeekPlan {
  const w = emptyWeek("2026-W25");
  w.days.mon = entries;
  return w;
}

describe("entryVolume", () => {
  it("умножает подходы на повторы для силовых", () => {
    expect(entryVolume({ entryId: "1", exerciseId: "bench", sets: 3, reps: 10 })).toBe(30);
  });
  it("возвращает 0 без подходов/повторов (кардио)", () => {
    expect(entryVolume({ entryId: "1", exerciseId: "run", minutes: 30 })).toBe(0);
  });
});

describe("weeklyMuscleLoad", () => {
  it("primary даёт вес 2, secondary вес 1", () => {
    const week = weekWith({ entryId: "1", exerciseId: "bench", sets: 3, reps: 10 });
    const load = weeklyMuscleLoad(week, byId);
    expect(load.chest).toBe(60); // 30 * 2
    expect(load.triceps).toBe(30); // 30 * 1
    expect(load.back).toBe(0);
  });

  it("суммирует нагрузку по всем записям недели", () => {
    const week = weekWith(
      { entryId: "1", exerciseId: "bench", sets: 3, reps: 10 },
      { entryId: "2", exerciseId: "bench", sets: 4, reps: 10 }
    );
    const load = weeklyMuscleLoad(week, byId);
    expect(load.chest).toBe(60 + 80);
  });

  it("игнорирует кардио при расчёте мышц", () => {
    const week = weekWith({ entryId: "1", exerciseId: "run", minutes: 40 });
    const load = weeklyMuscleLoad(week, byId);
    expect(load.chest).toBe(0);
  });
});

describe("weeklyCardioMinutes", () => {
  it("суммирует минуты кардио и игнорирует силовые", () => {
    const week = weekWith(
      { entryId: "1", exerciseId: "run", minutes: 30 },
      { entryId: "2", exerciseId: "run", minutes: 20 },
      { entryId: "3", exerciseId: "bench", sets: 3, reps: 10 }
    );
    expect(weeklyCardioMinutes(week, byId)).toBe(50);
  });
});

describe("intensityLevel", () => {
  it("0 при отсутствии нагрузки", () => {
    expect(intensityLevel(0)).toBe(0);
  });
  it("1 при нагрузке ниже среднего порога", () => {
    expect(intensityLevel(DEFAULT_THRESHOLDS.medium - 1)).toBe(1);
  });
  it("2 на среднем пороге", () => {
    expect(intensityLevel(DEFAULT_THRESHOLDS.medium)).toBe(2);
  });
  it("3 на высоком пороге", () => {
    expect(intensityLevel(DEFAULT_THRESHOLDS.high)).toBe(3);
  });
});

describe("summarizeWeek", () => {
  it("считает задействованные группы и кардио", () => {
    const week = weekWith(
      { entryId: "1", exerciseId: "bench", sets: 3, reps: 10 },
      { entryId: "2", exerciseId: "run", minutes: 25 }
    );
    const s = summarizeWeek(week, byId);
    expect(s.workedCount).toBe(2); // chest + triceps
    expect(s.cardioMinutes).toBe(25);
    expect(s.levels.chest).toBe(1);
  });
});
