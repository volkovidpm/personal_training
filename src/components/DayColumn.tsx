// Колонка одного дня недели: список запланированных упражнений и кнопка «+».
import type { Exercise, WorkoutEntry } from "../types";

interface Props {
  label: string;
  entries: WorkoutEntry[];
  byId: Map<string, Exercise>;
  onAdd: () => void;
  onRemove: (entryId: string) => void;
}

// Текст объёма: "3×10" для силовых, "20 мин" для кардио.
function volumeText(entry: WorkoutEntry, ex?: Exercise): string {
  if (ex?.type === "cardio") return `${entry.minutes ?? 0} мин`;
  if (entry.sets && entry.reps) return `${entry.sets}×${entry.reps}`;
  return "";
}

export function DayColumn({ label, entries, byId, onAdd, onRemove }: Props) {
  return (
    <div className="day-col">
      <div className="day-head">{label}</div>
      <div className="day-entries">
        {entries.map((entry) => {
          const ex = byId.get(entry.exerciseId);
          return (
            <div
              className={`entry type-${ex?.type ?? "strength"}`}
              key={entry.entryId}
            >
              <span className="entry-name">{ex?.name ?? "—"}</span>
              <span className="entry-vol">{volumeText(entry, ex)}</span>
              <button
                className="entry-remove"
                onClick={() => onRemove(entry.entryId)}
                aria-label="Удалить"
                title="Удалить"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
      <button className="day-add" onClick={onAdd} title="Добавить упражнение">
        +
      </button>
    </div>
  );
}
