// Стор библиотеки упражнений: стартовый набор (seed) + пользовательские.
// Пользовательские упражнения сохраняются в localStorage и при загрузке
// мержатся со стартовыми.
import { create } from "zustand";
import type { Exercise } from "../types";
import { SEED_EXERCISES } from "../data/exercises";
import { read, write, KEYS } from "./storage";
import { uid } from "../lib/id";

// Поля, которые пользователь задаёт в форме (без id/custom).
export type ExerciseDraft = Omit<Exercise, "id" | "custom">;

function indexById(list: Exercise[]): Map<string, Exercise> {
  return new Map(list.map((e) => [e.id, e]));
}

function recompute(custom: Exercise[]): Pick<ExercisesState, "custom" | "all" | "byId"> {
  const all = [...SEED_EXERCISES, ...custom];
  return { custom, all, byId: indexById(all) };
}

interface ExercisesState {
  custom: Exercise[];
  all: Exercise[];
  byId: Map<string, Exercise>;
  addExercise: (draft: ExerciseDraft) => Exercise;
  updateExercise: (id: string, draft: ExerciseDraft) => void;
  removeExercise: (id: string) => void;
  // Полная замена пользовательских упражнений (для импорта).
  replaceCustom: (custom: Exercise[]) => void;
}

function persist(custom: Exercise[]): void {
  write(KEYS.exercises, custom);
}

export const useExercises = create<ExercisesState>((set, get) => ({
  ...recompute(read<Exercise[]>(KEYS.exercises, [])),

  addExercise(draft) {
    const exercise: Exercise = { ...draft, id: uid("ex"), custom: true };
    const custom = [...get().custom, exercise];
    persist(custom);
    set(recompute(custom));
    return exercise;
  },

  updateExercise(id, draft) {
    const custom = get().custom.map((e) =>
      e.id === id ? { ...e, ...draft, id, custom: true } : e
    );
    persist(custom);
    set(recompute(custom));
  },

  removeExercise(id) {
    const custom = get().custom.filter((e) => e.id !== id);
    persist(custom);
    set(recompute(custom));
  },

  replaceCustom(custom) {
    persist(custom);
    set(recompute(custom));
  },
}));
