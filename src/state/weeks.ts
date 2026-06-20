// Стор планов недель. Каждая неделя хранится по своему id ("2026-W25").
// Данные сохраняются в localStorage целиком.
import { create } from "zustand";
import type { DayKey, WeekPlan, WorkoutEntry } from "../types";
import { emptyWeek } from "../types";
import { read, write, KEYS } from "./storage";
import { uid } from "../lib/id";

type WeeksMap = Record<string, WeekPlan>;

// Поля записи без служебного entryId.
export type EntryDraft = Omit<WorkoutEntry, "entryId">;

interface WeeksState {
  weeks: WeeksMap;
  getWeek: (weekId: string) => WeekPlan;
  addEntry: (weekId: string, day: DayKey, draft: EntryDraft) => void;
  updateEntry: (
    weekId: string,
    day: DayKey,
    entryId: string,
    draft: EntryDraft
  ) => void;
  removeEntry: (weekId: string, day: DayKey, entryId: string) => void;
  replaceWeeks: (weeks: WeeksMap) => void;
}

function persist(weeks: WeeksMap): void {
  write(KEYS.weeks, weeks);
}

// Гарантирует наличие недели в карте (возвращает копию для изменения).
function ensureWeek(weeks: WeeksMap, weekId: string): WeekPlan {
  const existing = weeks[weekId];
  if (existing) {
    return { weekId, days: { ...existing.days } };
  }
  return emptyWeek(weekId);
}

export const useWeeks = create<WeeksState>((set, get) => ({
  weeks: read<WeeksMap>(KEYS.weeks, {}),

  getWeek(weekId) {
    return get().weeks[weekId] ?? emptyWeek(weekId);
  },

  addEntry(weekId, day, draft) {
    const week = ensureWeek(get().weeks, weekId);
    const entry: WorkoutEntry = { ...draft, entryId: uid("e") };
    week.days[day] = [...week.days[day], entry];
    const weeks = { ...get().weeks, [weekId]: week };
    persist(weeks);
    set({ weeks });
  },

  updateEntry(weekId, day, entryId, draft) {
    const week = ensureWeek(get().weeks, weekId);
    week.days[day] = week.days[day].map((e) =>
      e.entryId === entryId ? { ...draft, entryId } : e
    );
    const weeks = { ...get().weeks, [weekId]: week };
    persist(weeks);
    set({ weeks });
  },

  removeEntry(weekId, day, entryId) {
    const week = ensureWeek(get().weeks, weekId);
    week.days[day] = week.days[day].filter((e) => e.entryId !== entryId);
    const weeks = { ...get().weeks, [weekId]: week };
    persist(weeks);
    set({ weeks });
  },

  replaceWeeks(weeks) {
    persist(weeks);
    set({ weeks });
  },
}));
