// Расчёт недельной нагрузки по объёму.
//
// Объём силового упражнения = подходы × повторы. Вклад в мышцы:
//   primary  += объём × 2
//   secondary += объём × 1
// Недельная нагрузка группы — сумма вкладов по всем записям недели.
//
// Кардио в нагрузку мышц не входит — это отдельная метрика (сумма минут).
import type { Exercise, MuscleGroup, WeekPlan, WorkoutEntry } from "../types";
import { DAY_KEYS } from "../types";
import { MUSCLE_ORDER, type IntensityLevel } from "./muscles";

export const PRIMARY_WEIGHT = 2;
export const SECONDARY_WEIGHT = 1;

// Пороги перехода между уровнями интенсивности (по сумме баллов нагрузки).
// Ориентир: 3×10 как primary даёт 3*10*2 = 60 баллов за одно упражнение.
export interface IntensityThresholds {
  medium: number; // >= medium → средняя
  high: number; // >= high → высокая
}

export const DEFAULT_THRESHOLDS: IntensityThresholds = {
  medium: 120,
  high: 240,
};

// Объём одной силовой записи. Для кардио (или неполных данных) — 0.
export function entryVolume(entry: WorkoutEntry): number {
  if (entry.sets && entry.reps) return entry.sets * entry.reps;
  return 0;
}

function emptyLoad(): Record<MuscleGroup, number> {
  const out = {} as Record<MuscleGroup, number>;
  for (const m of MUSCLE_ORDER) out[m] = 0;
  return out;
}

// Все записи недели одним списком.
function allEntries(week: WeekPlan): WorkoutEntry[] {
  return DAY_KEYS.flatMap((d) => week.days[d]);
}

// Недельная нагрузка по группам мышц.
export function weeklyMuscleLoad(
  week: WeekPlan,
  byId: Map<string, Exercise>
): Record<MuscleGroup, number> {
  const load = emptyLoad();
  for (const entry of allEntries(week)) {
    const ex = byId.get(entry.exerciseId);
    if (!ex || ex.type !== "strength") continue;
    const volume = entryVolume(entry);
    if (volume === 0) continue;
    for (const m of ex.muscles.primary) load[m] += volume * PRIMARY_WEIGHT;
    for (const m of ex.muscles.secondary) load[m] += volume * SECONDARY_WEIGHT;
  }
  return load;
}

// Суммарные минуты кардио за неделю.
export function weeklyCardioMinutes(
  week: WeekPlan,
  byId: Map<string, Exercise>
): number {
  let total = 0;
  for (const entry of allEntries(week)) {
    const ex = byId.get(entry.exerciseId);
    if (!ex || ex.type !== "cardio") continue;
    total += entry.minutes ?? 0;
  }
  return total;
}

// Перевод баллов нагрузки в уровень интенсивности 0..3.
export function intensityLevel(
  load: number,
  thresholds: IntensityThresholds = DEFAULT_THRESHOLDS
): IntensityLevel {
  if (load <= 0) return 0;
  if (load >= thresholds.high) return 3;
  if (load >= thresholds.medium) return 2;
  return 1;
}

// Сводка по неделе: уровни по каждой группе + сколько групп задействовано.
export interface WeekSummary {
  load: Record<MuscleGroup, number>;
  levels: Record<MuscleGroup, IntensityLevel>;
  workedCount: number; // групп с нагрузкой > 0
  cardioMinutes: number;
}

export function summarizeWeek(
  week: WeekPlan,
  byId: Map<string, Exercise>,
  thresholds: IntensityThresholds = DEFAULT_THRESHOLDS
): WeekSummary {
  const load = weeklyMuscleLoad(week, byId);
  const levels = {} as Record<MuscleGroup, IntensityLevel>;
  let workedCount = 0;
  for (const m of MUSCLE_ORDER) {
    levels[m] = intensityLevel(load[m], thresholds);
    if (load[m] > 0) workedCount += 1;
  }
  return {
    load,
    levels,
    workedCount,
    cardioMinutes: weeklyCardioMinutes(week, byId),
  };
}
