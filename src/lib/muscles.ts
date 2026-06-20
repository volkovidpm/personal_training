// Перечень групп мышц, русские лейблы, порядок отображения и цветовая шкала
// интенсивности проработки за неделю.
import type { MuscleGroup } from "../types";

export const MUSCLE_ORDER: MuscleGroup[] = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "abs",
  "quads",
  "hamstrings",
  "glutes",
  "calves",
];

export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: "Грудь",
  back: "Спина",
  shoulders: "Плечи",
  biceps: "Бицепс",
  triceps: "Трицепс",
  forearms: "Предплечья",
  abs: "Пресс / кор",
  quads: "Квадрицепс",
  hamstrings: "Бицепс бедра",
  glutes: "Ягодицы",
  calves: "Икры",
};

// Уровни интенсивности: используются и в полосках, и в подсветке карты тела.
export type IntensityLevel = 0 | 1 | 2 | 3;

export const INTENSITY_LABELS: Record<IntensityLevel, string> = {
  0: "Не задействована",
  1: "Низкая",
  2: "Средняя",
  3: "Высокая",
};

// Цвета тепловой шкалы (CSS-переменные определены в styles.css).
export const INTENSITY_COLORS: Record<IntensityLevel, string> = {
  0: "var(--heat-0)",
  1: "var(--heat-1)",
  2: "var(--heat-2)",
  3: "var(--heat-3)",
};
