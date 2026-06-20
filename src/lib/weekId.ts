// Работа с ISO-неделями: id вида "2026-W25", навигация ←/→ и человекочитаемые
// метки диапазона дат. Все вычисления в UTC, чтобы исключить эффекты часового
// пояса и перехода на летнее время.

const DAY_MS = 86_400_000;

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

// Понедельник недели (Mon=0) в UTC.
function mondayOf(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const dayNum = (d.getUTCDay() + 6) % 7; // Пн=0 ... Вс=6
  d.setUTCDate(d.getUTCDate() - dayNum);
  return d;
}

// ISO год и номер недели для понедельника.
function isoYearWeek(monday: Date): { year: number; week: number } {
  // Четверг той же недели определяет ISO-год.
  const thursday = new Date(monday);
  thursday.setUTCDate(monday.getUTCDate() + 3);
  const year = thursday.getUTCFullYear();
  const firstThursday = new Date(Date.UTC(year, 0, 4));
  const firstMonday = mondayOf(firstThursday);
  const week = 1 + Math.round((monday.getTime() - firstMonday.getTime()) / (7 * DAY_MS));
  return { year, week };
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// id недели для произвольной даты.
export function weekIdOf(date: Date): string {
  const monday = mondayOf(date);
  const { year, week } = isoYearWeek(monday);
  return `${year}-W${pad2(week)}`;
}

// id текущей недели.
export function currentWeekId(now: Date = new Date()): string {
  return weekIdOf(now);
}

// Понедельник недели по её id.
export function mondayOfWeekId(weekId: string): Date {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = Number(yearStr);
  const week = Number(weekStr);
  const firstThursday = new Date(Date.UTC(year, 0, 4));
  const firstMonday = mondayOf(firstThursday);
  const monday = new Date(firstMonday);
  monday.setUTCDate(firstMonday.getUTCDate() + (week - 1) * 7);
  return monday;
}

// Сдвиг недели на delta недель (положительный — вперёд, отрицательный — назад).
export function shiftWeekId(weekId: string, delta: number): string {
  const monday = mondayOfWeekId(weekId);
  monday.setUTCDate(monday.getUTCDate() + delta * 7);
  return weekIdOf(monday);
}

// Семь дат недели (Пн..Вс).
export function weekDates(weekId: string): Date[] {
  const monday = mondayOfWeekId(weekId);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
}

// Метка диапазона: "22–28 июня" или "29 июня – 5 июля".
export function weekRangeLabel(weekId: string): string {
  const dates = weekDates(weekId);
  const start = dates[0];
  const end = dates[6];
  const startDay = start.getUTCDate();
  const endDay = end.getUTCDate();
  const startMonth = MONTHS_GENITIVE[start.getUTCMonth()];
  const endMonth = MONTHS_GENITIVE[end.getUTCMonth()];
  if (start.getUTCMonth() === end.getUTCMonth()) {
    return `${startDay}–${endDay} ${endMonth}`;
  }
  return `${startDay} ${startMonth} – ${endDay} ${endMonth}`;
}
