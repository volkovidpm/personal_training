// Библиотека упражнений: фильтры, карточки, детальный просмотр и форма
// добавления/редактирования пользовательских упражнений.
import { useMemo, useState } from "react";
import type { Exercise, MuscleGroup } from "../types";
import { MUSCLE_ORDER, MUSCLE_LABELS } from "../lib/muscles";
import { useExercises, type ExerciseDraft } from "../state/exercises";
import { ExerciseForm } from "../components/ExerciseForm";
import { Modal } from "../components/Modal";

type TypeFilter = "all" | "strength" | "cardio";
type MuscleFilter = "all" | MuscleGroup;

// Открытое модальное окно: ничего, форма добавления, форма редактирования,
// либо детальный просмотр.
type Dialog =
  | { kind: "none" }
  | { kind: "add" }
  | { kind: "edit"; exercise: Exercise }
  | { kind: "view"; exercise: Exercise };

interface Props {
  param?: string;
}

export function LibraryView({ param }: Props) {
  const all = useExercises((s) => s.all);
  const byId = useExercises((s) => s.byId);
  const addExercise = useExercises((s) => s.addExercise);
  const updateExercise = useExercises((s) => s.updateExercise);
  const removeExercise = useExercises((s) => s.removeExercise);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [muscleFilter, setMuscleFilter] = useState<MuscleFilter>("all");
  const [dialog, setDialog] = useState<Dialog>(() =>
    param && byId.get(param)
      ? { kind: "view", exercise: byId.get(param)! }
      : { kind: "none" }
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((ex) => {
      if (typeFilter !== "all" && ex.type !== typeFilter) return false;
      if (muscleFilter !== "all") {
        const hit =
          ex.muscles.primary.includes(muscleFilter) ||
          ex.muscles.secondary.includes(muscleFilter);
        if (!hit) return false;
      }
      if (q && !ex.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [all, query, typeFilter, muscleFilter]);

  function handleAdd(draft: ExerciseDraft) {
    addExercise(draft);
    setDialog({ kind: "none" });
  }

  function handleEdit(id: string, draft: ExerciseDraft) {
    updateExercise(id, draft);
    setDialog({ kind: "none" });
  }

  function handleDelete(id: string) {
    removeExercise(id);
    setDialog({ kind: "none" });
  }

  return (
    <section className="library">
      <div className="library-head">
        <h1>Библиотека упражнений</h1>
        <button
          className="btn-primary"
          onClick={() => setDialog({ kind: "add" })}
        >
          + Добавить упражнение
        </button>
      </div>

      <div className="filters">
        <input
          className="search"
          placeholder="Поиск по названию…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
        >
          <option value="all">Все типы</option>
          <option value="strength">Силовые</option>
          <option value="cardio">Кардио</option>
        </select>
        <select
          value={muscleFilter}
          onChange={(e) => setMuscleFilter(e.target.value as MuscleFilter)}
        >
          <option value="all">Все мышцы</option>
          {MUSCLE_ORDER.map((m) => (
            <option key={m} value={m}>
              {MUSCLE_LABELS[m]}
            </option>
          ))}
        </select>
      </div>

      <p className="muted">Найдено: {list.length}</p>

      <div className="card-grid">
        {list.map((ex) => (
          <button
            key={ex.id}
            className="ex-card"
            onClick={() => setDialog({ kind: "view", exercise: ex })}
          >
            <div className="ex-card-top">
              <span className={`type-badge type-${ex.type}`}>
                {ex.type === "cardio" ? "Кардио" : "Сила"}
              </span>
              {ex.custom && <span className="custom-badge">своё</span>}
            </div>
            <h3>{ex.name}</h3>
            <div className="ex-card-muscles">
              {ex.type === "cardio"
                ? "Кардио-нагрузка"
                : ex.muscles.primary.map((m) => MUSCLE_LABELS[m]).join(", ") ||
                  "—"}
            </div>
          </button>
        ))}
      </div>

      {dialog.kind === "add" && (
        <Modal title="Новое упражнение" onClose={() => setDialog({ kind: "none" })}>
          <ExerciseForm
            onSubmit={handleAdd}
            onCancel={() => setDialog({ kind: "none" })}
          />
        </Modal>
      )}

      {dialog.kind === "edit" && (
        <Modal
          title="Редактировать упражнение"
          onClose={() => setDialog({ kind: "none" })}
        >
          <ExerciseForm
            initial={dialog.exercise}
            onSubmit={(d) => handleEdit(dialog.exercise.id, d)}
            onCancel={() => setDialog({ kind: "none" })}
            onDelete={() => handleDelete(dialog.exercise.id)}
          />
        </Modal>
      )}

      {dialog.kind === "view" && (
        <Modal
          title={dialog.exercise.name}
          onClose={() => setDialog({ kind: "none" })}
        >
          <ExerciseDetail
            exercise={dialog.exercise}
            onEdit={
              dialog.exercise.custom
                ? () => setDialog({ kind: "edit", exercise: dialog.exercise })
                : undefined
            }
          />
        </Modal>
      )}
    </section>
  );
}

function ExerciseDetail({
  exercise,
  onEdit,
}: {
  exercise: Exercise;
  onEdit?: () => void;
}) {
  return (
    <div className="ex-detail">
      <div className="ex-detail-tags">
        <span className={`type-badge type-${exercise.type}`}>
          {exercise.type === "cardio" ? "Кардио" : "Силовое"}
        </span>
        {exercise.custom && <span className="custom-badge">своё</span>}
      </div>

      <h4>Техника</h4>
      <p>{exercise.description || "—"}</p>

      {exercise.type === "strength" && (
        <>
          <h4>Группы мышц</h4>
          <p>
            <strong>Основные:</strong>{" "}
            {exercise.muscles.primary.map((m) => MUSCLE_LABELS[m]).join(", ") ||
              "—"}
          </p>
          <p>
            <strong>Вспомогательные:</strong>{" "}
            {exercise.muscles.secondary
              .map((m) => MUSCLE_LABELS[m])
              .join(", ") || "—"}
          </p>
        </>
      )}

      <h4>Оборудование</h4>
      <p>{exercise.equipment.join(", ") || "—"}</p>

      {onEdit && (
        <div className="form-actions">
          <span className="spacer" />
          <button className="btn-primary" onClick={onEdit}>
            Редактировать
          </button>
        </div>
      )}
    </div>
  );
}
