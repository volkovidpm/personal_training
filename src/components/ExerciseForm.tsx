// Форма добавления/редактирования упражнения. Используется в модальном окне
// библиотеки. Для seed-упражнений не вызывается (они только для просмотра).
import { useState } from "react";
import type { Exercise, ExerciseType, MuscleGroup } from "../types";
import { MUSCLE_ORDER, MUSCLE_LABELS } from "../lib/muscles";
import type { ExerciseDraft } from "../state/exercises";

interface Props {
  initial?: Exercise;
  onSubmit: (draft: ExerciseDraft) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export function ExerciseForm({ initial, onSubmit, onCancel, onDelete }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [type, setType] = useState<ExerciseType>(initial?.type ?? "strength");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [equipment, setEquipment] = useState(
    initial?.equipment.join(", ") ?? ""
  );
  const [primary, setPrimary] = useState<Set<MuscleGroup>>(
    new Set(initial?.muscles.primary ?? [])
  );
  const [secondary, setSecondary] = useState<Set<MuscleGroup>>(
    new Set(initial?.muscles.secondary ?? [])
  );

  function toggle(
    set: Set<MuscleGroup>,
    setter: (s: Set<MuscleGroup>) => void,
    other: Set<MuscleGroup>,
    otherSetter: (s: Set<MuscleGroup>) => void,
    m: MuscleGroup
  ) {
    const next = new Set(set);
    if (next.has(m)) {
      next.delete(m);
    } else {
      next.add(m);
      // Мышца не может быть одновременно основной и вспомогательной.
      if (other.has(m)) {
        const o = new Set(other);
        o.delete(m);
        otherSetter(o);
      }
    }
    setter(next);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      type,
      description: description.trim(),
      equipment: equipment
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      muscles: {
        primary: type === "cardio" ? [] : [...primary],
        secondary: type === "cardio" ? [] : [...secondary],
      },
    });
  }

  return (
    <form className="ex-form" onSubmit={submit}>
      <label className="field">
        <span>Название</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Жим штанги лёжа"
          autoFocus
        />
      </label>

      <label className="field">
        <span>Тип</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ExerciseType)}
        >
          <option value="strength">Силовое</option>
          <option value="cardio">Кардио</option>
        </select>
      </label>

      <label className="field">
        <span>Техника выполнения</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Как правильно выполнять упражнение"
        />
      </label>

      <label className="field">
        <span>Оборудование / тренажёры (через запятую)</span>
        <input
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          placeholder="Штанга, Скамья, Стойки"
        />
      </label>

      {type === "strength" && (
        <div className="muscle-pickers">
          <fieldset>
            <legend>Основные мышцы (вес ×2)</legend>
            <div className="chip-grid">
              {MUSCLE_ORDER.map((m) => (
                <button
                  type="button"
                  key={m}
                  className={primary.has(m) ? "chip chip-primary on" : "chip"}
                  onClick={() =>
                    toggle(primary, setPrimary, secondary, setSecondary, m)
                  }
                >
                  {MUSCLE_LABELS[m]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Вспомогательные мышцы (вес ×1)</legend>
            <div className="chip-grid">
              {MUSCLE_ORDER.map((m) => (
                <button
                  type="button"
                  key={m}
                  className={
                    secondary.has(m) ? "chip chip-secondary on" : "chip"
                  }
                  onClick={() =>
                    toggle(secondary, setSecondary, primary, setPrimary, m)
                  }
                >
                  {MUSCLE_LABELS[m]}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      <div className="form-actions">
        {onDelete && (
          <button type="button" className="btn-danger" onClick={onDelete}>
            Удалить
          </button>
        )}
        <span className="spacer" />
        <button type="button" className="btn-ghost" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </div>
    </form>
  );
}
