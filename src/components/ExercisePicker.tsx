// Выбор упражнения для дня недели и ввод объёма (подходы×повторы или минуты).
import { useMemo, useState } from "react";
import type { Exercise } from "../types";
import { MUSCLE_LABELS } from "../lib/muscles";
import { useExercises } from "../state/exercises";
import type { EntryDraft } from "../state/weeks";

interface Props {
  onAdd: (draft: EntryDraft) => void;
}

export function ExercisePicker({ onAdd }: Props) {
  const all = useExercises((s) => s.all);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Exercise | null>(null);

  // Поля объёма.
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [minutes, setMinutes] = useState(20);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((e) => e.name.toLowerCase().includes(q));
  }, [all, query]);

  function confirm() {
    if (!selected) return;
    if (selected.type === "cardio") {
      onAdd({ exerciseId: selected.id, minutes });
    } else {
      onAdd({ exerciseId: selected.id, sets, reps });
    }
  }

  return (
    <div className="picker">
      <input
        className="search"
        placeholder="Поиск упражнения…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="picker-list">
        {list.map((ex) => (
          <button
            key={ex.id}
            className={
              selected?.id === ex.id ? "picker-item selected" : "picker-item"
            }
            onClick={() => setSelected(ex)}
          >
            <span className={`type-dot type-${ex.type}`} />
            <span className="picker-name">{ex.name}</span>
            <span className="picker-muscles">
              {ex.type === "cardio"
                ? "кардио"
                : ex.muscles.primary.map((m) => MUSCLE_LABELS[m]).join(", ")}
            </span>
          </button>
        ))}
        {list.length === 0 && <p className="muted">Ничего не найдено</p>}
      </div>

      {selected && (
        <div className="volume">
          <div className="volume-title">{selected.name}</div>
          {selected.type === "cardio" ? (
            <label className="field inline">
              <span>Минуты</span>
              <input
                type="number"
                min={1}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </label>
          ) : (
            <div className="volume-fields">
              <label className="field inline">
                <span>Подходы</span>
                <input
                  type="number"
                  min={1}
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                />
              </label>
              <label className="field inline">
                <span>Повторы</span>
                <input
                  type="number"
                  min={1}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                />
              </label>
            </div>
          )}
          <button className="btn-primary" onClick={confirm}>
            Добавить в день
          </button>
        </div>
      )}
    </div>
  );
}
