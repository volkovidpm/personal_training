// Доменные типы планировщика тренировок.

// Группы мышц, которые умеет отслеживать приложение. Кардио сюда не входит —
// это отдельная метрика (минуты), см. lib/load.ts.
export type MuscleGroup =
  | "chest" // грудь
  | "back" // спина (широчайшие, трапеции)
  | "shoulders" // плечи (дельты)
  | "biceps" // бицепс
  | "triceps" // трицепс
  | "forearms" // предплечья
  | "abs" // пресс / кор
  | "quads" // квадрицепс (передняя поверхность бедра)
  | "hamstrings" // бицепс бедра (задняя поверхность)
  | "glutes" // ягодицы
  | "calves"; // икры

export type ExerciseType = "strength" | "cardio";

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  description: string; // техника: как правильно выполнять
  equipment: string[]; // тренажёры / оборудование
  muscles: {
    primary: MuscleGroup[]; // основные — вес 2
    secondary: MuscleGroup[]; // вспомогательные — вес 1
  };
  custom: boolean; // true = добавлено пользователем
}

// Одна запись упражнения в конкретном дне недели с объёмом.
export interface WorkoutEntry {
  entryId: string;
  exerciseId: string;
  sets?: number; // силовые
  reps?: number; // силовые
  minutes?: number; // кардио
}

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const DAY_KEYS: DayKey[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const DAY_LABELS: Record<DayKey, string> = {
  mon: "Пн",
  tue: "Вт",
  wed: "Ср",
  thu: "Чт",
  fri: "Пт",
  sat: "Сб",
  sun: "Вс",
};

export interface WeekPlan {
  weekId: string; // ISO-неделя, например "2026-W25"
  days: Record<DayKey, WorkoutEntry[]>;
}

export function emptyWeek(weekId: string): WeekPlan {
  return {
    weekId,
    days: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
  };
}
