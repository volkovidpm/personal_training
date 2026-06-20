import { describe, it, expect } from "vitest";
import {
  weekIdOf,
  shiftWeekId,
  mondayOfWeekId,
  weekRangeLabel,
  weekDates,
} from "./weekId";

// Суббота 20 июня 2026 — это ISO-неделя 2026-W25 (Пн 15 — Вс 21 июня).
const sat = new Date(Date.UTC(2026, 5, 20));

describe("weekIdOf", () => {
  it("определяет ISO-неделю по дате", () => {
    expect(weekIdOf(sat)).toBe("2026-W25");
  });
  it("номер недели дополняется до двух цифр", () => {
    expect(weekIdOf(new Date(Date.UTC(2026, 0, 5)))).toBe("2026-W02");
  });
});

describe("shiftWeekId", () => {
  it("двигает неделю вперёд и назад", () => {
    expect(shiftWeekId("2026-W25", 1)).toBe("2026-W26");
    expect(shiftWeekId("2026-W25", -1)).toBe("2026-W24");
  });
  it("сдвиг туда-обратно возвращает исходную неделю", () => {
    expect(shiftWeekId(shiftWeekId("2026-W25", 5), -5)).toBe("2026-W25");
  });
  it("корректно переходит через границу года", () => {
    // 2026-W01 назад на одну неделю — последняя неделя 2025 года.
    expect(shiftWeekId("2026-W01", -1)).toBe("2025-W52");
  });
});

describe("mondayOfWeekId", () => {
  it("возвращает понедельник недели", () => {
    const monday = mondayOfWeekId("2026-W25");
    expect(monday.getUTCFullYear()).toBe(2026);
    expect(monday.getUTCMonth()).toBe(5); // июнь
    expect(monday.getUTCDate()).toBe(15);
    expect(monday.getUTCDay()).toBe(1); // понедельник
  });
});

describe("weekDates", () => {
  it("возвращает 7 дат Пн..Вс", () => {
    const dates = weekDates("2026-W25");
    expect(dates).toHaveLength(7);
    expect(dates[0].getUTCDate()).toBe(15);
    expect(dates[6].getUTCDate()).toBe(21);
  });
});

describe("weekRangeLabel", () => {
  it("диапазон внутри месяца", () => {
    expect(weekRangeLabel("2026-W25")).toBe("15–21 июня");
  });
  it("диапазон на стыке месяцев", () => {
    // 2026-W27: Пн 29 июня — Вс 5 июля.
    expect(weekRangeLabel("2026-W27")).toBe("29 июня – 5 июля");
  });
});
