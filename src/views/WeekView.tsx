// Главный экран: переключатель недель, сетка Пн–Вс и панель проработки мышц
// (карта тела + полоски + сводка баланса).
import { useMemo, useState } from "react";
import type { DayKey } from "../types";
import { DAY_KEYS, DAY_LABELS } from "../types";
import { currentWeekId, shiftWeekId, weekRangeLabel } from "../lib/weekId";
import { summarizeWeek } from "../lib/load";
import { MUSCLE_ORDER, MUSCLE_LABELS } from "../lib/muscles";
import { useExercises } from "../state/exercises";
import { useWeeks, type EntryDraft } from "../state/weeks";
import { DayColumn } from "../components/DayColumn";
import { MuscleBars } from "../components/MuscleBars";
import { BodyMap } from "../components/BodyMap/BodyMap";
import { ExercisePicker } from "../components/ExercisePicker";
import { Modal } from "../components/Modal";

export function WeekView() {
  const [weekId, setWeekId] = useState(() => currentWeekId());
  const [pickerDay, setPickerDay] = useState<DayKey | null>(null);

  const byId = useExercises((s) => s.byId);
  const weeks = useWeeks((s) => s.weeks);
  const addEntry = useWeeks((s) => s.addEntry);
  const removeEntry = useWeeks((s) => s.removeEntry);

  // Текущая неделя из стора (или пустая) — пересобираем при изменении weeks/weekId.
  const week = useMemo(
    () =>
      weeks[weekId] ?? {
        weekId,
        days: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] },
      },
    [weeks, weekId]
  );

  const summary = useMemo(() => summarizeWeek(week, byId), [week, byId]);

  const underworked = MUSCLE_ORDER.filter((m) => summary.levels[m] === 0);

  function handleAdd(draft: EntryDraft) {
    if (!pickerDay) return;
    addEntry(weekId, pickerDay, draft);
    setPickerDay(null);
  }

  return (
    <section className="weekview">
      <div className="week-nav">
        <button
          className="btn-ghost"
          onClick={() => setWeekId(shiftWeekId(weekId, -1))}
          aria-label="Предыдущая неделя"
        >
          ← Пред.
        </button>
        <div className="week-title">
          <strong>{weekRangeLabel(weekId)}</strong>
          <span className="muted">{weekId}</span>
        </div>
        <button
          className="btn-ghost"
          onClick={() => setWeekId(shiftWeekId(weekId, 1))}
          aria-label="Следующая неделя"
        >
          След. →
        </button>
        <button className="btn-ghost today-btn" onClick={() => setWeekId(currentWeekId())}>
          Сегодня
        </button>
      </div>

      <div className="week-grid">
        {DAY_KEYS.map((day) => (
          <DayColumn
            key={day}
            label={DAY_LABELS[day]}
            entries={week.days[day]}
            byId={byId}
            onAdd={() => setPickerDay(day)}
            onRemove={(entryId) => removeEntry(weekId, day, entryId)}
          />
        ))}
      </div>

      <div className="dashboard">
        <div className="dashboard-map">
          <h2>Проработка за неделю</h2>
          <BodyMap levels={summary.levels} />
          <Legend />
        </div>
        <div className="dashboard-bars">
          <div className="summary-line">
            Задействовано групп: <strong>{summary.workedCount}</strong> из{" "}
            {MUSCLE_ORDER.length} · кардио: <strong>{summary.cardioMinutes} мин</strong>
          </div>
          <MuscleBars summary={summary} />
          {underworked.length > 0 && (
            <p className="warn">
              Не задействованы: {underworked.map((m) => MUSCLE_LABELS[m]).join(", ")}
            </p>
          )}
        </div>
      </div>

      {pickerDay && (
        <Modal
          title={`Добавить — ${DAY_LABELS[pickerDay]}`}
          onClose={() => setPickerDay(null)}
        >
          <ExercisePicker onAdd={handleAdd} />
        </Modal>
      )}
    </section>
  );
}

function Legend() {
  const items = [
    { lvl: 0, label: "нет" },
    { lvl: 1, label: "низкая" },
    { lvl: 2, label: "средняя" },
    { lvl: 3, label: "высокая" },
  ];
  return (
    <div className="legend">
      {items.map((i) => (
        <span className="legend-item" key={i.lvl}>
          <span className={`legend-swatch heat-${i.lvl}`} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
