// Анатомическая карта тела: два стилизованных силуэта (спереди и сзади).
// Группы мышц подсвечиваются цветом по уровню недельной нагрузки (тепловая
// карта). Neutral-части (голова, кисти, стопы) — нейтрального цвета.
import type { MuscleGroup } from "../../types";
import { MUSCLE_LABELS, INTENSITY_LABELS } from "../../lib/muscles";
import type { IntensityLevel } from "../../lib/muscles";

interface Props {
  levels: Record<MuscleGroup, IntensityLevel>;
}

export function BodyMap({ levels }: Props) {
  return (
    <div className="bodymap">
      <Figure side="front" levels={levels} />
      <Figure side="back" levels={levels} />
    </div>
  );
}

function Figure({
  side,
  levels,
}: {
  side: "front" | "back";
  levels: Record<MuscleGroup, IntensityLevel>;
}) {
  // Класс заливки по уровню — цвета заданы в styles.css (.heat-0..3).
  const cls = (m: MuscleGroup) => `region heat-${levels[m]}`;
  // Подсказка при наведении.
  const tip = (m: MuscleGroup) =>
    `${MUSCLE_LABELS[m]}: ${INTENSITY_LABELS[levels[m]]}`;

  return (
    <figure className="figure">
      <svg viewBox="0 0 120 244" role="img" aria-label={`Вид ${side === "front" ? "спереди" : "сзади"}`}>
        {/* Голова и шея — нейтральные */}
        <circle className="neutral" cx="60" cy="22" r="16" />
        <rect className="neutral" x="54" y="36" width="12" height="10" rx="3" />

        {/* Кисти и стопы — нейтральные */}
        <circle className="neutral" cx="23" cy="152" r="7" />
        <circle className="neutral" cx="97" cy="152" r="7" />
        <rect className="neutral" x="44" y="236" width="15" height="8" rx="3" />
        <rect className="neutral" x="61" y="236" width="15" height="8" rx="3" />

        {/* Плечи (дельты) — на обоих видах */}
        <ellipse className={cls("shoulders")} cx="33" cy="56" rx="14" ry="12">
          <title>{tip("shoulders")}</title>
        </ellipse>
        <ellipse className={cls("shoulders")} cx="87" cy="56" rx="14" ry="12">
          <title>{tip("shoulders")}</title>
        </ellipse>

        {/* Предплечья — на обоих видах */}
        <rect className={cls("forearms")} x="14" y="108" width="14" height="42" rx="7">
          <title>{tip("forearms")}</title>
        </rect>
        <rect className={cls("forearms")} x="92" y="108" width="14" height="42" rx="7">
          <title>{tip("forearms")}</title>
        </rect>

        {side === "front" ? (
          <>
            {/* Грудь */}
            <rect className={cls("chest")} x="42" y="48" width="36" height="36" rx="7">
              <title>{tip("chest")}</title>
            </rect>
            {/* Пресс / кор */}
            <rect className={cls("abs")} x="46" y="86" width="28" height="46" rx="6">
              <title>{tip("abs")}</title>
            </rect>
            {/* Бицепсы */}
            <rect className={cls("biceps")} x="16" y="66" width="16" height="40" rx="8">
              <title>{tip("biceps")}</title>
            </rect>
            <rect className={cls("biceps")} x="88" y="66" width="16" height="40" rx="8">
              <title>{tip("biceps")}</title>
            </rect>
            {/* Квадрицепсы */}
            <rect className={cls("quads")} x="44" y="134" width="15" height="54" rx="7">
              <title>{tip("quads")}</title>
            </rect>
            <rect className={cls("quads")} x="61" y="134" width="15" height="54" rx="7">
              <title>{tip("quads")}</title>
            </rect>
            {/* Голени спереди — нейтральные */}
            <rect className="neutral" x="46" y="190" width="12" height="46" rx="6" />
            <rect className="neutral" x="62" y="190" width="12" height="46" rx="6" />
          </>
        ) : (
          <>
            {/* Спина */}
            <rect className={cls("back")} x="42" y="48" width="36" height="60" rx="7">
              <title>{tip("back")}</title>
            </rect>
            {/* Ягодицы */}
            <rect className={cls("glutes")} x="44" y="110" width="32" height="24" rx="8">
              <title>{tip("glutes")}</title>
            </rect>
            {/* Трицепсы */}
            <rect className={cls("triceps")} x="16" y="66" width="16" height="40" rx="8">
              <title>{tip("triceps")}</title>
            </rect>
            <rect className={cls("triceps")} x="88" y="66" width="16" height="40" rx="8">
              <title>{tip("triceps")}</title>
            </rect>
            {/* Бицепсы бедра */}
            <rect className={cls("hamstrings")} x="44" y="136" width="15" height="52" rx="7">
              <title>{tip("hamstrings")}</title>
            </rect>
            <rect className={cls("hamstrings")} x="61" y="136" width="15" height="52" rx="7">
              <title>{tip("hamstrings")}</title>
            </rect>
            {/* Икры */}
            <rect className={cls("calves")} x="46" y="190" width="12" height="46" rx="6">
              <title>{tip("calves")}</title>
            </rect>
            <rect className={cls("calves")} x="62" y="190" width="12" height="46" rx="6">
              <title>{tip("calves")}</title>
            </rect>
          </>
        )}
      </svg>
      <figcaption>{side === "front" ? "Спереди" : "Сзади"}</figcaption>
    </figure>
  );
}
