// Полоски интенсивности по группам мышц за неделю + отдельная полоска кардио.
import type { MuscleGroup } from "../types";
import { MUSCLE_ORDER, MUSCLE_LABELS, INTENSITY_LABELS } from "../lib/muscles";
import type { WeekSummary } from "../lib/load";

interface Props {
  summary: WeekSummary;
}

// Доля заполнения полоски для уровня 0..3.
const FILL: Record<number, number> = { 0: 0, 1: 0.4, 2: 0.7, 3: 1 };

export function MuscleBars({ summary }: Props) {
  return (
    <div className="bars">
      {MUSCLE_ORDER.map((m: MuscleGroup) => {
        const level = summary.levels[m];
        return (
          <div className="bar-row" key={m} title={INTENSITY_LABELS[level]}>
            <span className="bar-label">{MUSCLE_LABELS[m]}</span>
            <div className="bar-track">
              <div
                className={`bar-fill heat-${level}`}
                style={{ width: `${FILL[level] * 100}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="bar-row cardio-row" title="Сумма минут кардио за неделю">
        <span className="bar-label">Кардио</span>
        <div className="bar-track">
          <div
            className="bar-fill cardio-fill"
            style={{ width: `${Math.min(summary.cardioMinutes / 150, 1) * 100}%` }}
          />
        </div>
        <span className="bar-value">{summary.cardioMinutes} мин</span>
      </div>
    </div>
  );
}
