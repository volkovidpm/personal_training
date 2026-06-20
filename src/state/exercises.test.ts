import { describe, it, expect, beforeEach } from "vitest";
import { installMemoryStorage } from "../test/memoryStorage";
import { read, KEYS } from "./storage";
import { SEED_EXERCISES } from "../data/exercises";
import { useExercises, type ExerciseDraft } from "./exercises";
import type { Exercise } from "../types";

const draft: ExerciseDraft = {
  name: "Тест-упражнение",
  type: "strength",
  description: "Описание",
  equipment: ["Гантели"],
  muscles: { primary: ["biceps"], secondary: [] },
};

describe("стор упражнений", () => {
  beforeEach(() => {
    installMemoryStorage();
    useExercises.getState().replaceCustom([]);
  });

  it("стартовая библиотека входит в all и byId", () => {
    const { all, byId } = useExercises.getState();
    expect(all.length).toBe(SEED_EXERCISES.length);
    expect(byId.get("bench-press")?.name).toBe("Жим штанги лёжа");
  });

  it("добавляет пользовательское упражнение и сохраняет его", () => {
    const created = useExercises.getState().addExercise(draft);
    expect(created.custom).toBe(true);
    expect(created.id).toBeTruthy();

    const state = useExercises.getState();
    expect(state.custom).toHaveLength(1);
    expect(state.byId.get(created.id)?.name).toBe("Тест-упражнение");

    // Сохранилось только пользовательское, без seed.
    const persisted = read<Exercise[]>(KEYS.exercises, []);
    expect(persisted).toHaveLength(1);
    expect(persisted[0].id).toBe(created.id);
  });

  it("обновляет пользовательское упражнение", () => {
    const created = useExercises.getState().addExercise(draft);
    useExercises.getState().updateExercise(created.id, {
      ...draft,
      name: "Новое имя",
    });
    expect(useExercises.getState().byId.get(created.id)?.name).toBe("Новое имя");
  });

  it("удаляет пользовательское упражнение", () => {
    const created = useExercises.getState().addExercise(draft);
    useExercises.getState().removeExercise(created.id);
    expect(useExercises.getState().custom).toHaveLength(0);
    expect(useExercises.getState().byId.has(created.id)).toBe(false);
  });
});
