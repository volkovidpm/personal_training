// Экспорт/импорт всего состояния в JSON. localStorage привязан к браузеру,
// поэтому бэкап позволяет перенести данные между устройствами.
import type { Exercise, WeekPlan } from "../types";

export interface BackupData {
  version: 1;
  exercises: Exercise[]; // только пользовательские
  weeks: Record<string, WeekPlan>;
}

export function buildBackup(
  exercises: Exercise[],
  weeks: Record<string, WeekPlan>
): BackupData {
  return { version: 1, exercises, weeks };
}

export function serialize(data: BackupData): string {
  return JSON.stringify(data, null, 2);
}

// Разбор и минимальная валидация бэкапа. Бросает ошибку при неверном формате.
export function parseBackup(json: string): BackupData {
  const raw = JSON.parse(json) as unknown;
  if (
    !raw ||
    typeof raw !== "object" ||
    !Array.isArray((raw as BackupData).exercises) ||
    typeof (raw as BackupData).weeks !== "object"
  ) {
    throw new Error("Неверный формат файла бэкапа");
  }
  const data = raw as BackupData;
  return { version: 1, exercises: data.exercises, weeks: data.weeks };
}
